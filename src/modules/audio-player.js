import WaveSurfer from 'wavesurfer.js';

export function audioPlayer() {

  const waveSurferPlayers = document.querySelectorAll(".player-box");
  const basicPlayers = document.querySelectorAll(".play-recording-btn");
  const waveSurfers = [];
  const audioElements = [];

  if (waveSurferPlayers.length > 0) {
    waveSurferPlayers.forEach((player) => {
      const playButton = player.querySelector(".play-icon");
      const waveformContainer = player.querySelector(".waveform");
      const playIcon = player.querySelector(".play-btn");
      const pauseIcon = player.querySelector(".pause-btn");
      const audio = player.querySelector("audio");

      if (!playButton || !waveformContainer || !playIcon || !pauseIcon || !audio) return;

      const waveSurfer = WaveSurfer.create({
        container: waveformContainer,
        waveColor: "#0A574E",
        progressColor: "#14B8A6",
        height: 30,
        responsive: true,
        url: audio.src,
        barWidth: 1,
        barGap: 1,
      });

      waveSurfers.push({
        instance: waveSurfer,
        playIcon: playIcon,
        pauseIcon: pauseIcon,
      });

      playButton.addEventListener("click", () => {
        if (waveSurfer.isPlaying()) {
          waveSurfer.pause();
          playIcon.classList.remove("hidden");
          pauseIcon.classList.add("hidden");
        } else {
          // Pause all other WaveSurfer instances
          waveSurfers.forEach((ws) => {
            if (ws.instance !== waveSurfer && ws.instance.isPlaying()) {
              ws.instance.pause();
              ws.playIcon.classList.remove("hidden");
              ws.pauseIcon.classList.add("hidden");
            }
          });

          // Pause all native <audio> elements
          audioElements.forEach((ae) => {
            if (!ae.element.paused) {
              ae.element.pause();
              ae.playIcon.classList.remove("hidden");
              ae.pauseIcon.classList.add("hidden");
            }
          });

          waveSurfer.play();
          playIcon.classList.add("hidden");
          pauseIcon.classList.remove("hidden");
        }
      });

      waveSurfer.on("finish", () => {
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
      });
    });
  }

  // Basic Audio Players
  if (basicPlayers.length > 0) {
    basicPlayers.forEach((button) => {
      const audio = button.querySelector("audio");
      const playIcon = button.querySelector(".play-icon");
      const pauseIcon = button.querySelector(".pause-icon");

      if (!audio || !playIcon || !pauseIcon) return;

      audioElements.push({
        element: audio,
        playIcon: playIcon,
        pauseIcon: pauseIcon,
      });

      button.addEventListener("click", () => {
        if (!audio.paused) {
          audio.pause();
          playIcon.classList.remove("hidden");
          pauseIcon.classList.add("hidden");
        } else {
          // Pause all WaveSurfer instances
          waveSurfers.forEach((ws) => {
            if (ws.instance.isPlaying()) {
              ws.instance.pause();
              ws.playIcon.classList.remove("hidden");
              ws.pauseIcon.classList.add("hidden");
            }
          });

          // Pause all other native <audio> elements
          audioElements.forEach((ae) => {
            if (ae.element !== audio && !ae.element.paused) {
              ae.element.pause();
              ae.playIcon.classList.remove("hidden");
              ae.pauseIcon.classList.add("hidden");
            }
          });

          audio.play();
          playIcon.classList.add("hidden");
          pauseIcon.classList.remove("hidden");
        }
      });

      audio.addEventListener("ended", () => {
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
      });
    });
  }

}