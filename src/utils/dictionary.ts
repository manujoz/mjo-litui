import { locales } from "../locales/locales.js";

export const getDictionary = (lang: keyof typeof locales) => {
    return locales[lang] || locales.en;
};
