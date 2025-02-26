export function dropdown() {
  
  const dropdownButton = document.querySelector(".dropdown__button");
  const dropdownMenu = document.querySelector(".dropdown__menu");
 
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

}
