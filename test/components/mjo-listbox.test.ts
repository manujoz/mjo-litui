/* eslint-disable no-console */
/**
 * Test suite for mjo-listbox component
 * Tests accessibility, keyboard navigation, selection functionality, and rendering
 */

import type { MjoListbox } from "../../src/mjo-listbox";

import { expect } from "@esm-bundle/chai";
import { html } from "lit";

// Import fixtures
import { csrFixture, ssrHydratedFixture, ssrNonHydratedFixture } from "../fixtures/base-fixture.js";

// Import icons for testing
import { AiFillAccountBook, AiFillAlert, AiFillHome } from "mjo-icons/ai";

// Import test utilities
import { assertHasShadowRoot, assertProperty, waitForComponentUpdate } from "../fixtures/test-utils.js";

// Component import path - this will load the component definition
const LISTBOX_MODULE_PATH = "../../dist/mjo-listbox.js";

// Sample data for testing
const sampleItems = [
    { label: "Item 1", value: "item1" },
    { label: "Item 2", value: "item2" },
    { label: "Item 3", value: "item3", disabled: true },
    { label: "Item 4", value: "item4" },
    { label: "Item 5", value: "item5" },
];

const itemsWithIcons = [
    { label: "Home", value: "home", startIcon: AiFillHome },
    { label: "Profile", value: "profile", startIcon: AiFillAccountBook, endIcon: AiFillAlert },
    { label: "Settings", value: "settings", endIcon: AiFillAlert },
];

const itemsWithHref = [
    { label: "Home", href: "/", value: "home" },
    { label: "About", href: "/about", value: "about" },
    { label: "Contact", href: "/contact", value: "contact" },
];

const itemsWithSections = [
    { section: "Group 1" },
    { label: "Item 1", value: "item1" },
    { label: "Item 2", value: "item2" },
    { section: "Group 2" },
    { label: "Item 3", value: "item3" },
    { label: "Item 4", value: "item4", disabled: true },
];

const itemsWithDescription = [
    { label: "Item 1", value: "item1", description: "Description for item 1" },
    { label: "Item 2", value: "item2", description: "Description for item 2" },
];

/**
 * Test suite for mjo-listbox component
 */
