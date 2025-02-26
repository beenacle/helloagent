export function faqs() {

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

}