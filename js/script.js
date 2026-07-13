// ==========================================================
// script.js — tema (claro/escuro), idioma (PT/EN) e menu mobile
// ==========================================================

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const langToggle = document.getElementById("langToggle");
const langLabel = document.getElementById("langLabel");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// ---------- TEMA ----------
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
  localStorage.setItem("theme", theme);
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
}

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

// ---------- IDIOMA ----------
function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  root.setAttribute("lang", lang);
  langLabel.textContent = lang.toUpperCase();
  localStorage.setItem("lang", lang);
}

function initLanguage() {
  const saved = localStorage.getItem("lang");
  applyLanguage(saved || "pt");
}

langToggle.addEventListener("click", () => {
  const current = localStorage.getItem("lang") || "pt";
  applyLanguage(current === "pt" ? "en" : "pt");
});

// ---------- MENU MOBILE ----------
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ---------- INIT ----------
initTheme();
initLanguage();
