// Импорт AOS (если установлен через npm)
import AOS from "aos";
import "aos/dist/aos.css";

// 🚀 Функция загрузки HTML-файлов (Header & Footer)
async function loadComponent(selector, file) {
  const element = document.querySelector(selector);
  if (element) {
    try {
      const response = await fetch(file);
      if (response.ok) {
        element.innerHTML = await response.text();
        console.log(`✅ Загружен компонент: ${file}`);

        // Если это хедер, повторно инициализируем мобильное меню
        if (selector === "#header") {
          initMobileMenu();
        }
      } else {
        console.error(
          `❌ Ошибка загрузки: ${file}, статус: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`❌ Ошибка запроса: ${file}`, error);
    }
  }
}

// 📌 Инициализация AOS и загрузка компонентов при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true, // Запуск анимации один раз
    offset: 100, // Смещение при появлении
    duration: 800, // Длительность анимации (мс)
  });

  // Загружаем header и footer
  loadComponent("#header", "/components/header.html");
  loadComponent("#footer", "/components/footer.html");
});

// 🎯 Функция для инициализации мобильного меню
function initMobileMenu() {
  const burgerIcon = document.querySelector(".icon-menu-mobile");
  const mobileMenu = document.querySelector(".main-menu");
  const closeMenuBtn = document.querySelector(".close-menu");

  if (!burgerIcon || !mobileMenu || !closeMenuBtn) {
    console.error("❌ Ошибка: Один из элементов меню не найден!");
    return;
  }

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("opened");
    burgerIcon.classList.toggle("active");

    // Блокируем прокрутку при открытом меню
    document.body.style.overflow = mobileMenu.classList.contains("opened")
      ? "hidden"
      : "";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("opened");
    burgerIcon.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Добавляем обработчики событий
  burgerIcon.addEventListener("click", toggleMobileMenu);
  closeMenuBtn.addEventListener("click", closeMobileMenu);

  // Закрываем мобильное меню при клике на любую ссылку
  document.querySelectorAll(".mobile-nav li a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  console.log("✅ Мобильное меню инициализировано");
}
