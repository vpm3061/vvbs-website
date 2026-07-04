// ---------- navbar scroll state ----------
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// ---------- cursor-follow glow ----------
const glow = document.getElementById("cursor-glow");
let glowX = window.innerWidth / 2;
let glowY = window.innerHeight / 2;
let targetX = glowX;
let targetY = glowY;

window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animateGlow() {
  glowX += (targetX - glowX) * 0.12;
  glowY += (targetY - glowY) * 0.12;
  glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ---------- typing / reveal tagline ----------
const taglineEl = document.getElementById("typing-tagline");
const taglineText = "iOS, Android, Web Apps & Websites — Static & Dynamic";
let charIndex = 0;

function typeTagline() {
  if (charIndex <= taglineText.length) {
    taglineEl.textContent = taglineText.slice(0, charIndex);
    charIndex++;
    setTimeout(typeTagline, 35);
  }
}
window.addEventListener("DOMContentLoaded", typeTagline);

// ---------- scroll-triggered fade-up ----------
const animatedEls = document.querySelectorAll("[data-animate]");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
animatedEls.forEach((el) => revealObserver.observe(el));

// ---------- animated counters ----------
const counters = document.querySelectorAll(".stat-number");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
counters.forEach((el) => counterObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ---------- portfolio tilt effect ----------
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(700px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ---------- footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- pricing card -> prefill enquiry form ----------
document.querySelectorAll(".btn-quote").forEach((btn) => {
  btn.addEventListener("click", () => {
    const project = btn.dataset.project;
    const select = document.getElementById("project_type");
    if (select) {
      const match = Array.from(select.options).find((o) => o.value === project);
      if (match) select.value = project;
    }
    document.getElementById("enquiry").scrollIntoView({ behavior: "smooth" });
  });
});
