import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AiFillAudio, AiFillBackward } from "mjo-icons/ai";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class ChipController {
    /**
     * Renders the full demo page for mjo-chip
     */
    async renderChipPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-chip");

        if (!component) {
            throw new Error("Component mjo-chip not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays compact, interactive labels for categorization and tagging.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const chipTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Avatar Playground</h2>
                <p class="subtitle">Customize and interact with avatars in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container  interactive-demo">
                    <div class="playground-showcase">
                        <mjo-chip id="playground-chip" label="My Chip"></mjo-chip>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input type="text" name="label" placeholder="Enter label..." oninput="changeChipProp('label', this.value)" value="My Chip" />
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select name="color" onchange="changeChipProp('color', this.value)">
                                <option value="default" selected>Default</option>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="success">Success</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Variant</h4>
                            <select name="variant" onchange="changeChipProp('variant', this.value)">
                                <option value="solid" selected>Solid</option>
                                <option value="bordered">Bordered</option>
                                <option value="light">Light</option>
                                <option value="flat">Flat</option>
                                <option value="faded">Faded</option>
                                <option value="shadow">Shadow</option>
                                <option value="dot">Dot</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select name="size" onchange="changeChipProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Radius</h4>
                            <select name="radius" onchange="changeChipProp('radius', this.value)">
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="full" selected>Full</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Icons</h4>
                            <select name="startIcon" onchange="changeChipProp('startIcon', this.value)">
                                <option value="" selected>Select start icon</option>
                                <option value="icon1">Apple</option>
                                <option value="icon2">Android</option>
                                <option value="icon3">Windows</option>
                                <option value="icon4">API</option>
                                <option value="icon5">Audio</option>
                                <option value="icon6">Backward</option>
                            </select>
                            <select name="endIcon" onchange="changeChipProp('endIcon', this.value)">
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
                            <h4>Mode</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="clickable" type="checkbox" onchange="changeChipProp('clickable', this.checked || false)" />
                                    <span>Clickable</span>
                                </label>
                                <label class="toggle">
                                    <input name="closable" type="checkbox" onchange="changeChipProp('closable', this.checked || false)" />
                                    <span>Closable</span>
                                </label>
                                <label class="toggle">
                                    <input name="disabled" type="checkbox" onchange="changeChipProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group" title="Value of event when avatar is clicked">
                            <h4>Value</h4>
                            <input name="value" type="text" placeholder="Enter value..." oninput="changeChipProp('value', this.value)" value="" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-avatar component.</p>

                <h3>Colors</h3>
                <div class="component-showcase">
                    <mjo-chip label="Default"></mjo-chip>
                    <mjo-chip label="Primary" color="primary"></mjo-chip>
                    <mjo-chip label="Secondary" color="secondary"></mjo-chip>
                    <mjo-chip label="Success" color="success"></mjo-chip>
                    <mjo-chip label="Warning" color="warning"></mjo-chip>
                    <mjo-chip label="Error" color="error"></mjo-chip>
                </div>

                <h3>Variants</h3>
                <div class="component-showcase">
                    <mjo-chip label="Solid" variant="solid" color="primary"></mjo-chip>
                    <mjo-chip label="Bordered" variant="bordered" color="primary"></mjo-chip>
                    <mjo-chip label="Dot" variant="dot" color="primary"></mjo-chip>
                    <mjo-chip label="Faded" variant="faded" color="primary"></mjo-chip>
                    <mjo-chip label="Flat" variant="flat" color="primary"></mjo-chip>
                    <mjo-chip label="Light" variant="light" color="primary"></mjo-chip>
                    <mjo-chip label="Shadow" variant="shadow" color="primary"></mjo-chip>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <mjo-chip label="Small" size="small"></mjo-chip>
                    <mjo-chip label="Medium" size="medium"></mjo-chip>
                    <mjo-chip label="Large" size="large"></mjo-chip>
                </div>

                <h3>Radius</h3>
                <div class="component-showcase">
                    <mjo-chip label="Small" radius="small" color="secondary"></mjo-chip>
                    <mjo-chip label="Medium" radius="medium" color="secondary"></mjo-chip>
                    <mjo-chip label="Large" radius="large" color="secondary"></mjo-chip>
                    <mjo-chip label="Full" radius="full" color="secondary"></mjo-chip>
                </div>

                <h3>With Icons</h3>
                <div class="component-showcase">
                    <mjo-chip label="Backward" startIcon=${AiFillBackward} color="primary"></mjo-chip>
                    <mjo-chip label="Audio" endIcon=${AiFillAudio} color="primary"></mjo-chip>
                    <mjo-chip label="Both" startIcon=${AiFillBackward} endIcon=${AiFillAudio} color="primary"></mjo-chip>
                </div>

                <h3>Clickable</h3>
                <div class="component-showcase">
                    <mjo-chip label="Success" value="success value" color="success" clickable></mjo-chip>
                    <mjo-chip label="Error" value="error value" color="error" clickable></mjo-chip>
                    <mjo-chip label="Warning" value="warning value" color="warning" clickable></mjo-chip>
                </div>

                <h3>Closable</h3>
                <div class="component-showcase">
                    <mjo-chip label="Success" value="success value" color="success" closable></mjo-chip>
                    <mjo-chip label="Error" value="error value" color="error" closable></mjo-chip>
                    <mjo-chip label="Warning" value="warning value" color="warning" closable></mjo-chip>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(chipTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/chip-interactions.js", type: "module" }],
        });
    }
}
