import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AiFillAndroid, AiFillApple, AiFillMail, AiFillPhone, AiFillStar, AiFillWindows } from "mjo-icons/ai";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class SelectController {
    /**
     * Renders the complete demo page for mjo-select
     */
    async renderSelectPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-select");

        if (!component) {
            throw new Error("mjo-select component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component for dropdown selection with options, search functionality, validation, and multiple configurations.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const selectTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Select Playground</h2>
                <p class="subtitle">Customize and interact with selects in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-select id="playground-select" label="Interactive Demo" placeholder="Choose an option...">
                            <mjo-option value="option1" text="Option 1"></mjo-option>
                            <mjo-option value="option2" text="Option 2"></mjo-option>
                            <mjo-option value="option3" text="Option 3"></mjo-option>
                        </mjo-select>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input type="text" placeholder="Enter label..." oninput="changeSelectProp('label', this.value)" value="Interactive Demo" />
                        </div>

                        <div class="control-group">
                            <h4>Placeholder</h4>
                            <input
                                type="text"
                                placeholder="Enter placeholder..."
                                oninput="changeSelectProp('placeholder', this.value)"
                                value="Choose an option..."
                            />
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeSelectProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select onchange="changeSelectProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Icons</h4>
                            <select onchange="changeSelectProp('startIcon', this.value)">
                                <option value="" selected>Select start icon</option>
                                <option value="user">User</option>
                                <option value="mail">Mail</option>
                                <option value="phone">Phone</option>
                                <option value="apple">Apple</option>
                                <option value="star">Star</option>
                            </select>
                            <select onchange="changeSelectProp('endIcon', this.value)">
                                <option value="" selected>Select end icon</option>
                                <option value="user">User</option>
                                <option value="mail">Mail</option>
                                <option value="phone">Phone</option>
                                <option value="apple">Apple</option>
                                <option value="star">Star</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Prefix/Suffix Text</h4>
                            <input type="text" placeholder="Prefix text..." oninput="changeSelectProp('prefixText', this.value)" value="" />
                            <input type="text" placeholder="Suffix text..." oninput="changeSelectProp('suffixText', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Helper Text</h4>
                            <input type="text" placeholder="Enter helper text..." oninput="changeSelectProp('helperText', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeSelectProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeSelectProp('required', this.checked || false)" />
                                    <span>Required</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeSelectProp('clearabled', this.checked || false)" />
                                    <span>Clearable</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeSelectProp('searchable', this.checked || false)" />
                                    <span>Searchable</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeSelectProp('fullwidth', this.checked || false)" />
                                    <span>Full Width</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeSelectProp('selectOnFocus', this.checked || false)" />
                                    <span>Select on Focus</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Manage Options</h4>
                            <button type="button" onclick="addSelectOption()" class="action-btn">Add Option</button>
                            <button type="button" onclick="removeLastSelectOption()" class="action-btn">Remove Last</button>
                            <button type="button" onclick="clearAllSelectOptions()" class="action-btn">Clear All</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-select component.</p>

                <h3>Basic Selects</h3>
                <div class="component-showcase select-showcase">
                    <mjo-select label="Country" placeholder="Choose your country">
                        <mjo-option value="us" text="United States"></mjo-option>
                        <mjo-option value="ca" text="Canada"></mjo-option>
                        <mjo-option value="uk" text="United Kingdom"></mjo-option>
                        <mjo-option value="de" text="Germany"></mjo-option>
                        <mjo-option value="fr" text="France"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Priority" placeholder="Select priority" clearabled>
                        <mjo-option value="low" text="Low" startIcon=${AiFillStar}></mjo-option>
                        <mjo-option value="medium" text="Medium" startIcon=${AiFillStar}></mjo-option>
                        <mjo-option value="high" text="High" startIcon=${AiFillStar}></mjo-option>
                        <mjo-option value="urgent" text="Urgent" startIcon=${AiFillStar}></mjo-option>
                    </mjo-select>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase select-showcase">
                    <mjo-select label="Small Size" size="small" placeholder="Small select">
                        <mjo-option value="1" text="Option 1"></mjo-option>
                        <mjo-option value="2" text="Option 2"></mjo-option>
                        <mjo-option value="3" text="Option 3"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Medium Size" size="medium" placeholder="Medium select">
                        <mjo-option value="1" text="Option 1"></mjo-option>
                        <mjo-option value="2" text="Option 2"></mjo-option>
                        <mjo-option value="3" text="Option 3"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Large Size" size="large" placeholder="Large select">
                        <mjo-option value="1" text="Option 1"></mjo-option>
                        <mjo-option value="2" text="Option 2"></mjo-option>
                        <mjo-option value="3" text="Option 3"></mjo-option>
                    </mjo-select>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase select-showcase">
                    <mjo-select label="Primary Color" color="primary" placeholder="Primary color select">
                        <mjo-option value="1" text="Primary Option 1"></mjo-option>
                        <mjo-option value="2" text="Primary Option 2"></mjo-option>
                        <mjo-option value="3" text="Primary Option 3"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Secondary Color" color="secondary" placeholder="Secondary color select">
                        <mjo-option value="1" text="Secondary Option 1"></mjo-option>
                        <mjo-option value="2" text="Secondary Option 2"></mjo-option>
                        <mjo-option value="3" text="Secondary Option 3"></mjo-option>
                    </mjo-select>
                </div>

                <h3>With Icons</h3>
                <div class="component-showcase select-showcase">
                    <mjo-select label="Operating System" startIcon=${AiFillApple} placeholder="Choose OS">
                        <mjo-option value="macos" text="macOS" startIcon=${AiFillApple}></mjo-option>
                        <mjo-option value="windows" text="Windows" startIcon=${AiFillWindows}></mjo-option>
                        <mjo-option value="android" text="Android" startIcon=${AiFillAndroid}></mjo-option>
                    </mjo-select>
                    <mjo-select label="Contact Method" placeholder="How to contact you">
                        <mjo-option value="email" text="Email" startIcon=${AiFillMail}></mjo-option>
                        <mjo-option value="phone" text="Phone" startIcon=${AiFillPhone}></mjo-option>
                        <mjo-option value="both" text="Both" startIcon=${AiFillStar}></mjo-option>
                    </mjo-select>
                </div>

                <h3>With Prefix and Suffix</h3>
                <div class="component-showcase select-showcase">
                    <mjo-select label="Region" prefixText="Region:" placeholder="Select region">
                        <mjo-option value="na" text="North America"></mjo-option>
                        <mjo-option value="eu" text="Europe"></mjo-option>
                        <mjo-option value="as" text="Asia"></mjo-option>
                        <mjo-option value="au" text="Australia"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Currency" suffixText="USD" placeholder="Select currency">
                        <mjo-option value="usd" text="US Dollar"></mjo-option>
                        <mjo-option value="eur" text="Euro"></mjo-option>
                        <mjo-option value="gbp" text="British Pound"></mjo-option>
                        <mjo-option value="jpy" text="Japanese Yen"></mjo-option>
                    </mjo-select>
                </div>

                <h3>With Helper Text</h3>
                <div class="component-showcase select-showcase">
                    <mjo-select label="Account Type" helperText="Choose the account type that best fits your needs" placeholder="Select account type">
                        <mjo-option value="personal" text="Personal"></mjo-option>
                        <mjo-option value="business" text="Business"></mjo-option>
                        <mjo-option value="enterprise" text="Enterprise"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Subscription Plan" helperText="You can upgrade or downgrade anytime" placeholder="Choose a plan">
                        <mjo-option value="free" text="Free Plan"></mjo-option>
                        <mjo-option value="pro" text="Pro Plan"></mjo-option>
                        <mjo-option value="premium" text="Premium Plan"></mjo-option>
                    </mjo-select>
                </div>

                <h3>Searchable</h3>
                <div class="component-showcase select-showcase">
                    <mjo-select label="Country (Searchable)" searchable placeholder="Search and select country">
                        <mjo-option value="us" text="United States"></mjo-option>
                        <mjo-option value="ca" text="Canada"></mjo-option>
                        <mjo-option value="uk" text="United Kingdom"></mjo-option>
                        <mjo-option value="de" text="Germany"></mjo-option>
                        <mjo-option value="fr" text="France"></mjo-option>
                        <mjo-option value="es" text="Spain"></mjo-option>
                        <mjo-option value="it" text="Italy"></mjo-option>
                        <mjo-option value="au" text="Australia"></mjo-option>
                        <mjo-option value="jp" text="Japan"></mjo-option>
                        <mjo-option value="br" text="Brazil"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Programming Language" searchable clearabled placeholder="Search languages...">
                        <mjo-option value="js" text="JavaScript"></mjo-option>
                        <mjo-option value="ts" text="TypeScript"></mjo-option>
                        <mjo-option value="py" text="Python"></mjo-option>
                        <mjo-option value="java" text="Java"></mjo-option>
                        <mjo-option value="cpp" text="C++"></mjo-option>
                        <mjo-option value="cs" text="C#"></mjo-option>
                        <mjo-option value="go" text="Go"></mjo-option>
                        <mjo-option value="rust" text="Rust"></mjo-option>
                        <mjo-option value="php" text="PHP"></mjo-option>
                        <mjo-option value="ruby" text="Ruby"></mjo-option>
                    </mjo-select>
                </div>

                <h3>Clearable</h3>
                <div class="component-showcase select-showcase">
                    <mjo-select label="Theme" clearabled placeholder="Choose theme..." value="dark">
                        <mjo-option value="light" text="Light Theme"></mjo-option>
                        <mjo-option value="dark" text="Dark Theme" selected></mjo-option>
                        <mjo-option value="auto" text="Auto (System)"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Language" clearabled startIcon=${AiFillStar} placeholder="Select language..." value="en">
                        <mjo-option value="en" text="English" selected></mjo-option>
                        <mjo-option value="es" text="Español"></mjo-option>
                        <mjo-option value="fr" text="Français"></mjo-option>
                        <mjo-option value="de" text="Deutsch"></mjo-option>
                    </mjo-select>
                </div>

                <h3>States</h3>
                <div class="component-showcase select-showcase">
                    <mjo-select label="Disabled" disabled placeholder="Disabled select">
                        <mjo-option value="1" text="Cannot select"></mjo-option>
                        <mjo-option value="2" text="Option 2"></mjo-option>
                        <mjo-option value="3" text="Option 3"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Required" required placeholder="Required field*">
                        <mjo-option value="1" text="Required Option 1"></mjo-option>
                        <mjo-option value="2" text="Required Option 2"></mjo-option>
                        <mjo-option value="3" text="Required Option 3"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Full Width" fullwidth placeholder="This select takes full width">
                        <mjo-option value="1" text="Full Width Option 1"></mjo-option>
                        <mjo-option value="2" text="Full Width Option 2"></mjo-option>
                        <mjo-option value="3" text="Full Width Option 3"></mjo-option>
                    </mjo-select>
                </div>

                <h3>Complex Options</h3>
                <div class="component-showcase select-showcase">
                    <mjo-select label="Team Member" placeholder="Assign to team member">
                        <mjo-option value="john" text="John Doe" startImage="https://i.pravatar.cc/150?img=1"></mjo-option>
                        <mjo-option value="jane" text="Jane Smith" startImage="https://i.pravatar.cc/150?img=2"></mjo-option>
                        <mjo-option value="bob" text="Bob Johnson" startImage="https://i.pravatar.cc/150?img=3"></mjo-option>
                        <mjo-option value="alice" text="Alice Brown" startImage="https://i.pravatar.cc/150?img=4"></mjo-option>
                    </mjo-select>
                    <mjo-select label="Status" placeholder="Select status">
                        <mjo-option value="active" text="Active" startIcon=${AiFillStar} endIcon=${AiFillStar}></mjo-option>
                        <mjo-option value="pending" text="Pending" startIcon=${AiFillPhone}></mjo-option>
                        <mjo-option value="inactive" text="Inactive" endIcon=${AiFillMail}></mjo-option>
                    </mjo-select>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(selectTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/select-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-select.css"],
        });
    }
}
