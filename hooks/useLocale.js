import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useLocale() {
  const { i18n } = useTranslation();
  const hasWindow = typeof window !== "undefined";
  const currentLocale = hasWindow
    ? window.localStorage.getItem("locale") || "en"
    : "en";
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    if (hasWindow) {
      setLocale(currentLocale);
      i18n.changeLanguage(currentLocale);
    }
  }, [currentLocale]);

  const changeLocale = (locale) => {
    if (hasWindow) {
      i18n.changeLanguage(locale);
      setLocale(locale);
      window.localStorage.setItem("locale", locale);
    }
  };

  return { locale, changeLocale };
}
