import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class ColorPickerController {
    /**
     * Renders the complete demo page for mjo-color-picker
     */
    async renderColorPickerPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-color-picker");

        if (!component) {
            throw new Error("mjo-color-picker component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that provides an intuitive color picker interface with support for multiple color formats.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const colorPickerTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Color Picker Playground</h2>
                <p class="subtitle">Customize and interact with color pickers in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-color-picker id="playground-color-picker" value="#1aa8ed" label="Interactive Color"></mjo-color-picker>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input type="text" placeholder="Enter label..." oninput="changeColorPickerProp('label', this.value)" value="Interactive Color" />
                        </div>

                        <div class="control-group">
                            <h4>Value</h4>
                            <input type="text" placeholder="Enter color value..." oninput="changeColorPickerProp('value', this.value)" value="#1aa8ed" />
                        </div>

                        <div class="control-group">
                            <h4>Color Theme</h4>
                            <select onchange="changeColorPickerProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeColorPickerProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Format</h4>
                            <select onchange="changeColorPickerProp('format', this.value)">
                                <option value="hex" selected>HEX</option>
                                <option value="rgb">RGB</option>
                                <option value="rgba">RGBA</option>
                                <option value="hsl">HSL</option>
                                <option value="hsla">HSLA</option>
                                <option value="hwb">HWB</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Name</h4>
                            <input type="text" placeholder="Enter name..." oninput="changeColorPickerProp('name', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Helper Text</h4>
                            <input type="text" placeholder="Enter helper text..." oninput="changeColorPickerProp('helperText', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Style</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeColorPickerProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeColorPickerProp('rounded', this.checked || false)" />
                                    <span>Rounded</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeColorPickerProp('showValue', this.checked || false)" />
                                    <span>Show Value</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeColorPickerProp('hideErrors', this.checked || false)" />
                                    <span>Hide Errors</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-color-picker component.</p>

                <h3>Basic Usage</h3>
                <div class="component-showcase">
                    <mjo-color-picker value="#ff0000" label="Red Color"></mjo-color-picker>
                    <mjo-color-picker value="#00ff00" label="Green Color"></mjo-color-picker>
                    <mjo-color-picker value="#0000ff" label="Blue Color"></mjo-color-picker>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <mjo-color-picker value="#1aa8ed" size="small" label="Small"></mjo-color-picker>
                    <mjo-color-picker value="#1aa8ed" size="medium" label="Medium"></mjo-color-picker>
                    <mjo-color-picker value="#1aa8ed" size="large" label="Large"></mjo-color-picker>
                </div>

                <h3>Color Themes</h3>
                <div class="component-showcase">
                    <mjo-color-picker value="#1aa8ed" color="primary" label="Primary Theme"></mjo-color-picker>
                    <mjo-color-picker value="#6b7280" color="secondary" label="Secondary Theme"></mjo-color-picker>
                </div>

                <h3>Different Formats</h3>
                <div class="component-showcase">
                    <mjo-color-picker value="#ff6b35" format="hex" label="HEX Format" showValue></mjo-color-picker>
                    <mjo-color-picker value="rgb(255, 107, 53)" format="rgb" label="RGB Format" showValue></mjo-color-picker>
                    <mjo-color-picker value="hsl(16, 100%, 60%)" format="hsl" label="HSL Format" showValue></mjo-color-picker>
                </div>

                <h3>With Helper Text</h3>
                <div class="component-showcase">
                    <mjo-color-picker value="#28a745" label="Success Color" helperText="Choose a success color for your theme"></mjo-color-picker>
                    <mjo-color-picker value="#ffc107" label="Warning Color" helperText="Select a warning color"></mjo-color-picker>
                    <mjo-color-picker value="#dc3545" label="Error Color" helperText="Pick an error color"></mjo-color-picker>
                </div>

                <h3>Rounded Style</h3>
                <div class="component-showcase">
                    <mjo-color-picker value="#ff6b35" rounded size="small" label="Small Rounded"></mjo-color-picker>
                    <mjo-color-picker value="#1aa8ed" rounded size="medium" label="Medium Rounded"></mjo-color-picker>
                    <mjo-color-picker value="#28a745" rounded size="large" label="Large Rounded"></mjo-color-picker>
                </div>

                <h3>With Value Display</h3>
                <div class="component-showcase">
                    <mjo-color-picker value="#e91e63" label="Pink" showValue format="hex"></mjo-color-picker>
                    <mjo-color-picker value="#9c27b0" label="Purple" showValue format="rgb"></mjo-color-picker>
                    <mjo-color-picker value="#3f51b5" label="Indigo" showValue format="hsl"></mjo-color-picker>
                </div>

                <h3>Disabled State</h3>
                <div class="component-showcase">
                    <mjo-color-picker value="#6c757d" label="Disabled Small" size="small" disabled></mjo-color-picker>
                    <mjo-color-picker value="#6c757d" label="Disabled Medium" size="medium" disabled></mjo-color-picker>
                    <mjo-color-picker value="#6c757d" label="Disabled Large" size="large" disabled></mjo-color-picker>
                </div>

                <h3>Interactive Examples</h3>
                <div class="component-showcase">
                    <mjo-color-picker
                        value="#ff5722"
                        label="Interactive Color"
                        name="theme-color"
                        showValue
                        format="hex"
                        helperText="This color picker will show events in console"
                        class="interactive-example"
                    ></mjo-color-picker>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(colorPickerTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/color-picker-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-color-picker.css"],
        });
    }
}
