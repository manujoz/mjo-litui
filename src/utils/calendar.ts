import { SupportedLocale } from "../types/locales.js";

export class CalendarUtils {
    static isSameDay(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    }

    static formatDate(date: Date): string {
        // Use local timezone formatting instead of UTC to avoid timezone offset issues
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    static getDateLocale(locale: SupportedLocale): string {
        const localeMap: Record<SupportedLocale, string> = {
            en: "en-US",
            es: "es-ES",
            fr: "fr-FR",
            pt: "pt-PT",
            it: "it-IT",
            de: "de-DE",
            nl: "nl-NL",
            bg: "bg-BG",
            sr: "sr-RS",
            ru: "ru-RU",
            zh: "zh-CN",
            ja: "ja-JP",
            ko: "ko-KR",
            tr: "tr-TR",
            pl: "pl-PL",
        };
        return localeMap[locale] || "en-US";
    }

    static isDateDisabled(date: Date, disabled: boolean, minDate?: string, maxDate?: string, disabledDates?: string[]): boolean {
        if (disabled) return true;

        if (minDate) {
            const min = new Date(minDate);
            if (date < min) return true;
        }

        if (maxDate) {
            const max = new Date(maxDate);
            if (date > max) return true;
        }

        if (disabledDates) {
            const dateStr = CalendarUtils.formatDate(date);
            return disabledDates.includes(dateStr);
        }

        return false;
    }
}
