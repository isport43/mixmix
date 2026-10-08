const root = document.querySelector('#site-root');
const loading = document.querySelector('#site-loading');

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const safeUrl = (value = '') => {
  const url = String(value).trim();
  if (url.startsWith('#') || url.startsWith('/') || url.startsWith('tel:')) return escapeHtml(url);
  if (/^https:\/\//i.test(url)) return escapeHtml(url);
  return '#';
};

const safePosition = (value = 'center') => /^[a-z0-9.% -]+$/i.test(String(value)) ? String(value) : 'center';

const iconCheck = (items = []) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');

function setMeta(site) {
  document.title = site.seo.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', site.seo.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', site.seo.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', site.seo.description);
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', site.hero.image);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', site.theme.pink);
  const properties = {
    '--pink': site.theme.pink,
    '--pink-dark': site.theme.pink_dark,
    '--ink': site.theme.ink,
    '--cream': site.theme.cream,
    '--yellow': site.theme.yellow,
    '--lavender': site.theme.lavender
  };
  Object.entries(properties).forEach(([name, value]) => document.documentElement.style.setProperty(name, value));
}

function render(site) {
  const year = new Date().getFullYear();
  const instagram = safeUrl(site.contact.instagram_url);
  const phone = safeUrl(`tel:${site.contact.primary_phone_href}`);

  root.innerHTML = `
    <header class="site-header px-4 md:px-[4vw]" data-header>
      <a class="brand" href="#top" aria-label="${escapeHtml(site.brand.name)} — на головну">
        <span class="brand-mark">M</span>
        <span class="brand-copy"><strong>${escapeHtml(site.brand.name)}</strong><small>${escapeHtml(site.brand.subtitle)}</small></span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-toggle>
        <span></span><span></span><span></span><span class="sr-only">Відкрити меню</span>
      </button>
      <nav class="site-nav" id="site-nav" data-menu>
        ${site.navigation.map((item) => `<a href="${safeUrl(item.href)}">${escapeHtml(item.label)}</a>`).join('')}
      </nav>
      <a class="header-phone" href="${phone}"><span>Телефонуйте</span><strong>${escapeHtml(site.contact.primary_phone_label)}</strong></a>
    </header>

    <main id="top">
      <section class="hero">
        <div class="hero-art" aria-hidden="true"><img src="${safeUrl(site.hero.image)}" alt="" fetchpriority="high" /><div class="hero-gradient"></div></div>
        <div class="hero-bubble bubble-one"></div><div class="hero-bubble bubble-two"></div>
        <div class="hero-content px-5 md:px-[4vw]">
          <p class="eyebrow light">${escapeHtml(site.hero.eyebrow)}</p>
          <h1>${escapeHtml(site.hero.title)}</h1>
          <p class="hero-description">${escapeHtml(site.hero.description)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="${instagram}" target="_blank" rel="noreferrer">${escapeHtml(site.hero.primary_button)}</a>
            <a class="button button-ghost" href="#services">${escapeHtml(site.hero.secondary_button)}</a>
          </div>
          <div class="hero-meta"><span class="location-dot"></span><span>${escapeHtml(site.hero.location)}</span></div>
        </div>
        <div class="hero-note"><span>↗</span><p>${escapeHtml(site.hero.floating_note)}</p></div>
        <a class="hero-scroll" href="#about" aria-label="Прокрутити до наступного розділу">↓</a>
      </section>

      <section class="intro section px-5 md:px-[5vw]" id="about">
        <div class="section-heading reveal"><p class="eyebrow">${escapeHtml(site.intro.kicker)}</p><h2>${escapeHtml(site.intro.title)}</h2></div>
        <div class="intro-layout">
          <p class="intro-text reveal">${escapeHtml(site.intro.text)}</p>
          <div class="stats">${site.intro.stats.map((stat) => `<article class="stat reveal"><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></article>`).join('')}</div>
        </div>
      </section>

      <section class="services section px-5 md:px-[5vw]" id="services">
        <div class="section-heading section-heading-wide reveal">
          <div><p class="eyebrow">${escapeHtml(site.services_section.kicker)}</p><h2>${escapeHtml(site.services_section.title)}</h2></div>
          <p>${escapeHtml(site.services_section.description)}</p>
        </div>
        <div class="service-grid">
          ${site.services.map((service, index) => `
            <article class="service-card reveal card-${index + 1}">
              <div class="service-media">
                <img src="${safeUrl(service.image)}" alt="${escapeHtml(service.image_alt)}" loading="lazy" style="object-position:${safePosition(service.image_position)}" />
                <span class="service-number">0${index + 1}</span><span class="service-tag">${escapeHtml(service.tag)}</span>
              </div>
              <div class="service-copy"><h3>${escapeHtml(service.title)}</h3><p>${escapeHtml(service.description)}</p><strong>${escapeHtml(service.price)}</strong></div>
            </article>`).join('')}
        </div>
      </section>

      <section class="benefits section section-dark px-5 md:px-[5vw]">
        <div class="section-heading section-heading-wide reveal"><div><p class="eyebrow light">${escapeHtml(site.benefits.kicker)}</p><h2>${escapeHtml(site.benefits.title)}</h2></div></div>
        <div class="benefit-grid">${site.benefits.items.map((item) => `<article class="benefit reveal"><span>${escapeHtml(item.icon)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join('')}</div>
      </section>

      <section class="pricing section px-5 md:px-[5vw]" id="prices">
        <div class="section-heading section-heading-wide reveal"><div><p class="eyebrow">${escapeHtml(site.pricing_section.kicker)}</p><h2>${escapeHtml(site.pricing_section.title)}</h2></div><p>${escapeHtml(site.pricing_section.note)}</p></div>
        <div class="price-grid">
          ${site.price_cards.map((card) => `<article class="price-card reveal${card.featured ? ' featured' : ''}">
            <p class="price-accent">${escapeHtml(card.accent)}</p><h3>${escapeHtml(card.name)}</h3>
            <div class="price-row"><strong>${escapeHtml(card.price)}</strong><span>${escapeHtml(card.duration)}</span></div>
            <ul>${iconCheck(card.includes)}</ul><a href="${instagram}" target="_blank" rel="noreferrer">Обрати програму <span>↗</span></a>
          </article>`).join('')}
        </div>
      </section>

      <section class="magic section px-5 md:px-[5vw]">
        <div class="magic-card reveal">
          <div class="magic-media"><img src="${safeUrl(site.extra_service.image)}" alt="${escapeHtml(site.extra_service.image_alt)}" loading="lazy" /></div>
          <div class="magic-copy"><p class="eyebrow">${escapeHtml(site.extra_service.title)}</p><h2>${escapeHtml(site.extra_service.name)}</h2><p>${escapeHtml(site.extra_service.description)}</p><strong>${escapeHtml(site.extra_service.price)}</strong></div>
        </div>
      </section>

      <section class="gallery-section section px-5 md:px-[5vw]" id="gallery">
        <div class="section-heading section-heading-wide reveal"><div><p class="eyebrow">${escapeHtml(site.gallery_section.kicker)}</p><h2>${escapeHtml(site.gallery_section.title)}</h2></div><p>${escapeHtml(site.gallery_section.description)}</p></div>
        <div class="gallery" aria-label="Галерея програм Mix Mix">
          ${site.gallery.map((item, index) => `<button class="gallery-card reveal" type="button" data-gallery-item data-src="${safeUrl(item.image)}" data-alt="${escapeHtml(item.alt)}"><img src="${safeUrl(item.image)}" alt="${escapeHtml(item.alt)}" loading="lazy" /><span><b>0${index + 1}</b>${escapeHtml(item.caption)}</span></button>`).join('')}
        </div>
        <a class="instagram-link reveal" href="${instagram}" target="_blank" rel="noreferrer">Більше свят в Instagram <span>↗</span></a>
      </section>

      <section class="terms section px-5 md:px-[5vw]" id="terms">
        <div class="section-heading reveal"><p class="eyebrow">${escapeHtml(site.terms_section.kicker)}</p><h2>${escapeHtml(site.terms_section.title)}</h2></div>
        <div class="faq-list">${site.terms_section.items.map((item, index) => `<details class="faq reveal"${index === 0 ? ' open' : ''}><summary><span>0${index + 1}</span><strong>${escapeHtml(item.question)}</strong><i></i></summary><p>${escapeHtml(item.answer)}</p></details>`).join('')}</div>
      </section>

      <section class="contact section px-5 md:px-[5vw]" id="contact">
        <div class="contact-orbit orbit-one"></div><div class="contact-orbit orbit-two"></div>
        <div class="contact-content reveal"><p class="eyebrow light">${escapeHtml(site.contact.kicker)}</p><h2>${escapeHtml(site.contact.title)}</h2><p>${escapeHtml(site.contact.text)}</p><a class="button button-white" href="${instagram}" target="_blank" rel="noreferrer">${escapeHtml(site.contact.button)}</a></div>
        <div class="contact-details reveal">
          <div><span>Телефони</span><a href="tel:${escapeHtml(site.contact.primary_phone_href)}">${escapeHtml(site.contact.primary_phone_label)}</a><a href="tel:${escapeHtml(site.contact.secondary_phone_href)}">${escapeHtml(site.contact.secondary_phone_label)}</a></div>
          <div><span>Соцмережі</span><a href="${instagram}" target="_blank" rel="noreferrer">Instagram ${escapeHtml(site.contact.instagram_label)}</a><a href="${safeUrl(site.contact.tiktok_url)}" target="_blank" rel="noreferrer">TikTok ${escapeHtml(site.contact.tiktok_label)}</a></div>
          <div><span>Працюємо</span><strong>${escapeHtml(site.contact.location)}</strong></div>
        </div>
      </section>
    </main>

    <footer>
      <div class="footer-brand"><span class="brand-mark">M</span><strong>${escapeHtml(site.brand.name)}</strong></div>
      <p>© ${year} ${escapeHtml(site.footer.copyright)}</p><small>${escapeHtml(site.footer.note)}</small>
    </footer>

    <a class="floating-contact" href="${instagram}" target="_blank" rel="noreferrer" aria-label="Написати Mix Mix в Instagram"><span>Написати</span><b>↗</b></a>
    <dialog class="lightbox" data-lightbox><button type="button" data-lightbox-close aria-label="Закрити">×</button><img src="" alt="" data-lightbox-image /></dialog>`;
}

function initInteractions() {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    menu?.classList.toggle('open', !open);
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menu?.classList.remove('open');
  }));

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  document.querySelectorAll('[data-gallery-item]').forEach((item) => item.addEventListener('click', () => {
    if (!(lightbox instanceof HTMLDialogElement) || !(lightboxImage instanceof HTMLImageElement)) return;
    lightboxImage.src = item.getAttribute('data-src') || '';
    lightboxImage.alt = item.getAttribute('data-alt') || '';
    lightbox.showModal();
  }));
  document.querySelector('[data-lightbox-close]')?.addEventListener('click', () => lightbox instanceof HTMLDialogElement && lightbox.close());
  lightbox?.addEventListener('click', (event) => event.target === lightbox && lightbox instanceof HTMLDialogElement && lightbox.close());
}

async function boot() {
  try {
    const response = await fetch('/content/site.yml', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Не вдалося завантажити контент (${response.status})`);
    const yamlText = await response.text();
    if (!window.jsyaml) throw new Error('Не завантажився YAML-парсер');
    const site = window.jsyaml.load(yamlText);
    setMeta(site);
    render(site);
    loading?.remove();
    initInteractions();
  } catch (error) {
    console.error(error);
    if (loading) loading.innerHTML = `<span class="brand-mark">!</span><h1>Не вдалося відкрити сайт</h1><p>${escapeHtml(error.message)}</p><a href="tel:+380685401101">Зателефонувати Mix Mix</a>`;
  }
}

boot();
