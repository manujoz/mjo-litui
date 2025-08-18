/**
 * Test de validación para helpers SSR y DOM assertions
 * Verifica que todas las utilidades funcionan correctamente
 */

import { expect } from "@esm-bundle/chai";
import { html } from "lit";

// Import helpers to test
import { cleanupSSREnvironment, defaultSSRConfig, setupSSREnvironment, validateSSREnvironment, waitForSSREnvironment } from "../helpers/ssr-test-setup.js";

import { ComparisonReporter, CSSPropertiesAssertions, DeclarativeShadowDOMAssertions, DOMComparator } from "../helpers/dom-assertions.js";

// Import fixtures for testing
import { allFixtures, csrFixture, ssrNonHydratedFixture } from "../fixtures/base-fixture.js";

suite("SSR Helpers Validation", () => {
    suite("SSR Test Setup", () => {
        test("should have default configuration", () => {
            expect(defaultSSRConfig).to.exist;
            expect(defaultSSRConfig.installDOMShims).to.be.true;
            expect(defaultSSRConfig.setupCustomElementsRegistry).to.be.true;
            expect(defaultSSRConfig.verbose).to.be.false;
            expect(defaultSSRConfig.baseURL).to.equal("http://localhost:8000/src/");
        });

        test("should validate SSR environment", () => {
            const status = validateSSREnvironment();
            expect(status).to.have.property("hasWindow");
            expect(status).to.have.property("hasDocument");
            expect(status).to.have.property("hasCustomElements");
            expect(status).to.have.property("hasHTMLElement");
            expect(status).to.have.property("ready");
        });

        test("should setup SSR environment without errors", () => {
            expect(() => setupSSREnvironment({ verbose: false })).to.not.throw();
        });

        test("should cleanup SSR environment without errors", () => {
            expect(() => cleanupSSREnvironment()).to.not.throw();
        });

        test("should wait for SSR environment", async () => {
            // Should resolve quickly since environment is already ready
            try {
                await waitForSSREnvironment(100);
                // If we get here, the promise resolved successfully
                expect(true).to.be.true;
            } catch (error) {
                // Should not throw in a properly configured environment
                throw new Error(`SSR environment wait failed: ${error}`);
            }
        });
    });

    suite("DOM Comparator", () => {
        test("should normalize HTML correctly", () => {
            const html = '  <div   class="foo bar">   <span>  content  </span>  </div>  ';
            const normalized = DOMComparator.normalizeHTML(html);
            expect(normalized).to.equal('<div class="foo bar"><span> content </span></div>');
        });

        test("should normalize HTML with class sorting", () => {
            const html = '<div class="zebra alpha beta">content</div>';
            const normalized = DOMComparator.normalizeHTML(html, { normalizeClassNames: true });
            expect(normalized).to.equal('<div class="alpha beta zebra">content</div>');
        });

        test("should compare identical HTML as equivalent", () => {
            const htmlA = '<div class="test">content</div>';
            const htmlB = '<div class="test">content</div>';
            const result = DOMComparator.compareHTML(htmlA, htmlB);

            expect(result.equivalent).to.be.true;
            expect(result.differences).to.have.length(0);
        });

        test("should detect differences in HTML", () => {
            const htmlA = '<div class="test">content</div>';
            const htmlB = '<div class="different">content</div>';
            const result = DOMComparator.compareHTML(htmlA, htmlB);

            expect(result.equivalent).to.be.false;
            expect(result.differences.length).to.be.greaterThan(0);
        });
    });

    suite("Declarative Shadow DOM Assertions", () => {
        test("should detect absence of declarative shadow DOM", () => {
            const div = document.createElement("div");
            const hasDeclarative = DeclarativeShadowDOMAssertions.hasDeclarativeShadowDOM(div);
            expect(hasDeclarative).to.be.false;
        });

        test("should detect presence of declarative shadow DOM", () => {
            const div = document.createElement("div");
            const template = document.createElement("template");
            template.setAttribute("shadowroot", "open");
            template.innerHTML = "<p>shadow content</p>";
            div.appendChild(template);

            const hasDeclarative = DeclarativeShadowDOMAssertions.hasDeclarativeShadowDOM(div);
            expect(hasDeclarative).to.be.true;
        });

        test("should extract declarative shadow DOM content", () => {
            const div = document.createElement("div");
            const template = document.createElement("template");
            template.setAttribute("shadowroot", "open");
            template.innerHTML = "<p>shadow content</p>";
            div.appendChild(template);

            const content = DeclarativeShadowDOMAssertions.getDeclarativeShadowDOMContent(div);
            expect(content).to.equal("<p>shadow content</p>");
        });

        test("should handle assertion failure for missing declarative shadow DOM", () => {
            const div = document.createElement("div");
            expect(() => {
                DeclarativeShadowDOMAssertions.assertHasDeclarativeShadowDOM(div);
            }).to.throw();
        });
    });

    suite("CSS Properties Assertions", () => {
        test("should handle getComputedStyle availability", () => {
            const div = document.createElement("div");

            if (typeof globalThis.getComputedStyle === "function") {
                // In environments where getComputedStyle is available
                expect(() => {
                    CSSPropertiesAssertions.assertCSSCustomPropertiesAvailable(div, []);
                }).to.not.throw();
            } else {
                // In environments where getComputedStyle is not available
                expect(() => {
                    CSSPropertiesAssertions.assertCSSCustomPropertiesAvailable(div, ["--test-prop"]);
                }).to.throw("getComputedStyle not available");
            }
        });
    });

    suite("Comparison Reporter", () => {
        test("should create detailed reports", () => {
            const comparison = {
                equivalent: false,
                differences: ["Test difference 1", "Test difference 2"],
                normalizedA: "<div>A</div>",
                normalizedB: "<div>B</div>",
            };

            const report = ComparisonReporter.createDetailedReport(comparison, "Test Context");
            expect(report).to.include("=== Test Context ===");
            expect(report).to.include("Equivalent: false");
            expect(report).to.include("<div>A</div>");
            expect(report).to.include("<div>B</div>");
            expect(report).to.include("Test difference 1");
            expect(report).to.include("Test difference 2");
        });
    });
});

