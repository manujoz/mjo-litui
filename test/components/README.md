# Component Testing Guide

This directory contains comprehensive tests for mjo-litui components using Server-Side Rendering (SSR) capabilities.

## 📋 Testing Strategy

Our testing approach covers **three rendering modes** for each component:

1. **CSR (Client-Side Rendering)** - Standard browser rendering
2. **SSR without Hydration** - Server-rendered content without client-side activation
3. **SSR with Hydration** - Server-rendered content that becomes interactive on client

## 🔧 Testing Infrastructure

### Core Files

-   **`test/fixtures/base-fixture.ts`** - Unified fixture wrappers for all rendering modes
-   **`test/helpers/ssr-test-setup.ts`** - SSR environment configuration
-   **`test/helpers/dom-assertions.ts`** - Advanced DOM comparison utilities

### Component Testing Structure

Each component test file follows this pattern:

```typescript
import { expect } from "@esm-bundle/chai";
import { html } from "lit";
import { csrFixture, ssrHydratedFixture, ssrNonHydratedFixture } from "../fixtures/base-fixture.js";
import { waitForComponentUpdate } from "../helpers/dom-assertions.js";

const COMPONENT_MODULE_PATH = "../../dist/mjo-component.js";

describe("mjo-component Component", () => {
    describe("Basic Rendering", () => {
        // CSR, SSR non-hydrated, SSR hydrated tests
    });

    describe("Properties Testing", () => {
        // Test all component properties across rendering modes
    });

    describe("Advanced Behavior Testing", () => {
        // Component-specific logic and interactions
    });

    describe("SSR Specific Features", () => {
        // SSR-only functionality and edge cases
    });
});
```

## 🎯 Test Categories

### 1. Basic Rendering Tests

-   ✅ Component renders correctly in CSR mode
-   ✅ Component renders correctly in SSR without hydration
-   ✅ Component renders correctly in SSR with hydration
-   ✅ Shadow DOM is created properly in all modes

### 2. Properties Testing

-   ✅ All component properties work correctly
-   ✅ Property changes trigger updates
-   ✅ Default values are applied correctly
-   ✅ CSS classes are applied based on properties

### 3. Advanced Behavior Testing

-   ✅ Component-specific logic (image loading, error handling, etc.)
-   ✅ Event handling and dispatching
-   ✅ Integration with other components (mjo-icon, etc.)
-   ✅ Edge cases and error scenarios

### 4. SSR Specific Features

-   ✅ Declarative Shadow DOM structure
-   ✅ Hydration state preservation
-   ✅ CSS custom properties consistency
-   ✅ Theme mixin integration
-   ✅ Performance comparison (CSR vs SSR)

## 🏗️ Test Patterns

### Basic Component Test

```typescript
test("should render basic component", async () => {
    const options = { modules: [COMPONENT_MODULE_PATH] };
    const element = await csrFixture(html`<mjo-component></mjo-component>`, options);

    await waitForComponentUpdate(element);

    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
});
```

### Property Testing Pattern

```typescript
test("should handle size property", async () => {
    const options = { modules: [COMPONENT_MODULE_PATH] };
    const sizes = ["small", "medium", "large"];

    for (const size of sizes) {
        const element = await csrFixture(html`<mjo-component size="${size}"></mjo-component>`, options);

        await waitForComponentUpdate(element);

        expect(element.size).to.equal(size);
        expect(element.shadowRoot?.querySelector(`.size-${size}`)).to.exist;
    }
});
```

### SSR Comparison Pattern

```typescript
test("should render consistently across CSR and SSR", async () => {
    const options = { modules: [COMPONENT_MODULE_PATH] };
    const template = html`<mjo-component name="Test"></mjo-component>`;

    // Test all three modes
    const csrElement = await csrFixture(template, options);
    const ssrElement = await ssrNonHydratedFixture(template, options);
    const hydratedElement = await ssrHydratedFixture(template, options);

    await waitForComponentUpdate(csrElement);
    await waitForComponentUpdate(hydratedElement);

    // Compare DOM structure
    const csrHTML = csrElement.shadowRoot?.innerHTML;
    const ssrHTML = ssrElement.shadowRoot?.innerHTML;
    const hydratedHTML = hydratedElement.shadowRoot?.innerHTML;

    expect(csrHTML).to.equal(hydratedHTML);
    // Note: SSR HTML may differ due to declarative shadow DOM
});
```

## 🔍 Performance Testing

### Performance Benchmarking

```typescript
test("should compare CSR vs SSR performance", async () => {
    const options = { modules: [COMPONENT_MODULE_PATH] };

    // CSR Performance
    const csrStart = performance.now();
    const csrElement = await csrFixture(html`<mjo-component></mjo-component>`, options);
    await waitForComponentUpdate(csrElement);
    const csrTime = performance.now() - csrStart;

    // SSR Performance
    const ssrStart = performance.now();
    const ssrElement = await ssrHydratedFixture(html`<mjo-component></mjo-component>`, options);
    await waitForComponentUpdate(ssrElement);
    const ssrTime = performance.now() - ssrStart;

    console.log(`CSR rendering time: ${csrTime.toFixed(2)}ms`);
    console.log(`SSR hydration time: ${ssrTime.toFixed(2)}ms`);

    expect(csrTime).to.be.lessThan(100); // CSR should be fast
    expect(ssrTime).to.be.lessThan(1000); // SSR hydration reasonable
});
```

## 🐛 Debugging Tips

### Common Issues

1. **Element not found** - Ensure `waitForComponentUpdate()` is called after element creation
2. **Stale DOM references** - Query DOM elements fresh each time instead of caching
3. **SSR hydration mismatches** - Check for client/server rendering differences
4. **Webkit timing issues** - Add additional wait cycles for Webkit compatibility

### Debug Helpers

```typescript
// Debug DOM structure
console.log("Element HTML:", element.shadowRoot?.innerHTML);

// Debug element properties
console.log("Element state:", {
    property1: element.property1,
    property2: element.property2,
});

// Wait for additional render cycles (Webkit compatibility)
element.requestUpdate();
await element.updateComplete;
```

## 📊 Coverage Expectations

### Minimum Coverage Targets

-   **Statements**: >90% for all component files
-   **Branches**: >85% covering conditional logic
-   **Functions**: >95% all public and testable private methods

### Browser Compatibility

-   ✅ **Chromium** - Full compatibility expected
-   ✅ **Firefox** - Full compatibility expected
-   ⚠️ **Webkit** - May have timing-related test instability

## 🚀 Adding New Component Tests

1. Create `test/components/mjo-newcomponent.test.ts`
2. Follow the established testing structure
3. Import fixtures and helpers from shared directories
4. Test all rendering modes (CSR, SSR, Hydrated)
5. Include performance benchmarks for complex components
6. Add component-specific edge cases and behaviors

## 📚 Related Documentation

-   [Test Fixtures](../fixtures/README.md) - Fixture utilities documentation
-   [Test Helpers](../helpers/README.md) - Helper functions documentation
-   [Main Testing Guide](../README.md) - Overall testing strategy
