const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 20), { passive: true });

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const glow = document.getElementById("cursor-glow");
if (glow && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  let x = innerWidth / 2, y = innerHeight / 2, targetX = x, targetY = y;
  window.addEventListener("mousemove", (event) => { targetX = event.clientX; targetY = event.clientY; }, { passive: true });
  const animateGlow = () => { x += (targetX - x) * .12; y += (targetY - y) * .12; glow.style.transform = `translate(${x}px, ${y}px)`; requestAnimationFrame(animateGlow); };
  animateGlow();
}

const tagline = document.getElementById("typing-tagline");
const taglineText = "Digital Marketing, Websites, Branding, Advertising, Creative Content and Technology Solutions.";
if (reduceMotion) tagline.textContent = taglineText;
else {
  let character = 0;
  const typeTagline = () => { tagline.textContent = taglineText.slice(0, character++); if (character <= taglineText.length) setTimeout(typeTagline, 20); };
  window.addEventListener("DOMContentLoaded", typeTagline, { once: true });
}

const animatedElements = document.querySelectorAll("[data-animate]");
if (reduceMotion || !("IntersectionObserver" in window)) animatedElements.forEach((element) => element.classList.add("in-view"));
else {
  const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); } }), { threshold: .12 });
  animatedElements.forEach((element) => revealObserver.observe(element));
}

function animateCounter(element) {
  const target = Number(element.dataset.target), start = performance.now(), duration = 1200;
  const update = (now) => { const progress = Math.min((now - start) / duration, 1); element.textContent = Math.round((1 - Math.pow(1 - progress, 3)) * target); if (progress < 1) requestAnimationFrame(update); };
  requestAnimationFrame(update);
}
const counters = document.querySelectorAll(".stat-number");
if (reduceMotion || !("IntersectionObserver" in window)) counters.forEach((counter) => counter.textContent = counter.dataset.target);
else { const counterObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => { if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); } }), { threshold: .4 }); counters.forEach((counter) => counterObserver.observe(counter)); }

if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => { const rect = card.getBoundingClientRect(); const rotateX = ((event.clientY - rect.top) / rect.height - .5) * -7; const rotateY = ((event.clientX - rect.left) / rect.width - .5) * 7; card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`; });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});

document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll(".btn-quote").forEach((button) => button.addEventListener("click", () => {
  const select = document.getElementById("project_type");
  if (Array.from(select.options).some((option) => option.value === button.dataset.project)) select.value = button.dataset.project;
  document.getElementById("enquiry").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  setTimeout(() => document.getElementById("name").focus({ preventScroll: true }), reduceMotion ? 0 : 500);
}));
