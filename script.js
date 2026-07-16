const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

function closeMenu() {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.material-symbols-outlined').textContent = 'menu';
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.querySelector('.material-symbols-outlined').textContent = open ? 'menu' : 'close';
  mobileMenu.classList.toggle('is-open', !open);
  document.body.classList.toggle('menu-open', !open);
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 980) closeMenu(); });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('[data-faq-button]').forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', String(!expanded));
    panel?.classList.toggle('open', !expanded);
  });
});

const bookingForm = document.querySelector('[data-booking-form]');
const bookingDate = bookingForm?.querySelector('input[type="date"]');
if (bookingDate) bookingDate.min = new Date().toISOString().split('T')[0];
bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  const data = new FormData(bookingForm);
  const details = [
    `Registration: ${data.get('registration')}`,
    `MOT class: ${data.get('motClass')}`,
    `Preferred date: ${data.get('date')}`,
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Notes: ${data.get('notes') || 'None'}`
  ].join('\n');
  const status = bookingForm.querySelector('[data-form-status]');
  status?.classList.add('show');
  window.location.href = `mailto:enquiries@mjbservices.co.uk?subject=${encodeURIComponent('MOT booking request')}&body=${encodeURIComponent(details)}`;
});

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
