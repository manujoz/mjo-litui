import { expect } from "@esm-bundle/chai";
import { Cookies } from "../../src/lib/cookies.js";

suite("Cookies", () => {
    suite("get/set operations", () => {
        teardown(() => {
            // Clean up all cookies after each test
            document.cookie.split(";").forEach((cookie) => {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });
        });

        test("should set and get a simple cookie", () => {
            Cookies.set("test-cookie", "test-value");
            const value = Cookies.get("test-cookie");
            expect(value).to.equal("test-value");
        });

        test("should return undefined for non-existent cookie", () => {
            const value = Cookies.get("non-existent-cookie");
            expect(value).to.be.undefined;
        });

        test("should set cookie with expiration", () => {
            Cookies.set("expiring-cookie", "expiring-value", { expires: 1 });
            const value = Cookies.get("expiring-cookie");
            expect(value).to.equal("expiring-value");
        });

        test("should handle encoded values", () => {
            const specialValue = "special value with spaces & symbols!";
            Cookies.set("encoded-cookie", specialValue);
            const value = Cookies.get("encoded-cookie");
            expect(value).to.equal(specialValue);
        });

        test("should remove cookies", () => {
            Cookies.set("removable-cookie", "removable-value");
            expect(Cookies.get("removable-cookie")).to.equal("removable-value");

            Cookies.remove("removable-cookie");
            expect(Cookies.get("removable-cookie")).to.be.undefined;
        });
    });

    suite("compatibility with theme functionality", () => {
        teardown(() => {
            // Clean up theme cookie
            document.cookie = "mjo-theme=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        });

        test("should work with mjo-theme cookie like js-cookie", () => {
            // Test setting theme cookie with expires option like in mjo-theme.ts
            Cookies.set("mjo-theme", "dark", { expires: 365 });
            const theme = Cookies.get("mjo-theme");
            expect(theme).to.equal("dark");
        });

        test("should handle theme switching", () => {
            Cookies.set("mjo-theme", "light", { expires: 365 });
            expect(Cookies.get("mjo-theme")).to.equal("light");

            Cookies.set("mjo-theme", "dark", { expires: 365 });
            expect(Cookies.get("mjo-theme")).to.equal("dark");
        });
    });
});
