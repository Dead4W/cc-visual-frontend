import { createI18n } from "vue-i18n";
import langMessages from "./locales";

// Определяем предустановленный язык браузера и устанавливаем его при запуске
function detectLanguage() {
  let lng = window.navigator.userLanguage ?? window.navigator.language;
  const locales = Object.keys(langMessages);

  let lang = null;

  if (lng) {
    lng = lng.toLowerCase();
    lang = locales.find((key) => lng === key);
  }

  if (!lang) {
    for (let lng of window.navigator.languages) {
      lng = lng.toLowerCase();

      lang = locales.find((key) => lng === key);

      if (lang) {
        break;
      }
    }
  }

  return lang ?? null;
}

export default createI18n({
  locale:
    localStorage.getItem("lang") ||
    detectLanguage() || import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: langMessages,
});
