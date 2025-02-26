export function settingsMenu() {
    const settingsBtn = document.getElementById("settingsBtn");
    const sidebarArrow = settingsBtn.querySelector(".sidebar-arrow");
    const navLinks = document.querySelectorAll('nav a[href]');


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

}