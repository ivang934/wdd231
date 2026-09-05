// =============================================
//  CHAMBER CABA - thankyou.js
//  Render submitted form values on thank-you page
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

function getQueryValue(key) {
  return new URLSearchParams(window.location.search).get(key) || 'Not provided';
}

const summaryFields = {
  firstName: 'summary-firstName',
  lastName: 'summary-lastName',
  email: 'summary-email',
  phone: 'summary-phone',
  business: 'summary-business',
  timestamp: 'summary-timestamp'
};

Object.entries(summaryFields).forEach(([param, elementId]) => {
  const element = document.getElementById(elementId);
  if (element) element.textContent = getQueryValue(param);
});

const hasValues = ['firstName', 'lastName', 'email', 'phone', 'business'].some(key => {
  return new URLSearchParams(window.location.search).has(key);
});

if (!hasValues) {
  const summaryCard = document.querySelector('.summary-card');
  if (summaryCard) {
    summaryCard.innerHTML = '<p>It looks like the application was not submitted correctly. Please return to the application page and try again.</p><div class="summary-actions"><a href="join.html">Return to application</a></div>';
  }
}
