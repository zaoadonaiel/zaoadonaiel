/* ============================================================
   Grace Cathedral — Main JavaScript
   ============================================================ */


/* ── PARTICLE CANVAS (Hero Background) ── */

(function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x      = Math.random() * W;
      this.y      = Math.random() * H;
      this.r      = Math.random() * 1.5 + 0.3;
      this.speed  = Math.random() * 0.4 + 0.1;
      this.angle  = Math.random() * Math.PI * 2;
      this.vx     = Math.cos(this.angle) * this.speed;
      this.vy     = Math.sin(this.angle) * this.speed - 0.3;
      this.life    = 0;
      this.maxLife = Math.random() * 200 + 100;
      this.isGold  = Math.random() > 0.7;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;

      if (
        this.life > this.maxLife ||
        this.y < -10 ||
        this.x < -10 ||
        this.x > W + 10
      ) {
        this.reset();
      }
    }

    draw() {
      const progress = this.life / this.maxLife;
      const alpha =
        progress < 0.2 ? progress / 0.2 :
        progress > 0.8 ? (1 - progress) / 0.2 : 1;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.isGold
        ? `rgba(201, 168, 76, ${alpha * 0.6})`
        : `rgba(255, 255, 255, ${alpha * 0.25})`;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 150 }, () => new Particle());

  function drawConstellationLines() {
    const goldParticles = particles.filter(p => p.isGold);
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.06)';
    ctx.lineWidth   = 0.5;

    for (let i = 0; i < goldParticles.length; i++) {
      for (let j = i + 1; j < goldParticles.length; j++) {
        const dx   = goldParticles[i].x - goldParticles[j].x;
        const dy   = goldParticles[i].y - goldParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.globalAlpha = (1 - dist / 150) * 0.4;
          ctx.beginPath();
          ctx.moveTo(goldParticles[i].x, goldParticles[i].y);
          ctx.lineTo(goldParticles[j].x, goldParticles[j].y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConstellationLines();
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(loop);
  }

  loop();
})();


/* ── NAVBAR — Glass Effect on Scroll ── */

(function initNavbar() {
  const nav = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
})();


/* ── SCROLL REVEAL — Intersection Observer ── */

(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach((el, i) => {
      el.style.transitionDelay = (i % 4 * 0.08) + 's';
      observer.observe(el);
    });
})();


/* ── STATS COUNTER — Animated Number Count-Up ── */

(function initCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el      = entry.target;
        const rawText = el.textContent;
        const target  = parseInt(rawText.replace(/\D/g, ''), 10);
        const suffix  = rawText.replace(/[\d,]/g, '');
        const duration = 1500;
        const step     = target / duration * 16;
        let current    = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 16);

        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-num').forEach(el => observer.observe(el));
})();
