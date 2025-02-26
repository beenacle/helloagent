import DataTable from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-responsive';

export function initDataTable() {
   
    // Parse MM/DD/YY date format (for AI Voices)
function parseDateForSorting(dateStr) {
  if (!dateStr || typeof dateStr !== 'string' || !/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(dateStr)) {
    return '00000000'; // Sentinel value for invalid/empty dates
  }
  const parts = dateStr.split('/');
  const month = parts[0].padStart(2, '0');
  const day = parts[1].padStart(2, '0');
  let year = parts[2].padStart(2, '0');
  year = year.length === 2 ? '20' + year : year; // Assume 20XX for YY
  return year + month + day; // YYYYMMDD
}

// Parse "DD Mon YYYY, HH:MM AM/PM" date format (for Call Logs)
function parseCallLogDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return '000000000000'; // Sentinel for invalid/empty

  const match = dateStr.match(/^(\d{1,2})\s([A-Za-z]{3})\s(\d{4}),\s(\d{1,2}):(\d{2})\s(AM|PM)$/);
  if (!match) return '000000000000';

  const [, day, monthText, year, hour, minute, period] = match;
  const months = {
    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
    'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
  };

  const month = months[monthText.toLowerCase()] || '00';
  const dayPadded = day.padStart(2, '0');
  let hour24 = parseInt(hour);
  if (period === 'PM' && hour24 < 12) hour24 += 12;
  if (period === 'AM' && hour24 === 12) hour24 = 0;
  const hourPadded = hour24.toString().padStart(2, '0');

  return `${year}${month}${dayPadded}${hourPadded}${minute}00`; // YYYYMMDDHHMMSS
}

// Register custom type detection and ordering for MM/DD/YY (AI Voices)
DataTable.ext.type.detect.unshift(
  function (data) {
    if (typeof data === 'string' && /^\d{1,2}\/\d{1,2}\/\d{2}$/.test(data)) {
      return 'date-mmddyy';
    }
    return null;
  }
);

DataTable.ext.type.order['date-mmddyy-pre'] = function (data) {
  return data ? parseDateForSorting(data) : 0;
};

// Register custom type detection and ordering for "DD Mon YYYY, HH:MM AM/PM" (Call Logs)
DataTable.ext.type.detect.unshift(
  function (data) {
    if (typeof data === 'string' && /^\d{1,2}\s[A-Za-z]{3}\s\d{4},\s\d{1,2}:\d{2}\s(?:AM|PM)$/.test(data)) {
      return 'date-calllog';
    }
    return null;
  }
);

DataTable.ext.type.order['date-calllog-pre'] = function (data) {
  return data ? parseCallLogDate(data) : 0;
};

// Function to initialize DataTable with "Load More" and filtering
function initializeDataTableWithLoadMore(tableSelector, customOptions = {}) {
  const tables = document.querySelectorAll(tableSelector);
  if (!tables.length) return;

  tables.forEach((table) => {
    const initialPageLength = parseInt(table.getAttribute('data-row')) || 5;

    // Default DataTable options
    const defaultOptions = {
      paging: true,
      pageLength: initialPageLength,
      lengthChange: false,
      searching: false,
      info: false,
      responsive: false,
      autoWidth: false,
      scrollX: true,
      dom: 't',
      columnDefs: [
        { targets: 3, orderable: false },
        { targets: 4, orderable: false }
      ]
    };

    // Merge with custom options
    const options = { ...defaultOptions, ...customOptions };

    // Initialize DataTable
    const dt = new DataTable(table, options);

    // Find wrapper and buttons
    const wrapper = table.closest('.datatable-wrapper');
    const loadMoreParentBtn = wrapper ? wrapper.querySelector('.load-more-btn') : null;
    const loadMoreBtn = loadMoreParentBtn ? loadMoreParentBtn.querySelector('.datatable__load-more') : null;

    // Debug logs
    console.log(`Table: ${tableSelector}`);
    console.log(`Rows: ${dt.rows().count()}, Initial Length: ${initialPageLength}`);
    console.log('Load More Parent Btn:', loadMoreParentBtn);

    if (loadMoreBtn && loadMoreParentBtn) {
      loadMoreBtn.addEventListener('click', () => {
        const currentLength = dt.page.len();
        const totalRecords = dt.rows().count();
        const newLength = Math.min(currentLength + initialPageLength, totalRecords);

        dt.page.len(newLength).draw('page');
        if (newLength >= totalRecords) {
          console.log(`Hiding .load-more-btn - All rows loaded (${totalRecords})`);
          loadMoreParentBtn.style.display = 'none';
        }
      });

      const rowCount = dt.rows().count();
      if (rowCount <= initialPageLength) {
        console.log(`Hiding .load-more-btn initially - Rows (${rowCount}) <= ${initialPageLength}`);
        loadMoreParentBtn.style.display = 'none';
      }
    } else {
      console.log('Load More buttons not found:', { loadMoreBtn, loadMoreParentBtn });
    }

    // Filtering for Call Logs (if .call-logs-table)
    if (tableSelector === '.call-logs-table') {
      const dropdownItems = document.querySelectorAll('.dropdown__menu div[data-value]');
      if (dropdownItems.length) {
        DataTable.ext.search.push(
          function (settings, data, dataIndex) {
            if (settings.nTable !== table) return true;

            const selectedDays = parseInt(dt.selectedDays || 0);
            if (!selectedDays) return true;

            const dateStr = data[0]; // "Time" column (index 0)
            const dateValue = parseCallLogDate(dateStr); // YYYYMMDDHHMMSS

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const cutoffDate = new Date(today);
            cutoffDate.setDate(today.getDate() - selectedDays);

            const cutoffValue = `${cutoffDate.getFullYear()}${String(cutoffDate.getMonth() + 1).padStart(2, '0')}${String(cutoffDate.getDate()).padStart(2, '0')}000000`;
            return dateValue >= cutoffValue;
          }
        );

        dropdownItems.forEach(item => {
          item.addEventListener('click', () => {
            const value = item.getAttribute('data-value');
            const daysMap = {
              'Last 7 Days': 7,
              'Last 14 Days': 14,
              'Last 30 Days': 30
            };
            dt.selectedDays = daysMap[value] || 0;
            dt.page.len(initialPageLength).draw();

            const filteredCount = dt.rows({ search: 'applied' }).count();
            if (filteredCount <= initialPageLength && loadMoreParentBtn) {
              console.log(`Hiding .load-more-btn after filter - Filtered Rows (${filteredCount}) <= ${initialPageLength}`);
              loadMoreParentBtn.style.display = 'none';
            } else if (loadMoreParentBtn) {
              loadMoreParentBtn.style.display = '';
            }
          });
        });
      }
    }
  });
}

// Initialize tables
initializeDataTableWithLoadMore('.call-logs-table', {
  columnDefs: [
    {
      targets: 0, // "Time" column (index 0)
      render: (data, type) => type === 'sort' || type === 'type' ? parseCallLogDate(data) : data
    },
    { targets: 3, orderable: false },
    { targets: 4, orderable: false }
  ]
});

initializeDataTableWithLoadMore('.ai-voice-table', {
  columnDefs: [
    {
      targets: 2, // Assuming date is in column 3 (index 2) for AI Voices
      render: (data, type) => type === 'sort' || type === 'type' ? parseDateForSorting(data) : data
    },
    { targets: 3, orderable: false }
  ]
});

      
}
