import audioFile from '../audio/1.mp3';

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsSubmenu = document.getElementById("settingsSubmenu");
  const themeToggleItems = document.querySelectorAll(".theme-toggle__item");
  const body = document.body;
  const html = document.documentElement;

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

    const dropdownButton = document.querySelector(".filter-dropdown__button");
    const dropdownMenu = document.querySelector(".filter-dropdown__menu");

    // Only run if the dropdown exists on the page
    if (dropdownButton && dropdownMenu) {
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
    }


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


  // Audio Player
    const players = document.querySelectorAll(".player-box");

    if (players.length > 0) {
      players.forEach((player) => {
        const playButton = player.querySelector(".play-icon");
        const waveformContainer = player.querySelector(".waveform");
        const playIcon = player.querySelector(".play-btn");
        const pauseIcon = player.querySelector(".pause-btn");

        // Ensure all elements exist before proceeding
        if (!playButton || !waveformContainer || !playIcon || !pauseIcon) return;

        // Initialize WaveSurfer
        const waveSurfer = WaveSurfer.create({
          container: waveformContainer,
          waveColor: "#0A574E",
          progressColor: "#14B8A6",
          height: 30,
          responsive: true,
          url: audioFile,
        });

        let isPlaying = false;

        // Play/Pause toggle
        playButton.addEventListener("click", () => {
          if (isPlaying) {
            waveSurfer.pause();
            playIcon.classList.remove("hidden");
            pauseIcon.classList.add("hidden");
          } else {
            waveSurfer.play();
            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");
          }
          isPlaying = !isPlaying;
        });

        // Reset to play icon when audio finishes
        waveSurfer.on("finish", () => {
          isPlaying = false;
          playIcon.classList.remove("hidden");
          pauseIcon.classList.add("hidden");
        });
      });
    }


    // Change Picture Popup
    const changePictureBtn = document.getElementById("changePicture");

    // Check if changePicture exists
    if (changePictureBtn) {
      changePictureBtn.addEventListener("click", function() {
        document.querySelector(".change-picture-popup").classList.remove("hidden");
        document.querySelector(".popup-overlay").classList.remove("hidden");
      });

      document.querySelector(".popup-overlay").addEventListener("click", function() {
        document.querySelector(".change-picture-popup").classList.add("hidden");
        document.querySelector(".popup-overlay").classList.add("hidden");
      });
    }


    // FAQ
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


    // Play Recording

      const playButtons = document.querySelectorAll(".play-recording-btn");

      // Only run if at least one .play-recording-btn exists
      if (playButtons.length > 0) {
        playButtons.forEach((button) => {
          const audio = button.querySelector("audio");
          const playIcon = button.querySelector(".play-icon");
          const pauseIcon = button.querySelector(".pause-icon");
          let isPlaying = false;

          // Ensure all required elements exist within the button
          if (!audio || !playIcon || !pauseIcon) return;

          // Toggle play/pause on click
          button.addEventListener("click", () => {
            if (isPlaying) {
              audio.pause();
              playIcon.classList.remove("hidden");
              pauseIcon.classList.add("hidden");
            } else {
              audio.play();
              playIcon.classList.add("hidden");
              pauseIcon.classList.remove("hidden");
            }
            isPlaying = !isPlaying;
          });

          // Reset to play icon when audio finishes
          audio.addEventListener("ended", () => {
            isPlaying = false;
            playIcon.classList.remove("hidden");
            pauseIcon.classList.add("hidden");
          });
        });
      }


});
