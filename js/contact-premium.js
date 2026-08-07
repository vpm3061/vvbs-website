(() => {
  const layout = document.querySelector('#enquiry .contact-layout');
  if (!layout) return;

  const intro = layout.firstElementChild;
  const label = intro.querySelector('.eyebrow');
  const heading = intro.querySelector('h2');
  const description = intro.querySelector('.contact-copy');
  if (label) label.textContent = 'GET IN TOUCH';
  if (heading) heading.innerHTML = "Let's Build Something <em>Amazing Together</em>";
  if (description) description.textContent = 'Whether you need Digital Marketing, Social Media Management, Website Development, Branding, Performance Marketing or AI Solutions, our team is ready to help your business grow.';

  const actions = document.createElement('div');
  actions.className = 'contact-actions';
  actions.innerHTML = '<a class="btn btn-primary" href="#enquiry-form">Book Free Consultation <span>→</span></a><a class="btn btn-secondary" target="_blank" rel="noopener" href="https://wa.me/919717233972?text=Hi%20VVBSDigital%2C%20I%20would%20like%20to%20discuss%20my%20digital%20growth.">Chat on WhatsApp</a>';
  intro.append(actions);

  const information = document.createElement('div');
  information.className = 'contact-information';
  information.innerHTML = '<div><b>Phone</b><a href="tel:+919717233972">+91 97172 33972</a></div><div><b>Email</b><a href="mailto:tellitorg1@gmail.com">tellitorg1@gmail.com</a></div><div><b>Website</b><span>VVBSdigital.com</span></div><div><b>Office</b><span>Sector 62, Noida, Uttar Pradesh</span></div><div><b>Business Hours</b><span>Monday–Saturday, 10 AM–7 PM</span></div>';
  intro.append(information);

  const visual = document.createElement('figure');
  visual.className = 'contact-visual';
  visual.setAttribute('data-animate', '');
  visual.innerHTML = '<img src="assets/vvbs-contact-workspace.png" alt="Premium modern workspace with laptop, coffee and planning desk" loading="lazy" decoding="async">';
  layout.append(visual);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) visual.classList.add('in-view');
  else new IntersectionObserver((entries, observer) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold: .12 }).observe(visual);
})();
