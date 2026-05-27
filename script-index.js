// Designs By Lovers — interaktivita

document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal — obsah přilétá zespoda
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));

  // Parallax na blur kruhy
  const orbs = document.querySelectorAll(".blur-kruh");
  const onScroll = () => {
    const y = window.scrollY;
    orbs.forEach((o, i) => {
      o.style.transform = `translateY(${y * (0.05 + i * 0.04)}px)`;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
});
