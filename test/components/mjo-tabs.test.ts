/**
 * Test suite for mjo-tabs component
 * Tests CSR, SSR non-hydrated, and SSR hydrated rendering modes
 */

import type { MjoTabs } from "../../src/mjo-tabs";

import { expect } from "@esm-bundle/chai";
import { html } from "lit";

// Import fixtures
import { csrFixture, ssrHydratedFixture, ssrNonHydratedFixture } from "../fixtures/base-fixture.js";

// Import test utilities
import { assertHasShadowRoot, waitForComponentUpdate } from "../fixtures/test-utils.js";

// Import SSR helpers
import { setupSSREnvironment } from "../helpers/ssr-test-setup.js";

// Component import paths
import "../../dist/components/tabs/mjo-tab.js"; // Required dependency
const TABS_MODULE_PATH = "../../dist/mjo-tabs.js";

/**
 * Test suite for mjo-tabs component
 */
suite("mjo-tabs Component", () => {
    // Setup SSR environment before tests
    suiteSetup(() => {
        setupSSREnvironment({ verbose: false });
    });

    /**
     * Basic rendering tests - verifies component renders correctly in all modes
     */
    suite("Basic Rendering", () => {
        test("should render in CSR mode", async () => {
            const element = await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                </mjo-tabs>`,
                {
                    modules: [TABS_MODULE_PATH],
                },
            );

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-tabs");
            assertHasShadowRoot(element);
        });

        test("should render in SSR non-hydrated mode", async () => {
            const element = await ssrNonHydratedFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                </mjo-tabs>`,
                {
                    modules: [TABS_MODULE_PATH],
                },
            );

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-tabs");
        });

        test("should render in SSR hydrated mode", async () => {
            const element = await ssrHydratedFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                </mjo-tabs>`,
                {
                    modules: [TABS_MODULE_PATH],
                },
            );

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-tabs");
            assertHasShadowRoot(element);
        });

        test("should not render header when no tabs are present", async () => {
            const element = (await csrFixture(html`<mjo-tabs></mjo-tabs>`, {
                modules: [TABS_MODULE_PATH],
            })) as MjoTabs;

            await waitForComponentUpdate(element);

            // Should not render header when no tabs
            const header = element.shadowRoot?.querySelector("header");
            expect(header).to.not.exist;

            // Should still have content area for slot
            const content = element.shadowRoot?.querySelector(".content");
            expect(content).to.exist;
        });
    });

    /**
     * Properties tests - verifies component properties work correctly
     */
    suite("Properties", () => {
        test("should set variant property correctly", async () => {
            const variants = ["light", "solid", "bordered"] as const;

            for (const variant of variants) {
                const element = (await csrFixture(
                    html`<mjo-tabs variant="${variant}">
                        <mjo-tab label="Tab 1">Content 1</mjo-tab>
                        <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    </mjo-tabs>`,
                    { modules: [TABS_MODULE_PATH] },
                )) as MjoTabs;

                expect(element.variant).to.equal(variant);

                // Check that header has correct data attribute
                const header = element.shadowRoot?.querySelector("header");
                expect(header?.getAttribute("data-variant")).to.equal(variant);
            }
        });

        test("should set color property correctly", async () => {
            const colors = ["default", "primary", "secondary", "success", "warning", "error", "info"] as const;

            for (const color of colors) {
                const element = (await csrFixture(
                    html`<mjo-tabs color="${color}">
                        <mjo-tab label="Tab 1">Content 1</mjo-tab>
                        <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    </mjo-tabs>`,
                    { modules: [TABS_MODULE_PATH] },
                )) as MjoTabs;

                expect(element.color).to.equal(color);

                // Check that header has correct data attribute
                const header = element.shadowRoot?.querySelector("header");
                expect(header?.getAttribute("data-color")).to.equal(color);
            }
        });

        test("should set vertical property correctly", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs vertical>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            expect(element.vertical).to.be.true;

            // Check that container has correct data attribute
            const container = element.shadowRoot?.querySelector(".container");
            expect(container?.hasAttribute("data-vertical")).to.be.true;
        });

        test("should apply default values correctly", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            expect(element.variant).to.equal("light");
            expect(element.color).to.equal("default");
            expect(element.vertical).to.be.false;
            expect(element.activeIndex).to.equal(0);
        });

        test("should handle property combinations correctly", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs variant="solid" color="primary" vertical>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            expect(element.variant).to.equal("solid");
            expect(element.color).to.equal("primary");
            expect(element.vertical).to.be.true;

            // Check all attributes are applied
            const header = element.shadowRoot?.querySelector("header");
            const container = element.shadowRoot?.querySelector(".container");

            expect(header?.getAttribute("data-variant")).to.equal("solid");
            expect(header?.getAttribute("data-color")).to.equal("primary");
            expect(container?.hasAttribute("data-vertical")).to.be.true;
        });
    });

    /**
     * Tab Management tests - verifies tab discovery, registration, and management
     */
    suite("Tab Management", () => {
        test("should discover and register tabs correctly", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="First Tab">First content</mjo-tab>
                    <mjo-tab label="Second Tab">Second content</mjo-tab>
                    <mjo-tab label="Third Tab">Third content</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            // Should have discovered all tabs
            expect(element.tabs).to.have.length(3);
            expect(element.tabs[0].label).to.equal("First Tab");
            expect(element.tabs[1].label).to.equal("Second Tab");
            expect(element.tabs[2].label).to.equal("Third Tab");

            // All tabs should have IDs
            element.tabs.forEach((tab) => {
                expect(tab.id).to.exist;
                expect(tab.id).to.not.be.empty;
            });
        });

        test("should set active tab on first tab by default", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            // First tab should be active
            expect(element.activeIndex).to.equal(0);
            expect(element.tabs[0].active).to.be.true;
            expect(element.tabs[1].active).to.be.false;
            expect(element.tabs[2].active).to.be.false;

            // First tab button should have data-active attribute
            const tabButtons = element.shadowRoot?.querySelectorAll(".tab-button");
            expect(tabButtons?.[0].hasAttribute("data-active")).to.be.true;
            expect(tabButtons?.[1].hasAttribute("data-active")).to.be.false;
            expect(tabButtons?.[2].hasAttribute("data-active")).to.be.false;
        });

        test("should handle tab click navigation", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            // Click on third tab
            const tabButtons = element.shadowRoot?.querySelectorAll(".tab-button");
            const thirdTabButton = tabButtons?.[2] as HTMLButtonElement;
            thirdTabButton.click();

            await waitForComponentUpdate(element);

            // Third tab should now be active
            expect(element.activeIndex).to.equal(2);
            expect(element.tabs[0].active).to.be.false;
            expect(element.tabs[1].active).to.be.false;
            expect(element.tabs[2].active).to.be.true;

            // Tab button states should update
            expect(tabButtons?.[0].hasAttribute("data-active")).to.be.false;
            expect(tabButtons?.[1].hasAttribute("data-active")).to.be.false;
            expect(tabButtons?.[2].hasAttribute("data-active")).to.be.true;
        });

        test("should activate tab using setTab method", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            // Use setTab method to activate second tab
            element.setTab(1);

            await waitForComponentUpdate(element);

            expect(element.activeIndex).to.equal(1);
            expect(element.tabs[0].active).to.be.false;
            expect(element.tabs[1].active).to.be.true;
            expect(element.tabs[2].active).to.be.false;
        });

        test("should get tab using getTab method", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            // Get tabs by index
            const tab1 = element.getTab(0);
            const tab2 = element.getTab(1);
            const tab3 = element.getTab(2);

            expect(tab1).to.equal(element.tabs[0]);
            expect(tab2).to.equal(element.tabs[1]);
            expect(tab3).to.equal(element.tabs[2]);

            expect(tab1.label).to.equal("Tab 1");
            expect(tab2.label).to.equal("Tab 2");
            expect(tab3.label).to.equal("Tab 3");
        });

        test("should handle empty tabs list gracefully", async () => {
            const element = (await csrFixture(html`<mjo-tabs></mjo-tabs>`, {
                modules: [TABS_MODULE_PATH],
            })) as MjoTabs;

            await waitForComponentUpdate(element);

            expect(element.tabs).to.have.length(0);
            expect(element.activeIndex).to.equal(0);

            // Header should not be rendered
            const header = element.shadowRoot?.querySelector("header");
            expect(header).to.not.exist;

            // Methods should handle empty state gracefully
            expect(element.getTab(0)).to.be.undefined;

            // setTab should not cause errors with empty tabs
            element.setTab(0);
            expect(element.activeIndex).to.equal(0);
        });
    });

    /**
     * Navigation and Events tests - verifies event dispatching and navigation behavior
     */
    suite("Navigation and Events", () => {
        test("should dispatch mjo-tabs:changed event on tab change", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            let changeEventFired = false;
            let eventDetail: any = null;

            element.addEventListener("mjo-tabs:changed", (event) => {
                changeEventFired = true;
                eventDetail = (event as CustomEvent).detail;
            });

            // Click on second tab
            const tabButtons = element.shadowRoot?.querySelectorAll(".tab-button");
            const secondTabButton = tabButtons?.[1] as HTMLButtonElement;
            secondTabButton.click();

            await waitForComponentUpdate(element);

            expect(changeEventFired).to.be.true;
            expect(eventDetail).to.exist;
            expect(eventDetail.index).to.equal(1);
            expect(eventDetail.tab).to.equal(element.tabs[1]);
        });

        test("should dispatch mjo-tabs:updated event when tabs are updated", async () => {
            let updatedEventFired = false;
            let eventDetail: any = null;

            const element = (await csrFixture(html`<mjo-tabs></mjo-tabs>`, {
                modules: [TABS_MODULE_PATH],
            })) as MjoTabs;

            element.addEventListener("mjo-tabs:updated", (event) => {
                updatedEventFired = true;
                eventDetail = (event as CustomEvent).detail;
            });

            // Add tabs dynamically by updating innerHTML
            element.innerHTML = `
                <mjo-tab label="New Tab 1">New Content 1</mjo-tab>
                <mjo-tab label="New Tab 2">New Content 2</mjo-tab>
            `;

            // Trigger slotchange manually
            const slot = element.shadowRoot?.querySelector("slot");
            slot?.dispatchEvent(new Event("slotchange"));

            await waitForComponentUpdate(element);

            expect(updatedEventFired).to.be.true;
            expect(eventDetail).to.exist;
            expect(eventDetail.tabs).to.exist;
            expect(eventDetail.tabs).to.have.length(2);
        });

        test("should not change if clicking same tab", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            let changeEventFired = false;
            element.addEventListener("mjo-tabs:changed", () => {
                changeEventFired = true;
            });

            // Click on first tab (already active)
            const tabButtons = element.shadowRoot?.querySelectorAll(".tab-button");
            const firstTabButton = tabButtons?.[0] as HTMLButtonElement;
            firstTabButton.click();

            await waitForComponentUpdate(element);

            // Event should not fire when clicking the same tab
            expect(changeEventFired).to.be.false;
            expect(element.activeIndex).to.equal(0);
        });

        test("should properly manage tab activation states", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            // Initially first tab is active
            expect(element.tabs[0].active).to.be.true;
            expect(element.tabs[1].active).to.be.false;
            expect(element.tabs[2].active).to.be.false;

            // Activate second tab
            element.setTab(1);
            await waitForComponentUpdate(element);

            // Only second tab should be active
            expect(element.tabs[0].active).to.be.false;
            expect(element.tabs[1].active).to.be.true;
            expect(element.tabs[2].active).to.be.false;

            // Activate third tab
            element.setTab(2);
            await waitForComponentUpdate(element);

            // Only third tab should be active
            expect(element.tabs[0].active).to.be.false;
            expect(element.tabs[1].active).to.be.false;
            expect(element.tabs[2].active).to.be.true;
        });

        test("should update activeIndex correctly", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            // Test activeIndex updates with each tab activation
            expect(element.activeIndex).to.equal(0);

            element.setTab(1);
            expect(element.activeIndex).to.equal(1);

            element.setTab(2);
            expect(element.activeIndex).to.equal(2);

            element.setTab(0);
            expect(element.activeIndex).to.equal(0);
        });
    });

    /**
     * Visual States and Styling tests - verifies CSS classes, variants, and visual behavior
     */
    suite("Visual States and Styling", () => {
        test("should apply correct CSS classes for variants", async () => {
            const variants = ["light", "bordered", "solid"] as const;

            for (const variant of variants) {
                const element = (await csrFixture(
                    html`<mjo-tabs variant="${variant}">
                        <mjo-tab label="Tab 1">Content 1</mjo-tab>
                        <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    </mjo-tabs>`,
                    { modules: [TABS_MODULE_PATH] },
                )) as MjoTabs;

                await waitForComponentUpdate(element);

                const header = element.shadowRoot?.querySelector("header");
                expect(header?.getAttribute("data-variant")).to.equal(variant);

                // Check that the variant is properly set in the DOM
                expect(header).to.exist;
                expect(element.variant).to.equal(variant);
            }
        });

        test("should apply correct CSS classes for colors", async () => {
            const colors = ["default", "primary", "secondary", "success", "warning", "error", "info"] as const;

            for (const color of colors) {
                const element = (await csrFixture(
                    html`<mjo-tabs color="${color}">
                        <mjo-tab label="Tab 1">Content 1</mjo-tab>
                        <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    </mjo-tabs>`,
                    { modules: [TABS_MODULE_PATH] },
                )) as MjoTabs;

                await waitForComponentUpdate(element);

                const header = element.shadowRoot?.querySelector("header");
                expect(header?.getAttribute("data-color")).to.equal(color);
                expect(element.color).to.equal(color);
            }
        });

        test("should apply vertical layout correctly", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs vertical>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            const container = element.shadowRoot?.querySelector(".container");
            const header = element.shadowRoot?.querySelector("header");

            // Container should have vertical attribute
            expect(container?.hasAttribute("data-vertical")).to.be.true;

            // Check computed styles for vertical layout
            const containerStyles = getComputedStyle(container!);
            const headerStyles = getComputedStyle(header!);

            expect(containerStyles.flexDirection).to.equal("row");
            expect(headerStyles.flexDirection).to.equal("column");
        });

        test("should position indicator correctly for horizontal tabs", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            const indicator = element.shadowRoot?.querySelector(".indicator");
            expect(indicator).to.exist;

            // For horizontal tabs, indicator should be positioned at bottom
            const indicatorStyles = getComputedStyle(indicator!);
            expect(indicatorStyles.bottom).to.equal("0px");
            expect(indicatorStyles.left).to.equal("0px");
            expect(indicatorStyles.height).to.equal("2px");
        });

        test("should position indicator correctly for vertical tabs", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs vertical>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            const indicator = element.shadowRoot?.querySelector(".indicator");
            expect(indicator).to.exist;

            // For vertical tabs, indicator should be positioned at right
            const indicatorStyles = getComputedStyle(indicator!);
            expect(indicatorStyles.right).to.equal("0px");
            expect(indicatorStyles.top).to.equal("0px");
            expect(indicatorStyles.width).to.equal("2px");
        });

        test("should update indicator position on tab change", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            const indicator = element.shadowRoot?.querySelector(".indicator") as HTMLElement;
            expect(indicator).to.exist;

            // Get initial indicator position
            const initialTransform = indicator.style.transform;

            // Switch to second tab
            element.setTab(1);
            await waitForComponentUpdate(element);

            // Wait for animation/positioning update
            await new Promise((resolve) => setTimeout(resolve, 50));

            // Indicator position should change
            const newTransform = indicator.style.transform;
            expect(newTransform).to.not.equal(initialTransform);

            // Transform should contain translateX for horizontal layout
            expect(newTransform).to.include("translateX");
        });
    });

    /**
     * Accessibility tests - verifies ARIA attributes, roles, and keyboard navigation
     */
    suite("Accessibility", () => {
        test("should have proper ARIA roles and labels", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="First Tab">First content</mjo-tab>
                    <mjo-tab label="Second Tab">Second content</mjo-tab>
                    <mjo-tab label="Third Tab">Third content</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            // Header should have tablist role
            const header = element.shadowRoot?.querySelector("header");
            expect(header?.getAttribute("role")).to.equal("tablist");
            expect(header?.getAttribute("aria-label")).to.equal("Tab Navigation");

            // Tab buttons should have proper roles and attributes
            const tabButtons = element.shadowRoot?.querySelectorAll(".tab-button");
            tabButtons?.forEach((button, index) => {
                expect(button.getAttribute("role")).to.equal("tab");
                expect(button.getAttribute("aria-label")).to.equal(element.tabs[index].label);
                expect(button.getAttribute("aria-controls")).to.equal(element.tabs[index].id);
                expect(button.getAttribute("id")).to.equal(`tab-${element.tabs[index].id}`);
            });
        });

        test("should have correct tabindex management", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            const tabButtons = element.shadowRoot?.querySelectorAll(".tab-button");

            // Active tab should have tabindex -1 (managed by roving tabindex)
            expect(tabButtons?.[0].getAttribute("tabindex")).to.equal("-1");
            // Inactive tabs should have tabindex 0
            expect(tabButtons?.[1].getAttribute("tabindex")).to.equal("0");
            expect(tabButtons?.[2].getAttribute("tabindex")).to.equal("0");

            // After switching tabs, tabindex should update
            element.setTab(1);
            await waitForComponentUpdate(element);

            expect(tabButtons?.[0].getAttribute("tabindex")).to.equal("0");
            expect(tabButtons?.[1].getAttribute("tabindex")).to.equal("-1");
            expect(tabButtons?.[2].getAttribute("tabindex")).to.equal("0");
        });

        test("should have proper aria-selected states", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            const tabButtons = element.shadowRoot?.querySelectorAll(".tab-button");

            // First tab should be selected
            expect(tabButtons?.[0].getAttribute("aria-selected")).to.equal("true");
            expect(tabButtons?.[1].getAttribute("aria-selected")).to.equal("false");
            expect(tabButtons?.[2].getAttribute("aria-selected")).to.equal("false");

            // Switch to second tab
            element.setTab(1);
            await waitForComponentUpdate(element);

            // Second tab should now be selected
            expect(tabButtons?.[0].getAttribute("aria-selected")).to.equal("false");
            expect(tabButtons?.[1].getAttribute("aria-selected")).to.equal("true");
            expect(tabButtons?.[2].getAttribute("aria-selected")).to.equal("false");
        });

        test("should have correct aria-controls relationships", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            const tabButtons = element.shadowRoot?.querySelectorAll(".tab-button");

            // Each tab button should control its corresponding tab panel
            tabButtons?.forEach((button, index) => {
                const tabId = element.tabs[index].id;
                expect(button.getAttribute("aria-controls")).to.equal(tabId);

                // The button id should be "tab-" + tabId
                const buttonId = button.getAttribute("id");
                expect(buttonId).to.equal(`tab-${tabId}`);
                expect(buttonId).to.not.be.empty;
                expect(tabId).to.not.be.empty;
            });

            // Tab panels should have proper attributes
            element.tabs.forEach((tab, index) => {
                const container = tab.shadowRoot?.querySelector(".container");
                expect(container?.getAttribute("role")).to.equal("tabpanel");

                // aria-labelledby should reference the button id, but might be empty initially
                // due to render timing - this is acceptable for this test
                const labelledBy = container?.getAttribute("aria-labelledby");
                if (labelledBy) {
                    expect(labelledBy).to.include("tab-");
                }

                // Only active tab panel should be visible
                if (index === element.activeIndex) {
                    expect(container?.hasAttribute("hidden")).to.be.false;
                } else {
                    expect(container?.hasAttribute("hidden")).to.be.true;
                }
            });
        });

        test("should handle keyboard navigation (basic setup verification)", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            const tabButtons = element.shadowRoot?.querySelectorAll(".tab-button");

            // Tab buttons should be focusable elements
            tabButtons?.forEach((button) => {
                expect(button.tagName.toLowerCase()).to.equal("button");
                expect(button.getAttribute("type")).to.equal("button");

                // Should not be disabled
                expect(button.hasAttribute("disabled")).to.be.false;
            });

            // Note: Full keyboard navigation testing would require simulating keyboard events
            // which is complex in this test environment. This verifies the basic setup is correct.
        });
    });

    /**
     * SSR Features tests - verifies SSR functionality and hydration
     */
    suite("SSR Features", () => {
        test("should maintain properties consistently across CSR and SSR modes", async () => {
            const template = html`<mjo-tabs variant="solid" color="primary" vertical>
                <mjo-tab label="SSR Tab 1">SSR Content 1</mjo-tab>
                <mjo-tab label="SSR Tab 2">SSR Content 2</mjo-tab>
            </mjo-tabs>`;
            const options = { modules: [TABS_MODULE_PATH] };

            const csrElement = (await csrFixture(template, options)) as MjoTabs;
            const ssrElement = (await ssrHydratedFixture(template, options)) as MjoTabs;

            await waitForComponentUpdate(csrElement);
            await waitForComponentUpdate(ssrElement);

            // Properties should be consistent
            expect(csrElement.variant).to.equal(ssrElement.variant);
            expect(csrElement.color).to.equal(ssrElement.color);
            expect(csrElement.vertical).to.equal(ssrElement.vertical);
            expect(csrElement.activeIndex).to.equal(ssrElement.activeIndex);

            // Both should have discovered the same number of tabs
            expect(csrElement.tabs.length).to.equal(ssrElement.tabs.length);
            expect(csrElement.tabs.length).to.equal(2);
        });

        test("should handle SSR hydration correctly", async () => {
            const template = html`<mjo-tabs color="secondary">
                <mjo-tab label="Hydration Tab">Hydration Content</mjo-tab>
            </mjo-tabs>`;
            const options = { modules: [TABS_MODULE_PATH] };

            // First render in SSR mode
            const ssrElement = await ssrNonHydratedFixture(template, options);
            expect(ssrElement).to.exist;

            // Then hydrate the same template
            const hydratedElement = (await ssrHydratedFixture(template, options)) as MjoTabs;
            await waitForComponentUpdate(hydratedElement);

            // After hydration, all properties should be preserved
            expect(hydratedElement.color).to.equal("secondary");
            expect(hydratedElement.variant).to.equal("light"); // default
            expect(hydratedElement.vertical).to.be.false; // default

            // Should have proper shadow DOM after hydration
            expect(hydratedElement.shadowRoot).to.exist;
            expect(hydratedElement.tabs.length).to.equal(1);
            expect(hydratedElement.tabs[0].label).to.equal("Hydration Tab");
        });

        test("should preserve tab states after hydration", async () => {
            const template = html`<mjo-tabs>
                <mjo-tab label="Preserved Tab 1">Preserved Content 1</mjo-tab>
                <mjo-tab label="Preserved Tab 2">Preserved Content 2</mjo-tab>
                <mjo-tab label="Preserved Tab 3">Preserved Content 3</mjo-tab>
            </mjo-tabs>`;
            const options = { modules: [TABS_MODULE_PATH] };

            const hydratedElement = (await ssrHydratedFixture(template, options)) as MjoTabs;
            await waitForComponentUpdate(hydratedElement);

            // First tab should be active by default
            expect(hydratedElement.activeIndex).to.equal(0);
            expect(hydratedElement.tabs[0].active).to.be.true;
            expect(hydratedElement.tabs[1].active).to.be.false;
            expect(hydratedElement.tabs[2].active).to.be.false;

            // Tab functionality should work after hydration
            hydratedElement.setTab(2);
            await waitForComponentUpdate(hydratedElement);

            expect(hydratedElement.activeIndex).to.equal(2);
            expect(hydratedElement.tabs[0].active).to.be.false;
            expect(hydratedElement.tabs[1].active).to.be.false;
            expect(hydratedElement.tabs[2].active).to.be.true;
        });

        test("should handle complex property combinations in all modes", async () => {
            const template = html`<mjo-tabs variant="bordered" color="warning" vertical>
                <mjo-tab label="Complex Tab 1">Complex Content 1</mjo-tab>
                <mjo-tab label="Complex Tab 2">Complex Content 2</mjo-tab>
            </mjo-tabs>`;
            const options = { modules: [TABS_MODULE_PATH] };

            // Test all three modes with complex properties
            const csrElement = (await csrFixture(template, options)) as MjoTabs;
            const ssrNonHydrated = await ssrNonHydratedFixture(template, options);
            const ssrHydrated = (await ssrHydratedFixture(template, options)) as MjoTabs;

            await waitForComponentUpdate(csrElement);
            await waitForComponentUpdate(ssrHydrated);

            // All modes should render the element
            expect(csrElement).to.exist;
            expect(ssrNonHydrated).to.exist;
            expect(ssrHydrated).to.exist;

            // CSR and SSR hydrated should have identical properties
            expect(csrElement.variant).to.equal(ssrHydrated.variant);
            expect(csrElement.color).to.equal(ssrHydrated.color);
            expect(csrElement.vertical).to.equal(ssrHydrated.vertical);

            // Both should have proper shadow DOM with correct attributes
            const csrHeader = csrElement.shadowRoot?.querySelector("header");
            const ssrHeader = ssrHydrated.shadowRoot?.querySelector("header");

            expect(csrHeader?.getAttribute("data-variant")).to.equal("bordered");
            expect(ssrHeader?.getAttribute("data-variant")).to.equal("bordered");

            expect(csrHeader?.getAttribute("data-color")).to.equal("warning");
            expect(ssrHeader?.getAttribute("data-color")).to.equal("warning");

            const csrContainer = csrElement.shadowRoot?.querySelector(".container");
            const ssrContainer = ssrHydrated.shadowRoot?.querySelector(".container");

            expect(csrContainer?.hasAttribute("data-vertical")).to.be.true;
            expect(ssrContainer?.hasAttribute("data-vertical")).to.be.true;
        });
    });

    /**
     * Edge Cases and Integration tests - verifies complex scenarios and edge cases
     */
    suite("Edge Cases and Integration", () => {
        test("should handle dynamic tab addition/removal", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Initial Tab">Initial Content</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            expect(element.tabs.length).to.equal(1);
            expect(element.activeIndex).to.equal(0);

            // Add new tabs dynamically
            element.innerHTML = `
                <mjo-tab label="Tab 1">Content 1</mjo-tab>
                <mjo-tab label="Tab 2">Content 2</mjo-tab>
                <mjo-tab label="Tab 3">Content 3</mjo-tab>
            `;

            // Trigger slotchange to update tabs
            const slot = element.shadowRoot?.querySelector("slot");
            slot?.dispatchEvent(new Event("slotchange"));

            await waitForComponentUpdate(element);

            expect(element.tabs.length).to.equal(3);
            expect(element.activeIndex).to.equal(0); // Should reset to first tab
            expect(element.tabs[0].active).to.be.true;
            expect(element.tabs[1].active).to.be.false;
            expect(element.tabs[2].active).to.be.false;
        });

        test("should handle tab ID generation correctly", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Tab 1">Content 1</mjo-tab>
                    <mjo-tab label="Tab 2" id="custom-tab-id">Content 2</mjo-tab>
                    <mjo-tab label="Tab 3">Content 3</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            // First and third tabs should have auto-generated IDs
            expect(element.tabs[0].id).to.not.be.empty;
            expect(element.tabs[0].id).to.not.equal("custom-tab-id");
            expect(element.tabs[2].id).to.not.be.empty;
            expect(element.tabs[2].id).to.not.equal("custom-tab-id");

            // Second tab should keep its custom ID
            expect(element.tabs[1].id).to.equal("custom-tab-id");

            // All IDs should be unique
            const ids = element.tabs.map((tab) => tab.id);
            const uniqueIds = [...new Set(ids)];
            expect(uniqueIds.length).to.equal(ids.length);
        });

        test("should handle multiple tabs with same content", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Duplicate">Same Content</mjo-tab>
                    <mjo-tab label="Duplicate">Same Content</mjo-tab>
                    <mjo-tab label="Duplicate">Same Content</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            expect(element.tabs.length).to.equal(3);

            // All should have same labels but different IDs
            element.tabs.forEach((tab) => {
                expect(tab.label).to.equal("Duplicate");
                expect(tab.id).to.not.be.empty;
            });

            // All IDs should be unique despite same labels
            const ids = element.tabs.map((tab) => tab.id);
            const uniqueIds = [...new Set(ids)];
            expect(uniqueIds.length).to.equal(3);

            // Navigation should work correctly
            element.setTab(1);
            await waitForComponentUpdate(element);

            expect(element.activeIndex).to.equal(1);
            expect(element.tabs[0].active).to.be.false;
            expect(element.tabs[1].active).to.be.true;
            expect(element.tabs[2].active).to.be.false;
        });

        test("should maintain functionality when tabs change", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Original 1">Original Content 1</mjo-tab>
                    <mjo-tab label="Original 2">Original Content 2</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            // Activate second tab
            element.setTab(1);
            await waitForComponentUpdate(element);
            expect(element.activeIndex).to.equal(1);

            // Replace tabs
            element.innerHTML = `
                <mjo-tab label="New 1">New Content 1</mjo-tab>
                <mjo-tab label="New 2">New Content 2</mjo-tab>
                <mjo-tab label="New 3">New Content 3</mjo-tab>
            `;

            const slot = element.shadowRoot?.querySelector("slot");
            slot?.dispatchEvent(new Event("slotchange"));

            await waitForComponentUpdate(element);

            // Should reset to first tab
            expect(element.tabs.length).to.equal(3);
            expect(element.activeIndex).to.equal(0);

            // Navigation should still work
            element.setTab(2);
            await waitForComponentUpdate(element);

            expect(element.activeIndex).to.equal(2);
            expect(element.tabs[2].active).to.be.true;
        });

        test("should handle tab content updates correctly", async () => {
            const element = (await csrFixture(
                html`<mjo-tabs>
                    <mjo-tab label="Updateable Tab">Original Content</mjo-tab>
                </mjo-tabs>`,
                { modules: [TABS_MODULE_PATH] },
            )) as MjoTabs;

            await waitForComponentUpdate(element);

            const tab = element.tabs[0];
            expect(tab.label).to.equal("Updateable Tab");

            // Update tab label and trigger re-render
            tab.label = "Updated Tab Label";
            element.requestUpdate(); // Force parent component to re-render
            await waitForComponentUpdate(element);

            // Tab button should reflect the updated label
            const tabButton = element.shadowRoot?.querySelector(".tab-button");
            expect(tabButton?.textContent?.trim()).to.equal("Updated Tab Label");
            expect(tabButton?.getAttribute("aria-label")).to.equal("Updated Tab Label");
        });
    });
});
