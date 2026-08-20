var api = typeof chrome != "undefined" ? chrome : browser;

// List of supported languages
const supportedLangs = ["es", "it", "ru", "uk"];

// Get browser language
let lang = navigator.language || navigator.userLanguage; // e.g., "fr-FR"
lang = lang.slice(0, 2).toLowerCase(); // get first two letters: "fr"

api.storage.sync.get({ psscr: '' }, function(items) {
    let psscr = items.psscr;
    let baseFile;

    if (psscr == "pro") {
        baseFile = "options/options_pro";
    } else {
        baseFile = "options/options_mul";
    }

    // Add language suffix if supported
    let fileToOpen = supportedLangs.includes(lang) ? `${baseFile}_${lang}.html` : `${baseFile}.html`;

    window.location.href = fileToOpen;
});
