/**
 * Template for new component tests
 *
 * Usage:
 * 1. Copy this file to test/components/mjo-newcomponent.test.ts
 * 2. Replace "COMPONENT_NAME" with actual component name
 * 3. Replace "COMPONENT_MODULE" with actual module path
 * 4. Adapt property tests to component's specific properties
 * 5. Add component-specific behavior tests
 */

import { expect } from "@esm-bundle/chai";
import { html } from "lit";

import { csrFixture, ssrHydratedFixture, ssrNonHydratedFixture } from "../fixtures/base-fixture.js";
import { assertHasShadowRoot, waitForComponentUpdate } from "../fixtures/test-utils.js";

// TODO: Update with actual component module path
const COMPONENT_MODULE_PATH = "../../dist/mjo-COMPONENT_NAME.js";

// TODO: Import component type for TypeScript support
// import type { MjoComponentName } from '../../src/mjo-COMPONENT_NAME';

describe("mjo-COMPONENT_NAME Component", () => {
    describe("Basic Rendering", () => {
        test("should render in CSR mode", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            const element = await csrFixture(html`<mjo-COMPONENT_NAME></mjo-COMPONENT_NAME>`, options);

            await waitForComponentUpdate(element);

            expect(element).to.exist;
            assertHasShadowRoot(element);
        });

        test("should render in SSR mode without hydration", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            const element = await ssrNonHydratedFixture(html`<mjo-COMPONENT_NAME></mjo-COMPONENT_NAME>`, options);

            expect(element).to.exist;
            assertHasShadowRoot(element);
        });

        test("should render in SSR mode with hydration", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            const element = await ssrHydratedFixture(html`<mjo-COMPONENT_NAME></mjo-COMPONENT_NAME>`, options);

            await waitForComponentUpdate(element);

            expect(element).to.exist;
            assertHasShadowRoot(element);
        });
    });

    describe("Properties Testing", () => {
        // TODO: Add tests for each component property
        test("should handle [property-name] property", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            const element = await csrFixture(html`<mjo-COMPONENT_NAME property-name="value"></mjo-COMPONENT_NAME>`, options);

            await waitForComponentUpdate(element);

            // TODO: Replace with actual property name and expected value
            // expect(element.propertyName).to.equal('value');

            // TODO: Verify CSS classes or DOM changes
            // expect(element.shadowRoot?.querySelector('.expected-class')).to.exist;
        });

        test("should handle boolean properties", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            const element = await csrFixture(html`<mjo-COMPONENT_NAME boolean-prop></mjo-COMPONENT_NAME>`, options);

            await waitForComponentUpdate(element);

            // TODO: Replace with actual boolean property
            // expect(element.booleanProp).to.be.true;
            // expect(element.hasAttribute('boolean-prop')).to.be.true;
        });

        test("should apply default values correctly", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            const element = await csrFixture(html`<mjo-COMPONENT_NAME></mjo-COMPONENT_NAME>`, options);

            await waitForComponentUpdate(element);

            // TODO: Replace with actual default values
            // expect(element.size).to.equal('medium');
            // expect(element.disabled).to.be.false;
        });
    });

    describe("Advanced Behavior Testing", () => {
        // TODO: Add component-specific behavior tests
        test("should handle [specific-behavior]", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            const element = await csrFixture(html`<mjo-COMPONENT_NAME></mjo-COMPONENT_NAME>`, options);

            await waitForComponentUpdate(element);

            // TODO: Test specific component behavior
            // Example: Click handling, custom events, interactions
        });

        test("should dispatch custom events", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            const element = await csrFixture(html`<mjo-COMPONENT_NAME></mjo-COMPONENT_NAME>`, options);

            await waitForComponentUpdate(element);

            // TODO: Test custom event dispatching
            let eventFired = false;
            element.addEventListener("custom-event", () => {
                eventFired = true;
            });

            // TODO: Trigger the action that should dispatch the event
            // element.click(); // or whatever triggers the event
            // expect(eventFired).to.be.true;
        });

        test("should handle error scenarios", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            // TODO: Test error handling specific to component
            // Example: Invalid property values, missing dependencies, etc.
        });
    });

    describe("SSR Specific Features", () => {
        test("should maintain consistency between CSR and SSR", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };
            const template = html`<mjo-COMPONENT_NAME prop="test"></mjo-COMPONENT_NAME>`;

            const csrElement = await csrFixture(template, options);
            const ssrElement = await ssrHydratedFixture(template, options);

            await waitForComponentUpdate(csrElement);
            await waitForComponentUpdate(ssrElement);

            // Compare key properties
            // TODO: Replace with actual property comparisons
            // expect(csrElement.prop).to.equal(ssrElement.prop);

            // Compare rendered structure (may vary due to declarative shadow DOM)
            const csrHTML = csrElement.shadowRoot?.innerHTML;
            const ssrHTML = ssrElement.shadowRoot?.innerHTML;

            // Basic structural comparison
            expect(csrHTML).to.not.be.empty;
            expect(ssrHTML).to.not.be.empty;
        });

        test("should preserve state during hydration", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            const element = await ssrHydratedFixture(html`<mjo-COMPONENT_NAME prop="initial-value"></mjo-COMPONENT_NAME>`, options);

            await waitForComponentUpdate(element);

            // TODO: Verify that initial state is preserved
            // expect(element.prop).to.equal('initial-value');
        });

        test("should work with theme system in SSR", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            const element = await ssrHydratedFixture(
                html`
                    <mjo-theme theme="dark">
                        <mjo-COMPONENT_NAME></mjo-COMPONENT_NAME>
                    </mjo-theme>
                `,
                options,
            );

            await waitForComponentUpdate(element);

            // TODO: Verify theme integration works in SSR
            // const component = element.querySelector('mjo-COMPONENT_NAME');
            // expect(component).to.exist;
        });

        test("should perform well in SSR mode", async () => {
            const options = { modules: [COMPONENT_MODULE_PATH] };

            // CSR Performance
            const csrStart = performance.now();
            const csrElement = await csrFixture(html`<mjo-COMPONENT_NAME></mjo-COMPONENT_NAME>`, options);
            await waitForComponentUpdate(csrElement);
            const csrTime = performance.now() - csrStart;

            // SSR Performance
            const ssrStart = performance.now();
            const ssrElement = await ssrHydratedFixture(html`<mjo-COMPONENT_NAME></mjo-COMPONENT_NAME>`, options);
            await waitForComponentUpdate(ssrElement);
            const ssrTime = performance.now() - ssrStart;

            console.log(`CSR rendering time: ${csrTime.toFixed(2)}ms`);
            console.log(`SSR hydration time: ${ssrTime.toFixed(2)}ms`);

            // Performance expectations (adjust based on component complexity)
            expect(csrTime).to.be.lessThan(50); // Simple components should be very fast
            expect(ssrTime).to.be.lessThan(500); // SSR hydration should be reasonable
        });
    });
});

/* TODO: Checklist for adapting this template

□ Replace all instances of "COMPONENT_NAME" with actual component name
□ Update COMPONENT_MODULE_PATH with correct path
□ Import component TypeScript type for better IntelliSense  
□ Add tests for all component properties with correct names and types
□ Add tests for all component methods and behaviors
□ Add tests for custom events with correct event names
□ Add component-specific error scenarios
□ Verify CSS classes and DOM structure expectations
□ Add theme integration tests if component uses ThemeMixin
□ Adjust performance expectations based on component complexity
□ Add any component-specific SSR considerations

*/
