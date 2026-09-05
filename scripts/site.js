// Shared across all pages: hamburger nav + footer year/last-modified.
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
  hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
