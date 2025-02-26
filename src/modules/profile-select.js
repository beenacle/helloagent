export function profileSelect() {

  const selectButtons = document.querySelectorAll(".profile-card__select");

  if (selectButtons.length > 0) {
      selectButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const profileCard = button.closest(".profile-card");
          if (profileCard) {
            profileCard.classList.toggle("profile-card--selected");
            profileCard.classList.toggle("bg-primary");
            profileCard.classList.toggle("text-white");
            button.classList.toggle("bg-secondary");
  
            const profileSelectNext = document.querySelector('.profile-select-next');
  
            // Show the button when at least one card is selected
            profileSelectNext.classList.remove('opacity-0');
  
            // If no cards are selected, hide it again
            if (document.querySelectorAll('.profile-card--selected').length === 0) {
              profileSelectNext.classList.add('opacity-0');
            }
          }
        });
      });
    }

}