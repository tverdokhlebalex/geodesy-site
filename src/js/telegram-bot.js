// 📌 Импортируем переменные из .env
const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID; // ID общего чата

// 📩 Функция отправки заявки в Telegram
export async function sendTelegramMessage(name, phone) {
  if (!botToken || !chatId) {
    console.error("❌ Ошибка: Не заданы TELEGRAM_TOKEN или CHAT_ID!");
    return;
  }

  const message = `📝 *Новая заявка!*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}`;
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (response.ok) {
      console.log("✅ Заявка успешно отправлена в Telegram!");
    } else {
      console.error("❌ Ошибка отправки в Telegram:", response.statusText);
    }
  } catch (error) {
    console.error("❌ Ошибка сети при отправке в Telegram:", error);
  }
}
console.log("🔹 Токен бота:", import.meta.env.VITE_TELEGRAM_BOT_TOKEN);
console.log("🔹 Чат ID:", import.meta.env.VITE_TELEGRAM_CHAT_ID);
