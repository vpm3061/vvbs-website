(() => {
  const tabs = Array.from(document.querySelectorAll('[data-wing]'));
  const hero = document.getElementById('top');
  if (!tabs.length || !hero) return;

  function selectWing(tab) {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    hero.dataset.wing = tab.dataset.wing;
    document.querySelectorAll('[data-wing-content]').forEach((section) => {
      section.hidden = section.dataset.wingContent !== tab.dataset.wing;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectWing(tab));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectWing(tabs[next]);
      tabs[next].focus();
    });
  });

  document.querySelectorAll('[data-hero-project], [data-service-project]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const service = document.getElementById('project_type');
      const enquiry = document.getElementById('enquiry');
      if (!service || !enquiry) return;
      event.preventDefault();
      service.value = link.dataset.heroProject || link.dataset.serviceProject;
      service.dispatchEvent(new Event('change', { bubbles: true }));
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      enquiry.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      document.getElementById('name').focus({ preventScroll: true });
    });
  });

  selectWing(tabs[0]);
})();
