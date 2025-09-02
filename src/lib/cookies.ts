/**
 * Simple cookie utilities to replace js-cookie dependency
 */

export interface CookieOptions {
    expires?: number; // days
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
}

/**
 * Get cookie value by name
 */
function get(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(";").shift();
        return cookieValue ? decodeURIComponent(cookieValue) : undefined;
    }

    return undefined;
}

/**
 * Set cookie with options
 */
function set(name: string, value: string, options: CookieOptions = {}): void {
    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (options.expires !== undefined) {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
    }

    if (options.path) {
        cookieString += `; path=${options.path}`;
    } else {
        cookieString += "; path=/";
    }

    if (options.domain) {
        cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
        cookieString += "; secure";
    }

    if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
}

/**
 * Remove cookie
 */
function remove(name: string, options: Omit<CookieOptions, "expires"> = {}): void {
    set(name, "", { ...options, expires: -1 });
}

export const Cookies = {
    get,
    set,
    remove,
};

// Default export for compatibility
export default Cookies;
