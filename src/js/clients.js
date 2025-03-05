document.addEventListener("DOMContentLoaded", () => {
  // Слайдер включаем только при <=768px
  if (window.innerWidth > 768) return;

  const slider = document.getElementById("mobileSlider");
  const track = document.getElementById("mobileSliderTrack");
  const slides = document.querySelectorAll(".mobile-slide");
  if (!slider || !track || !slides.length) return;

  let currentIndex = 0; // Текущий «экран»
  let slidesPerPage = 1; // Сколько слайдов влезает
  let slideWidth = 0; // Ширина одного слайда
  let totalPages = 1; // Общее число «экранов»
  let currentShift = 0; // Текущее смещение
  let autoSlideTimer; // ID таймера автопрокрутки

  let isDragging = false;
  let startX = 0;
  let prevX = 0;

  function updateSlider() {
    const containerWidth = slider.offsetWidth;
    // получаем реальный gap (column-gap) из CSS
    const style = getComputedStyle(track);
    const rawGap = style.columnGap || "20px";
    const gap = parseFloat(rawGap) || 0;

    // ширина первой карточки (до сужения)
    const originalSlideWidth = slides[0].offsetWidth || 200;

    // вычисляем, сколько влезет без обрезки
    slidesPerPage = Math.floor(
      (containerWidth + gap) / (originalSlideWidth + gap)
    );
    if (slidesPerPage < 1) slidesPerPage = 1;

    // итоговый общий gap на одной «странице»
    const totalGapInOneScreen = gap * (slidesPerPage - 1);

    // ширина одного слайда
    slideWidth = (containerWidth - totalGapInOneScreen) / slidesPerPage;

    // присваиваем ширину
    slides.forEach((slide) => {
      slide.style.width = slideWidth + "px";
    });

    // кол-во «экранов»
    totalPages = Math.ceil(slides.length / slidesPerPage);
    if (currentIndex >= totalPages) currentIndex = totalPages - 1;

    currentShift = -(
      currentIndex *
      (slideWidth * slidesPerPage + totalGapInOneScreen)
    );
    track.style.transform = `translateX(${currentShift}px)`;
  }

  function moveToPage(idx) {
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || "20px") || 0;
    const totalGapInOneScreen = gap * (slidesPerPage - 1);
    const screenWidth = slideWidth * slidesPerPage + totalGapInOneScreen;

    currentShift = -(idx * screenWidth);
    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(${currentShift}px)`;
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      currentIndex++;
      if (currentIndex >= totalPages) {
        currentIndex = 0;
      }
      moveToPage(currentIndex);
    }, 4000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Инициализация
  updateSlider();
  window.addEventListener("resize", updateSlider);

  // Свайпы
  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    prevX = startX;
    track.style.transition = "none";
    stopAutoSlide();
  });
  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - prevX;
    prevX = currentX;
    currentShift += deltaX;
    track.style.transform = `translateX(${currentShift}px)`;
  });
  track.addEventListener("touchend", (e) => {
    isDragging = false;
    track.style.transition = "transform 0.3s ease";

    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || "20") || 0;
    const totalGapInOneScreen = gap * (slidesPerPage - 1);
    const screenWidth = slideWidth * slidesPerPage + totalGapInOneScreen;

    const moved = e.changedTouches[0].clientX - startX;
    const threshold = screenWidth / 4; // 25% экрана

    if (Math.abs(moved) > threshold) {
      if (moved < 0 && currentIndex < totalPages - 1) {
        currentIndex++;
      } else if (moved > 0 && currentIndex > 0) {
        currentIndex--;
      }
    }
    moveToPage(currentIndex);
    startAutoSlide();
  });

  // Запуск автопрокрутки
  startAutoSlide();
});
