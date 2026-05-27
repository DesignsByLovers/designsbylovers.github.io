// Zelený Brázda — interaktivita

// Mobilní menu
document.addEventListener('click', e => {
  if (e.target.closest('.menu-toggle')) {
    document.querySelector('.nav').classList.toggle('open');
  }
});

// Reveal on scroll
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Toast helper
function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// FAQ akordeon
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
});

// Testimonials carousel
(function () {
  const wrap = document.querySelector('.testi');
  if (!wrap) return;
  const items = [
    { text: '„Brázda T-180 nám zachránila sezónu. Sype méně nafty než stará konkurence a v dílně nestrávil ani den."', cite: '— Petr Hájek, zem. družstvo Rožmitál' },
    { text: '„Servisní tým přijel na statek do 6 hodin. To u zahraničních značek prostě nevidíte."', cite: '— Magda Svobodová, farma Lipnice' },
    { text: '„H-9 Titan sklidil naši pšenici za polovinu doby. Doporučuji každému, kdo nechce kompromisy."', cite: '— Jiří Veverka, ZD Polná' },
  ];
  const q = wrap.querySelector('blockquote');
  const c = wrap.querySelector('cite');
  const dots = wrap.querySelector('.testi-dots');
  let i = 0;
  function render() {
    q.style.opacity = 0;
    setTimeout(() => {
      q.textContent = items[i].text;
      c.textContent = items[i].cite;
      q.style.opacity = 1;
      dots.querySelectorAll('button').forEach((d, idx) => d.classList.toggle('active', idx === i));
    }, 200);
  }
  items.forEach((_, idx) => {
    const b = document.createElement('button');
    b.className = 'testi-dot' + (idx === 0 ? ' active' : '');
    b.onclick = () => { i = idx; render(); };
    dots.appendChild(b);
  });
  q.style.transition = 'opacity .25s';
  setInterval(() => { i = (i + 1) % items.length; render(); }, 5500);
})();

// Kalkulačka úspor (home tool)
(function () {
  const form = document.querySelector('#calc-form');
  if (!form) return;
  const ha = form.querySelector('#calc-ha');
  const haVal = form.querySelector('#calc-ha-val');
  const out = form.querySelector('#calc-out');
  function calc() {
    haVal.textContent = ha.value + ' ha';
    const saved = Math.round(ha.value * 18.5);
    const co2 = Math.round(ha.value * 42);
    out.innerHTML = `Roční úspora: <strong>${saved.toLocaleString('cs-CZ')} l nafty</strong> · ${co2.toLocaleString('cs-CZ')} kg CO₂ méně.`;
  }
  ha.addEventListener('input', calc); calc();
})();

// Konfigurátor traktoru (home tool)
(function () {
  const form = document.querySelector('#cfg-form');
  if (!form) return;
  const out = form.querySelector('#cfg-out');
  function calc() {
    const power = +form.querySelector('#cfg-power').value;
    const cab = form.querySelector('#cfg-cab').value;
    const tires = form.querySelector('#cfg-tires').value;
    let base = 480000 + power * 4200;
    if (cab === 'lux') base += 95000;
    if (tires === 'forest') base += 62000;
    out.innerHTML = `Orientační cena: <strong>${base.toLocaleString('cs-CZ')} Kč</strong> bez DPH`;
  }
  form.addEventListener('input', calc); calc();
})();

