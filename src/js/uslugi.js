document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-item");

  if (window.innerWidth <= 1024) {
    serviceItems.forEach((item) => {
      item.addEventListener("click", () => {
        const flipInner = item.querySelector(".flip-card-inner");
        flipInner.classList.toggle("flipped");
      });
    });
  }
});
