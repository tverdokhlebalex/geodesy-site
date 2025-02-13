// Функция для загрузки HTML-файлов (футер и хедер)
async function loadComponent(selector, file) {
  const element = document.querySelector(selector);
  if (element) {
    const response = await fetch(file);
    if (response.ok) {
      element.innerHTML = await response.text();
    } else {
      console.error(`Ошибка загрузки: ${file}`);
    }
  }
}

// Загружаем header и footer
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header", "/src/components/header.html");
  loadComponent("#footer", "/src/components/footer.html");
});