// PRODUKTY: filtr + modal
(function () {
  const grid = document.querySelector('#products');
  if (!grid) return;
  const products = [
    { id: 1, cat: 'traktory', name: 'Brázda T-300 Forest XL', img: 'assets/tractor-large.jpg', price: 2890000, desc: 'Vlajková loď. Nejvýkonnější traktor v nabídce, určený pro nejnáročnější polní i lesní práce.', specs: ['300 HP', '4WD', 'HVO 100', 'klimatizace'] },
    { id: 2, cat: 'traktory', name: 'Brázda T-220 Forest', img: 'assets/tractor-large.jpg', price: 1490000, desc: 'Silák s nízkotlakými pneumatikami. Šetří půdu i řidiče.', specs: ['220 HP', '4WD', 'odpružená kabina'] },
    { id: 3, cat: 'traktory', name: 'Brázda T-180 Pro', img: 'assets/tractor-mid.jpg', price: 1190000, desc: 'Univerzál pro střední farmu. Hybridní pohon, perfektní jízdní vlastnosti.', specs: ['180 HP', 'hybrid', '4WD'] },
    { id: 4, cat: 'traktory', name: 'Brázda T-140 Field', img: 'assets/tractor-mid.jpg', price: 890000, desc: 'Spolehlivý parťák do pole. Jednoduchá údržba, modulární servis.', specs: ['140 HP', '4WD', 'EHR'] },
    { id: 5, cat: 'traktory', name: 'Brázda T-110 Classic', img: 'assets/tractor-mid.jpg', price: 729000, desc: 'Klasický střední traktor pro denní práci na statku.', specs: ['110 HP', '4WD'] },
    { id: 6, cat: 'traktory', name: 'Brázda T-95 Compact', img: 'assets/tractor-compact.jpg', price: 549000, desc: 'Kompaktní rozměry, plnohodnotný výkon. Skvělý do sadů a vinohradů.', specs: ['95 HP', 'kompakt', '4WD'] },
    { id: 7, cat: 'traktory', name: 'Brázda T-75 Garden', img: 'assets/tractor-compact.jpg', price: 419000, desc: 'Zahradní a komunální traktor. Tichý chod, snadné ovládání.', specs: ['75 HP', 'komunál'] },
    { id: 8, cat: 'traktory', name: 'Brázda T-50 Mini', img: 'assets/tractor-mini.jpg', price: 289000, desc: 'Nejmenší v rodině. Pro hobby farmáře a malé pozemky.', specs: ['50 HP', 'mini', '4WD'] },
    { id: 9, cat: 'kombajny', name: 'Brázda H-9 Titan', img: 'assets/combine-large.jpg', price: 4290000, desc: 'Špičkový obilní kombajn. Pětibubnové mlátidlo, kapacita zásobníku 12 500 l.', specs: ['440 HP', 'rotor 800 mm', '12,5 m žací'] },
    { id: 10, cat: 'kombajny', name: 'Brázda H-7 Field', img: 'assets/combine-large.jpg', price: 3190000, desc: 'Univerzální obilní sklízeč pro střední a velké farmy.', specs: ['340 HP', '9 m žací', 'GPS'] },
    { id: 11, cat: 'kombajny', name: 'Brázda H-6 Standard', img: 'assets/combine-small.jpg', price: 2490000, desc: 'Vyladěný střední kombajn. Skvělý poměr cena/výkon.', specs: ['280 HP', '7,5 m žací'] },
    { id: 12, cat: 'kombajny', name: 'Brázda H-4 Mini', img: 'assets/combine-small.jpg', price: 1690000, desc: 'Kompaktní kombajn pro menší farmy a obtížně přístupná pole.', specs: ['180 HP', '5,2 m žací'] },
    { id: 13, cat: 'kombajny', name: 'Brázda C-3 Corn', img: 'assets/combine-corn.jpg', price: 2890000, desc: 'Specialista na kukuřici. Šestiřádková kukuřičná adaptace v ceně.', specs: ['320 HP', '6 řádků', 'corn-cracker'] },
    { id: 14, cat: 'pluhy', name: 'Klín Pluh 5R', img: 'assets/plow-large.jpg', price: 215000, desc: 'Pětiradličný otočný pluh. Výměnné chrániče, ostrá ocel z Vítkovic.', specs: ['5 radlic', 'hydraulika', 'auto-reset'] },
    { id: 15, cat: 'pluhy', name: 'Klín Pluh 3R Light', img: 'assets/plow-large.jpg', price: 119000, desc: 'Tříradličný lehký pluh pro menší stroje.', specs: ['3 radlice', 'mech. jištění'] },
    { id: 16, cat: 'setba', name: 'Setba SE-6 Pneumatic', img: 'assets/seeder-large.jpg', price: 489000, desc: 'Pneumatický secí stroj. Přesné dávkování, široký záběr 6 m.', specs: ['6 m', 'pneumatika', 'GPS sekce'] },
    { id: 17, cat: 'setba', name: 'Setba SE-3 Direct', img: 'assets/seeder-large.jpg', price: 289000, desc: 'Bezorebný secí stroj. Šetří půdu i čas.', specs: ['3 m', 'no-till'] },
  ];
  let active = 'vse';
  function render() {
    grid.innerHTML = '';
    products.filter(p => active === 'vse' || p.cat === active).forEach(p => {
      const el = document.createElement('article');
      el.className = 'product reveal';
      el.innerHTML = `
        <div class="ph"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
        <div class="body">
          <div class="cat">${p.cat}</div>
          <h3>${p.name}</h3>
          <p class="desc">${p.desc}</p>
          <div class="specs">${p.specs.map(s => `<span class="spec">${s}</span>`).join('')}</div>
          <div class="row">
            <div class="price">${p.price.toLocaleString('cs-CZ')} Kč<small>bez DPH</small></div>
            <button class="btn btn-ghost">Detail →</button>
          </div>
        </div>`;
      el.addEventListener('click', () => openModal(p));
      grid.appendChild(el);
      requestAnimationFrame(() => el.classList.add('in'));
    });
  }
  document.querySelectorAll('.filter').forEach(f => {
    f.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      active = f.dataset.cat;
      render();
    });
  });
  function openModal(p) {
    const m = document.querySelector('#modal');
    m.querySelector('img').src = p.img;
    m.querySelector('img').alt = p.name;
    m.querySelector('.m-cat').textContent = p.cat;
    m.querySelector('.m-name').textContent = p.name;
    m.querySelector('.m-desc').textContent = p.desc + ' Stroj prochází třídenním testem v Třeboni před expedicí, dodáváme s 5letou zárukou na pohon a celorepublikovým servisem do 24 hodin.';
    m.querySelector('.m-specs').innerHTML = p.specs.map(s => `<span class="spec">${s}</span>`).join('');
    m.querySelector('.m-price').innerHTML = `${p.price.toLocaleString('cs-CZ')} Kč <small>bez DPH</small>`;
    m.classList.add('open');
  }
  document.addEventListener('click', e => {
    if (e.target.matches('.modal') || e.target.closest('.modal-close')) {
      document.querySelector('#modal').classList.remove('open');
    }
    if (e.target.closest('.m-inquiry')) {
      document.querySelector('#modal').classList.remove('open');
      toast('Přesměrováno na kontakt — vyplňte prosím formulář.');
      setTimeout(() => window.location.href = 'kontakt.html', 1200);
    }
  });
  render();
})();

// Kontaktní formulář
(function () {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.style.display = 'none';
    document.querySelector('#contact-success').style.display = 'block';
    toast('Děkujeme, ozveme se do 24 hodin.');
  });
  // Budget slider
  const b = form.querySelector('#budget');
  const bv = form.querySelector('#budget-val');
  if (b) { const upd = () => bv.textContent = (+b.value).toLocaleString('cs-CZ') + ' Kč'; b.addEventListener('input', upd); upd(); }
})();

// Gallery lightbox
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const m = document.querySelector('#modal');
    if (!m) return;
    m.querySelector('img').src = img.src;
    m.querySelector('.m-cat').textContent = 'Galerie';
    m.querySelector('.m-name').textContent = img.alt || 'Foto';
    m.querySelector('.m-desc').textContent = '';
    m.querySelector('.m-specs').innerHTML = '';
    m.querySelector('.m-price').textContent = '';
    m.classList.add('open');
  });
});

// Aktivní odkaz v menu
(function () {
  const path = location.pathname.split('/').pop() || 'traktor.html';
  document.querySelectorAll('.nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();
