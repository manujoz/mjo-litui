import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class RippleController {
    /**
     * Renders the complete demo page for mjo-ripple
     */
    async renderRipplePage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-ripple");

        if (!component) {
            throw new Error("mjo-ripple component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that adds interactive ripple effects to clickable elements.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const rippleTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Use Cases Section -->
            <div class="main-section">
                <h2 class="title">💫 Ripple Effect Use Cases</h2>
                <p class="subtitle">See how mjo-ripple enhances user interactions across different elements and scenarios.</p>

                <h3>Basic Button with Ripple</h3>
                <p class="description">Standard button enhanced with ripple effect for better user feedback.</p>
                <div class="ripple-showcase">
                    <div class="ripple-container">
                        <button class="demo-button primary">
                            Primary Action
                            <mjo-ripple></mjo-ripple>
                        </button>
                        <button class="demo-button secondary">
                            Secondary Action
                            <mjo-ripple></mjo-ripple>
                        </button>
                        <button class="demo-button outline">
                            Outlined Button
                            <mjo-ripple></mjo-ripple>
                        </button>
                    </div>
                </div>

                <h3>Card Elements with Ripple</h3>
                <p class="description">Interactive cards that provide visual feedback when clicked.</p>
                <div class="ripple-showcase">
                    <div class="cards-grid">
                        <div class="demo-card">
                            <h4>Product Card</h4>
                            <p>Click anywhere on this card to see the ripple effect in action.</p>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="demo-card featured">
                            <h4>Featured Item</h4>
                            <p>This card has a different color scheme but same ripple behavior.</p>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="demo-card compact">
                            <h4>Compact Card</h4>
                            <p>Smaller card with ripple effect.</p>
                            <mjo-ripple></mjo-ripple>
                        </div>
                    </div>
                </div>

                <h3>Custom Ripple Colors</h3>
                <p class="description">Customize ripple color and opacity using CSS custom properties.</p>
                <div class="ripple-showcase">
                    <div class="ripple-container">
                        <button class="demo-button custom-ripple-blue">
                            Blue Ripple
                            <mjo-ripple style="--mo-ripple-color: #007bff; --mo-ripple-opacity: 0.3;"></mjo-ripple>
                        </button>
                        <button class="demo-button custom-ripple-green">
                            Green Ripple
                            <mjo-ripple style="--mo-ripple-color: #28a745; --mo-ripple-opacity: 0.2;"></mjo-ripple>
                        </button>
                        <button class="demo-button custom-ripple-red">
                            Red Ripple
                            <mjo-ripple style="--mo-ripple-color: #dc3545; --mo-ripple-opacity: 0.4;"></mjo-ripple>
                        </button>
                        <button class="demo-button custom-ripple-purple">
                            Purple Ripple
                            <mjo-ripple style="--mo-ripple-color: #6f42c1; --mo-ripple-opacity: 0.25;"></mjo-ripple>
                        </button>
                    </div>
                </div>

                <h3>List Items with Ripple</h3>
                <p class="description">Interactive list items enhanced with ripple effects for better UX.</p>
                <div class="ripple-showcase">
                    <div class="demo-list">
                        <div class="list-item">
                            <div class="item-icon">📧</div>
                            <div class="item-content">
                                <div class="item-title">Email Notifications</div>
                                <div class="item-subtitle">Manage your email preferences</div>
                            </div>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="list-item">
                            <div class="item-icon">🔔</div>
                            <div class="item-content">
                                <div class="item-title">Push Notifications</div>
                                <div class="item-subtitle">Control mobile notifications</div>
                            </div>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="list-item">
                            <div class="item-icon">🔒</div>
                            <div class="item-content">
                                <div class="item-title">Privacy Settings</div>
                                <div class="item-subtitle">Update your privacy preferences</div>
                            </div>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="list-item">
                            <div class="item-icon">👤</div>
                            <div class="item-content">
                                <div class="item-title">Account Settings</div>
                                <div class="item-subtitle">Manage your account information</div>
                            </div>
                            <mjo-ripple></mjo-ripple>
                        </div>
                    </div>
                </div>

                <h3>Navigation Items</h3>
                <p class="description">Navigation elements with ripple effects for enhanced interaction feedback.</p>
                <div class="ripple-showcase">
                    <nav class="demo-nav">
                        <div class="nav-item active">
                            <span class="nav-icon">🏠</span>
                            <span class="nav-label">Home</span>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="nav-item">
                            <span class="nav-icon">📊</span>
                            <span class="nav-label">Analytics</span>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="nav-item">
                            <span class="nav-icon">⚙️</span>
                            <span class="nav-label">Settings</span>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="nav-item">
                            <span class="nav-icon">👥</span>
                            <span class="nav-label">Users</span>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="nav-item">
                            <span class="nav-icon">📝</span>
                            <span class="nav-label">Reports</span>
                            <mjo-ripple></mjo-ripple>
                        </div>
                    </nav>
                </div>

                <h3>Chip-like Elements</h3>
                <p class="description">Tag and chip-like elements enhanced with subtle ripple effects.</p>
                <div class="ripple-showcase">
                    <div class="chips-container">
                        <div class="demo-chip primary">
                            <span>JavaScript</span>
                            <mjo-ripple style="--mo-ripple-opacity: 0.2;"></mjo-ripple>
                        </div>
                        <div class="demo-chip secondary">
                            <span>TypeScript</span>
                            <mjo-ripple style="--mo-ripple-opacity: 0.2;"></mjo-ripple>
                        </div>
                        <div class="demo-chip success">
                            <span>Web Components</span>
                            <mjo-ripple style="--mo-ripple-opacity: 0.2;"></mjo-ripple>
                        </div>
                        <div class="demo-chip info">
                            <span>Lit Element</span>
                            <mjo-ripple style="--mo-ripple-opacity: 0.2;"></mjo-ripple>
                        </div>
                        <div class="demo-chip warning">
                            <span>CSS</span>
                            <mjo-ripple style="--mo-ripple-opacity: 0.2;"></mjo-ripple>
                        </div>
                        <div class="demo-chip error">
                            <span>HTML</span>
                            <mjo-ripple style="--mo-ripple-opacity: 0.2;"></mjo-ripple>
                        </div>
                    </div>
                </div>

                <h3>FAB (Floating Action Button)</h3>
                <p class="description">Circular floating action buttons with centered ripple effects.</p>
                <div class="ripple-showcase">
                    <div class="fab-container">
                        <button class="demo-fab primary">
                            <span class="fab-icon">+</span>
                            <mjo-ripple></mjo-ripple>
                        </button>
                        <button class="demo-fab secondary">
                            <span class="fab-icon">✏️</span>
                            <mjo-ripple></mjo-ripple>
                        </button>
                        <button class="demo-fab success">
                            <span class="fab-icon">✓</span>
                            <mjo-ripple></mjo-ripple>
                        </button>
                        <button class="demo-fab info">
                            <span class="fab-icon">ℹ</span>
                            <mjo-ripple></mjo-ripple>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Technical Information Section -->
            <div class="main-section">
                <h2 class="title">🛠️ Implementation Notes</h2>
                <p class="subtitle">Technical details and best practices for using mjo-ripple.</p>

                <div class="info-grid">
                    <div class="info-card">
                        <h4>Automatic Positioning</h4>
                        <p>The ripple effect automatically positions itself at the click coordinates, creating a natural interaction feeling.</p>
                    </div>
                    <div class="info-card">
                        <h4>CSS Custom Properties</h4>
                        <p>Customize ripple color and opacity using <code>--mo-ripple-color</code> and <code>--mo-ripple-opacity</code> CSS variables.</p>
                    </div>
                    <div class="info-card">
                        <h4>Parent Container</h4>
                        <p>The parent element should have <code>position: relative</code> for proper ripple positioning.</p>
                    </div>
                    <div class="info-card">
                        <h4>Performance</h4>
                        <p>Lightweight component with efficient animations and automatic cleanup after effect completion.</p>
                    </div>
                </div>

                <h3>Usage Guidelines</h3>
                <div class="guidelines">
                    <div class="guideline-item"><strong>✅ DO:</strong> Use on interactive elements like buttons, cards, and list items</div>
                    <div class="guideline-item"><strong>✅ DO:</strong> Customize colors to match your design system</div>
                    <div class="guideline-item"><strong>✅ DO:</strong> Keep opacity values between 0.1 and 0.4 for best results</div>
                    <div class="guideline-item"><strong>❌ DON'T:</strong> Use on non-interactive elements</div>
                    <div class="guideline-item"><strong>❌ DON'T:</strong> Use excessive opacity values that might be distracting</div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(rippleTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/ripple-interactions.js", type: "module" }],
            styles: ["/public/css/ripple-styles.css"],
        });
    }
}
