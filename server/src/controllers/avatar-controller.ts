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
            <div class="main-section interactive-demo">
                <h2>🎮 Interactive Avatar Playground</h2>
                <p>Customize and interact with avatars in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container">
                    <div class="playground-showcase">
                        <mjo-avatar id="playground-avatar" size="large" name="Interactive Demo" class="interactive-avatar"></mjo-avatar>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Size</h4>
                            <div class="button-group">
                                <button onclick="changeAvatarProp('size', 'small')" class="control-btn">Small</button>
                                <button onclick="changeAvatarProp('size', 'medium')" class="control-btn active">Medium</button>
                                <button onclick="changeAvatarProp('size', 'large')" class="control-btn">Large</button>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Style</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="toggleAvatarProp('bordered')" />
                                    <span>Bordered</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="toggleAvatarProp('nameColoured')" />
                                    <span>Name Colored</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Name</h4>
                            <input
                                type="text"
                                placeholder="Enter name..."
                                oninput="changeAvatarProp('name', this.value)"
                                class="name-input"
                                value="Interactive Demo"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2>📏 Available Sizes</h2>
                <p>The avatar component supports different sizes to fit various use cases.</p>
                <div class="component-showcase hover-effects">
                    <div class="avatar-item">
                        <mjo-avatar size="small" name="SM"></mjo-avatar>
                        <span class="size-label">Small (32px)</span>
                    </div>
                    <div class="avatar-item">
                        <mjo-avatar size="medium" name="MD"></mjo-avatar>
                        <span class="size-label">Medium (40px)</span>
                    </div>
                    <div class="avatar-item">
                        <mjo-avatar size="large" name="LG"></mjo-avatar>
                        <span class="size-label">Large (48px)</span>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2>🎨 Style Variants</h2>
                <p>Customize the avatar appearance with borders and colors.</p>

                <h3>With Borders</h3>
                <div class="component-showcase">
                    <mjo-avatar name="AB" bordered class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="CD" bordered size="medium" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="EF" bordered size="large" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                </div>

                <h3>With Name Colors</h3>
                <div class="component-showcase">
                    <mjo-avatar name="GH" nameColoured class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="IJ" nameColoured size="medium" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="KL" nameColoured size="large" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                </div>

                <h3>Combined (Border + Color)</h3>
                <div class="component-showcase">
                    <mjo-avatar name="MN" bordered nameColoured class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="OP" bordered nameColoured size="medium" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
                    <mjo-avatar name="QR" bordered nameColoured size="large" class="clickable-avatar" onclick="avatarClick(this)"></mjo-avatar>
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
            scripts: ["/public/js/avatar-interactions.js"],
            styles: ["/public/css/mjo-avatar.css"],
        });
    }
}
