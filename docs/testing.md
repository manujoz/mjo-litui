# Test Setup Documentation

Este documento describe la configuración de tests implementada para el proyecto mjo-litui.

## Configuración de Tests

### Herramientas utilizadas

-   **Web Test Runner**: Runner de tests moderno para proyectos web
-   **Mocha**: Framework de testing con interfaz TDD
-   **Chai**: Librería de aserciones
-   **@open-wc/testing**: Utilidades para testing de Web Components
-   **@lit-labs/testing**: Capacidades de testing SSR para Lit
-   **Playwright**: Para testing cross-browser

### Estructura de archivos

```
test/
├── unit/                          # Tests unitarios
│   ├── simple.test.js            # Test de ejemplo básico
│   └── calendar-utils-basic.test.js  # Tests de utilidades de calendario
├── integration/                   # Tests de integración
├── utils/                        # Utilidades de testing
│   └── test-helpers.js           # Helpers y fixtures compartidos
├── .eslintrc.json               # Configuración ESLint para tests
└── coverage/                     # Reportes de cobertura (generado)
```

### Configuración (web-test-runner.config.js)

```javascript
import { playwrightLauncher } from "@web/test-runner-playwright";
import { litSsrPlugin } from "@lit-labs/testing/web-test-runner-ssr-plugin.js";

export default {
    files: "test/**/*.test.js",
    nodeResolve: true,

    // Habilita capacidades de testing SSR
    plugins: [litSsrPlugin()],

    // Usa Playwright para testing cross-browser
    browsers: [playwrightLauncher({ product: "chromium" }), playwrightLauncher({ product: "firefox" }), playwrightLauncher({ product: "webkit" })],

    // Configuración de tests
    testFramework: {
        config: {
            ui: "tdd",
            timeout: 10000,
        },
    },

    // Configuración de cobertura
    coverage: true,
    coverageConfig: {
        threshold: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
        },
        include: ["src/**/*.ts"],
        exclude: ["src/**/*.d.ts", "src/types/**/*", "src/vite-env.d.ts", "dev/**/*", "test/**/*"],
    },

    // Sirve archivos estáticos
    staticDirs: ["src"],

    // Manejo de compilación TypeScript
    esbuildTarget: "auto",
};
```

## Scripts de NPM

Los siguientes scripts han sido añadidos al `package.json`:

```json
{
    "scripts": {
        "test": "web-test-runner",
        "test:watch": "web-test-runner --watch",
        "test:coverage": "web-test-runner --coverage"
    }
}
```

## Comandos disponibles

### Ejecutar tests una vez

```bash
npm test
```

### Ejecutar tests en modo watch

```bash
npm run test:watch
```

### Ejecutar tests con reporte de cobertura

```bash
npm run test:coverage
```

### Ejecutar un archivo específico

```bash
npx web-test-runner test/unit/simple.test.js
```

## Escribir Tests

### Estructura básica de un test

```javascript
import { assert } from "@esm-bundle/chai";

suite("Component Name", () => {
    suite("Feature Group", () => {
        test("should do something specific", () => {
            // Arrange
            const input = "test data";

            // Act
            const result = someFunction(input);

            // Assert
            assert.equal(result, "expected output");
        });
    });
});
```

### Testing de Web Components

```javascript
import { html } from "lit";
import { assert } from "@esm-bundle/chai";
import { fixture, oneEvent } from "@open-wc/testing";

suite("mjo-calendar", () => {
    test("renders correctly", async () => {
        const el = await fixture(html`<mjo-calendar></mjo-calendar>`);
        assert.isTrue(el instanceof HTMLElement);
        assert.equal(el.tagName.toLowerCase(), "mjo-calendar");
    });

    test("handles events", async () => {
        const el = await fixture(html`<mjo-calendar></mjo-calendar>`);

        const listener = oneEvent(el, "date-select");
        el.dispatchEvent(new CustomEvent("date-select", { detail: { date: "2024-01-15" } }));

        const event = await listener;
        assert.equal(event.detail.date, "2024-01-15");
    });
});
```

## Cobertura de código

Los tests están configurados para generar reportes de cobertura con umbrales del 80% para:

-   Statements
-   Branches
-   Functions
-   Lines

Los reportes se generan en `coverage/lcov-report/index.html`.

## Mejores prácticas

1. **Organización**: Agrupa tests relacionados usando `suite()`
2. **Nomenclatura**: Usa descripciones claras y específicas
3. **Aislamiento**: Cada test debe ser independiente
4. **AAA Pattern**: Arrange, Act, Assert
5. **Async/Await**: Usa async/await para operaciones asíncronas
6. **Limpieza**: Limpia el DOM después de cada test si es necesario

## Notas técnicas

-   Los tests usan la interfaz TDD de Mocha (`suite`, `test`)
-   Las funciones `suite` y `test` están disponibles globalmente
-   Web Test Runner maneja la compilación de TypeScript automáticamente
-   Los navegadores de Playwright se instalan automáticamente con `npx playwright install`

## Estado actual

✅ Configuración básica de testing completada
✅ Tests de utilidades implementados  
✅ Infraestructura de testing cross-browser
✅ Configuración de cobertura
✅ Scripts de NPM configurados

### Próximos pasos sugeridos

1. Implementar tests para componentes principales (mjo-calendar, etc.)
2. Añadir tests de integración entre componentes
3. Implementar tests de accesibilidad
4. Configurar CI/CD para ejecutar tests automáticamente
5. Añadir tests de performance si es necesario
