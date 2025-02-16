document.addEventListener("DOMContentLoaded", () => {
  // Кнопка, открывающая модалку
  const openModalBtn = document.querySelector(".btn-open-modal");
  // Оверлей модалки
  const modalOverlay = document.getElementById("modalOverlay");
  // Кнопка закрытия (крестик)
  const modalClose = document.getElementById("modalClose");

  // Функция показа модалки
  function showModal() {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // блокируем скролл страницы
  }

  // Функция скрытия модалки
  function hideModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // возвращаем прокрутку
  }

  // Открываем модалку при клике на кнопку
  openModalBtn.addEventListener("click", showModal);

  // Закрываем при клике на крестик
  modalClose.addEventListener("click", hideModal);

  // Закрываем при клике по фону вокруг (если нажали мимо окна)
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      hideModal();
    }
  });
});
