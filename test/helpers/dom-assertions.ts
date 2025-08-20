/**
 * DOM Assertions - Aserciones específicas para DOM y Shadow DOM en tests SSR/CSR
 * Proporciona utilities avanzadas para validar renderizado en diferentes modos
 */

import { expect } from "@esm-bundle/chai";

/**
 * Opciones para comparaciones DOM
 */
export interface DOMComparisonOptions {
    /** Ignorar atributos específicos en la comparación */
    ignoreAttributes?: string[];
    /** Ignorar diferencias en whitespace */
    ignoreWhitespace?: boolean;
    /** Normalizar nombres de clases CSS */
    normalizeClassNames?: boolean;
    /** Modo verbose para debugging */
    verbose?: boolean;
}

/**
 * Resultado de comparación DOM
 */
export interface DOMComparisonResult {
    /** Si las estructuras son equivalentes */
    equivalent: boolean;
    /** Diferencias encontradas */
    differences: string[];
    /** HTML normalizado del elemento A */
    normalizedA: string;
    /** HTML normalizado del elemento B */
    normalizedB: string;
}

/**
 * Aserciones específicas para Declarative Shadow DOM
 */
export class DeclarativeShadowDOMAssertions {
    /**
     * Verifica que un elemento tiene declarative shadow DOM (template[shadowroot])
     */
    static hasDeclarativeShadowDOM(element: Element): boolean {
        const template = element.querySelector("template[shadowroot]");
        return template !== null;
    }

    /**
     * Aseserción: elemento debe tener declarative shadow DOM
     */
    static assertHasDeclarativeShadowDOM(element: Element, message?: string): void {
        const hasIt = this.hasDeclarativeShadowDOM(element);
        expect(hasIt, message || "Element should have declarative shadow DOM").to.be.true;
    }

    /**
     * Obtiene el contenido del declarative shadow DOM
     */
    static getDeclarativeShadowDOMContent(element: Element): string | null {
        const template = element.querySelector("template[shadowroot]") as HTMLTemplateElement;
        return template ? template.innerHTML : null;
    }

    /**
     * Compara declarative shadow DOM con shadow root hidratado
     */
    static compareDeclarativeWithHydrated(ssrElement: Element, hydratedElement: Element, options: DOMComparisonOptions = {}): DOMComparisonResult {
        const declarativeContent = this.getDeclarativeShadowDOMContent(ssrElement);
        const hydratedContent = hydratedElement.shadowRoot?.innerHTML || "";

        if (!declarativeContent) {
            return {
                equivalent: false,
                differences: ["SSR element does not have declarative shadow DOM"],
                normalizedA: "",
                normalizedB: hydratedContent,
            };
        }

        return DOMComparator.compareHTML(declarativeContent, hydratedContent, options);
    }
}

/**
 * Utilidades para comparar estructuras DOM
 */
export class DOMComparator {
    /**
     * Normaliza HTML para comparación
     */
    static normalizeHTML(html: string, options: DOMComparisonOptions = {}): string {
        let normalized = html;

        // Ignorar whitespace
        if (options.ignoreWhitespace !== false) {
            normalized = normalized
                .replace(/\s+/g, " ") // Multiple spaces to single
                .replace(/>\s+</g, "><") // Remove spaces between tags
                .trim();
        }

        // Normalizar nombres de clases
        if (options.normalizeClassNames) {
            normalized = normalized.replace(/class="([^"]*)"/g, (match, classes) => {
                const sortedClasses = classes.split(/\s+/).sort().join(" ");
                return `class="${sortedClasses}"`;
            });
        }

        return normalized;
    }

    /**
     * Compara dos strings de HTML
     */
    static compareHTML(htmlA: string, htmlB: string, options: DOMComparisonOptions = {}): DOMComparisonResult {
        const normalizedA = this.normalizeHTML(htmlA, options);
        const normalizedB = this.normalizeHTML(htmlB, options);

        const equivalent = normalizedA === normalizedB;
        const differences: string[] = [];

        if (!equivalent) {
            differences.push(`HTML content differs:`);
            differences.push(`  Expected: ${normalizedA}`);
            differences.push(`  Actual:   ${normalizedB}`);
        }

        if (options.verbose) {
            console.log("DOM Comparison Result:", {
                equivalent,
                normalizedA,
                normalizedB,
                differences,
            });
        }

        return {
            equivalent,
            differences,
            normalizedA,
            normalizedB,
        };
    }

    /**
     * Compara dos elementos DOM
     */
    static compareElements(elementA: Element, elementB: Element, options: DOMComparisonOptions = {}): DOMComparisonResult {
        let htmlA = elementA.outerHTML;
        let htmlB = elementB.outerHTML;

        // Remover atributos ignorados
        if (options.ignoreAttributes) {
            const tempA = elementA.cloneNode(true) as Element;
            const tempB = elementB.cloneNode(true) as Element;

            options.ignoreAttributes.forEach((attr) => {
                tempA.removeAttribute(attr);
                tempB.removeAttribute(attr);
            });

            htmlA = tempA.outerHTML;
            htmlB = tempB.outerHTML;
        }

        return this.compareHTML(htmlA, htmlB, options);
    }
}

