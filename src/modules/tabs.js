export function tabs() {

  const tabs = document.querySelectorAll(".tabs a");
  const tabContents = document.querySelectorAll(".tab-pane");

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

}
