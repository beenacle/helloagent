export function sidebar() {

  const sidebar = document.getElementById("sidebar");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const settingsSubmenu = document.getElementById("settingsSubmenu");
  const body = document.body;
   
// Sidebar Collapse
hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("min-w-[260px]");
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

}
