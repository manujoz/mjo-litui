import { expect } from "@esm-bundle/chai";
import { html } from "lit";
import { allFixtures, createFixtureOptions } from "../fixtures/base-fixture.js";
import { assertIsConnected } from "../fixtures/test-utils.js";

/**
 * Test básico para verificar que los fixtures funcionan correctamente
 * Este test valida que la infraestructura de testing SSR está operativa
 */
suite("Fixture Infrastructure Validation", () => {
    // Test simple para verificar cada tipo de fixture
    for (const { name, fixture } of allFixtures) {
        test(`${name} fixture can render a basic element`, async () => {
            // Crear un elemento simple para testing
            const template = html`<div class="test-element">Hello ${name}</div>`;

            const options = createFixtureOptions({
                modules: [], // No necesitamos módulos para un div simple
            });

            // Renderizar usando el fixture
            const element = await fixture(template, options);

            // Verificaciones básicas
            expect(element).to.exist;
            assertIsConnected(element);
            expect(element.textContent?.trim()).to.include(`Hello ${name}`);
            expect(element.classList.contains("test-element")).to.be.true;
        });
    }

    // Test para verificar que todos los fixtures producen elementos similares
    test("All fixtures produce connected DOM elements", async () => {
        const template = html`<span class="fixture-test">Fixture Test</span>`;
        const options = createFixtureOptions({
            modules: [],
        });

        const results: Array<{ name: string; element: HTMLElement }> = [];

        // Renderizar con todos los fixtures
        for (const { name, fixture } of allFixtures) {
            const element = await fixture(template, options);
            results.push({ name, element });
        }

        // Verificar que todos produjeron elementos válidos
        for (const { name, element } of results) {
            expect(element, `${name} should produce a valid element`).to.exist;
            assertIsConnected(element, `${name} element should be connected`);
            expect(element.textContent?.trim(), `${name} should have correct text content`).to.equal("Fixture Test");
            expect(element.tagName.toLowerCase(), `${name} should produce a span element`).to.equal("span");
        }
    });

    // Test específico para verificar diferencias entre CSR y SSR
    test("CSR vs SSR fixture behavior differences", async () => {
        const template = html`<div data-test="ssr-csr-diff" class="comparison-test">Test Content</div>`;
        const options = createFixtureOptions({
            modules: [],
        });

        // Renderizar con CSR
        const csrElement = await allFixtures[0].fixture(template, options);

        // Renderizar con SSR sin hidratación
        const ssrElement = await allFixtures[1].fixture(template, options);

        // Renderizar con SSR + hidratación
        const ssrHydratedElement = await allFixtures[2].fixture(template, options);

        // Todos deben existir y estar conectados
        [csrElement, ssrElement, ssrHydratedElement].forEach((element, index) => {
            const names = ["CSR", "SSR-NonHydrated", "SSR-Hydrated"];
            expect(element, `${names[index]} element should exist`).to.exist;
            assertIsConnected(element, `${names[index]} element should be connected`);
            expect(element.hasAttribute("data-test"), `${names[index]} should have data-test attribute`).to.be.true;
            expect(element.getAttribute("data-test"), `${names[index]} should have correct data-test value`).to.equal("ssr-csr-diff");
        });

        // El contenido debe ser idéntico
        const expectedText = "Test Content";
        expect(csrElement.textContent?.trim()).to.equal(expectedText);
        expect(ssrElement.textContent?.trim()).to.equal(expectedText);
        expect(ssrHydratedElement.textContent?.trim()).to.equal(expectedText);
    });

    // Test para verificar que los fixtures pueden manejar templates más complejos
    test("Fixtures can handle complex templates", async () => {
        const complexTemplate = html`
            <div class="complex-container">
                <h1>Title</h1>
                <p class="description">This is a description</p>
                <ul class="list">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
                <div class="nested">
                    <span class="inner">Nested content</span>
                </div>
            </div>
        `;

        const options = createFixtureOptions({
            modules: [],
        });

        // Probar con SSR hydrated (el más complejo)
        const element = await allFixtures[2].fixture(complexTemplate, options);

        // Verificaciones estructurales
        expect(element).to.exist;
        assertIsConnected(element);
        expect(element.querySelector("h1")?.textContent).to.equal("Title");
        expect(element.querySelector(".description")?.textContent).to.equal("This is a description");
        expect(element.querySelectorAll("li")).to.have.length(3);
        expect(element.querySelector(".inner")?.textContent).to.equal("Nested content");
    });

    // Test para verificar comportamiento con templates vacíos
    test("Fixtures handle empty templates correctly", async () => {
        const emptyTemplate = html`<div></div>`;
        const options = createFixtureOptions({
            modules: [],
        });

        for (const { name, fixture } of allFixtures) {
            const element = await fixture(emptyTemplate, options);

            expect(element, `${name} should handle empty template`).to.exist;
            assertIsConnected(element, `${name} element should be connected`);
            expect(element.tagName.toLowerCase(), `${name} should create div element`).to.equal("div");
            expect(element.textContent?.trim(), `${name} should have empty text content`).to.equal("");
        }
    });
});

/**
 * Test suite para verificar funcionalidades específicas de testing utils
 */
suite("Test Utils Validation", () => {
    test("Test utils work with fixture-generated elements", async () => {
        const template = html`
            <div class="utils-test" data-custom="test-value">
                <span class="inner">Inner content</span>
            </div>
        `;

        const options = createFixtureOptions({
            modules: [],
        });

        const element = await allFixtures[0].fixture(template, options);

        // Verificar que las utilidades funcionan correctamente
        assertIsConnected(element);

        // Verificar búsqueda dentro del elemento
        const innerSpan = element.querySelector(".inner");
        expect(innerSpan).to.exist;
        expect(innerSpan?.textContent).to.equal("Inner content");

        // Verificar atributos
        expect(element.hasAttribute("data-custom")).to.be.true;
        expect(element.getAttribute("data-custom")).to.equal("test-value");

        // Verificar clases
        expect(element.classList.contains("utils-test")).to.be.true;
    });
});
