// 📌 Импортируем AOS (анимация) - теперь локально через npm
import AOS from "aos";
import "aos/dist/aos.css";

// 📌 Импортируем функцию отправки заявок в Telegram
import { sendTelegramMessage } from "./telegram-bot.js";

// 📌 Определяем базовый путь на основе конфигурации Vite
// import.meta.env.BASE_URL учитывает base из vite.config.js и работает и локально, и на проде
const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

// 🚀 Функция загрузки HTML-файлов (Header & Footer)
async function loadComponent(selector, file) {
  const element = document.querySelector(selector);
  if (!element) return;

  try {
    const response = await fetch(`${basePath}${file}`);
    if (!response.ok) throw new Error(`Ошибка загрузки: ${file}`);

    element.innerHTML = await response.text();
    console.log(`✅ Загружен компонент: ${file}`);

    // Если загружен хедер, инициализируем мобильное меню
    if (selector === "#header") {
      initMobileMenu();
    }
  } catch (error) {
    console.error(`❌ Ошибка загрузки ${file}:`, error);
  }
}

// 📌 Функция инициализации мобильного меню
function initMobileMenu() {
  const burgerIcon = document.querySelector(".icon-menu-mobile");
  const mobileMenu = document.querySelector(".main-menu");
  const closeMenuBtn = document.querySelector(".close-menu");

  if (!burgerIcon || !mobileMenu || !closeMenuBtn) {
    console.error("❌ Ошибка: Элементы мобильного меню не найдены!");
    return;
  }

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("opened");
    burgerIcon.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("opened")
      ? "hidden"
      : "";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("opened");
    burgerIcon.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Обработчики событий
  burgerIcon.addEventListener("click", toggleMobileMenu);
  closeMenuBtn.addEventListener("click", closeMobileMenu);

  document.querySelectorAll(".mobile-nav li a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  console.log("✅ Мобильное меню инициализировано");
}

// 📌 Функция обработки формы отправки заявки
function initFormHandler() {
  const form = document.querySelector(".modal-form");
  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = form.querySelector("input[type='text']").value.trim();
    const phone = form.querySelector("input[type='tel']").value.trim();

    if (!name || !phone) {
      alert("⚠️ Пожалуйста, заполните все поля!");
      return;
    }

    try {
      // Отправляем данные в Telegram
      await sendTelegramMessage(name, phone);
      alert("✅ Заявка отправлена! Мы скоро свяжемся с вами.");
      form.reset();
    } catch (error) {
      console.error("❌ Ошибка отправки заявки:", error);
      alert("❌ Ошибка отправки! Попробуйте позже.");
    }
  });
}

// 📌 Запуск всех функций при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Запуск анимации AOS
  AOS.init({ once: true, offset: 100, duration: 800 });

  // ✅ Загружаем Header и Footer (убрали /src/)
  loadComponent("#header", "/components/header.html");
  loadComponent("#footer", "/components/footer.html");

  // ✅ Инициализируем обработчик формы
  initFormHandler();
});
