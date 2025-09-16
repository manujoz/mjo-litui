import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { AiFillAndroid, AiFillApple, AiFillAudio, AiFillBackward, AiFillWindows } from "mjo-icons/ai";

import { MjoButtonTheme } from "@src/types/mjo-theme.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class ButtonController {
    /**
     * Renders the complete demo page for mjo-button
     */
    async renderButtonPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-button");

        if (!component) {
            throw new Error("mjo-button component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `A fully accessible button component with loading states, toggle functionality, and comprehensive ARIA support.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const theme: MjoButtonTheme = {
            color: "red",
        };

        const buttonTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Button Playground</h2>
                <p class="subtitle">Customize and interact with buttons in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-button id="playground-button" .theme=${theme}>Interactive Button</mjo-button>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Text Content</h4>
                            <input
                                type="text"
                                name="text"
                                placeholder="Enter button text..."
                                oninput="changeButtonText(this.value)"
                                value="Interactive Button"
                            />
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select name="color" onchange="changeButtonProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="success">Success</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Variant</h4>
                            <select name="variant" onchange="changeButtonProp('variant', this.value)">
                                <option value="default" selected>Default</option>
                                <option value="ghost">Ghost</option>
                                <option value="dashed">Dashed</option>
                                <option value="link">Link</option>
                                <option value="text">Text</option>
                                <option value="flat">Flat</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select name="size" onchange="changeButtonProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Type</h4>
                            <select name="type" onchange="changeButtonProp('type', this.value)">
                                <option value="button" selected>Button</option>
                                <option value="submit">Submit</option>
                                <option value="reset">Reset</option>
                                <option value="menu">Menu</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Icons</h4>
                            <select name="startIcon" onchange="changeButtonProp('startIcon', this.value)">
                                <option value="" selected>Select start icon</option>
                                <option value="icon1">Apple</option>
                                <option value="icon2">Android</option>
                                <option value="icon3">Windows</option>
                                <option value="icon4">API</option>
                                <option value="icon5">Audio</option>
                                <option value="icon6">Backward</option>
                            </select>
                            <select name="endIcon" onchange="changeButtonProp('endIcon', this.value)">
                                <option value="" selected>Select end icon</option>
                                <option value="icon1">Apple</option>
                                <option value="icon2">Android</option>
                                <option value="icon3">Windows</option>
                                <option value="icon4">API</option>
                                <option value="icon5">Audio</option>
                                <option value="icon6">Backward</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Style Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="fullwidth" type="checkbox" onchange="changeButtonProp('fullwidth', this.checked)" />
                                    <span>Full Width</span>
                                </label>
                                <label class="toggle">
                                    <input name="rounded" type="checkbox" onchange="changeButtonProp('rounded', this.checked)" />
                                    <span>Rounded</span>
                                </label>
                                <label class="toggle">
                                    <input name="smallCaps" type="checkbox" onchange="changeButtonProp('smallCaps', this.checked)" />
                                    <span>Small Caps</span>
                                </label>
                                <label class="toggle">
                                    <input name="noink" type="checkbox" onchange="changeButtonProp('noink', this.checked)" />
                                    <span>No Ink (Ripple)</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Interactive State</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="toggleable" type="checkbox" onchange="changeButtonProp('toggleable', this.checked)" />
                                    <span>Toggleable</span>
                                </label>
                                <label class="toggle">
                                    <input name="loading" type="checkbox" onchange="changeButtonProp('loading', this.checked)" />
                                    <span>Loading</span>
                                </label>
                                <label class="toggle">
                                    <input name="disabled" type="checkbox" onchange="changeButtonProp('disabled', this.checked)" />
                                    <span>Disabled</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Usage examples of mjo-button component.</p>

                <h3>Colors</h3>
                <div class="component-showcase">
                    <mjo-button color="primary">Primary</mjo-button>
                    <mjo-button color="secondary">Secondary</mjo-button>
                    <mjo-button color="success">Success</mjo-button>
                    <mjo-button color="info">Info</mjo-button>
                    <mjo-button color="warning">Warning</mjo-button>
                    <mjo-button color="error">Error</mjo-button>
                </div>

                <h3>Variants</h3>
                <div class="component-showcase">
                    <mjo-button variant="default" color="primary">Default</mjo-button>
                    <mjo-button variant="ghost" color="primary">Ghost</mjo-button>
                    <mjo-button variant="dashed" color="primary">Dashed</mjo-button>
                    <mjo-button variant="link" color="primary">Link</mjo-button>
                    <mjo-button variant="text" color="primary">Text</mjo-button>
                    <mjo-button variant="flat" color="primary">Flat</mjo-button>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <mjo-button size="small">Small</mjo-button>
                    <mjo-button size="medium">Medium</mjo-button>
                    <mjo-button size="large">Large</mjo-button>
                </div>

                <h3>With Icons</h3>
                <div class="component-showcase">
                    <mjo-button startIcon=${AiFillApple}>Start Icon</mjo-button>
                    <mjo-button endIcon=${AiFillAudio}>End Icon</mjo-button>
                    <mjo-button startIcon=${AiFillBackward} endIcon=${AiFillAudio}>Both Icons</mjo-button>
                </div>

                <h3>Rounded Buttons</h3>
                <div class="component-showcase">
                    <mjo-button rounded startIcon=${AiFillApple} size="small"></mjo-button>
                    <mjo-button rounded startIcon=${AiFillAndroid} size="medium"></mjo-button>
                    <mjo-button rounded startIcon=${AiFillWindows} size="large"></mjo-button>
                </div>

                <h3>Loading States</h3>
                <div class="component-showcase">
                    <mjo-button loading>Loading...</mjo-button>
                    <mjo-button loading color="secondary">Loading Secondary</mjo-button>
                    <mjo-button loading color="success">Loading Success</mjo-button>
                </div>

                <h3>Toggleable Buttons</h3>
                <div class="component-showcase">
                    <mjo-button toggleable>Toggle Me</mjo-button>
                    <mjo-button toggleable color="secondary">Toggle Secondary</mjo-button>
                    <mjo-button toggleable startIcon=${AiFillApple}>Toggle with Icon</mjo-button>
                </div>

                <h3>Disabled States</h3>
                <div class="component-showcase">
                    <mjo-button disabled>Disabled</mjo-button>
                    <mjo-button disabled color="secondary">Disabled Secondary</mjo-button>
                    <mjo-button disabled variant="ghost">Disabled Ghost</mjo-button>
                </div>

                <h3>Full Width</h3>
                <div class="component-showcase" style="width: 100%;">
                    <mjo-button fullwidth>Full Width Button</mjo-button>
                    <mjo-button fullwidth color="secondary">Full Width Secondary</mjo-button>
                </div>

                <h3>Form Buttons</h3>
                <div class="component-showcase">
                    <mjo-button type="submit" color="success">Submit</mjo-button>
                    <mjo-button type="reset" color="warning">Reset</mjo-button>
                    <mjo-button type="button">Button</mjo-button>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(buttonTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/button-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-button.css"],
        });
    }
}
