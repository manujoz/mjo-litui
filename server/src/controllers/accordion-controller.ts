import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AiFillHeart, AiFillStar } from "mjo-icons/ai";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class AccordionController {
    /**
     * Renders the complete demo page for mjo-accordion
     */
    async renderAccordionPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-accordion");

        if (!component) {
            throw new Error("mjo-accordion component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays collapsible content panels with customizable styling and behavior.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const accordionTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Accordion Playground</h2>
                <p class="subtitle">Customize and interact with accordions in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-accordion id="playground-accordion" variant="light" selectionMode="single">
                            <mjo-accordion-item itemTitle="First Item" itemSubtitle="Subtitle for first item" expanded>
                                <p>Content of the first accordion item. This can contain any HTML content including other components.</p>
                            </mjo-accordion-item>
                            <mjo-accordion-item itemTitle="Second Item" itemSubtitle="Subtitle for second item">
                                <p>Content of the second accordion item with more detailed information.</p>
                                <ul>
                                    <li>List item 1</li>
                                    <li>List item 2</li>
                                    <li>List item 3</li>
                                </ul>
                            </mjo-accordion-item>
                            <mjo-accordion-item itemTitle="Third Item">
                                <p>This item starts expanded by default. You can set the expanded property to true.</p>
                            </mjo-accordion-item>
                        </mjo-accordion>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Variant</h4>
                            <select name="variant" onchange="changeAccordionProp('variant', this.value)">
                                <option value="light" selected>Light</option>
                                <option value="shadow">Shadow</option>
                                <option value="bordered">Bordered</option>
                                <option value="splitted">Splitted</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Selection Mode</h4>
                            <select name="selectionMode" onchange="changeAccordionProp('selectionMode', this.value)">
                                <option value="single" selected>Single</option>
                                <option value="multiple">Multiple</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Style Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="compact" type="checkbox" onchange="changeAccordionProp('compact', this.checked || false)" />
                                    <span>Compact</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Item Controls</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="itemDisabled" type="checkbox" onchange="changeAccordionItemProp('disabled', this.checked || false)" />
                                    <span>Disable First Item</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Custom Icon</h4>
                            <select name="icon" onchange="changeAccordionItemProp('icon', this.value)">
                                <option value="default" selected>Default (Right)</option>
                                <option value="down">Down Arrow</option>
                                <option value="up">Up Arrow</option>
                                <option value="left">Left Arrow</option>
                                <option value="star">Star</option>
                                <option value="heart">Heart</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-accordion component.</p>

                <h3>Variants</h3>

                <h4>Light Variant</h4>
                <div class="component-showcase accordion-showcase">
                    <mjo-accordion variant="light">
                        <mjo-accordion-item itemTitle="Light Item 1" itemSubtitle="Simple light styling">
                            <p>Content for light variant item 1.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Light Item 2" itemSubtitle="Clean and minimal">
                            <p>Content for light variant item 2.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <h4>Shadow Variant</h4>
                <div class="component-showcase accordion-showcase">
                    <mjo-accordion variant="shadow">
                        <mjo-accordion-item itemTitle="Shadow Item 1" itemSubtitle="Elevated appearance">
                            <p>Content for shadow variant item 1.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Shadow Item 2" itemSubtitle="With depth effect">
                            <p>Content for shadow variant item 2.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <h4>Bordered Variant</h4>
                <div class="component-showcase accordion-showcase">
                    <mjo-accordion variant="bordered">
                        <mjo-accordion-item itemTitle="Bordered Item 1" itemSubtitle="Clear boundaries">
                            <p>Content for bordered variant item 1.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Bordered Item 2" itemSubtitle="Defined structure">
                            <p>Content for bordered variant item 2.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <h4>Splitted Variant</h4>
                <div class="component-showcase accordion-showcase">
                    <mjo-accordion variant="splitted">
                        <mjo-accordion-item itemTitle="Splitted Item 1" itemSubtitle="Separated cards">
                            <p>Content for splitted variant item 1.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Splitted Item 2" itemSubtitle="Individual components">
                            <p>Content for splitted variant item 2.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <h3>Selection Modes</h3>

                <h4>Single Selection (Default)</h4>
                <div class="component-showcase accordion-showcase">
                    <mjo-accordion selectionMode="single" variant="bordered">
                        <mjo-accordion-item itemTitle="Single Mode Item 1" itemSubtitle="Only one can be open">
                            <p>When you open this item, others will close automatically.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Single Mode Item 2" itemSubtitle="Mutually exclusive">
                            <p>This is useful for FAQ sections or when you want to save space.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Single Mode Item 3" itemSubtitle="Clean presentation">
                            <p>The single selection mode provides a clean, organized view.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <h4>Multiple Selection</h4>
                <div class="component-showcase accordion-showcase">
                    <mjo-accordion selectionMode="multiple" variant="bordered">
                        <mjo-accordion-item itemTitle="Multiple Mode Item 1" itemSubtitle="Independent state">
                            <p>Multiple items can be opened simultaneously in this mode.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Multiple Mode Item 2" itemSubtitle="More flexibility" expanded>
                            <p>This provides more flexibility for users to view multiple sections at once.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Multiple Mode Item 3" itemSubtitle="User choice" expanded>
                            <p>Users can choose which items to keep open for comparison or reference.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <h3>Compact Mode</h3>
                <div class="component-showcase accordion-showcase">
                    <mjo-accordion compact variant="shadow">
                        <mjo-accordion-item itemTitle="Compact Item 1" itemSubtitle="Reduced spacing">
                            <p>Compact mode uses less vertical space, perfect for dense layouts.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Compact Item 2" itemSubtitle="Space efficient">
                            <p>Great for mobile interfaces or when screen real estate is limited.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Compact Item 3" itemSubtitle="Dense layout">
                            <p>Still maintains readability while conserving space.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <h3>Custom Icons</h3>
                <div class="component-showcase accordion-showcase">
                    <mjo-accordion variant="splitted">
                        <mjo-accordion-item itemTitle="Star Item" itemSubtitle="With star icon" icon=${AiFillStar}>
                            <p>You can customize the expand/collapse icon for each item.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Heart Item" itemSubtitle="With heart icon" icon=${AiFillHeart}>
                            <p>Different icons can help categorize or distinguish different types of content.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Default Item" itemSubtitle="Default arrow icon">
                            <p>Items without a custom icon use the default arrow indicator.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <h3>Disabled Items</h3>
                <div class="component-showcase accordion-showcase">
                    <mjo-accordion variant="bordered">
                        <mjo-accordion-item itemTitle="Active Item" itemSubtitle="Can be clicked">
                            <p>This item is interactive and can be expanded or collapsed.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Disabled Item" itemSubtitle="Cannot be interacted with" disabled>
                            <p>This content won't be accessible because the item is disabled.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Another Active Item" itemSubtitle="Fully functional">
                            <p>Disabled items are useful for conditional content or work-in-progress sections.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(accordionTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/accordion-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-accordion.css"],
        });
    }
}
