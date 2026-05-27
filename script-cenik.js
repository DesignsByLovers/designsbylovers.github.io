/* ===== Ceník — interactivity ===== */
(function () {
  // Scroll reveal
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));

  // Staggered reveal řádků ceníku
  const radkyIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const radky = e.target.querySelectorAll('.cenik-radek');
          radky.forEach((r, i) => {
            r.style.opacity = '0';
            r.style.transform = 'translateX(-20px)';
            r.style.transition = 'all 0.6s cubic-bezier(.2,.7,.2,1)';
            setTimeout(() => {
              r.style.opacity = '1';
              r.style.transform = 'translateX(0)';
            }, 80 * i);
          });
          radkyIo.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.cenik-karta').forEach((k) => radkyIo.observe(k));

  // Magnetic effect
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (ev) => {
      const r = el.getBoundingClientRect();
      const x = ev.clientX - r.left - r.width / 2;
      const y = ev.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) translateY(-3px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // Parallax na velký background text
  const sekce = document.querySelectorAll('.cenik-sekce');
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      sekce.forEach((s) => {
        const rect = s.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight) * 0.08;
        s.style.setProperty('--bg-shift', `${offset}px`);
      });
    },
    { passive: true }
  );
})();
