(function () {
  // Reveal karet – staggered podle pořadí
  const karty = document.querySelectorAll(".gr-karta");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const el = en.target;
          const idx = Array.from(karty).indexOf(el);
          setTimeout(() => el.classList.add("in-view"), (idx % 8) * 70);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12 }
  );
  karty.forEach((k) => io.observe(k));

  // Jemný parallax pozadí karet při scrollu (desktop)
  if (window.matchMedia("(min-width: 901px)").matches) {
    let raf = null;
    window.addEventListener(
      "scroll",
      () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          karty.forEach((k, i) => {
            const r = k.getBoundingClientRect();
            if (r.bottom < 0 || r.top > window.innerHeight) return;
            const speed = (i % 3) * 0.05 + 0.04;
            const offset = (r.top - window.innerHeight / 2) * speed * -0.3;
            const before = k.querySelector;
            k.style.setProperty("--p", `${offset.toFixed(1)}px`);
          });
          raf = null;
        });
      },
      { passive: true }
    );
  }

  // Magnetic CTA
  document.querySelectorAll("[data-magnetic]").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
  });
})();
