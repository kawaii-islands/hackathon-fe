import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import vi from "./vi";

const hasWindow = typeof window !== "undefined";
const initLang = hasWindow
  ? window.localStorage.getItem("locale") || "en"
  : "en";

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: initLang,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
