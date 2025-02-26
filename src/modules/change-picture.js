export function changePicture() {

  const changePictureBtn = document.getElementById("changePicture");

  if (changePictureBtn) {
    changePictureBtn.addEventListener("click", function () {
      document.querySelector(".change-picture-popup").classList.remove("hidden");
      document.querySelector(".popup-overlay").classList.remove("hidden");
    });

    document.querySelector(".popup-overlay").addEventListener("click", closePopup);
    document.querySelector(".close-popup").addEventListener("click", closePopup);

  }

  function closePopup() {
    document.querySelector(".change-picture-popup").classList.add("hidden");
    document.querySelector(".popup-overlay").classList.add("hidden");
  }

}
