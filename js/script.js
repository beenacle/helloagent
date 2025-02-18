const sidebar = document.getElementById("sidebar");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsSubmenu = document.getElementById("settingsSubmenu");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

// 1. Sidebar Collapse
hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("w-64");
  sidebar.classList.toggle("w-16");

  // Hide/show text labels
  document.querySelectorAll(".sidebar-text").forEach((el) => {
    el.classList.toggle("hidden");
  });

  // Also hide submenus if you want them collapsed in minimal view
  // settingsSubmenu.classList.add("hidden");
});

// 2. Settings Dropdown
settingsBtn.addEventListener("click", () => {
  settingsSubmenu.classList.toggle("hidden");
});

// 3. Dark/Light Mode Toggle
themeToggleBtn.addEventListener("click", () => {
  // Toggle 'dark' class on <html>
  document.documentElement.classList.toggle("dark");

  // Switch icon visibility
  sunIcon.classList.toggle("hidden");
  moonIcon.classList.toggle("hidden");
});


// Toggle Password Script 

    function togglePassword(fieldId, el) {
        const input = document.getElementById(fieldId);
        if (input.type === 'password') {
            input.type = 'text';
            el.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M13.875 18.825a4.992 4.992 0 01-1.875.375c-4.478 0-8.268-2.943-9.542-7
      1.274-4.057 5.064-7 9.542-7 1.305 0 2.549.254 3.688.71" />
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M2.458 12C3.732 7.943 7.522 5 12 5
      c1.305 0 2.549.254 3.688.71M18.542 7C19.816 7 20.606 7 21 7
      M19.354 19.354l-14-14" />
  </svg>`;
        } else {
            input.type = 'password';
            el.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.458 12C3.732 7.943 7.522 5 12 5
      c4.478 0 8.268 2.943 9.542 7
      -1.274 4.057-5.064 7-9.542 7
      -4.478 0-8.268-2.943-9.542-7z"
    />
  </svg>`;
        }
    }
