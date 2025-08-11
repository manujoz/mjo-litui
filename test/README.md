# Tests

Este directorio contiene todos los tests para el proyecto mjo-litui.

## 🎯 Estándar TypeScript

**Todos los tests nuevos deben desarrollarse en TypeScript** para aprovechar:

-   Seguridad de tipos en tiempo de desarrollo
-   IntelliSense mejorado
-   Detección temprana de errores
-   Mejor experiencia de desarrollo

## Estructura

```
test/
├── .eslintrc.json                   # Config ESLint para tests
├── unit/                           # Tests unitarios
│   ├── simple.test.ts              # Tests básicos ✅
│   ├── calendar-utils-basic.test.ts # Tests de utilidades ✅
│   └── web-component-demo.test.ts   # Demo de Web Components ✅
├── integration/                     # Tests de integración (futuro)
└── coverage/                       # Reportes de cobertura
```

## Ejecutar tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar solo tests TypeScript
npx web-test-runner "test/**/*.test.ts"

# Ejecutar en modo watch
npm run test:watch

# Ejecutar con cobertura
npm run test:coverage
```

## Estado actual

### Tests implementados ✅ (TypeScript)

-   **simple.test.ts** - Tests básicos de validación de configuración (2 tests)
-   **calendar-utils-basic.test.ts** - Tests de utilidades de calendario (8 tests)
-   **web-component-demo.test.ts** - Demostración completa de testing de Web Components (12 tests)

**Total: 22 tests TypeScript pasando en 3 navegadores** 🎉

### Tests planificados 📋 (TypeScript)

-   **mjo-calendar.test.ts** - Tests del componente principal de calendario
-   **calendar-month-picker.test.ts** - Tests del selector de mes
-   **calendar-year-picker.test.ts** - Tests del selector de año
-   **mjo-calendar-integration.test.ts** - Tests de integración completa

### Configuración

-   **Framework**: Mocha + Chai (via @esm-bundle/chai)
-   **Runner**: Web Test Runner con soporte TypeScript
-   **Browsers**: Chromium, Firefox, WebKit (via Playwright)
-   **Cobertura**: 80% threshold para statements, branches, functions, lines
-   **Tipos**: @types/mocha para definiciones TypeScript
-   **Compilación**: @web/dev-server-esbuild para TypeScript

### 💡 Patrones de Testing TypeScript

#### Web Component Testing

```typescript
const el = await fixture<MyComponentElement>(html`<my-component></my-component>`);
assert.isTrue(el instanceof MyComponentElement);
```

#### Event Testing con Tipos

```typescript
interface CustomEventDetail {
    value: string;
}

const events: CustomEventDetail[] = [];
el.addEventListener("custom-event", (e: Event) => {
    events.push((e as CustomEvent<CustomEventDetail>).detail);
});
```

#### Property Testing

```typescript
el.value = "test-value";
await nextFrame();
assert.equal(el.value, "test-value");
```

Ver `README-typescript-conversion.md` para detalles de la migración y `docs/testing.md` para documentación completa.
