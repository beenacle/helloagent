export function themeMode() {

  const themeToggleItems = document.querySelectorAll(".theme-toggle__item");
  const html = document.documentElement;
   
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

}
