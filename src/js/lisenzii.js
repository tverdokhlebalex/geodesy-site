document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".licenses__gallery");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let index = 0;
  const slideWidth = slides[0].offsetWidth + 20; // ширина слайда + gap

  function moveSlider(direction) {
    if (direction === "next") {
      index = (index + 1) % slides.length;
    } else {
      index = index === 0 ? slides.length - 1 : index - 1;
    }
    gallery.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  prevBtn.addEventListener("click", () => moveSlider("prev"));
  nextBtn.addEventListener("click", () => moveSlider("next"));

  // Автоматическая прокрутка
  setInterval(() => moveSlider("next"), 4000);

  // Модальное окно (просмотр)
  const modal = document.querySelector(".modal-overlay");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.querySelector(".modal-close");

  document.querySelectorAll(".license-img").forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImg.src = this.src;
    });
  });

  closeModal.addEventListener("click", () => (modal.style.display = "none"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
