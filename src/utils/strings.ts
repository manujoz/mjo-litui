export const normalizeText = (text: string) => {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

export const uniqueId = () => {
    return `${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 10)}`;
};

export const convertToPx = (value: string | null): string | null => {
    if (value === null) return value;
    return isNaN(Number(value)) ? value : `${value}px`;
};
