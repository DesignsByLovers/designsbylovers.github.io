/* ============================================================
   WEBY — interaktivní efekty (wow factor)
   - 3D tilt na náhledech webů (sleduje kurzor)
   - Magnetické tlačítko (CTA se přitahuje k myši)
   - Jemný parallax na číslech sekcí při scrollu
   - Reveal používá observer z script-index.js
   ============================================================ */

(function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 3D TILT ---- */
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    const frame = el.querySelector(".media-ramecek");
    if (!frame || reducedMotion) return;

    let raf = null;
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;

    function update() {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      frame.style.transform = `rotateX(${curY}deg) rotateY(${curX}deg) translateZ(0)`;
      if (Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05) {
        raf = requestAnimationFrame(update);
      } else {
        raf = null;
      }
    }

    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      targetX = px * 10;   // max ±5deg
      targetY = -py * 10;
      if (!raf) raf = requestAnimationFrame(update);
    });
    el.addEventListener("mouseleave", () => {
      targetX = 0; targetY = 0;
      if (!raf) raf = requestAnimationFrame(update);
    });
  });

  /* ---- MAGNETIC BUTTONS ---- */
  document.querySelectorAll("[data-magnetic]").forEach((btn) => {
    if (reducedMotion) return;
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  /* ---- PARALLAX ČÍSLA ---- */
  if (!reducedMotion) {
    const cisla = document.querySelectorAll(".projekt-cislo");
    window.addEventListener("scroll", () => {
      const sy = window.scrollY;
      cisla.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + sy - window.innerHeight) * -0.04;
        el.style.transform = `translateY(${offset}px)`;
      });
    }, { passive: true });
  }

  /* ---- REVEAL (záloha, pokud script-index.js neběží) ---- */
  if (!document.querySelector(".reveal.visible")) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }
})();
