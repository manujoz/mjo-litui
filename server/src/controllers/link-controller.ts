import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class LinkController {
    /**
     * Renders the complete demo page for mjo-link
     */
    async renderLinkPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-link");

        if (!component) {
            throw new Error("mjo-link component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that creates accessible links with multiple variants including buttons, with support for navigation, typography styling, and event handling.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const linkTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Link Playground</h2>
                <p class="subtitle">Customize and interact with links in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-link id="playground-link" href="https://example.com">Interactive Link</mjo-link>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Text Content</h4>
                            <input type="text" placeholder="Enter text..." oninput="changeLinkText(this.value)" value="Interactive Link" />
                        </div>

                        <div class="control-group">
                            <h4>Href</h4>
                            <input type="text" placeholder="Enter URL..." oninput="changeLinkProp('href', this.value)" value="https://example.com" />
                        </div>

                        <div class="control-group">
                            <h4>Target</h4>
                            <select onchange="changeLinkProp('target', this.value)">
                                <option value="_self" selected>Same Window (_self)</option>
                                <option value="_blank">New Window (_blank)</option>
                                <option value="_parent">Parent Frame (_parent)</option>
                                <option value="_top">Top Frame (_top)</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select onchange="changeLinkProp('color', this.value)">
                                <option value="default" selected>Default</option>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Variant</h4>
                            <select onchange="changeLinkProp('variant', this.value)">
                                <option value="link" selected>Link</option>
                                <option value="button">Button</option>
                                <option value="ghost">Ghost</option>
                                <option value="dashed">Dashed</option>
                                <option value="text">Text</option>
                                <option value="flat">Flat</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Typography Size</h4>
                            <select onchange="changeLinkProp('size', this.value)">
                                <option value="heading1">Heading 1</option>
                                <option value="heading2">Heading 2</option>
                                <option value="heading3">Heading 3</option>
                                <option value="base" selected>Base</option>
                                <option value="body1">Body 1</option>
                                <option value="body2">Body 2</option>
                                <option value="body3">Body 3</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Typography Weight</h4>
                            <select onchange="changeLinkProp('weight', this.value)">
                                <option value="light">Light</option>
                                <option value="regular" selected>Regular</option>
                                <option value="medium">Medium</option>
                                <option value="bold">Bold</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeLinkProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeLinkProp('cover', this.checked || false)" />
                                    <span>Cover Link</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeLinkProp('nodecor', this.checked || false)" />
                                    <span>No Decoration</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeLinkProp('preventDefault', this.checked || false)" />
                                    <span>Prevent Default</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>ARIA Label</h4>
                            <input type="text" placeholder="Enter ARIA label..." oninput="changeLinkProp('ariaLabel', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Rel Attribute</h4>
                            <input type="text" placeholder="e.g., noopener noreferrer..." oninput="changeLinkProp('rel', this.value)" value="" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-link component.</p>

                <h3>Basic Links</h3>
                <div class="component-showcase">
                    <mjo-link href="https://example.com">Default Link</mjo-link>
                    <mjo-link href="https://example.com" color="primary">Primary Link</mjo-link>
                    <mjo-link href="https://example.com" color="secondary">Secondary Link</mjo-link>
                </div>

                <h3>Link Variants</h3>
                <div class="component-showcase">
                    <mjo-link href="https://example.com" variant="link">Link</mjo-link>
                    <mjo-link href="https://example.com" variant="button" color="primary">Button</mjo-link>
                    <mjo-link href="https://example.com" variant="ghost" color="primary">Ghost</mjo-link>
                    <mjo-link href="https://example.com" variant="dashed" color="primary">Dashed</mjo-link>
                    <mjo-link href="https://example.com" variant="text" color="primary">Text</mjo-link>
                    <mjo-link href="https://example.com" variant="flat" color="secondary">Flat</mjo-link>
                </div>

                <h3>Typography Sizes</h3>
                <div class="component-showcase typography-showcase">
                    <mjo-link href="https://example.com" size="heading1" color="primary">Heading 1 Link</mjo-link>
                    <mjo-link href="https://example.com" size="heading2" color="primary">Heading 2 Link</mjo-link>
                    <mjo-link href="https://example.com" size="heading3" color="primary">Heading 3 Link</mjo-link>
                    <mjo-link href="https://example.com" size="base" color="primary">Base Link</mjo-link>
                    <mjo-link href="https://example.com" size="body1" color="primary">Body 1 Link</mjo-link>
                    <mjo-link href="https://example.com" size="body2" color="primary">Body 2 Link</mjo-link>
                    <mjo-link href="https://example.com" size="body3" color="primary">Body 3 Link</mjo-link>
                </div>

                <h3>Typography Weights</h3>
                <div class="component-showcase">
                    <mjo-link href="https://example.com" weight="light" color="primary">Light Weight</mjo-link>
                    <mjo-link href="https://example.com" weight="regular" color="primary">Regular Weight</mjo-link>
                    <mjo-link href="https://example.com" weight="medium" color="primary">Medium Weight</mjo-link>
                    <mjo-link href="https://example.com" weight="bold" color="primary">Bold Weight</mjo-link>
                </div>

                <h3>Target Options</h3>
                <div class="component-showcase">
                    <mjo-link href="https://example.com" target="_self" color="primary">Same Window</mjo-link>
                    <mjo-link href="https://github.com" target="_blank" color="primary">New Window (GitHub)</mjo-link>
                </div>

                <h3>Disabled State</h3>
                <div class="component-showcase">
                    <mjo-link href="https://example.com" disabled>Disabled Link</mjo-link>
                    <mjo-link href="https://example.com" variant="button" color="primary" disabled>Disabled Button</mjo-link>
                    <mjo-link href="https://example.com" variant="ghost" color="secondary" disabled>Disabled Ghost</mjo-link>
                </div>

                <h3>No Decoration</h3>
                <div class="component-showcase">
                    <mjo-link href="https://example.com" color="primary">Normal Link (with hover underline)</mjo-link>
                    <mjo-link href="https://example.com" color="primary" nodecor>No Decoration Link (no underline on hover)</mjo-link>
                </div>

                <h3>Custom Event Handling</h3>
                <div class="component-showcase">
                    <mjo-link href="https://example.com" preventDefault>Prevented Link (click to see alert)</mjo-link>
                    <mjo-link href="https://example.com" variant="button" color="secondary" preventDefault>Prevented Button Link</mjo-link>
                </div>

                <h3>Cover Links</h3>
                <div class="component-showcase">
                    <div class="cover-demo-card">
                        <h4>Card with Cover Link</h4>
                        <p>This entire card is clickable thanks to the cover link property. The link covers the entire card area.</p>
                        <mjo-link href="https://example.com" cover>Read More</mjo-link>
                    </div>
                </div>

                <h3>Accessibility Features</h3>
                <div class="component-showcase">
                    <mjo-link href="https://example.com" ariaLabel="Visit our main website">Link with ARIA Label</mjo-link>
                    <mjo-link href="https://external-site.com" target="_blank" rel="noopener noreferrer" color="primary">
                        External Link with Security
                    </mjo-link>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(linkTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/link-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-link.css"],
        });
    }
}
