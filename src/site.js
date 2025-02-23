const sidebar = document.getElementById("sidebar");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsSubmenu = document.getElementById("settingsSubmenu");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const menuToggle = document.getElementById("menuToggle");
    // const sunIcon = document.getElementById("sunIcon");
    // const moonIcon = document.getElementById("moonIcon");

    // 1. Sidebar Collapse
    hamburgerBtn.addEventListener("click", () => {
      sidebar.classList.toggle("w-64");
      sidebar.classList.toggle("w-16");
      document.querySelector('body').classList.toggle("sidebar--collapsed");

      // Hide/show text labels
      document.querySelectorAll(".hide-on-collapse").forEach((el) => {
        el.classList.toggle("hidden");
      });

    });


    // 2. Settings Dropdown
    settingsBtn.addEventListener("click", () => {
      settingsSubmenu.classList.toggle("hidden");
    });

    // menuToggle.addEventListener("click", () => {
    //   sidebar.classList.toggle("hidden");
    // });

    document.querySelectorAll(".sidebar-toggle").forEach((el) => {
      el.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
      });
    });

    // 3. Dark/Light Mode Toggle
    // themeToggleBtn.addEventListener("click", () => {
    //   document.documentElement.classList.toggle("dark");

    //   sunIcon.classList.toggle("hidden");
    //   moonIcon.classList.toggle("hidden");
    // });


    document.querySelector('.filter-dropdown__button').addEventListener('click', function(){
      document.querySelector('.filter-dropdown__menu').classList.toggle("hidden");
    });