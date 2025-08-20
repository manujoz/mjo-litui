import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class AvatarController {
    /**
     * Renders the complete demo page for mjo-avatar
     */
    async renderAvatarPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-avatar");

        if (!component) {
            throw new Error("mjo-avatar component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays an avatar with multiple functionalities.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const avatarTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Avatar Playground</h2>
                <p class="subtitle">Customize and interact with avatars in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container  interactive-demo">
                    <div class="playground-showcase">
                        <mjo-avatar id="playground-avatar" name="Interactive Demo"></mjo-avatar>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeAvatarProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Radius</h4>
                            <select onchange="changeAvatarProp('radius', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                                <option value="full">Full</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Style</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeAvatarProp('bordered', this.checked || false)" />
                                    <span>Bordered</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeAvatarProp('clickable', this.checked || false)" />
                                    <span>Clickable</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeAvatarProp('nameColoured', this.checked || false)" />
                                    <span>Name Colored</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeAvatarProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group" title="Value of event when avatar is clicked">
                            <h4>Value</h4>
                            <input type="text" placeholder="Enter value..." oninput="changeAvatarProp('value', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Src</h4>
                            <input type="text" placeholder="Enter image URL..." oninput="changeAvatarProp('src', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Fallback Icon</h4>
                            <select onchange="changeAvatarProp('fallbackIcon', this.value)">
                                <option value="" selected>Select</option>
                                <option value="icon1">Apple</option>
                                <option value="icon2">Android</option>
                                <option value="icon3">Windows</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Name</h4>
                            <input type="text" placeholder="Enter name..." oninput="changeAvatarProp('name', this.value)" value="Interactive Demo" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-avatar component.</p>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <mjo-avatar name="AB" size="small"></mjo-avatar>
                    <mjo-avatar name="CD" size="medium"></mjo-avatar>
                    <mjo-avatar name="EF" size="large"></mjo-avatar>
                </div>

                <h3>With Images</h3>
                <div class="component-showcase">
                    <mjo-avatar name="AB" src="https://i.pravatar.cc/150?img=5" size="small"></mjo-avatar>
                    <mjo-avatar name="CD" src="https://i.pravatar.cc/150?img=58" size="medium"></mjo-avatar>
                    <mjo-avatar name="EF" src="https://i.pravatar.cc/150?img=24" size="large"></mjo-avatar>
                    <mjo-avatar name="EF" src="https://i.praasdvatar.cc/150?img=48" title="Broken image" size="large"></mjo-avatar>
                </div>

                <h3>Radius</h3>
                <div class="component-showcase">
                    <mjo-avatar name="AB" src="https://i.pravatar.cc/150?img=24" radius="small"></mjo-avatar>
                    <mjo-avatar name="CD" src="https://i.pravatar.cc/150?img=24" radius="medium"></mjo-avatar>
                    <mjo-avatar name="EF" src="https://i.pravatar.cc/150?img=24" radius="large"></mjo-avatar>
                    <mjo-avatar name="EF" src="https://i.pravatar.cc/150?img=24" radius="full"></mjo-avatar>
                </div>

                <h3>With Borders</h3>
                <div class="component-showcase">
                    <mjo-avatar name="AB" bordered size="small"></mjo-avatar>
                    <mjo-avatar name="CD" bordered size="medium"></mjo-avatar>
                    <mjo-avatar name="EF" bordered size="large"></mjo-avatar>
                    <mjo-avatar name="AB" src="https://i.pravatar.cc/150?img=48" bordered size="small"></mjo-avatar>
                    <mjo-avatar name="CD" src="https://i.pravatar.cc/150?img=36" bordered size="medium"></mjo-avatar>
                    <mjo-avatar name="EF" src="https://i.pravatar.cc/150?img=48" bordered size="large"></mjo-avatar>
                </div>

                <h3>With Name Colors</h3>
                <div class="component-showcase">
                    <mjo-avatar name="GH" nameColoured size="small"></mjo-avatar>
                    <mjo-avatar name="IJ" nameColoured size="medium"></mjo-avatar>
                    <mjo-avatar name="KL" nameColoured size="large"></mjo-avatar>
                    <mjo-avatar name="MN" bordered nameColoured size="small"></mjo-avatar>
                    <mjo-avatar name="OP" bordered nameColoured size="medium"></mjo-avatar>
                    <mjo-avatar name="QR" bordered nameColoured size="large"></mjo-avatar>
                </div>

                <h3>With border color</h3>
                <div class="component-showcase">
                    <mjo-avatar name="GH" bordered color="default"></mjo-avatar>
                    <mjo-avatar name="IJ" bordered color="primary"></mjo-avatar>
                    <mjo-avatar name="KL" bordered color="secondary"></mjo-avatar>
                    <mjo-avatar name="KL" bordered color="success"></mjo-avatar>
                    <mjo-avatar name="KL" bordered color="warning"></mjo-avatar>
                    <mjo-avatar name="KL" bordered color="info"></mjo-avatar>
                    <mjo-avatar name="KL" bordered color="error"></mjo-avatar>
                </div>

                <h3>Disabled</h3>
                <div class="component-showcase">
                    <mjo-avatar name="AB" src="https://i.pravatar.cc/150?img=22" size="small" disabled></mjo-avatar>
                    <mjo-avatar name="CD" src="https://i.pravatar.cc/150?img=24" size="medium" disabled></mjo-avatar>
                    <mjo-avatar name="EF" src="https://i.pravatar.cc/150?img=28" size="large" disabled></mjo-avatar>
                </div>

                <h3>Clickable</h3>
                <div class="component-showcase">
                    <mjo-avatar name="AB" src="https://i.pravatar.cc/150?img=22" clickable value="Albert Einstein"></mjo-avatar>
                    <mjo-avatar name="CD" src="https://i.pravatar.cc/150?img=24" clickable value="Isaac Newton"></mjo-avatar>
                    <mjo-avatar name="EF" src="https://i.pravatar.cc/150?img=28" clickable value="Galileo Galilei"></mjo-avatar>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(avatarTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/avatar-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-avatar.css"],
        });
    }
}
