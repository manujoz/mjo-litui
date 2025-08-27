import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AiFillApple, AiFillBell, AiFillHeart, AiFillStar } from "mjo-icons/ai";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class BadgeController {
    /**
     * Renders the complete demo page for mjo-badge
     */
    async renderBadgePage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-badge");

        if (!component) {
            throw new Error("mjo-badge component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays badges with notifications, indicators and labels.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const badgeTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Badge Playground</h2>
                <p class="subtitle">Customize and interact with badges in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-badge id="playground-badge" label="5" show>
                            <mjo-avatar id="badge-target" name="JD" size="large" radius="small"> </mjo-avatar>
                        </mjo-badge>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input type="text" name="label" placeholder="Enter label..." oninput="changeBadgeProp('label', this.value)" value="5" />
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select name="color" onchange="changeBadgeProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                                <option value="info">Info</option>
                                <option value="default">Default</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select name="size" onchange="changeBadgeProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Variant</h4>
                            <select name="variant" onchange="changeBadgeProp('variant', this.value)">
                                <option value="solid" selected>Solid</option>
                                <option value="flat">Flat</option>
                                <option value="ghost">Ghost</option>
                                <option value="brilliant">Brilliant</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Position</h4>
                            <select name="position" onchange="changeBadgeProp('position', this.value)">
                                <option value="top-right" selected>Top Right</option>
                                <option value="top-left">Top Left</option>
                                <option value="bottom-right">Bottom Right</option>
                                <option value="bottom-left">Bottom Left</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Offset X</h4>
                            <input type="number" name="offsetx" min="-50" max="50" oninput="changeBadgeProp('offsetx', this.value)" value="0" />
                        </div>

                        <div class="control-group">
                            <h4>Offset Y</h4>
                            <input type="number" name="offsety" min="-50" max="50" oninput="changeBadgeProp('offsety', this.value)" value="0" />
                        </div>

                        <div class="control-group">
                            <h4>Settings</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="show" type="checkbox" checked onchange="changeBadgeProp('show', this.checked || false)" />
                                    <span>Show</span>
                                </label>
                                <label class="toggle">
                                    <input name="clickable" type="checkbox" onchange="changeBadgeProp('clickable', this.checked || false)" />
                                    <span>Clickable</span>
                                </label>
                                <label class="toggle">
                                    <input name="disabled" type="checkbox" onchange="changeBadgeProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                                <label class="toggle">
                                    <input name="hideOutline" type="checkbox" onchange="changeBadgeProp('hideOutline', this.checked || false)" />
                                    <span>Hide Outline</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Value</h4>
                            <input name="value" type="text" placeholder="Enter value for events..." oninput="changeBadgeProp('value', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Target Element</h4>
                            <div class="button-group">
                                <button onclick="changeBadgeTarget('avatar')">Avatar</button>
                                <button onclick="changeBadgeTarget('icon')" class="active">Icon</button>
                                <button onclick="changeBadgeTarget('button')">Button</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-badge component.</p>

                <h3>Colors</h3>
                <div class="component-showcase">
                    <mjo-badge label="5" color="primary" ?show=${true}>
                        <mjo-avatar name="AB" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="3" color="secondary" ?show=${true}>
                        <mjo-avatar name="CD" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="!" color="success" ?show=${true}>
                        <mjo-avatar name="EF" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="99+" color="warning" ?show=${true}>
                        <mjo-avatar name="GH" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="2" color="error" ?show=${true}>
                        <mjo-avatar name="IJ" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="info" color="info" ?show=${true}>
                        <mjo-avatar name="KL" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="1" color="default" ?show=${true}>
                        <mjo-avatar name="MN" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                </div>

                <h3>Variants</h3>
                <div class="component-showcase">
                    <mjo-badge label="5" variant="solid" color="primary" ?show=${true}>
                        <mjo-avatar name="AB" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="3" variant="flat" color="primary" ?show=${true}>
                        <mjo-avatar name="CD" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="!" variant="ghost" color="primary" ?show=${true}>
                        <mjo-avatar name="EF" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="new" variant="brilliant" color="primary" ?show=${true}>
                        <mjo-avatar name="GH" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <mjo-badge label="5" size="small" ?show=${true}>
                        <mjo-avatar name="AB" size="small" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="10" size="medium" ?show=${true}>
                        <mjo-avatar name="CD" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="99+" size="large" ?show=${true}>
                        <mjo-avatar name="EF" size="large" radius="small"></mjo-avatar>
                    </mjo-badge>
                </div>

                <h3>Positions</h3>
                <div class="component-showcase">
                    <mjo-badge label="TL" position="top-left" color="secondary" ?show=${true}>
                        <mjo-avatar name="TL" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="TR" position="top-right" color="secondary" ?show=${true}>
                        <mjo-avatar name="TR" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="BL" position="bottom-left" color="secondary" ?show=${true}>
                        <mjo-avatar name="BL" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="BR" position="bottom-right" color="secondary" ?show=${true}>
                        <mjo-avatar name="BR" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                </div>

                <h3>With Icons</h3>
                <div class="component-showcase">
                    <mjo-badge label="${AiFillStar}" ?show=${true} color="warning">
                        <mjo-icon src="${AiFillHeart}" size="large" color="error"></mjo-icon>
                    </mjo-badge>
                    <mjo-badge label="3" ?show=${true} color="error">
                        <mjo-icon src="${AiFillBell}" size="large" color="info"></mjo-icon>
                    </mjo-badge>
                    <mjo-badge label="new" ?show=${true} color="primary">
                        <mjo-icon src="${AiFillApple}" size="large" color="success"></mjo-icon>
                    </mjo-badge>
                </div>

                <h3>Clickable Badges</h3>
                <div class="component-showcase">
                    <mjo-badge label="5" ?clickable=${true} value="notifications" ?show=${true} color="primary">
                        <mjo-avatar name="AB" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="!" ?clickable=${true} value="alerts" ?show=${true} color="warning">
                        <mjo-avatar name="CD" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="99+" ?clickable=${true} value="messages" ?show=${true} color="error">
                        <mjo-avatar name="EF" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                </div>

                <h3>With Offsets</h3>
                <div class="component-showcase">
                    <mjo-badge label="5" ?show=${true} offsetx="10" offsety="0" color="primary">
                        <mjo-avatar name="AB" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="3" ?show=${true} offsetx="0" offsety="10" color="secondary">
                        <mjo-avatar name="CD" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="!" ?show=${true} offsetx="-5" offsety="-5" color="success">
                        <mjo-avatar name="EF" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                </div>

                <h3>Different Badge Contents</h3>
                <div class="component-showcase">
                    <mjo-badge label="1" ?show=${true} color="primary">
                        <mjo-avatar name="AB" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="99" ?show=${true} color="secondary">
                        <mjo-avatar name="CD" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="999+" ?show=${true} color="warning">
                        <mjo-avatar name="EF" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="NEW" ?show=${true} color="success">
                        <mjo-avatar name="GH" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="!" ?show=${true} color="error">
                        <mjo-avatar name="IJ" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="•" ?show=${true} color="info">
                        <mjo-avatar name="KL" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                </div>

                <h3>Disabled States</h3>
                <div class="component-showcase">
                    <mjo-badge label="5" ?show=${true} ?disabled=${true} color="primary">
                        <mjo-avatar name="AB" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                    <mjo-badge label="99+" ?show=${true} ?disabled=${true} ?clickable=${true} color="secondary">
                        <mjo-avatar name="CD" size="medium" radius="small"></mjo-avatar>
                    </mjo-badge>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(badgeTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/badge-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-badge.css"],
        });
    }
}
