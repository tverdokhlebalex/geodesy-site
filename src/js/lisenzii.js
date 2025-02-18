document.addEventListener("DOMContentLoaded", function () {
  /****************************************
   * 1) SWIPER СЛАЙДЕР
   ****************************************/
  var swiper = new Swiper(".licenses__slider", {
    loop: true, // Зацикленный режим
    slidesPerView: 1, // Количество видимых слайдов
    spaceBetween: 20, // Отступ между слайдами
    autoplay: {
      delay: 4000, // Автопрокрутка каждые 4 секунды
      disableOnInteraction: false, // Авторабота даже после взаимодействия
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1, // 1 слайд на мобильных
      },
      1024: {
        slidesPerView: 2, // 2 слайда на планшетах
      },
    },
  });

  /****************************************
   * 2) МОДАЛЬНОЕ ОКНО ДЛЯ ЛИЦЕНЗИЙ
   ****************************************/
  const licenseModal = document.getElementById("licenseModal");
  const licenseModalImg = document.getElementById("licenseModalImg");
  const licenseModalClose = document.getElementById("licenseModalClose");

  document.querySelectorAll(".license-img").forEach((img) => {
    img.addEventListener("click", function () {
      licenseModal.classList.add("active");
      licenseModalImg.src = this.src;
    });
  });

  licenseModalClose.addEventListener("click", () => {
    licenseModal.classList.remove("active");
  });

  licenseModal.addEventListener("click", (e) => {
    if (e.target === licenseModal) {
      licenseModal.classList.remove("active");
    }
  });
});
