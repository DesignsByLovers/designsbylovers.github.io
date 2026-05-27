(function () {

  const POCET = 25;
  const VYCHOZI_LIMIT_MOBIL = 8;

  // ===== NÁZVY BAREV =====

  const nazvyTmavych = [
    "Mahogany",
    "Burgundy",
    "Espresso",
    "Chestnut",
    "Merlot",
    "Velvet Red",
    "Dark Cocoa",
    "Walnut",
    "Crimson Night",
    "Mocha",
    "Sienna",
    "Deep Wine",
    "Charcoal",
    "Bronze",
    "Amber Wood",
    "Auburn",
    "Cedar",
    "Rustic Brown",
    "Copper",
    "Noir",
    "Dark Sand",
    "Terracotta",
    "Oak",
    "Burnt Umber",
    "Vintage Red"
  ];

  const nazvySvetlych = [
    "Ivory",
    "Cream",
    "Sand",
    "Vanilla",
    "Champagne",
    "Pearl",
    "Soft Beige",
    "Almond",
    "Latte",
    "Warm White",
    "Honey",
    "Blush",
    "Linen",
    "Buttercream",
    "Oat",
    "Dusty Rose",
    "Pale Gold",
    "Soft Peach",
    "Clay",
    "Light Cocoa",
    "Milk Beige",
    "Stone",
    "Warm Taupe",
    "Natural",
    "Cotton"
  ];

  // ===== FONTY =====

  const fontVarianty = [
    { f: '"Cormorant Garamond", serif', s: 'normal', w: 400, name: "Cormorant" },
    { f: '"Cormorant Garamond", serif', s: 'italic', w: 400, name: "Cormorant It." },
    { f: '"Inter", sans-serif', s: 'normal', w: 600, name: "Inter" },
    { f: '"Inter", sans-serif', s: 'normal', w: 300, name: "Inter Light" },
    { f: 'Georgia, serif', s: 'normal', w: 400, name: "Georgia" },
    { f: '"Times New Roman", serif', s: 'italic', w: 400, name: "Times It." },
    { f: 'Helvetica, Arial, sans-serif', s: 'normal', w: 700, name: "Helvetica" },
    { f: '"Courier New", monospace', s: 'normal', w: 400, name: "Courier" },
  ];

  // ===== VYTVOŘENÍ BOXU =====

  function vytvorBox(typ, i) {

    let el;

    // ===== FONTY = bez odkazu =====

    if (typ === "fonty") {

      el = document.createElement("div");

    } else {

      // ===== OBRÁZKY = klikací =====

      el = document.createElement("a");

      el.href = `img/${typ}-${i + 1}.jpg`;

      el.target = "_blank";
    }

    el.className =
      "vz-box " +
      (typ === "tmave"
        ? "tmavy"
        : typ === "svetle"
        ? "svetly"
        : "font-box");

    const cisloStr = String(i + 1).padStart(2, "0");

    // ===== FONTY =====

    if (typ === "fonty") {

      const v = fontVarianty[i % fontVarianty.length];

      const aa = document.createElement("div");
      aa.className = "vz-aa";
      aa.style.fontFamily = v.f;
      aa.style.fontStyle = v.s;
      aa.style.fontWeight = v.w;
      aa.textContent = "Aa";

      const name = document.createElement("div");
      name.className = "vz-fname";
      name.textContent = `${cisloStr} · ${v.name}`;

      el.appendChild(aa);
      el.appendChild(name);

    } else {

      // ===== OBRÁZEK =====

      const img = document.createElement("img");

      img.src = `img/${typ}-${i + 1}.jpg`;

      img.alt = `Obrázek ${i + 1}`;

      // ===== ČÍSLO =====

      const cislo = document.createElement("span");

      cislo.className = "vz-cislo";

      cislo.textContent = cisloStr;

      // ===== NÁZEV BARVY =====

      const tag = document.createElement("span");

      tag.className = "vz-tag";

      if (typ === "tmave") {
        tag.textContent = nazvyTmavych[i];
      } else {
        tag.textContent = nazvySvetlych[i];
      }

      // ===== PŘIDÁNÍ =====

      el.appendChild(img);
      el.appendChild(cislo);
      el.appendChild(tag);
    }

    return el;
  }

  // ===== NAPLNĚNÍ GRIDU =====

  function napln(typ) {

    const grid = document.querySelector(`[data-grid="${typ}"]`);

    if (!grid) return;

    for (let i = 0; i < POCET; i++) {

      const b = vytvorBox(typ, i);

      if (i >= VYCHOZI_LIMIT_MOBIL) {
        b.classList.add("skryto");
      }

      grid.appendChild(b);
    }
  }

  // ===== VYTVOŘENÍ SEKCÍ =====

  ["tmave", "svetle", "fonty"].forEach(napln);

  // ===== TLAČÍTKO ZOBRAZIT VŠE =====

  document.querySelectorAll("[data-toggle]").forEach((btn) => {

    btn.addEventListener("click", () => {

      const cil = btn.getAttribute("data-toggle");

      const grid = document.querySelector(`[data-grid="${cil}"]`);

      if (!grid) return;

      const otevreno = grid.classList.toggle("rozbaleno");

      btn.classList.toggle("otevreno", otevreno);

      btn.querySelector(".vz-tl-text").textContent =
        otevreno ? "Zobrazit méně" : "Zobrazit vše";
    });
  });

  // ===== REVEAL ANIMACE =====

  const io = new IntersectionObserver(
    (entries) => {

      entries.forEach((en) => {

        if (en.isIntersecting) {

          const el = en.target;

          const i = Array.from(el.parentElement.children).indexOf(el);

          setTimeout(() => {
            el.classList.add("in-view");
          }, (i % 10) * 50);

          io.unobserve(el);
        }
      });
    },
    { threshold: 0.1 }
  );

  // ===== SPUŠTĚNÍ OBSERVERU =====

  setTimeout(() => {
    document.querySelectorAll(".vz-box").forEach((b) => io.observe(b));
  }, 100);

  // ===== AKTIVNÍ NAVIGACE =====

  const sekce = ["tmave", "svetle", "fonty"]
    .map((id) => document.getElementById(id));

  const odkazy = document.querySelectorAll(".vz-sub-odkaz");

  const ioSub = new IntersectionObserver(
    (entries) => {

      entries.forEach((en) => {

        if (en.isIntersecting) {

          const id = en.target.id;

          odkazy.forEach((a) => {

            a.classList.toggle(
              "aktivni",
              a.getAttribute("href") === "#" + id
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sekce.forEach((s) => s && ioSub.observe(s));

  // ===== PLYNULÝ SCROLL =====

  odkazy.forEach((a) => {

    a.addEventListener("click", (e) => {

      const href = a.getAttribute("href");

      if (!href || !href.startsWith("#")) return;

      const t = document.querySelector(href);

      if (!t) return;

      e.preventDefault();

      window.scrollTo({
        top: t.getBoundingClientRect().top + window.scrollY - 40,
        behavior: "smooth"
      });
    });
  });

})();