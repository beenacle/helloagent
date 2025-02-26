import DataTable from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-responsive';

export function initDataTable() {
   
    function parseDateForSorting(dateStr) {
        if (!dateStr || typeof dateStr !== 'string' || !/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(dateStr)) {
          return '00000000'; // Return a sentinel value for invalid/empty dates
        }
        var parts = dateStr.split('/');
        var month = parts[0].padStart(2, '0');
        var day = parts[1].padStart(2, '0');
        var year = parts[2].padStart(2, '0');
        year = year.length === 2 ? '20' + year : year; // Assume 20XX for YY
        return year + month + day; // Return YYYYMMDD
      }
    
      // Register custom type detection and ordering for MM/DD/YY dates
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
    
    
      // Function to initialize DataTable and handle "Load More" for any table
      function initializeDataTableWithLoadMore(tableSelector, customOptions = {}) {
        const tables = document.querySelectorAll(tableSelector);
        if (!tables.length) return; // Exit if no tables found
    
        tables.forEach((table) => {
          // Get initial page length from data-row, default to 5
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
            columnDefs: [{
                targets: 3,
                orderable: false
              },
              {
                targets: 4,
                orderable: false
              }
            ]
          };
    
          // Merge with custom options
          const options = {
            ...defaultOptions,
            ...customOptions
          };
    
          // Initialize DataTable
          const dt = new DataTable(table, options);
    
          // Find the wrapper and parent button
          const wrapper = table.closest('.datatable-wrapper');
          const loadMoreParentBtn = wrapper ? wrapper.querySelector('.load-more-btn') : null;
    
          // Debug logs
          console.log(`Table: ${tableSelector}`);
          console.log(`Rows: ${dt.rows().count()}, Initial Length: ${initialPageLength}`);
          console.log('Load More Parent Btn:', loadMoreParentBtn);
    
          if (loadMoreParentBtn) {
            // Handle "Load More" click (via datatable__load-more inside .load-more-btn)
            const loadMoreBtn = loadMoreParentBtn.querySelector('.datatable__load-more');
            if (loadMoreBtn) {
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
            } else {
              console.log('Inner .datatable__load-more not found inside .load-more-btn');
            }
    
            // Initially hide if all rows are visible
            const rowCount = dt.rows().count();
            if (rowCount <= initialPageLength) {
              console.log(`Hiding .load-more-btn initially - Rows (${rowCount}) <= ${initialPageLength}`);
              loadMoreParentBtn.style.display = 'none';
            }
          } else {
            console.log(`.load-more-btn not found in wrapper for ${tableSelector}`);
          }
        });
      }
    
      // Custom date parsing for AI Voices (if needed)
      function parseDateForSorting(data) {
        const [day, month, year] = data.split('/');
        return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
      }
    
      // Initialize tables
      initializeDataTableWithLoadMore('.call-logs-table');
      initializeDataTableWithLoadMore('.ai-voice-table', {
        columnDefs: [{
            targets: 2,
            render: (data, type) => type === 'sort' || type === 'type' ? parseDateForSorting(data) : data
          },
          {
            targets: 3,
            orderable: false
          }
        ]
      });

      
}
