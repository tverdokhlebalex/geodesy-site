import { botToken, chatId } from "./config.js";

// 📩 Функция отправки заявки в Telegram
export async function sendTelegramMessage(name, phone, message) {
  if (!botToken || !chatId) {
    console.error("❌ Ошибка: Не заданы TELEGRAM_BOT_TOKEN или CHAT_ID!");
    return;
  }

  // Убираем пробелы из номера, оставляем только цифры и "+"
  const formattedPhone = phone.replace(/\s/g, "");

  const textMessage = `📝 *Новая заявка!*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* [${formattedPhone}](tel:${formattedPhone})\n💬 *Сообщение:* ${message}`;

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: textMessage,
        parse_mode: "Markdown",
        disable_web_page_preview: true, // Отключаем предпросмотр ссылок
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
