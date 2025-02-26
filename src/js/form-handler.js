import { sendTelegramMessage } from "./telegram-bot.js";

// 📌 Функция обработки формы заявки
function initModalFormValidation() {
  const form = document.getElementById("modalForm");
  if (!form) return;

  const nameInput = document.getElementById("modal-name");
  const phoneInput = document.getElementById("modal-phone");
  const messageInput = document.getElementById("modal-message");

  // 🔹 Валидация номера телефона (разрешен только формат +7XXXXXXXXXX)
  phoneInput.addEventListener("input", (event) => {
    let value = event.target.value.replace(/\D/g, ""); // Удаляем все нецифровые символы
    if (!value.startsWith("7")) {
      value = "7" + value.slice(1);
    }
    event.target.value = "+7" + value.slice(1, 11);
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    // 🔹 Проверяем, что все поля заполнены и телефон корректен
    if (!name || !phone.match(/^\+7\d{10}$/) || !message) {
      alert("⚠️ Введите корректные данные!\nФормат телефона: +7XXXXXXXXXX");
      return;
    }

    try {
      // 🔹 Отправка данных в Telegram
      await sendTelegramMessage(name, phone, message);
      alert("✅ Ваша заявка отправлена! Мы скоро свяжемся с вами.");
      form.reset();
    } catch (error) {
      console.error("❌ Ошибка при отправке заявки:", error);
      alert("❌ Ошибка отправки! Попробуйте позже.");
    }
  });
}

// 📌 Запускаем обработку формы модального окна
document.addEventListener("DOMContentLoaded", () => {
  initModalFormValidation();
});
