---
applyTo: 'test/*.test.ts'
---

# Testing Instructions for mjo-litui Components

Use as example `test/components/mjo-avatar.test.ts`

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
