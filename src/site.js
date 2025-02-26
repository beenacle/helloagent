import WaveSurfer from 'wavesurfer.js';
import DataTable from 'datatables.net';
import IMask from 'imask';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-responsive';

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsSubmenu = document.getElementById("settingsSubmenu");
  const sidebarArrow = settingsBtn.querySelector(".sidebar-arrow");
  const themeToggleItems = document.querySelectorAll(".theme-toggle__item");
  const body = document.body;
  const html = document.documentElement;
  const dropdownButton = document.querySelector(".dropdown__button");
  const dropdownMenu = document.querySelector(".dropdown__menu");
  const changePictureBtn = document.getElementById("changePicture");
  const waveSurferPlayers = document.querySelectorAll(".player-box");
  const basicPlayers = document.querySelectorAll(".play-recording-btn");
  const waveSurfers = [];
  const audioElements = [];
  const selectButtons = document.querySelectorAll(".profile-card__select");
  const navLinks = document.querySelectorAll('nav a[href]');
  const tabs = document.querySelectorAll(".tabs a");
  const tabContents = document.querySelectorAll(".tab-pane");
  const addPaymentBtn = document.querySelector('.add-payment-method-btn');
  const newPaymentMethod = document.querySelector('.add-new-payment-method');

  // Sidebar Collapse
  hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.toggle("w-64");
    sidebar.classList.toggle("w-16");
    body.classList.toggle("sidebar--collapsed");

    // Hide/show text labels
    document.querySelectorAll(".hide-on-collapse").forEach(el => el.classList.toggle("hidden"));
  });

  // Toggle Settings Submenu
  settingsBtn.addEventListener("click", () => {
    settingsSubmenu.classList.toggle("hidden");
    sidebarArrow.classList.toggle("rotate-180");
  });

  // Toggle Sidebar Visibility
  document.querySelectorAll(".sidebar-toggle").forEach(el => {
    el.addEventListener("click", () => sidebar.classList.toggle("hidden"));
  });



  // Filter Dropdown
  if (dropdownButton && dropdownMenu) {
    const dropdownArrow = dropdownButton.querySelector(".dropdown__arrow");

    if (dropdownArrow) {
      // Toggle dropdown and arrow on button click
      dropdownButton.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle("hidden");
        dropdownArrow.classList.toggle("rotate-180");
      });

      // Close dropdown when clicking on an item
      dropdownMenu.querySelectorAll(".cursor-pointer").forEach(item => {
        item.addEventListener("click", () => {
          dropdownMenu.classList.add("hidden");
          dropdownArrow.classList.remove("rotate-180");
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (event) => {
        if (!dropdownMenu.contains(event.target) && !dropdownButton.contains(event.target)) {
          dropdownMenu.classList.add("hidden");
          dropdownArrow.classList.remove("rotate-180");
        }
      });
    } else {
      console.warn("Dropdown arrow not found in button");
      // Fallback: just toggle menu without arrow
      dropdownButton.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle("hidden");
      });
    }
  }


  // Apply Theme
  const applyTheme = mode => {
    html.classList.remove("light", "dark");
    html.classList.add(mode);
    localStorage.setItem("theme", mode);

    themeToggleItems.forEach(item => {
      item.classList.toggle("theme-toggle__active", item.getAttribute("data-toggle") === mode);
      item.classList.toggle("shadow-lg", item.getAttribute("data-toggle") === mode);
      item.classList.toggle("bg-secondary", item.getAttribute("data-toggle") === mode);
    });
  };

  // Load stored theme
  applyTheme(localStorage.getItem("theme") || "light");

  // Theme Toggle Event Listeners
  themeToggleItems.forEach(item => {
    item.addEventListener("click", () => applyTheme(item.getAttribute("data-toggle")));
  });


  // Change Picture Popup
  if (changePictureBtn) {
    changePictureBtn.addEventListener("click", function () {
      document.querySelector(".change-picture-popup").classList.remove("hidden");
      document.querySelector(".popup-overlay").classList.remove("hidden");
    });

    document.querySelector(".popup-overlay").addEventListener("click", closePopup);
    document.querySelector(".close-popup").addEventListener("click", closePopup);

  }

  function closePopup() {
    document.querySelector(".change-picture-popup").classList.add("hidden");
    document.querySelector(".popup-overlay").classList.add("hidden");
  }


  // FAQ
  document.querySelectorAll(".faq-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      // Find the associated content (next sibling)
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector(".faq-icon i");

      // Toggle the content visibility
      content.classList.toggle("hidden");

      // Toggle the active class on the button
      toggle.classList.toggle("faq-toggle--active");

    });
  });


  // WaveSurfer Players
  if (waveSurferPlayers.length > 0) {
    waveSurferPlayers.forEach((player) => {
      const playButton = player.querySelector(".play-icon");
      const waveformContainer = player.querySelector(".waveform");
      const playIcon = player.querySelector(".play-btn");
      const pauseIcon = player.querySelector(".pause-btn");
      const audio = player.querySelector("audio");

      if (!playButton || !waveformContainer || !playIcon || !pauseIcon || !audio) return;

      const waveSurfer = WaveSurfer.create({
        container: waveformContainer,
        waveColor: "#0A574E",
        progressColor: "#14B8A6",
        height: 30,
        responsive: true,
        url: audio.src,
        barWidth: 1,
        barGap: 1,
      });

      waveSurfers.push({
        instance: waveSurfer,
        playIcon: playIcon,
        pauseIcon: pauseIcon,
      });

      playButton.addEventListener("click", () => {
        if (waveSurfer.isPlaying()) {
          waveSurfer.pause();
          playIcon.classList.remove("hidden");
          pauseIcon.classList.add("hidden");
        } else {
          // Pause all other WaveSurfer instances
          waveSurfers.forEach((ws) => {
            if (ws.instance !== waveSurfer && ws.instance.isPlaying()) {
              ws.instance.pause();
              ws.playIcon.classList.remove("hidden");
              ws.pauseIcon.classList.add("hidden");
            }
          });

          // Pause all native <audio> elements
          audioElements.forEach((ae) => {
            if (!ae.element.paused) {
              ae.element.pause();
              ae.playIcon.classList.remove("hidden");
              ae.pauseIcon.classList.add("hidden");
            }
          });

          waveSurfer.play();
          playIcon.classList.add("hidden");
          pauseIcon.classList.remove("hidden");
        }
      });

      waveSurfer.on("finish", () => {
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
      });
    });
  }

  // Basic Audio Players
  if (basicPlayers.length > 0) {
    basicPlayers.forEach((button) => {
      const audio = button.querySelector("audio");
      const playIcon = button.querySelector(".play-icon");
      const pauseIcon = button.querySelector(".pause-icon");

      if (!audio || !playIcon || !pauseIcon) return;

      audioElements.push({
        element: audio,
        playIcon: playIcon,
        pauseIcon: pauseIcon,
      });

      button.addEventListener("click", () => {
        if (!audio.paused) {
          audio.pause();
          playIcon.classList.remove("hidden");
          pauseIcon.classList.add("hidden");
        } else {
          // Pause all WaveSurfer instances
          waveSurfers.forEach((ws) => {
            if (ws.instance.isPlaying()) {
              ws.instance.pause();
              ws.playIcon.classList.remove("hidden");
              ws.pauseIcon.classList.add("hidden");
            }
          });

          // Pause all other native <audio> elements
          audioElements.forEach((ae) => {
            if (ae.element !== audio && !ae.element.paused) {
              ae.element.pause();
              ae.playIcon.classList.remove("hidden");
              ae.pauseIcon.classList.add("hidden");
            }
          });

          audio.play();
          playIcon.classList.add("hidden");
          pauseIcon.classList.remove("hidden");
        }
      });

      audio.addEventListener("ended", () => {
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
      });
    });
  }


  // Profile Card Select
  if (selectButtons.length > 0) {
    selectButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const profileCard = button.closest(".profile-card");
        if (profileCard) {
          profileCard.classList.toggle("profile-card--selected");
          profileCard.classList.toggle("bg-primary");
          profileCard.classList.toggle("text-white");
          button.classList.toggle("bg-secondary");

          const profileSelectNext = document.querySelector('.profile-select-next');

          // Show the button when at least one card is selected
          profileSelectNext.classList.remove('opacity-0');

          // If no cards are selected, hide it again
          if (document.querySelectorAll('.profile-card--selected').length === 0) {
            profileSelectNext.classList.add('opacity-0');
          }
        }
      });
    });
  }

  // Loop through each nav link and add active class if it matches the current page
  let currentPage = window.location.pathname.split('/').pop() || 'index';

  // Remove `.html` if present and normalize
  currentPage = currentPage.replace(/\.html$/, '').replace(/^\//, '').toLowerCase();

  navLinks.forEach(link => {
    let linkPage = link.getAttribute('href') || '';

    // Normalize link (remove `.html`, leading slash, and lowercase)
    linkPage = linkPage.replace(/\.html$/, '').replace(/^\//, '').toLowerCase();

    if (linkPage === currentPage) {
      link.classList.add('bg-gray-100');

      // Expand submenu if applicable
      const submenu = link.closest('#settingsSubmenu');
      if (submenu) {
        document.getElementById('settingsBtn').classList.add('bg-gray-100');
        submenu.classList.remove('hidden');
        sidebarArrow.classList.toggle("rotate-180");
      }
    }
  });  


  // Tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active classes from all tabs
      tabs.forEach((t) => {
        t.classList.remove("border-primary", "text-primary");
        t.classList.add("border-transparent", "text-gray-500");
      });

      // Add active styles to the clicked tab
      tab.classList.remove("border-transparent", "text-gray-500");
      tab.classList.add("border-primary", "text-primary");

      // Hide all tab content
      tabContents.forEach((content) => content.classList.add("hidden"));

      // Show the corresponding tab content
      const target = document.querySelector(tab.getAttribute("href"));
      if (target) target.classList.remove("hidden");
    });
  });

  // Input Masks
  const masks = [{
      selector: '#card-number',
      mask: '0000-0000-0000-0000'
    },
    {
      selector: '#card-expiry',
      mask: '00/00'
    },
    {
      selector: '#card-cvv',
      mask: '0000'
    }
  ];

  masks.forEach(({
    selector,
    mask
  }) => {
    const element = document.querySelector(selector);
    if (element) {
      IMask(element, {
        mask
      });
    }
  });


  // Add Payment Method
  if (addPaymentBtn && newPaymentMethod) {
    addPaymentBtn.addEventListener("click", function () {
      addPaymentBtn.classList.add('hidden');
      newPaymentMethod.classList.remove('hidden');
    });
  }


  // Check if there are any .table elements for DataTable initialization