/**
 * Aserciones específicas para Shadow DOM
 */
export class ShadowDOMAssertions {
    /**
     * Verifica si el shadow DOM de CSR y SSR son equivalentes después de hidratación
     */
    static assertShadowDOMEquivalent(csrElement: Element, ssrElement: Element, options: DOMComparisonOptions = {}): void {
        const csrShadow = csrElement.shadowRoot;
        const ssrShadow = ssrElement.shadowRoot;

        expect(csrShadow, "CSR element should have shadow root").to.exist;
        expect(ssrShadow, "SSR element should have shadow root after hydration").to.exist;

        const comparison = DOMComparator.compareHTML(csrShadow!.innerHTML, ssrShadow!.innerHTML, options);

        if (!comparison.equivalent) {
            const errorMessage = ["Shadow DOM content differs between CSR and SSR:", ...comparison.differences].join("\n");

            throw new Error(errorMessage);
        }
    }

    /**
     * Verifica que no hay layout shift entre SSR y hidratación
     */
    static assertNoLayoutShift(beforeElement: Element, afterElement: Element, tolerance: number = 1): void {
        const beforeRect = beforeElement.getBoundingClientRect();
        const afterRect = afterElement.getBoundingClientRect();

        const widthDiff = Math.abs(beforeRect.width - afterRect.width);
        const heightDiff = Math.abs(beforeRect.height - afterRect.height);

        expect(widthDiff, `Width difference (${widthDiff}px) exceeds tolerance (${tolerance}px)`).to.be.lessThanOrEqual(tolerance);

        expect(heightDiff, `Height difference (${heightDiff}px) exceeds tolerance (${tolerance}px)`).to.be.lessThanOrEqual(tolerance);
    }
}

/**
 * Utilities para CSS Custom Properties en SSR
 */
export class CSSPropertiesAssertions {
    /**
     * Verifica que las custom properties CSS están disponibles en SSR
     */
    static assertCSSCustomPropertiesAvailable(element: Element, properties: string[]): void {
        const computedStyle = globalThis.getComputedStyle?.(element);

        if (!computedStyle) {
            throw new Error("getComputedStyle not available in this environment");
        }

        properties.forEach((prop) => {
            const value = computedStyle.getPropertyValue(prop);
            expect(value, `CSS custom property ${prop} should be defined`).to.not.equal("");
        });
    }

    /**
     * Compara custom properties entre CSR y SSR
     */
    static compareCSSCustomProperties(csrElement: Element, ssrElement: Element, properties: string[]): void {
        const csrStyle = globalThis.getComputedStyle?.(csrElement);
        const ssrStyle = globalThis.getComputedStyle?.(ssrElement);

        if (!csrStyle || !ssrStyle) {
            throw new Error("getComputedStyle not available in this environment");
        }

        properties.forEach((prop) => {
            const csrValue = csrStyle.getPropertyValue(prop);
            const ssrValue = ssrStyle.getPropertyValue(prop);

            expect(csrValue, `CSS property ${prop} should match between CSR and SSR`).to.equal(ssrValue);
        });
    }
}

/**
 * Helper para crear reportes de comparación detallados
 */
export class ComparisonReporter {
    static createDetailedReport(comparison: DOMComparisonResult, context: string = "DOM Comparison"): string {
        const lines = [
            `=== ${context} ===`,
            `Equivalent: ${comparison.equivalent}`,
            "",
            "Normalized HTML A:",
            comparison.normalizedA,
            "",
            "Normalized HTML B:",
            comparison.normalizedB,
            "",
        ];

        if (comparison.differences.length > 0) {
            lines.push("Differences:");
            comparison.differences.forEach((diff) => lines.push(`  ${diff}`));
        }

        return lines.join("\n");
    }
}

// Exports principales para conveniencia
export {
    CSSPropertiesAssertions as cssProperties,
    DeclarativeShadowDOMAssertions as declarativeShadowDOM,
    DOMComparator as domComparator,
    ComparisonReporter as reporter,
    ShadowDOMAssertions as shadowDOM,
};
