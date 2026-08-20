var api = typeof chrome != "undefined" ? chrome : browser;

// List of supported languages
const supportedLangs = ["es", "it", "ru", "uk"];

// Get browser language
let lang = navigator.language || navigator.userLanguage; // e.g., "fr-FR"
lang = lang.slice(0, 2).toLowerCase(); // get first two letters: "fr"

// Open-source build: license tiers removed, single options page
let fileToOpen = supportedLangs.includes(lang) ? `options/options_mul_${lang}.html` : "options/options_mul.html";

window.location.href = fileToOpen;
