// Service Worker Register
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ Service Worker registered'))
      .catch(err => console.log('❌ Service Worker registration failed', err));
  });
}

// Active navigation highlight
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});