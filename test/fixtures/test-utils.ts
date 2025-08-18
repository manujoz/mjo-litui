import { expect } from "@esm-bundle/chai";

/**
 * Utilidades comunes para testing de Web Components con SSR
 */

/**
 * Verifica que un elemento tenga shadow DOM
 */
export function assertHasShadowRoot(element: HTMLElement, message?: string): asserts element is HTMLElement & { shadowRoot: ShadowRoot } {
    expect(element.shadowRoot).to.exist;
    expect(element.shadowRoot).to.be.instanceOf(ShadowRoot);
}

/**
 * Verifica que un elemento NO tenga shadow DOM
 */
export function assertHasNoShadowRoot(element: HTMLElement, message?: string): void {
    expect(element.shadowRoot, message || "Element should not have shadow root").to.be.null;
}

/**
 * Verifica que el shadow DOM contenga un selector específico
 */
export function assertShadowContains(element: HTMLElement, selector: string, message?: string): void {
    assertHasShadowRoot(element);
    const foundElement = element.shadowRoot.querySelector(selector);
    expect(foundElement, message || `Shadow DOM should contain selector: ${selector}`).to.exist;
}

/**
 * Verifica que el shadow DOM NO contenga un selector específico
 */
export function assertShadowNotContains(element: HTMLElement, selector: string, message?: string): void {
    assertHasShadowRoot(element);
    const foundElement = element.shadowRoot.querySelector(selector);
    expect(foundElement, message || `Shadow DOM should NOT contain selector: ${selector}`).to.not.exist;
}

/**
 * Verifica texto contenido en shadow DOM
 */
export function assertShadowTextContent(element: HTMLElement, expectedText: string, message?: string): void {
    assertHasShadowRoot(element);
    const textContent = element.shadowRoot.textContent || "";
    expect(textContent.trim(), message || `Shadow DOM text content should contain: ${expectedText}`).to.include(expectedText);
}

/**
 * Verifica que un elemento tenga una clase CSS específica
 */
export function assertHasClass(element: HTMLElement, className: string, message?: string): void {
    expect(element.classList.contains(className), message || `Element should have class: ${className}`).to.be.true;
}

/**
 * Verifica que un elemento NO tenga una clase CSS específica
 */
export function assertNotHasClass(element: HTMLElement, className: string, message?: string): void {
    expect(element.classList.contains(className), message || `Element should NOT have class: ${className}`).to.be.false;
}

/**
 * Verifica que un elemento tenga un atributo específico
 */
export function assertHasAttribute(element: HTMLElement, attribute: string, expectedValue?: string, message?: string): void {
    expect(element.hasAttribute(attribute), message || `Element should have attribute: ${attribute}`).to.be.true;

    if (expectedValue !== undefined) {
        const actualValue = element.getAttribute(attribute);
        expect(actualValue, message || `Attribute ${attribute} should have value: ${expectedValue}`).to.equal(expectedValue);
    }
}

/**
 * Verifica que un elemento NO tenga un atributo específico
 */
export function assertNotHasAttribute(element: HTMLElement, attribute: string, message?: string): void {
    expect(element.hasAttribute(attribute), message || `Element should NOT have attribute: ${attribute}`).to.be.false;
}

/**
 * Verifica que una propiedad del elemento tenga un valor específico
 */
export function assertProperty<T>(element: any, propertyName: string, expectedValue: T, message?: string): void {
    expect(element[propertyName], message || `Property ${propertyName} should equal: ${expectedValue}`).to.equal(expectedValue);
}

/**
 * Verifica que el elemento esté conectado al DOM
 */
export function assertIsConnected(element: HTMLElement, message?: string): void {
    expect(element.isConnected, message || "Element should be connected to the DOM").to.be.true;
}

/**
 * Helper para esperar a que se complete la actualización del componente
 */
export async function waitForComponentUpdate(element: any): Promise<void> {
    if (element.updateComplete) {
        await element.updateComplete;
    }
    // Esperar un tick adicional para asegurar renderizado
    await new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Compara el HTML renderizado entre diferentes fixtures
 * Útil para verificar que CSR y SSR producen el mismo resultado
 */
export function compareRenderedHTML(element1: HTMLElement, element2: HTMLElement, message?: string): void {
    const html1 = element1.shadowRoot?.innerHTML || element1.innerHTML;
    const html2 = element2.shadowRoot?.innerHTML || element2.innerHTML;

    // Normalizar espacios en blanco para comparación
    const normalize = (html: string) => html.replace(/\s+/g, " ").trim();

    expect(normalize(html1), message || "Rendered HTML should be identical between fixtures").to.equal(normalize(html2));
}

/**
 * Helper para obtener estilos computados de un elemento
 */
export function getComputedStyleProperty(element: HTMLElement, property: string): string {
    return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Verifica que un CSS custom property tenga un valor específico
 */
export function assertCSSCustomProperty(element: HTMLElement, propertyName: string, expectedValue: string, message?: string): void {
    const actualValue = getComputedStyleProperty(element, propertyName);
    expect(actualValue.trim(), message || `CSS custom property ${propertyName} should equal: ${expectedValue}`).to.equal(expectedValue);
}

/**
 * Helper para disparar eventos personalizados en tests
 */
export function dispatchCustomEvent(element: HTMLElement, eventType: string, detail?: any): void {
    const event = new CustomEvent(eventType, {
        detail,
        bubbles: true,
        composed: true,
    });
    element.dispatchEvent(event);
}

/**
 * Helper para verificar que un evento se disparó
 */
export function expectEventToFire<T = any>(element: HTMLElement, eventType: string, action: () => void | Promise<void>): Promise<CustomEvent<T>> {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error(`Expected event '${eventType}' was not fired`));
        }, 1000);

        element.addEventListener(
            eventType,
            (event) => {
                clearTimeout(timeout);
                resolve(event as CustomEvent<T>);
            },
            { once: true },
        );

        Promise.resolve(action()).catch(reject);
    });
}

/**
 * Helper para debugging - imprime la estructura del shadow DOM
 */
export function debugShadowDOM(element: HTMLElement, label?: string): void {
    console.log(`\n=== DEBUG SHADOW DOM${label ? ` (${label})` : ""} ===`);
    console.log("Element:", element.tagName);
    console.log("Shadow Root exists:", !!element.shadowRoot);
    if (element.shadowRoot) {
        console.log("Shadow Root HTML:");
        console.log(element.shadowRoot.innerHTML);
    }
    console.log("======================\n");
}
