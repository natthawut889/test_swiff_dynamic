import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';


i18next
.use(LanguageDetector)
.use(initReactI18next)
.init({
  fallbackLng: "th",
  backend: {
    loadPath: '/locales/{{lng}}.json'
  },
  interpolation: {
    escapeValue: false
  }
})

export default i18next;

