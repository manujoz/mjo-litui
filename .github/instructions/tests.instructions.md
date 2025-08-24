---
applyTo: '**/*.test.ts'
---

# Testing Instructions for mjo-litui Components

Use as example `test/components/mjo-avatar.test.ts` and `test/components/mjo-pagination.test.ts`

## Key Requirements

1. **Three Rendering Modes**: Always test CSR, SSR non-hydrated, SSR hydrated
2. **Module Path**: Use `../../dist/mjo-componentname.js` relative to test file
3. **TypeScript Support**: Import component type from `../../src/mjo-componentname.js` for IntelliSense
4. **Wait for Updates**: Always call `await waitForComponentUpdate(element)` after CSR/hydrated fixtures
5. **Property Testing**: Test each component property with expected values and DOM changes
6. **Performance**: Include CSR vs SSR performance comparison
7. **Cross-browser**: Tests run on Chromium, Firefox, WebKit

## ⚠️ IMPORTANT: Boolean Properties in Lit Components

**Use proper boolean property patterns for better Lit compatibility:**

```typescript
// ✅ GOOD - defaults to false, works well with Lit boolean handling
@property({ type: Boolean }) hideFirstLast = false;
@property({ type: Boolean }) hidePrevNext = false;

// ❌ AVOID - defaults to true, can cause issues with attribute presence
@property({ type: Boolean }) showFirstLast = true;
@property({ type: Boolean }) showPrevNext = true;
```

**In templates, use proper boolean binding syntax:**
```typescript
// ✅ GOOD - using boolean binding with ?
html`<mjo-component ?hideFirstLast=${true} ?disabled=${true}></mjo-component>`

// ❌ AVOID - string attributes for booleans
html`<mjo-component hideFirstLast disabled></mjo-component>`
```

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
- **Method Testing**: Test all public methods and their side effects
- **Edge Cases**: Test boundary conditions, empty states, large datasets

## Test Structure Template

```typescript
suite("Component Name", () => {
    suite("Basic Rendering", () => {
        // CSR, SSR non-hydrated, SSR hydrated tests
    });
    
    suite("Properties", () => {
        // Test each @property decorator with different values
        // Include boolean property tests with proper binding
    });
    
    suite("Navigation Methods", () => { // or "Public Methods"
        // Test all public methods and their effects
    });
    
    suite("Event Dispatching", () => {
        // Test custom events and their payloads
    });
    
    suite("Edge Cases and Validation", () => {
        // Boundary conditions, error states, invalid inputs
    });
    
    suite("Localization", () => { // if applicable
        // Test locale support and label handling
    });
});
```

## Common Gotchas

- **Webkit Timing**: May need additional `element.requestUpdate(); await element.updateComplete;` 
- **Fresh DOM Queries**: Don't cache DOM queries, query fresh each assertion
- **Module Loading**: Ensure correct relative path to dist files
- **Performance Expectations**: CSR <50ms for simple, <500ms SSR hydration
- **Boolean Properties**: Always use `?property=${value}` syntax for boolean bindings
- **Component Updates**: Use `waitForComponentUpdate()` before testing component state changes
