const sidebar = document.getElementById("sidebar");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsSubmenu = document.getElementById("settingsSubmenu");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    // const sunIcon = document.getElementById("sunIcon");
    // const moonIcon = document.getElementById("moonIcon");

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
    // themeToggleBtn.addEventListener("click", () => {
    //   document.documentElement.classList.toggle("dark");

    //   sunIcon.classList.toggle("hidden");
    //   moonIcon.classList.toggle("hidden");
    // });