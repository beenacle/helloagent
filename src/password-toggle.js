document.addEventListener("DOMContentLoaded", function () {
    // Find all toggle-password elements
    const toggleButtons = document.querySelectorAll(".toggle-password");
  
    if (toggleButtons.length > 0) {
      toggleButtons.forEach((button) => {
        const input = button.closest(".relative").querySelector("input[type='password'], input[type='text']");
        const eyeIcon = button.querySelector(".eye-icon");
        const eyeSlashIcon = button.querySelector(".eye-slash-icon");
  
        // Ensure all elements exist
        if (!input || !eyeIcon || !eyeSlashIcon) return;
  
        // Toggle visibility on click
        button.addEventListener("click", () => {
          if (input.type === "password") {
            input.type = "text";           // Show password
            eyeIcon.classList.add("hidden");
            eyeSlashIcon.classList.remove("hidden");
          } else {
            input.type = "password";       // Hide password
            eyeIcon.classList.remove("hidden");
            eyeSlashIcon.classList.add("hidden");
          }
        });
      });
    }
  });