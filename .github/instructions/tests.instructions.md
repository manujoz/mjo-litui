---
applyTo: 'test/*.test.ts'
---

# Testing Instructions for mjo-litui Components

## Basic Structure

Create `test/components/mjo-componentname.test.ts` following this pattern:

```typescript
import { expect } from "@esm-bundle/chai";
import { html } from "lit";
import { csrFixture, ssrHydratedFixture, ssrNonHydratedFixture } from "../fixtures/base-fixture.js";
import { assertHasShadowRoot, waitForComponentUpdate } from "../helpers/dom-assertions.js";

// Import component type for TypeScript support and better IntelliSense
import type { MjoComponentName } from "../../src/mjo-componentname";

const MODULE_PATH = "../../dist/mjo-componentname.js";

describe("mjo-componentname Component", () => {
    describe("Basic Rendering", () => {
        // Test CSR, SSR non-hydrated, SSR hydrated modes
        test("should render in CSR mode", async () => {
            const element = await csrFixture(html`<mjo-componentname></mjo-componentname>`, { modules: [MODULE_PATH] });
            await waitForComponentUpdate(element);
            expect(element).to.exist;
            assertHasShadowRoot(element);
        });
        
        test("should render in SSR mode without hydration", async () => {
            const element = await ssrNonHydratedFixture(html`<mjo-componentname></mjo-componentname>`, { modules: [MODULE_PATH] });
            expect(element).to.exist;
            assertHasShadowRoot(element);
        });
        
        test("should render in SSR mode with hydration", async () => {
            const element = await ssrHydratedFixture(html`<mjo-componentname></mjo-componentname>`, { modules: [MODULE_PATH] });
            await waitForComponentUpdate(element);
            expect(element).to.exist;
            assertHasShadowRoot(element);
        });
    });

    describe("Properties Testing", () => {
        // Test each property individually
        test("should handle [property] property", async () => {
            const element = await csrFixture(html`<mjo-componentname property="value"></mjo-componentname>`, { modules: [MODULE_PATH] });
            await waitForComponentUpdate(element);
            expect(element.property).to.equal("value");
            // Verify DOM/CSS changes: expect(element.shadowRoot?.querySelector('.expected-class')).to.exist;
        });
    });

    describe("Advanced Behavior Testing", () => {
        // Test component-specific logic, events, interactions
        test("should handle [specific behavior]", async () => {
            // Component behavior tests
        });
    });

    describe("SSR Specific Features", () => {
        test("should maintain consistency between CSR and SSR", async () => {
            const template = html`<mjo-componentname prop="test"></mjo-componentname>`;
            const csrElement = await csrFixture(template, { modules: [MODULE_PATH] });
            const ssrElement = await ssrHydratedFixture(template, { modules: [MODULE_PATH] });
            await waitForComponentUpdate(csrElement);
            await waitForComponentUpdate(ssrElement);
            // Compare properties and DOM structure
        });

        test("should perform well in SSR mode", async () => {
            // Performance benchmarking CSR vs SSR
            const csrStart = performance.now();
            const csrElement = await csrFixture(html`<mjo-componentname></mjo-componentname>`, { modules: [MODULE_PATH] });
            await waitForComponentUpdate(csrElement);
            const csrTime = performance.now() - csrStart;

            const ssrStart = performance.now();
            const ssrElement = await ssrHydratedFixture(html`<mjo-componentname></mjo-componentname>`, { modules: [MODULE_PATH] });
            await waitForComponentUpdate(ssrElement);
            const ssrTime = performance.now() - ssrStart;

            expect(csrTime).to.be.lessThan(50); // Simple components <50ms
            expect(ssrTime).to.be.lessThan(500); // SSR hydration <500ms
        });
    });
});
```

## Key Requirements

1. **Three Rendering Modes**: Always test CSR, SSR non-hydrated, SSR hydrated
2. **Module Path**: Use `../../dist/mjo-componentname.js` relative to test file
3. **TypeScript Support**: Import component type from `../../src/mjo-componentname.js` for IntelliSense
4. **Wait for Updates**: Always call `await waitForComponentUpdate(element)` after CSR/hydrated fixtures
5. **Property Testing**: Test each component property with expected values and DOM changes
6. **Performance**: Include CSR vs SSR performance comparison
7. **Cross-browser**: Tests run on Chromium, Firefox, WebKit

## ⚠️ IMPORTANT: Test Failure Investigation

**When a test fails, ALWAYS investigate the root cause:**

1. **Analyze the failure** - Is it a component bug or test issue?
2. **If component bug identified** - ASK before modifying any component code
3. **Document findings** - Include failure analysis in test comments
4. **Test-only fixes** - Only modify tests if the issue is test-specific

Never modify component source code without explicit approval when fixing test failures.

## Essential Patterns

- **Property Tests**: Verify both property value and resulting DOM/CSS changes
- **Event Tests**: Test custom event dispatching and handling
- **SSR Consistency**: Compare CSR and SSR hydrated output for consistency
- **Error Handling**: Test component behavior with invalid/edge-case inputs
- **Theme Integration**: Test component works within `<mjo-theme>` wrapper

## Common Gotchas

- **Webkit Timing**: May need additional `element.requestUpdate(); await element.updateComplete;` 
- **Fresh DOM Queries**: Don't cache DOM queries, query fresh each assertion
- **Module Loading**: Ensure correct relative path to dist files
- **Performance Expectations**: CSR <50ms for simple, <500ms SSR hydration

Use `test/components/TEMPLATE.test.ts` as reference with complete TODO checklist.