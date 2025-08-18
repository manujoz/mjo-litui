import {
    csrFixture as originalCsrFixture,
    ssrHydratedFixture as originalSsrHydratedFixture,
    ssrNonHydratedFixture as originalSsrNonHydratedFixture,
} from "@lit-labs/testing/fixtures.js";
import { TemplateResult } from "lit";

/**
 * Opciones comunes para todos los fixtures
 */
export interface BaseFixtureOptions {
    /** Módulos a cargar antes del renderizado (e.g., definiciones de custom elements) */
    modules: string[];
    /** URL base para resolver rutas de módulos */
    base?: string;
}

/**
 * Tipo de función fixture unificada
 */
export type FixtureFunction<T extends HTMLElement> = (template: TemplateResult, options: BaseFixtureOptions) => Promise<T>;

/**
 * Wrapper para CSR (Client-Side Rendering) fixture
 * Renderiza el componente en el cliente usando el comportamiento estándar
 */
export const csrFixture: FixtureFunction<HTMLElement> = async <T extends HTMLElement>(template: TemplateResult, options: BaseFixtureOptions): Promise<T> => {
    return originalCsrFixture<T>(template, {
        modules: options.modules,
        base: options.base,
    });
};

/**
 * Wrapper para SSR sin hidratación
 * Renderiza server-side pero no hidrata el componente en el cliente
 */
export const ssrNonHydratedFixture: FixtureFunction<HTMLElement> = async <T extends HTMLElement>(
    template: TemplateResult,
    options: BaseFixtureOptions,
): Promise<T> => {
    return originalSsrNonHydratedFixture<T>(template, {
        modules: options.modules,
        base: options.base,
    });
};

/**
 * Wrapper para SSR con hidratación
 * Renderiza server-side y luego hidrata el componente en el cliente
 */
export const ssrHydratedFixture: FixtureFunction<HTMLElement> = async <T extends HTMLElement>(
    template: TemplateResult,
    options: BaseFixtureOptions,
): Promise<T> => {
    return originalSsrHydratedFixture<T>(template, {
        modules: options.modules,
        base: options.base,
    });
};

/**
 * Array de todos los fixtures disponibles para testing iterativo
 * Útil para probar el mismo código en los 3 modos de renderizado
 */
export const allFixtures = [
    { name: "CSR", fixture: csrFixture },
    { name: "SSR-NonHydrated", fixture: ssrNonHydratedFixture },
    { name: "SSR-Hydrated", fixture: ssrHydratedFixture },
] as const;

/**
 * Configuración por defecto para fixtures
 * Incluye configuraciones comunes para el proyecto mjo-litui
 */
export const defaultFixtureOptions: Partial<BaseFixtureOptions> = {
    base: "http://localhost:8000/src/",
    modules: [], // Se debe especificar en cada test
};

/**
 * Helper para crear opciones de fixture con valores por defecto
 */
export function createFixtureOptions(options: Partial<BaseFixtureOptions>): BaseFixtureOptions {
    return {
        ...defaultFixtureOptions,
        ...options,
        modules: options.modules || [],
    } as BaseFixtureOptions;
}

/**
 * Tipos de export para mayor conveniencia
 */
export { html } from "lit";
export type { TemplateResult } from "lit";
