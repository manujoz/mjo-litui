import { locales } from "../locales/locales";

export const getDictionary = (lang: keyof typeof locales) => {
    return locales[lang] || locales.en;
};
