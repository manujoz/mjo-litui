import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AiFillAccountBook, AiFillAlert, AiFillHome } from "mjo-icons/ai";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class ListboxController {
    /**
     * Renders the complete demo page for mjo-listbox
     */
    async renderListboxPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-listbox");

        if (!component) {
            throw new Error("mjo-listbox component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays a list of options with keyboard navigation, selection modes, and interactive features.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const sampleItems = [
            { label: "Item 1", value: "item1" },
            { label: "Item 2", value: "item2" },
            { label: "Item 3", value: "item3" },
            { label: "Item 4", value: "item4" },
            { label: "Item 5", value: "item5" },
        ];

        const itemsWithIcons = [
            { label: "Home", value: "home", startIcon: AiFillHome },
            { label: "Profile", value: "profile", startIcon: AiFillAccountBook, endIcon: AiFillAlert },
            { label: "Settings", value: "settings", endIcon: AiFillAlert },
        ];

        const itemsWithColors = [
            { label: "Primary", value: "primary", color: "primary" },
            { label: "Secondary", value: "secondary", color: "secondary" },
            { label: "Success", value: "success", color: "success" },
            { label: "Warning", value: "warning", color: "warning" },
            { label: "Error", value: "error", color: "error" },
            { label: "Info", value: "info", color: "info" },
        ];

        const itemsWithDescriptions = [
            { label: "Item 1", value: "item1", description: "This is the first item" },
            { label: "Item 2", value: "item2", description: "This is the second item" },
            { label: "Item 3", value: "item3", description: "This is the third item" },
        ];

        const itemsWithSections = [
            { section: "Group 1" },
            { label: "Item 1", value: "item1" },
            { label: "Item 2", value: "item2" },
            { section: "Group 2" },
            { label: "Item 3", value: "item3" },
            { label: "Item 4", value: "item4", disabled: true },
        ];

        const listboxTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Listbox Playground</h2>
                <p class="subtitle">Customize and interact with listboxes in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-listbox id="playground-listbox" items=${JSON.stringify(sampleItems)}></mjo-listbox>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Variant</h4>
                            <select onchange="changeListboxProp('variant', this.value)">
                                <option value="solid" selected>Solid</option>
                                <option value="bordered">Bordered</option>
                                <option value="light">Light</option>
                                <option value="flat">Flat</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeListboxProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Selection Mode</h4>
                            <select onchange="changeListboxProp('selectable', this.value)">
                                <option value="">None</option>
                                <option value="single">Single</option>
                                <option value="multiple">Multiple</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Item Type</h4>
                            <div class="button-group">
                                <button class="active" onclick="changeItemType('basic')">Basic Items</button>
                                <button onclick="changeItemType('icons')">With Icons</button>
                                <button onclick="changeItemType('colors')">With Colors</button>
                                <button onclick="changeItemType('descriptions')">With Descriptions</button>
                                <button onclick="changeItemType('sections')">With Sections</button>
                                <button onclick="changeItemType('mixed')">Mixed Content</button>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Event Info</h4>
                            <div
                                id="event-info"
                                style="min-height: 40px; padding: 10px; background: var(--mjo-background-color-card-low); border-radius: 6px; font-size: 0.875rem;"
                            >
                                <span style="color: var(--mjo-foreground-color-low);">Click an item to see event details...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-listbox component.</p>

                <h3>Basic Listbox</h3>
                <div class="component-showcase">
                    <mjo-listbox items=${JSON.stringify(sampleItems)}></mjo-listbox>
                </div>

                <h3>Variants</h3>
                <div class="component-showcase">
                    <mjo-listbox items=${JSON.stringify(sampleItems)} variant="solid"></mjo-listbox>
                    <mjo-listbox items=${JSON.stringify(sampleItems)} variant="bordered"></mjo-listbox>
                    <mjo-listbox items=${JSON.stringify(sampleItems)} variant="light"></mjo-listbox>
                    <mjo-listbox items=${JSON.stringify(sampleItems)} variant="flat"></mjo-listbox>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <mjo-listbox items=${JSON.stringify(sampleItems)} size="small"></mjo-listbox>
                    <mjo-listbox items=${JSON.stringify(sampleItems)} size="medium"></mjo-listbox>
                    <mjo-listbox items=${JSON.stringify(sampleItems)} size="large"></mjo-listbox>
                </div>

                <h3>Selection Modes</h3>
                <div class="component-showcase">
                    <mjo-listbox items=${JSON.stringify(sampleItems)} selectable="single"></mjo-listbox>
                    <mjo-listbox items=${JSON.stringify(sampleItems)} selectable="multiple"></mjo-listbox>
                </div>

                <h3>With Icons</h3>
                <div class="component-showcase">
                    <mjo-listbox items=${JSON.stringify(itemsWithIcons)}></mjo-listbox>
                </div>

                <h3>With Colors</h3>
                <div class="component-showcase">
                    <mjo-listbox items=${JSON.stringify(itemsWithColors)} variant="bordered"></mjo-listbox>
                </div>

                <h3>With Descriptions</h3>
                <div class="component-showcase">
                    <mjo-listbox items=${JSON.stringify(itemsWithDescriptions)} size="large"></mjo-listbox>
                </div>

                <h3>With Sections</h3>
                <div class="component-showcase">
                    <mjo-listbox items=${JSON.stringify(itemsWithSections)}></mjo-listbox>
                </div>

                <h3>Clickable with Values</h3>
                <div class="component-showcase">
                    <mjo-listbox
                        items=${JSON.stringify([
                            { label: "Action 1", value: "action1" },
                            { label: "Action 2", value: "action2" },
                            { label: "Action 3", value: "action3", disabled: true },
                        ])}
                        selectable="single"
                    ></mjo-listbox>
                </div>

                <h3>With Links</h3>
                <div class="component-showcase">
                    <mjo-listbox
                        items=${JSON.stringify([
                            { label: "Home", href: "/", value: "home" },
                            { label: "About", href: "/about", value: "about" },
                            { label: "Contact", href: "/contact", value: "contact" },
                        ])}
                    ></mjo-listbox>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(listboxTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/listbox-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-listbox.css"],
        });
    }
}
