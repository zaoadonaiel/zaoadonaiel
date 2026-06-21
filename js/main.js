/* ============================================================
   Zao Adona El — Main JavaScript
   ============================================================ */


/* ── NAVBAR — Scroll Glass Effect ── */

(function initNavbar() {
  const nav = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();


/* ── MOBILE MENU ── */

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

(function initMobileMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const menu      = document.getElementById('mobile-menu');
  const closeBtn  = document.getElementById('mobile-menu-close');

  hamburger.addEventListener('click', () => menu.classList.add('open'));
  closeBtn.addEventListener('click',  closeMobileMenu);

  // Close on backdrop click
  menu.addEventListener('click', (e) => {
    if (e.target === menu) closeMobileMenu();
  });
})();


/* ── SCROLL REVEAL — Intersection Observer ── */

(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4 * 0.1) + 's';
    observer.observe(el);
  });
})();
