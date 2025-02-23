document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsSubmenu = document.getElementById("settingsSubmenu");
  const themeToggleItems = document.querySelectorAll(".theme-toggle__item");
  const body = document.body;
  const html = document.documentElement;
  const dropdownButton = document.querySelector(".filter-dropdown__button");
  const dropdownMenu = document.querySelector(".filter-dropdown__menu");

  // Sidebar Collapse
  hamburgerBtn.addEventListener("click", () => {
      sidebar.classList.toggle("w-64");
      sidebar.classList.toggle("w-16");
      body.classList.toggle("sidebar--collapsed");

      // Hide/show text labels
      document.querySelectorAll(".hide-on-collapse").forEach(el => el.classList.toggle("hidden"));
  });

  // Toggle Settings Submenu
  settingsBtn.addEventListener("click", () => settingsSubmenu.classList.toggle("hidden"));

  // Toggle Sidebar Visibility
  document.querySelectorAll(".sidebar-toggle").forEach(el => {
      el.addEventListener("click", () => sidebar.classList.toggle("hidden"));
  });

  // Toggle dropdown on button click
  dropdownButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevents the event from bubbling to document
      dropdownMenu.classList.toggle("hidden");
  });

  // Close dropdown when clicking on an item
  dropdownMenu.querySelectorAll(".cursor-pointer").forEach(item => {
      item.addEventListener("click", () => {
          dropdownMenu.classList.add("hidden");
      });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
      if (!dropdownMenu.contains(event.target) && !dropdownButton.contains(event.target)) {
          dropdownMenu.classList.add("hidden");
      }
  });

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
});
