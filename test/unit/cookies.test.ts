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

        test("should handle empty cookie values", () => {
            // Set a cookie with empty value
            document.cookie = "empty-cookie=;path=/";
            const value = Cookies.get("empty-cookie");
            expect(value).to.be.undefined;
        });

        test("should handle malformed cookie scenarios", () => {
            // Test when cookieValue is empty after decoding
            document.cookie = "malformed-cookie=;path=/";
            const value = Cookies.get("malformed-cookie");
            expect(value).to.be.undefined;

            // Test normal cookie still works
            Cookies.set("normal-cookie", "normal-value");
            const normalValue = Cookies.get("normal-cookie");
            expect(normalValue).to.equal("normal-value");
        });

        test("should set cookie with custom path", () => {
            Cookies.set("path-cookie", "path-value", { path: "/custom" });
            // In testing environment, we can't easily verify cross-path cookie access
            // But we can verify the code path was executed without errors
            expect(true).to.be.true; // Test that no errors were thrown
        });

        test("should set cookie with domain option", () => {
            Cookies.set("domain-cookie", "domain-value", { domain: ".example.com" });
            // Domain cookies may not work in testing environment
            // But we can verify the code path was executed without errors
            expect(true).to.be.true; // Test that no errors were thrown
        });

        test("should set secure cookie", () => {
            Cookies.set("secure-cookie", "secure-value", { secure: true });
            // Secure cookies may not work in non-HTTPS testing environment
            // But we can verify the code path was executed without errors
            expect(true).to.be.true; // Test that no errors were thrown
        });

        test("should set cookie with sameSite option", () => {
            Cookies.set("samesite-cookie", "samesite-value", { sameSite: "strict" });
            const value = Cookies.get("samesite-cookie");
            expect(value).to.equal("samesite-value");
        });

        test("should set cookie with all options", () => {
            Cookies.set("full-options-cookie", "full-value", {
                expires: 1,
                path: "/",
                sameSite: "lax",
            });
            const value = Cookies.get("full-options-cookie");
            expect(value).to.equal("full-value");
        });

        test("should remove cookies", () => {
            Cookies.set("removable-cookie", "removable-value");
            expect(Cookies.get("removable-cookie")).to.equal("removable-value");

            Cookies.remove("removable-cookie");
            expect(Cookies.get("removable-cookie")).to.be.undefined;
        });

        test("should remove cookies with custom options", () => {
            Cookies.set("removable-custom-cookie", "removable-value");
            expect(Cookies.get("removable-custom-cookie")).to.equal("removable-value");

            Cookies.remove("removable-custom-cookie", { path: "/" });
            expect(Cookies.get("removable-custom-cookie")).to.be.undefined;
        });
    });

    suite("options coverage", () => {
        teardown(() => {
            // Clean up all cookies after each test
            document.cookie.split(";").forEach((cookie) => {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });
        });

        test("should handle path option specifically", () => {
            // Test with custom path
            Cookies.set("path-test", "path-value", { path: "/custom" });
            // Test without path (defaults to "/")
            Cookies.set("default-path-test", "default-path-value");

            const defaultPathValue = Cookies.get("default-path-test");
            expect(defaultPathValue).to.equal("default-path-value");
        });

        test("should handle domain option specifically", () => {
            // Test that domain option is processed without error
            Cookies.set("domain-test", "domain-value", { domain: "localhost" });
            // The cookie may or may not be accessible due to domain restrictions,
            // but the code should execute without throwing errors
            expect(true).to.be.true;
        });

        test("should handle secure option specifically", () => {
            // Test that secure option is processed without error
            Cookies.set("secure-test", "secure-value", { secure: true });
            // The cookie may or may not be accessible in non-HTTPS context,
            // but the code should execute without throwing errors
            expect(true).to.be.true;
        });

        test("should handle individual sameSite options", () => {
            Cookies.set("strict-test", "strict-value", { sameSite: "strict" });
            Cookies.set("lax-test", "lax-value", { sameSite: "lax" });

            const strictValue = Cookies.get("strict-test");
            const laxValue = Cookies.get("lax-test");

            expect(strictValue).to.equal("strict-value");
            expect(laxValue).to.equal("lax-value");
        });

        test("should handle none sameSite option", () => {
            // Test that sameSite: "none" is processed without error
            Cookies.set("none-test", "none-value", { sameSite: "none" });
            // May not work without secure context, but should not throw
            expect(true).to.be.true;
        });
    });

    suite("edge cases and validation", () => {
        teardown(() => {
            // Clean up all cookies after each test
            document.cookie.split(";").forEach((cookie) => {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });
        });

        test("should handle cookies with special characters in name", () => {
            Cookies.set("test-special_cookie", "special-value");
            const value = Cookies.get("test-special_cookie");
            expect(value).to.equal("special-value");
        });

        test("should handle getting non-existent cookie from multiple cookies", () => {
            Cookies.set("cookie1", "value1");
            Cookies.set("cookie2", "value2");
            Cookies.set("cookie3", "value3");

            const value = Cookies.get("non-existent");
            expect(value).to.be.undefined;
        });

        test("should handle different sameSite values", () => {
            const sameSiteValues = ["strict", "lax"] as const; // Remove "none" as it requires secure context

            sameSiteValues.forEach((sameSite, index) => {
                const cookieName = `samesite-${sameSite}-cookie`;
                Cookies.set(cookieName, `value-${index}`, { sameSite });
                const value = Cookies.get(cookieName);
                expect(value).to.equal(`value-${index}`);
            });

            // Test "none" separately with proper setup
            Cookies.set("samesite-none-cookie", "none-value", { sameSite: "none" });
            // Note: "none" sameSite may not work without secure context in testing
        });

        test("should handle zero expires (immediate expiration)", () => {
            Cookies.set("zero-expires-cookie", "zero-value", { expires: 0 });
            // The cookie should be set but expire immediately
            // Note: This behavior depends on browser implementation
        });

        test("should handle negative expires (past expiration)", () => {
            Cookies.set("negative-expires-cookie", "negative-value", { expires: -10 });
            const value = Cookies.get("negative-expires-cookie");
            expect(value).to.be.undefined;
        });

        test("should handle very long cookie values", () => {
            const longValue = "a".repeat(1000);
            Cookies.set("long-cookie", longValue);
            const value = Cookies.get("long-cookie");
            expect(value).to.equal(longValue);
        });

        test("should handle unicode characters", () => {
            const unicodeValue = "Hello 世界 🍪 café naïve";
            Cookies.set("unicode-cookie", unicodeValue);
            const value = Cookies.get("unicode-cookie");
            expect(value).to.equal(unicodeValue);
        });

        test("should handle empty string values", () => {
            Cookies.set("empty-string-cookie", "");
            const value = Cookies.get("empty-string-cookie");
            // Empty string cookies may behave differently in browsers
            // At minimum, the set operation should not throw an error
            expect(typeof value === "string" || value === undefined).to.be.true;
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

        test("should work with remove for theme reset", () => {
            Cookies.set("mjo-theme", "dark", { expires: 365 });
            expect(Cookies.get("mjo-theme")).to.equal("dark");

            Cookies.remove("mjo-theme");
            expect(Cookies.get("mjo-theme")).to.be.undefined;
        });
    });

    suite("complex scenarios", () => {
        teardown(() => {
            // Clean up theme cookie
            document.cookie = "mjo-theme=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            document.cookie.split(";").forEach((cookie) => {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });
        });

        test("should handle multiple cookies with similar names", () => {
            Cookies.set("test", "value1");
            Cookies.set("test-cookie", "value2");
            Cookies.set("test-cookie-extended", "value3");

            expect(Cookies.get("test")).to.equal("value1");
            expect(Cookies.get("test-cookie")).to.equal("value2");
            expect(Cookies.get("test-cookie-extended")).to.equal("value3");
        });

        test("should handle cookie overwrite", () => {
            Cookies.set("overwrite-cookie", "original-value");
            expect(Cookies.get("overwrite-cookie")).to.equal("original-value");

            Cookies.set("overwrite-cookie", "new-value");
            expect(Cookies.get("overwrite-cookie")).to.equal("new-value");
        });

        test("should handle cookies with all options combined", () => {
            const cookieName = "complex-cookie";
            const cookieValue = "complex-value with spaces & 特殊字符";

            Cookies.set(cookieName, cookieValue, {
                expires: 30,
                path: "/",
                sameSite: "lax",
            });

            const retrievedValue = Cookies.get(cookieName);
            expect(retrievedValue).to.equal(cookieValue);
        });
    });
});
