import type { SupportedLocale } from "../types/locales";

import { locales } from "../locales/locales.js";

export const suportedLocales = locales ? Object.keys(locales) : [];

export const getAutoLocale = () => {
    if (typeof document !== "undefined") {
        const html = document.querySelector("html");

        if (html) {
            const navLocale = html.lang.toLowerCase().split("-")[0];
            if (suportedLocales.includes(navLocale)) {
                return navLocale as SupportedLocale;
            }
        }
    } else if (typeof navigator !== "undefined" && navigator.language) {
        const navLocale = navigator.language.toLowerCase().split("-")[0];

        if (suportedLocales.includes(navLocale)) {
            return navLocale as SupportedLocale;
        } else {
            return "en" as SupportedLocale;
        }
    }

    return "en" as SupportedLocale;
};
