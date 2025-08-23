import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AiFillApple, AiFillLock, AiFillMail, AiFillPhone } from "mjo-icons/ai";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class TextfieldController {
    /**
     * Renders the complete demo page for mjo-textfield
     */
    async renderTextfieldPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-textfield");

        if (!component) {
            throw new Error("mjo-textfield component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component for text input with validation, icons, helper text, and multiple configurations.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const textfieldTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Textfield Playground</h2>
                <p class="subtitle">Customize and interact with textfields in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-textfield id="playground-textfield" label="Interactive Demo" placeholder="Type something..."></mjo-textfield>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input type="text" placeholder="Enter label..." oninput="changeTextfieldProp('label', this.value)" value="Interactive Demo" />
                        </div>

                        <div class="control-group">
                            <h4>Placeholder</h4>
                            <input
                                type="text"
                                placeholder="Enter placeholder..."
                                oninput="changeTextfieldProp('placeholder', this.value)"
                                value="Type something..."
                            />
                        </div>

                        <div class="control-group">
                            <h4>Type</h4>
                            <select onchange="changeTextfieldProp('type', this.value)">
                                <option value="text" selected>Text</option>
                                <option value="password">Password</option>
                                <option value="email">Email</option>
                                <option value="number">Number</option>
                                <option value="tel">Tel</option>
                                <option value="url">URL</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeTextfieldProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select onchange="changeTextfieldProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Icons</h4>
                            <select onchange="changeTextfieldProp('startIcon', this.value)">
                                <option value="" selected>Select start icon</option>
                                <option value="user">User</option>
                                <option value="mail">Mail</option>
                                <option value="lock">Lock</option>
                                <option value="phone">Phone</option>
                            </select>
                            <select onchange="changeTextfieldProp('endIcon', this.value)">
                                <option value="" selected>Select end icon</option>
                                <option value="user">User</option>
                                <option value="mail">Mail</option>
                                <option value="lock">Lock</option>
                                <option value="phone">Phone</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Prefix/Suffix Text</h4>
                            <input type="text" placeholder="Prefix text..." oninput="changeTextfieldProp('prefixText', this.value)" value="" />
                            <input type="text" placeholder="Suffix text..." oninput="changeTextfieldProp('suffixText', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Helper Text</h4>
                            <input type="text" placeholder="Enter helper text..." oninput="changeTextfieldProp('helperText', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextfieldProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextfieldProp('readonly', this.checked || false)" />
                                    <span>Readonly</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextfieldProp('clearabled', this.checked || false)" />
                                    <span>Clearable</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextfieldProp('counter', this.checked || false)" />
                                    <span>Counter</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextfieldProp('fullwidth', this.checked || false)" />
                                    <span>Full Width</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextfieldProp('selectOnFocus', this.checked || false)" />
                                    <span>Select on Focus</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextfieldProp('nospiners', this.checked || false)" />
                                    <span>No Spinners</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Limits</h4>
                            <input type="number" placeholder="Max length..." oninput="changeTextfieldProp('maxlength', this.value)" value="" />
                            <input type="number" placeholder="Min length..." oninput="changeTextfieldProp('minlength', this.value)" value="" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-textfield component.</p>

                <h3>Basic Inputs</h3>
                <div class="component-showcase textfield-showcase">
                    <mjo-textfield label="First Name" placeholder="Enter your first name"></mjo-textfield>
                    <mjo-textfield label="Email" type="email" placeholder="user@example.com" startIcon=${AiFillMail} clearabled></mjo-textfield>
                    <mjo-textfield label="Password" type="password" placeholder="Enter password" startIcon=${AiFillLock}></mjo-textfield>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase textfield-showcase">
                    <mjo-textfield label="Small" size="small" placeholder="Small input"></mjo-textfield>
                    <mjo-textfield label="Medium" size="medium" placeholder="Medium input"></mjo-textfield>
                    <mjo-textfield label="Large" size="large" placeholder="Large input"></mjo-textfield>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase textfield-showcase">
                    <mjo-textfield label="Primary" color="primary" placeholder="Primary color"></mjo-textfield>
                    <mjo-textfield label="Secondary" color="secondary" placeholder="Secondary color"></mjo-textfield>
                </div>

                <h3>With Icons</h3>
                <div class="component-showcase textfield-showcase">
                    <mjo-textfield label="Username" startIcon=${AiFillApple} placeholder="Enter username"></mjo-textfield>
                    <mjo-textfield label="Phone" startIcon=${AiFillPhone} type="tel" placeholder="+1 (555) 123-4567"></mjo-textfield>
                    <mjo-textfield label="Search" endIcon=${AiFillApple} placeholder="Search users..."></mjo-textfield>
                </div>

                <h3>With Prefix and Suffix</h3>
                <div class="component-showcase textfield-showcase">
                    <mjo-textfield label="Website" prefixText="https://" placeholder="example.com"></mjo-textfield>
                    <mjo-textfield label="Price" prefixText="$" suffixText="USD" type="number" placeholder="0.00"></mjo-textfield>
                    <mjo-textfield label="Domain" suffixText=".com" placeholder="mywebsite"></mjo-textfield>
                </div>

                <h3>With Helper Text</h3>
                <div class="component-showcase textfield-showcase">
                    <mjo-textfield label="Username" helperText="Must be at least 3 characters long" placeholder="Enter username"></mjo-textfield>
                    <mjo-textfield label="Email" helperText="We'll never share your email" type="email" placeholder="user@example.com"></mjo-textfield>
                </div>

                <h3>With Counter</h3>
                <div class="component-showcase textfield-showcase">
                    <mjo-textfield label="Bio" counter maxlength="160" placeholder="Tell us about yourself..."></mjo-textfield>
                    <mjo-textfield label="Tweet" counter maxlength="280" helperText="Share your thoughts" placeholder="What's happening?"></mjo-textfield>
                </div>

                <h3>Clearable</h3>
                <div class="component-showcase textfield-showcase">
                    <mjo-textfield label="Search" clearabled placeholder="Type to search..." value="Clear me!"></mjo-textfield>
                    <mjo-textfield label="Filter" clearabled startIcon=${AiFillApple} placeholder="Filter results..." value="Sample text"></mjo-textfield>
                </div>

                <h3>States</h3>
                <div class="component-showcase textfield-showcase">
                    <mjo-textfield label="Disabled" disabled placeholder="Disabled input" value="Cannot edit"></mjo-textfield>
                    <mjo-textfield label="Readonly" readonly placeholder="Readonly input" value="Read only text"></mjo-textfield>
                    <mjo-textfield label="Full Width" fullwidth placeholder="This input takes full width"></mjo-textfield>
                </div>

                <h3>Number Inputs</h3>
                <div class="component-showcase textfield-showcase">
                    <mjo-textfield label="Age" type="number" min="18" max="120" placeholder="Enter your age"></mjo-textfield>
                    <mjo-textfield label="Quantity" type="number" nospiners placeholder="Enter quantity"></mjo-textfield>
                    <mjo-textfield label="Price" type="number" step="0.01" prefixText="$" placeholder="0.00"></mjo-textfield>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(textfieldTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/textfield-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-textfield.css"],
        });
    }
}
