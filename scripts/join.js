// =============================================
//  CHAMBER CABA - join.js
//  Timestamp, navigation, and membership modals
// =============================================

const yearSpan = document.getElementById('current-year');
const lastModSpan = document.getElementById('last-modified');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified;

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

const timestampInput = document.getElementById('timestamp');
if (timestampInput) {
  timestampInput.value = new Date().toISOString();
}

const dialogLinks = document.querySelectorAll('[data-dialog]');
dialogLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('data-dialog');
    const dialog = targetId ? document.getElementById(targetId) : null;
    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    }
  });
});

const closeButtons = document.querySelectorAll('.modal-close');
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const dialog = button.closest('dialog');
    if (dialog instanceof HTMLDialogElement) dialog.close();
  });
});

const dialogs = document.querySelectorAll('dialog');
dialogs.forEach(dialog => {
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      dialog.close();
    }
  });
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    dialog.close();
  });
});
