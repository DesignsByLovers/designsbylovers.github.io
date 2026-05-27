/* ===== Pan Adam — subpage interactions ===== */
(function () {
  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // 3D Tilt
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    const inner = el.querySelector('.foto-ramecek') || el;
    el.addEventListener('mousemove', (ev) => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      inner.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
    });
    el.addEventListener('mouseleave', () => {
      inner.style.transform = 'rotateY(0) rotateX(0)';
    });
  });

  // Magnetic buttons
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (ev) => {
      const r = btn.getBoundingClientRect();
      const x = ev.clientX - r.left - r.width / 2;
      const y = ev.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();