if (document.querySelector('.table')) {
  document.querySelectorAll('.table').forEach((table) => {
    new DataTable(table, {
      paging: false,
      searching: false,
      info: false,
      lengthChange: false,
      responsive: false, // Disable auto-hiding of columns
      autoWidth: false, // Let columns adjust naturally
      scrollX: true, // Enable horizontal scrolling instead of hiding columns
    });
  });
}


});


// Check if there are any .datatable-wrapper elements for "Load More" functionality
if (document.querySelector('.datatable-wrapper')) {
  document.querySelectorAll('.datatable-wrapper').forEach((wrapper) => {
    const table = wrapper.querySelector('.table');
    const loadMoreLink = wrapper.querySelector('.datatable__load-more');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    
    // Ensure all required elements exist within this wrapper
    if (!table || !loadMoreLink || !tbody || !rows.length) {
      console.warn('Missing required elements in a datatable-wrapper:', wrapper);
      return; // Skip this wrapper if something is missing
    }

    // Get the initial number of rows to display from data-row attribute
    const initialRows = parseInt(table.getAttribute('data-row')) || 10; // Default to 10 if not set
    // Get the number of rows to load more from data-load attribute
    const loadMoreCount = parseInt(loadMoreLink.getAttribute('data-load')) || 1; // Default to 1 if not set

    let visibleRows = initialRows;

    // Initially hide all rows
    rows.forEach((row, index) => {
      if (index < initialRows) {
        row.style.display = ''; // Show initial rows
      } else {
        row.style.display = 'none'; // Hide remaining rows
      }
    });

    // Check if there are more rows to load and show/hide the "Load More" button
    function updateLoadMoreVisibility() {
      if (visibleRows >= rows.length) {
        loadMoreLink.parentElement.style.display = 'none'; // Hide if no more rows
      } else {
        loadMoreLink.parentElement.style.display = ''; // Show if more rows available
      }
    }

    // Initial check
    updateLoadMoreVisibility();

    // Add click event to "Load More" link specific to this table
    loadMoreLink.addEventListener('click', () => {
      const nextRowsLimit = visibleRows + loadMoreCount;
      
      // Show the next set of rows
      rows.forEach((row, index) => {
        if (index >= visibleRows && index < nextRowsLimit) {
          row.style.display = '';
        }
      });

      // Update the count of visible rows
      visibleRows = Math.min(nextRowsLimit, rows.length);

      // Update the visibility of the "Load More" link
      updateLoadMoreVisibility();
    });
  });
}