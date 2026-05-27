/* ===== Služby — interactivity ===== */
(function () {
  // Smooth scroll on subnav (s offsetem pro sticky lištu)
  const subnav = document.querySelector('.sluzby-subnav');
  document.querySelectorAll('.subnav-odkaz').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (!id || !id.startsWith('#')) return;
      const cil = document.querySelector(id);
      if (!cil) return;
      ev.preventDefault();
      const offset = (subnav?.offsetHeight || 0) + 10;
      const y = cil.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  // Aktivní stav podle scrollu
  const sekce = Array.from(document.querySelectorAll('.sluzba-sekce[id]'));
  const odkazy = Array.from(document.querySelectorAll('.subnav-odkaz'));
  const mapa = new Map(odkazy.map((o) => [o.getAttribute('href')?.slice(1), o]));

  const aktivIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          odkazy.forEach((o) => o.classList.remove('aktivni'));
          mapa.get(e.target.id)?.classList.add('aktivni');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );
  sekce.forEach((s) => aktivIo.observe(s));

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

  // Staggered reveal — řádky cen + balíčky
  const radkyIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const radky = e.target.querySelectorAll('.cena-radek, .bk-radky li, .sluzba-body li');
          radky.forEach((r, i) => {
            r.style.opacity = '0';
            r.style.transform = 'translateX(-14px)';
            r.style.transition = 'all 0.55s cubic-bezier(.2,.7,.2,1)';
            setTimeout(() => {
              r.style.opacity = '1';
              r.style.transform = 'translateX(0)';
            }, 70 * i);
          });
          radkyIo.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.sluzba-ceny, .balicek-karta, .sluzba-body').forEach((k) => radkyIo.observe(k));

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

  // Subtle parallax na vizuálech
  const vizualy = document.querySelectorAll('.vizual-ramecek');
  window.addEventListener('scroll', () => {
    const vh = window.innerHeight;
    vizualy.forEach((v) => {
      const rect = v.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const delta = (center - vh / 2) / vh;
      v.style.setProperty('--y', `${delta * -12}px`);
      v.style.translate = `0 ${delta * -8}px`;
    });
  }, { passive: true });
})();
