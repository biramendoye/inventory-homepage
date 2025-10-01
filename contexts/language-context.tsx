"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation data
const translations: Record<Language, any> = {
  fr: require("../locales/fr.json"),
  en: require("../locales/en.json"),
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("fibem-language") as Language;
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("fibem-language", lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  // Translation function with nested key support and parameter interpolation
  const t = (key: string, params?: Record<string, string | number>): any => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to French if key not found in current language
        let fallbackValue = translations.fr;
        for (const fallbackK of keys) {
          if (
            fallbackValue &&
            typeof fallbackValue === "object" &&
            fallbackK in fallbackValue
          ) {
            fallbackValue = fallbackValue[fallbackK];
          } else {
            return key; // Return key if not found in any language
          }
        }
        value = fallbackValue;
        break;
      }
    }

    // Return arrays and objects as-is
    if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
      return value;
    }

    if (typeof value !== "string") {
      return key;
    }

    // Replace parameters in the translation
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
