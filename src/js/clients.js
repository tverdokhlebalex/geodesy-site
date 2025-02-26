document.addEventListener("DOMContentLoaded", function () {
  // 1) Проверяем, что действительно <768, чтобы включить мобильный слайдер
  if (window.innerWidth <= 768) {
    const track = document.querySelector(".mobile-slider__track");
    const slides = document.querySelectorAll(".mobile-slide");
    const container = document.querySelector(".mobile-slider");

    // Если нет слайдов или нет контейнера, выходим
    if (!slides.length || !container) return;

    let currentPage = 0;

    // 2) Вычисляем slidesPerPage (сколько карточек влезает)
    //  - ширина контейнера
    const containerWidth = container.offsetWidth;
    //  - ширина одной карточки (предположим, все одинаковые)
    const firstSlideWidth = slides[0].offsetWidth;

    //  - сколько карточек умещается целиком в контейнер
    const slidesPerPage = Math.floor(containerWidth / firstSlideWidth) || 1;

    //  - кол-во "страниц"
    const totalPages = Math.ceil(slides.length / slidesPerPage);

    // 3) Функция листания
    function nextPage() {
      currentPage++;
      if (currentPage >= totalPages) {
        currentPage = 0; // зацикливаем
      }
      // Сколько пикселей на 1 слайд
      const shiftX = firstSlideWidth * slidesPerPage + slidesPerPage * 20;
      /* 
           "20" — это gap (в пикселях), 
           если используете другое значение, меняйте
           Можно точнее вычислить, если получать
           const gap = parseInt(getComputedStyle(track).columnGap, 10) || 0;
           Но здесь упрощённый подход.
        */
      track.style.transform = `translateX(-${currentPage * shiftX}px)`;
    }

    // 4) Автопрокрутка (каждые 3 секунды)
    setInterval(nextPage, 3000);
  }
});
