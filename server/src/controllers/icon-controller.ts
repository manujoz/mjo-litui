import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class IconController {
    /**
     * Renders the complete demo page for mjo-icon
     */
    async renderIconPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-icon");

        if (!component) {
            throw new Error("mjo-icon component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Flexible SVG icon component with accessibility support, theming, and interaction capabilities.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        // Common SVG icons for examples
        const heartIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        const starIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
        const settingsIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/></svg>`;
        const homeIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;
        const searchIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`;
        const downloadIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`;

        const iconTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Icon Playground</h2>
                <p class="subtitle">Customize and interact with icons in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-icon id="playground-icon" src="${heartIcon}" size="medium"></mjo-icon>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>SVG Source</h4>
                            <select onchange="changeIconProp('src', this.value)">
                                <option value="${heartIcon}" selected>Heart Icon</option>
                                <option value="${starIcon}">Star Icon</option>
                                <option value="${settingsIcon}">Settings Icon</option>
                                <option value="${homeIcon}">Home Icon</option>
                                <option value="${searchIcon}">Search Icon</option>
                                <option value="${downloadIcon}">Download Icon</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeIconProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                                <option value="xl">XL</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Animation</h4>
                            <select onchange="changeIconProp('animation', this.value)">
                                <option value="none" selected>None</option>
                                <option value="spin">Spin</option>
                                <option value="pulse">Pulse</option>
                                <option value="rotate">Rotate</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>States</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeIconProp('clickable', this.checked || false)" />
                                    <span>Clickable</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeIconProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeIconProp('loading', this.checked || false)" />
                                    <span>Loading</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Accessibility</h4>
                            <input type="text" placeholder="Enter aria-label..." oninput="changeIconProp('aria-label', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Custom SVG</h4>
                            <textarea placeholder="Paste your own SVG here..." oninput="changeIconProp('src', this.value)" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-icon component.</p>

                <h3>Sizes</h3>
                <div class="component-showcase icon-showcase">
                    <mjo-icon src="${heartIcon}" size="small" aria-label="Small heart icon"></mjo-icon>
                    <mjo-icon src="${heartIcon}" size="medium" aria-label="Medium heart icon"></mjo-icon>
                    <mjo-icon src="${heartIcon}" size="large" aria-label="Large heart icon"></mjo-icon>
                    <mjo-icon src="${heartIcon}" size="xl" aria-label="Extra large heart icon"></mjo-icon>
                </div>

                <h3>Different Icons</h3>
                <div class="component-showcase icon-showcase">
                    <mjo-icon src="${heartIcon}" aria-label="Heart"></mjo-icon>
                    <mjo-icon src="${starIcon}" aria-label="Star"></mjo-icon>
                    <mjo-icon src="${settingsIcon}" aria-label="Settings"></mjo-icon>
                    <mjo-icon src="${homeIcon}" aria-label="Home"></mjo-icon>
                    <mjo-icon src="${searchIcon}" aria-label="Search"></mjo-icon>
                    <mjo-icon src="${downloadIcon}" aria-label="Download"></mjo-icon>
                </div>

                <h3>Animations</h3>
                <div class="component-showcase icon-showcase">
                    <mjo-icon src="${settingsIcon}" animation="spin" aria-label="Spinning settings"></mjo-icon>
                    <mjo-icon src="${heartIcon}" animation="pulse" aria-label="Pulsing heart"></mjo-icon>
                    <mjo-icon src="${starIcon}" animation="rotate" aria-label="Rotating star"></mjo-icon>
                </div>

                <h3>Clickable Icons</h3>
                <div class="component-showcase icon-showcase">
                    <mjo-icon src="${heartIcon}" clickable aria-label="Click to like"></mjo-icon>
                    <mjo-icon src="${starIcon}" clickable aria-label="Click to rate"></mjo-icon>
                    <mjo-icon src="${settingsIcon}" clickable aria-label="Click to open settings"></mjo-icon>
                    <mjo-icon src="${downloadIcon}" clickable aria-label="Click to download"></mjo-icon>
                </div>

                <h3>Disabled Icons</h3>
                <div class="component-showcase icon-showcase">
                    <mjo-icon src="${heartIcon}" disabled aria-label="Disabled heart"></mjo-icon>
                    <mjo-icon src="${starIcon}" disabled aria-label="Disabled star"></mjo-icon>
                    <mjo-icon src="${settingsIcon}" disabled clickable aria-label="Disabled settings"></mjo-icon>
                </div>

                <h3>Loading State</h3>
                <div class="component-showcase icon-showcase">
                    <mjo-icon loading size="small" aria-label="Loading small"></mjo-icon>
                    <mjo-icon loading size="medium" aria-label="Loading medium"></mjo-icon>
                    <mjo-icon loading size="large" aria-label="Loading large"></mjo-icon>
                    <mjo-icon loading size="xl" aria-label="Loading extra large"></mjo-icon>
                </div>

                <h3>Color Variations (using CSS custom properties)</h3>
                <div class="component-showcase icon-showcase color-variations">
                    <mjo-icon src="${heartIcon}" style="color: #e74c3c;" aria-label="Red heart"></mjo-icon>
                    <mjo-icon src="${starIcon}" style="color: #f39c12;" aria-label="Orange star"></mjo-icon>
                    <mjo-icon src="${settingsIcon}" style="color: #3498db;" aria-label="Blue settings"></mjo-icon>
                    <mjo-icon src="${homeIcon}" style="color: #27ae60;" aria-label="Green home"></mjo-icon>
                    <mjo-icon src="${searchIcon}" style="color: #9b59b6;" aria-label="Purple search"></mjo-icon>
                    <mjo-icon src="${downloadIcon}" style="color: #34495e;" aria-label="Dark download"></mjo-icon>
                </div>

                <h3>Interactive Examples</h3>
                <div class="component-showcase icon-showcase">
                    <mjo-icon src="${heartIcon}" clickable class="interactive-heart" aria-label="Toggle favorite"></mjo-icon>
                    <mjo-icon src="${starIcon}" clickable class="interactive-star" aria-label="Toggle rating"></mjo-icon>
                    <mjo-icon src="${settingsIcon}" clickable animation="spin" class="interactive-settings" aria-label="Settings menu"></mjo-icon>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(iconTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/icon-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-icon.css"],
        });
    }
}
