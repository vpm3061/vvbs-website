(() => {
  const image = document.querySelector('.hero-media img');
  const hero = document.querySelector('.hero-with-image');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!image || !hero || reduceMotion) return;

  let pending = false;
  const update = () => {
    const progress = Math.max(0, Math.min(window.scrollY / hero.offsetHeight, 1));
    image.style.transform = `scale(${1.04 + progress * 0.045}) translateY(${progress * 2.5}%)`;
    pending = false;
  };
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();
