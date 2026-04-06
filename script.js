const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const languageButtons = document.querySelectorAll(".lang-toggle");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

if (languageButtons.length) {
  const searchParams = new URLSearchParams(window.location.search);
  const urlLang = (searchParams.get("lang") || "").toLowerCase();
  const htmlLang = (document.documentElement.lang || "en").toLowerCase();
  const isSpanish = urlLang === "es" || htmlLang.startsWith("es");

  languageButtons.forEach((button) => {
    button.textContent = isSpanish ? "Translate to English" : "Translate to Spanish";
    button.setAttribute(
      "aria-label",
      isSpanish ? "Translate website to English" : "Translate website to Spanish"
    );

    button.addEventListener("click", () => {
      const targetLanguage = isSpanish ? "en" : "es";
      const translatedUrl = `https://translate.google.com/translate?sl=auto&tl=${targetLanguage}&u=${encodeURIComponent(window.location.href)}`;
      window.location.href = translatedUrl;
    });
  });
}
