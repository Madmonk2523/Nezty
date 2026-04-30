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

const upcomingDatesList = document.querySelector("#upcoming-dates");

if (upcomingDatesList) {
  const classDates = [
    "2026-04-18",
    "2026-04-19",
    "2026-04-20",
    "2026-04-25",
    "2026-04-26",
    "2026-04-27",
    "2026-05-02",
    "2026-05-03",
    "2026-05-04",
    "2026-05-09",
    "2026-05-10",
    "2026-05-11",
    "2026-05-16",
    "2026-05-17",
    "2026-05-18",
    "2026-05-23",
    "2026-05-24",
    "2026-05-25",
    "2026-05-30",
    "2026-05-31",
    "2026-06-01",
    "2026-06-06",
    "2026-06-07",
    "2026-06-08",
    "2026-06-13",
    "2026-06-14",
    "2026-06-15",
    "2026-06-20",
    "2026-06-21",
    "2026-06-22",
    "2026-06-27",
    "2026-06-28",
    "2026-06-29",
    "2026-07-04",
    "2026-07-05",
    "2026-07-06",
    "2026-07-11",
    "2026-07-12",
    "2026-07-13",
    "2026-07-18",
    "2026-07-19",
    "2026-07-20",
    "2026-07-25",
    "2026-07-26",
    "2026-07-27"
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingDates = classDates
    .map((date) => new Date(`${date}T00:00:00`))
    .filter((date) => date >= today)
    .slice(0, 6);

  if (!upcomingDates.length) {
    const item = document.createElement("li");
    item.textContent = "New dates coming soon. Contact us to join the waitlist.";
    upcomingDatesList.appendChild(item);
  } else {
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    upcomingDates.forEach((date) => {
      const item = document.createElement("li");
      item.textContent = formatter.format(date);
      upcomingDatesList.appendChild(item);
    });
  }
}
