(() => {
  const button = document.querySelector('.nav-toggle');
  const links = document.getElementById('primary-links');
  const navbar = document.getElementById('navbar');
  const mobile = window.matchMedia('(max-width: 850px)');
  function setOpen(open, restoreFocus = false) {
    button.setAttribute('aria-expanded', String(open));
    navbar.classList.toggle('menu-open', open);
    links.hidden = mobile.matches && !open;
    if (restoreFocus) button.focus();
  }
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobile.matches) setOpen(false, true);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target)) setOpen(false);
  });
  navbar.addEventListener('focusout', (event) => {
    if (!navbar.contains(event.relatedTarget)) setOpen(false);
  });
  mobile.addEventListener('change', () => setOpen(false));
  setOpen(false);
})();