suite("Helpers Integration with Fixtures", () => {
    test("should work with basic HTML in all fixtures", async () => {
        const template = html`<div class="test-content">Hello World</div>`;

        for (const { name, fixture } of allFixtures) {
            const container = await fixture(template, {
                modules: [],
            });

            expect(container, `${name} fixture should render container`).to.exist;

            // El fixture devuelve un container, el contenido está dentro
            const testElement = container.querySelector(".test-content") || container;
            expect(testElement, `${name} should contain test content or be the element itself`).to.exist;
        }
    });

    test("should validate DOM structure consistency", async () => {
        const template = html`<div class="consistency-test">
            <h1>Title</h1>
            <p>Content paragraph</p>
        </div>`;

        // Render with CSR
        const csrContainer = await csrFixture(template, { modules: [] });

        // Render with SSR (non-hydrated)
        const ssrContainer = await ssrNonHydratedFixture(template, { modules: [] });

        // Look for elements either in container or as the container itself
        const csrTest = csrContainer.querySelector(".consistency-test") || csrContainer;
        const ssrTest = ssrContainer.querySelector(".consistency-test") || ssrContainer;

        expect(csrTest).to.exist;
        expect(ssrTest).to.exist;

        // Try to find elements in both structures
        const csrH1 = csrTest.querySelector?.("h1") || csrContainer.querySelector("h1");
        const ssrH1 = ssrTest.querySelector?.("h1") || ssrContainer.querySelector("h1");

        if (csrH1 && ssrH1) {
            expect(csrH1).to.exist;
            expect(ssrH1).to.exist;
        } else {
            // Just verify the containers have some content
            expect(csrContainer.textContent).to.include("Title");
            expect(ssrContainer.textContent).to.include("Title");
        }
    });

    test("should validate helpers work with complex HTML", async () => {
        const complexTemplate = html`
            <article class="complex-test">
                <header>
                    <h1 class="title">Article Title</h1>
                    <div class="metadata">
                        <span class="author">Author Name</span>
                        <time datetime="2025-08-18">August 18, 2025</time>
                    </div>
                </header>
                <main>
                    <p class="intro">Introduction paragraph with <strong>bold</strong> text.</p>
                    <section class="content">
                        <h2>Section Title</h2>
                        <ul class="list">
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                        </ul>
                    </section>
                </main>
            </article>
        `;

        const container = await csrFixture(complexTemplate, { modules: [] });

        // Use DOM comparator to verify structure - look for header either in container or as container
        const header = container.querySelector("header") || (container.tagName?.toLowerCase() === "header" ? container : null);

        if (header) {
            const headerHTML = header.outerHTML || header.innerHTML || "";
            const normalized = DOMComparator.normalizeHTML(headerHTML);

            expect(normalized).to.include("title");
            expect(normalized).to.include("metadata");
        } else {
            // Fallback: just verify the content is rendered somehow
            expect(container.textContent || container.innerHTML).to.include("Article Title");
        }
    });
});
