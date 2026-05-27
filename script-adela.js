/* ===== Slečna Adéla — interactions ===== */
(function () {
  // Reveal on scroll (in case script-index.js was loaded once already, this is idempotent)
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        if (e.target.classList.contains('skill-list')) {
          e.target.querySelectorAll('li').forEach((li, i) => {
            setTimeout(() => li.classList.add('in-view'), 120 * i);
          });
        }
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal, .skill-list').forEach((el) => io.observe(el));

  // 3D Tilt
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    const inner = el.querySelector('.foto-ramecek, img') || el;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      inner.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => { inner.style.transform = ''; });
  });

  // Magnetic buttons
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // Parallax na velká čísla v příběhu
  const cisla = document.querySelectorAll('.pribeh-cislo, .omne-img-cislo');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    cisla.forEach((el, i) => {
      el.style.transform = `translateY(${y * (i % 2 ? -0.04 : 0.04)}px)`;
    });
  }, { passive: true });
})();
