(() => {
  const SUPPORTED = ["ko", "en"];
  const STORAGE_KEY = "unitpick-lang";

  const requested = new URLSearchParams(location.search).get("lang");
  const saved = localStorage.getItem(STORAGE_KEY);
  const system = (navigator.language || "en").slice(0, 2).toLowerCase();
  const pick = (value) => (SUPPORTED.includes(value) ? value : null);
  let language = pick(requested) || pick(saved) || pick(system) || "en";

  function render(next) {
    language = next;
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;

    const copy = window.UNITPICK_TRANSLATIONS[language];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = copy[el.dataset.i18n];
      if (value) el.textContent = value;
    });
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === language);
    });

    // 언어를 유지한 채 페이지를 오가게 한다.
    document.querySelectorAll(".privacy-link").forEach((a) => {
      a.href = `privacy/?lang=${language}`;
    });
    document.querySelectorAll(".home-link").forEach((a) => {
      a.href = `../?lang=${language}`;
    });

    document.querySelectorAll("[data-shot]").forEach((img) => {
      img.src = `assets/app-home-phone-${language}.png`;
    });
    document.querySelectorAll("[data-shot-prefs]").forEach((img) => {
      img.src = `assets/app-prefs-phone-${language}.png`;
    });

    const host = document.querySelector("#policy-sections");
    if (host) {
      host.replaceChildren(
        ...copy.policySections.map(([title, body]) => {
          const section = document.createElement("section");
          const h2 = document.createElement("h2");
          const p = document.createElement("p");
          h2.textContent = title;
          p.textContent = body;
          section.append(h2, p);
          return section;
        })
      );
    }
  }

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => render(button.dataset.lang));
  });

  render(language);
})();