suite("mjo-listbox Component", () => {
    /**
     * Basic rendering tests - verifies component renders correctly in CSR mode
     */
    suite("Basic Rendering", () => {
        test("should render in CSR mode", async () => {
            const element = await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            });

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-listbox");
            assertHasShadowRoot(element);
        });

        test("should have proper ARIA roles and attributes", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const container = element.shadowRoot?.querySelector('[role="listbox"]');
            expect(container).to.exist;
            expect(container?.getAttribute("role")).to.equal("listbox");
            expect(container?.getAttribute("tabindex")).to.equal("0");
            expect(container?.getAttribute("aria-multiselectable")).to.equal("false");
        });

        test("should render empty listbox", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${[]}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const container = element.shadowRoot?.querySelector('[role="listbox"]');
            expect(container).to.exist;

            const items = element.shadowRoot?.querySelectorAll("listbox-item");
            expect(items).to.have.length(0);
        });
    });

    /**
     * SSR rendering tests - verifies component renders correctly in SSR modes
     */
    suite("SSR Rendering", () => {
        test("should render in SSR non-hydrated mode", async () => {
            const element = await ssrNonHydratedFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            });

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-listbox");
        });

        test("should render in SSR hydrated mode", async () => {
            const element = await ssrHydratedFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            });

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-listbox");
            assertHasShadowRoot(element);
        });
    });

    /**
     * Properties tests - verifies component properties work correctly
     */
    suite("Properties", () => {
        test("should set items property correctly", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            expect(element).to.have.property("items");
            expect(element.items).to.deep.equal(sampleItems);
        });

        test("should set variant property correctly", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} variant="bordered"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            expect(element).to.have.property("variant", "bordered");
        });

        test("should set size property correctly", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} size="large"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            expect(element).to.have.property("size", "large");
        });

        test("should set selectable property correctly", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="single"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            expect(element).to.have.property("selectable", "single");
        });

        test("should apply default values correctly", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            assertProperty(element, "variant", "solid");
            assertProperty(element, "size", "medium");
            assertProperty(element, "selectable", undefined);
            expect(element.selectedItems).to.deep.equal([]);
        });

        test("should set aria-multiselectable correctly for different selection modes", async () => {
            // Single selection mode
            const singleElement = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="single"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(singleElement);

            let container = singleElement.shadowRoot?.querySelector('[role="listbox"]');
            expect(container?.getAttribute("aria-multiselectable")).to.equal("false");

            // Multiple selection mode
            const multipleElement = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="multiple"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(multipleElement);

            container = multipleElement.shadowRoot?.querySelector('[role="listbox"]');
            expect(container?.getAttribute("aria-multiselectable")).to.equal("true");
        });
    });

    /**
     * Items rendering tests - verifies items render as expected
     */
    suite("Items Rendering", () => {
        test("should render items as expected", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const listboxItems = element.shadowRoot?.querySelectorAll("listbox-item");
            expect(listboxItems).to.have.length(5);

            // Check that each item has proper role and properties
            listboxItems?.forEach((item, index) => {
                const itemElement = item.shadowRoot?.querySelector('[role="option"]');
                expect(itemElement).to.exist;
                expect(itemElement?.getAttribute("aria-selected")).to.equal("false");

                if (sampleItems[index].disabled) {
                    expect(itemElement?.getAttribute("aria-disabled")).to.equal("true");
                } else {
                    expect(itemElement?.getAttribute("aria-disabled")).to.equal("false");
                }
            });
        });

        test("should render sections and items as expected", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${itemsWithSections}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const sections = element.shadowRoot?.querySelectorAll("listbox-section");
            expect(sections).to.have.length(2);

            const items = element.shadowRoot?.querySelectorAll("listbox-item");
            expect(items).to.have.length(4); // 4 actual items, 2 sections

            // Check sections have proper role
            sections?.forEach((section) => {
                const sectionElement = section.shadowRoot?.querySelector('[role="group"]');
                expect(sectionElement).to.exist;
            });
        });

        test("should render items with icons", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${itemsWithIcons}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const listboxItems = element.shadowRoot?.querySelectorAll("listbox-item");
            expect(listboxItems).to.have.length(3);

            // Check first item has start icon
            const firstItem = listboxItems?.[0];
            const startIcons = firstItem?.shadowRoot?.querySelectorAll("mjo-icon");
            expect(startIcons?.length).to.be.greaterThan(0);

            // Check second item has both start and end icons
            const secondItem = listboxItems?.[1];
            const bothIcons = secondItem?.shadowRoot?.querySelectorAll("mjo-icon");
            expect(bothIcons?.length).to.be.greaterThan(1);
        });

        test("should render items with href as links", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${itemsWithHref}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const listboxItems = element.shadowRoot?.querySelectorAll("listbox-item");
            expect(listboxItems).to.have.length(3);

            // Check that items with href render as anchor elements
            listboxItems?.forEach((item, index) => {
                const anchor = item.shadowRoot?.querySelector("a");
                expect(anchor).to.exist;
                expect(anchor?.getAttribute("href")).to.equal(itemsWithHref[index].href);
                expect(anchor?.getAttribute("role")).to.equal("option");
            });
        });

        test("should render disabled items correctly", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const listboxItems = element.shadowRoot?.querySelectorAll("listbox-item");
            const disabledItem = listboxItems?.[2]; // Third item is disabled

            const disabledElement = disabledItem?.shadowRoot?.querySelector('[aria-disabled="true"]');
            expect(disabledElement).to.exist;

            const inner = disabledItem?.shadowRoot?.querySelector("[data-disabled]");
            expect(inner).to.exist;
        });
    });

    /**
     * Event dispatching tests - only for CSR mode
     */
    suite("Event Dispatching (CSR Only)", () => {
        test("should dispatch click event when item is clicked", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            let clickEvent: any = null;
            element.addEventListener("mjo-listbox:click", (event) => {
                clickEvent = event;
            });

            const firstItem = element.shadowRoot?.querySelector("listbox-item");
            const itemContainer = firstItem?.shadowRoot?.querySelector(".container");
            itemContainer?.dispatchEvent(new Event("click", { bubbles: true }));

            await waitForComponentUpdate(element);

            expect(clickEvent).to.exist;
            expect(clickEvent.detail.item).to.deep.equal(sampleItems[0]);
            expect(clickEvent.detail.value).to.equal(sampleItems[0].value);
        });

        test("should dispatch change event on selection", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="single"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            let changeEvent: any = null;
            element.addEventListener("mjo-listbox:change", (event) => {
                changeEvent = event;
            });

            const firstItem = element.shadowRoot?.querySelector("listbox-item");
            const itemContainer = firstItem?.shadowRoot?.querySelector(".container");
            itemContainer?.dispatchEvent(new Event("click", { bubbles: true }));

            await waitForComponentUpdate(element);

            expect(changeEvent).to.exist;
            expect(changeEvent.detail.selectedItems).to.have.length(1);
            expect(changeEvent.detail.selectedItems[0]).to.deep.equal(sampleItems[0]);
            expect(changeEvent.detail.selectedValues).to.include(sampleItems[0].value);
        });

        test("should dispatch focus and blur events", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            let focusEvent: any = null;
            let blurEvent: any = null;

            element.addEventListener("mjo-listbox:focus", (event) => {
                focusEvent = event;
            });

            element.addEventListener("mjo-listbox:blur", (event) => {
                blurEvent = event;
            });

            const firstItem = element.shadowRoot?.querySelector("listbox-item");
            const itemContainer = firstItem?.shadowRoot?.querySelector(".container");

            itemContainer?.dispatchEvent(new Event("focus", { bubbles: true }));
            await waitForComponentUpdate(element);

            expect(focusEvent).to.exist;
            expect(focusEvent.detail.item).to.deep.equal(sampleItems[0]);

            itemContainer?.dispatchEvent(new Event("blur", { bubbles: true }));
            await waitForComponentUpdate(element);

            expect(blurEvent).to.exist;
            expect(blurEvent.detail.item).to.deep.equal(sampleItems[0]);
        });
    });

    /**
     * Single selection tests - only for CSR mode
     */
    suite("Single Selection (CSR Only)", () => {
        test("should select single item correctly", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="single"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const firstItem = element.shadowRoot?.querySelector("listbox-item");
            const itemContainer = firstItem?.shadowRoot?.querySelector(".container");
            itemContainer?.dispatchEvent(new Event("click", { bubbles: true }));

            await waitForComponentUpdate(element);

            expect(element.selectedItems).to.have.length(1);
            expect(element.selectedItems[0]).to.deep.equal(sampleItems[0]);

            // Check that item is marked as selected
            expect(firstItem?.selected).to.be.true;
        });

        test("should replace selection when selecting another item", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="single"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const items = element.shadowRoot?.querySelectorAll("listbox-item");

            // Select first item
            const firstItemContainer = items?.[0]?.shadowRoot?.querySelector(".container");
            firstItemContainer?.dispatchEvent(new Event("click", { bubbles: true }));
            await waitForComponentUpdate(element);

            expect(element.selectedItems).to.have.length(1);
            expect(element.selectedItems[0]).to.deep.equal(sampleItems[0]);

            // Select second item
            const secondItemContainer = items?.[1]?.shadowRoot?.querySelector(".container");
            secondItemContainer?.dispatchEvent(new Event("click", { bubbles: true }));
            await waitForComponentUpdate(element);

            expect(element.selectedItems).to.have.length(1);
            expect(element.selectedItems[0]).to.deep.equal(sampleItems[1]);

            // First item should no longer be selected
            expect(items?.[0]?.selected).to.be.false;
            expect(items?.[1]?.selected).to.be.true;
        });

        test("should not select when selectable is not set", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const firstItem = element.shadowRoot?.querySelector("listbox-item");
            const itemContainer = firstItem?.shadowRoot?.querySelector(".container");
            itemContainer?.dispatchEvent(new Event("click", { bubbles: true }));

            await waitForComponentUpdate(element);

            expect(element.selectedItems).to.have.length(0);
        });
    });

    /**
     * Multiple selection tests - only for CSR mode
     */
    suite("Multiple Selection (CSR Only)", () => {
        test("should select multiple items correctly", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="multiple"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const items = element.shadowRoot?.querySelectorAll("listbox-item");

            // Select first item
            const firstItemContainer = items?.[0]?.shadowRoot?.querySelector(".container");
            firstItemContainer?.dispatchEvent(new Event("click", { bubbles: true }));
            await waitForComponentUpdate(element);

            expect(element.selectedItems).to.have.length(1);
            expect(element.selectedItems[0]).to.deep.equal(sampleItems[0]);

            // Select second item (should add to selection)
            const secondItemContainer = items?.[1]?.shadowRoot?.querySelector(".container");
            secondItemContainer?.dispatchEvent(new Event("click", { bubbles: true }));
            await waitForComponentUpdate(element);

            expect(element.selectedItems).to.have.length(2);
            expect(element.selectedItems).to.include.deep.members([sampleItems[0], sampleItems[1]]);
        });

        test("should toggle selection in multiple mode", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="multiple"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const firstItem = element.shadowRoot?.querySelector("listbox-item");
            const itemContainer = firstItem?.shadowRoot?.querySelector(".container");

            // Select item
            itemContainer?.dispatchEvent(new Event("click", { bubbles: true }));
            await waitForComponentUpdate(element);

            expect(element.selectedItems).to.have.length(1);
            expect(firstItem?.selected).to.be.true;

            // Click same item again (should deselect)
            itemContainer?.dispatchEvent(new Event("click", { bubbles: true }));
            await waitForComponentUpdate(element);

            expect(element.selectedItems).to.have.length(0);
            expect(firstItem?.selected).to.be.false;
        });
    });

    /**
     * Keyboard navigation tests - only for CSR mode
     */
    suite("Keyboard Navigation (CSR Only)", () => {
        test("should navigate with Arrow Down key", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const items = element.shadowRoot?.querySelectorAll("listbox-item");

            // Start from first item
            const firstItemContainer = items?.[0]?.shadowRoot?.querySelector(".container") as HTMLElement;
            firstItemContainer?.focus();
            await waitForComponentUpdate(element);

            // Navigate down with keyboard
            const downEvent = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true });
            firstItemContainer?.dispatchEvent(downEvent);

            await waitForComponentUpdate(element);

            // Should focus second item
            expect(items?.[1]?.focused).to.be.true;
        });

        test("should navigate with Arrow Up key", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const items = element.shadowRoot?.querySelectorAll("listbox-item");

            // Start from second item
            const secondItemContainer = items?.[1]?.shadowRoot?.querySelector(".container") as HTMLElement;
            secondItemContainer?.focus();
            await waitForComponentUpdate(element);

            // Navigate up
            const upEvent = new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true });
            secondItemContainer?.dispatchEvent(upEvent);

            await waitForComponentUpdate(element);

            expect(items?.[0]?.focused).to.be.true;
        });

        test("should jump to first item with Home key", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const items = element.shadowRoot?.querySelectorAll("listbox-item");

            // Start from last item
            const lastItemContainer = items?.[4]?.shadowRoot?.querySelector(".container") as HTMLElement;
            lastItemContainer?.focus();
            await waitForComponentUpdate(element);

            // Press Home key
            const homeEvent = new KeyboardEvent("keydown", { key: "Home", bubbles: true });
            lastItemContainer?.dispatchEvent(homeEvent);

            await waitForComponentUpdate(element);

            expect(items?.[0]?.focused).to.be.true;
        });

        test("should jump to last item with End key", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const items = element.shadowRoot?.querySelectorAll("listbox-item");

            // Start from first item
            const firstItemContainer = items?.[0]?.shadowRoot?.querySelector(".container") as HTMLElement;
            firstItemContainer?.focus();
            await waitForComponentUpdate(element);

            // Press End key
            const endEvent = new KeyboardEvent("keydown", { key: "End", bubbles: true });
            firstItemContainer?.dispatchEvent(endEvent);

            await waitForComponentUpdate(element);

            // Should focus last non-disabled item (index 4)
            expect(items?.[4]?.focused).to.be.true;
        });

        test("should skip disabled items during navigation", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const items = element.shadowRoot?.querySelectorAll("listbox-item");

            // Start from second item (index 1)
            const secondItemContainer = items?.[1]?.shadowRoot?.querySelector(".container") as HTMLElement;
            secondItemContainer?.focus();
            await waitForComponentUpdate(element);

            // Navigate down (should skip disabled item at index 2)
            const downEvent = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true });
            secondItemContainer?.dispatchEvent(downEvent);

            await waitForComponentUpdate(element);

            // Should focus item at index 3 (skipping disabled item at index 2)
            expect(items?.[3]?.focused).to.be.true;
        });

        test("should select item with Enter key", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="single"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const firstItem = element.shadowRoot?.querySelector("listbox-item");
            const itemContainer = firstItem?.shadowRoot?.querySelector(".container") as HTMLElement;

            itemContainer?.focus();
            await waitForComponentUpdate(element);

            // Press Enter
            const enterEvent = new KeyboardEvent("keydown", { key: "Enter", bubbles: true });
            itemContainer?.dispatchEvent(enterEvent);

            await waitForComponentUpdate(element);

            expect(element.selectedItems).to.have.length(1);
            expect(element.selectedItems[0]).to.deep.equal(sampleItems[0]);
        });

        test("should select item with Space key", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="single"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const firstItem = element.shadowRoot?.querySelector("listbox-item");
            const itemContainer = firstItem?.shadowRoot?.querySelector(".container") as HTMLElement;

            itemContainer?.focus();
            await waitForComponentUpdate(element);

            // Press Space
            const spaceEvent = new KeyboardEvent("keydown", { key: " ", bubbles: true });
            itemContainer?.dispatchEvent(spaceEvent);

            await waitForComponentUpdate(element);

            expect(element.selectedItems).to.have.length(1);
            expect(element.selectedItems[0]).to.deep.equal(sampleItems[0]);
        });
    });

    /**
     * Edge cases and validation tests
     */
    suite("Edge Cases and Validation", () => {
        test("should handle items without labels gracefully", async () => {
            const invalidItems = [{ value: "no-label" }];
            const element = (await csrFixture(html`<mjo-listbox .items=${invalidItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            // Should not crash when rendering items without labels
            expect(element).to.exist;

            // The item is still rendered but should show error in console
            const items = element.shadowRoot?.querySelectorAll("listbox-item");
            expect(items).to.have.length(1);

            // The item should have the value but no visible label
            expect(items?.[0]?.item).to.deep.equal({ value: "no-label" });
        });

        test("should handle mixed content types", async () => {
            const mixedItems = [
                { label: "String item", value: "string" },
                { label: 42, value: "number" },
                { section: "Section" },
                { label: "After section", value: "after" },
            ];

            const element = (await csrFixture(html`<mjo-listbox .items=${mixedItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const sections = element.shadowRoot?.querySelectorAll("listbox-section");
            const items = element.shadowRoot?.querySelectorAll("listbox-item");

            expect(sections).to.have.length(1);
            expect(items).to.have.length(3);
        });

        test("should not select disabled items", async () => {
            const element = (await csrFixture(html`<mjo-listbox .items=${sampleItems} selectable="single"></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const items = element.shadowRoot?.querySelectorAll("listbox-item");
            const disabledItem = items?.[2]; // Third item is disabled
            const disabledItemContainer = disabledItem?.shadowRoot?.querySelector(".container");

            disabledItemContainer?.dispatchEvent(new Event("click", { bubbles: true }));
            await waitForComponentUpdate(element);

            // Should not be selected
            expect(element.selectedItems).to.have.length(0);
        });

        test("should handle all disabled items", async () => {
            const disabledItems = sampleItems.map((item) => ({ ...item, disabled: true }));
            const element = (await csrFixture(html`<mjo-listbox .items=${disabledItems}></mjo-listbox>`, {
                modules: [LISTBOX_MODULE_PATH],
            })) as MjoListbox;

            await waitForComponentUpdate(element);

            const container = element.shadowRoot?.querySelector('[role="listbox"]');
            container?.dispatchEvent(new Event("focus"));
            await waitForComponentUpdate(element);

            // Keyboard events should not crash
            const items = element.shadowRoot?.querySelectorAll("listbox-item");
            const firstItemContainer = items?.[0]?.shadowRoot?.querySelector(".container");

            const downEvent = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true });
            firstItemContainer?.dispatchEvent(downEvent);
            await waitForComponentUpdate(element);

            // Should not focus any item when all are disabled
            const focusedItems = Array.from(items || []).filter((item) => item.focused);
            expect(focusedItems).to.have.length(0);
        });
    });
});
