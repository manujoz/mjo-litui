import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class TypographyController {
    /**
     * Renders the complete demo page for mjo-typography
     */
    async renderTypographyPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-typography");

        if (!component) {
            throw new Error("mjo-typography component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Semantic typography component that provides consistent text styling with predefined sizes, weights, and semantic HTML tags.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const typographyTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Typography Playground</h2>
                <p class="subtitle">Customize and interact with typography in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-typography id="playground-typography" tag="p" size="base" weight="regular">Interactive Typography Demo</mjo-typography>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Content</h4>
                            <textarea placeholder="Enter text content..." oninput="changeTypographyContent(this.value)" rows="2">
Interactive Typography Demo</textarea
                            >
                        </div>

                        <div class="control-group">
                            <h4>Tag</h4>
                            <select onchange="changeTypographyProp('tag', this.value)">
                                <option value="h1">H1</option>
                                <option value="h2">H2</option>
                                <option value="h3">H3</option>
                                <option value="h4">H4</option>
                                <option value="h5">H5</option>
                                <option value="p" selected>Paragraph</option>
                                <option value="span">Span</option>
                                <option value="none">None (no wrapper)</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeTypographyProp('size', this.value)">
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
                            <h4>Weight</h4>
                            <select onchange="changeTypographyProp('weight', this.value)">
                                <option value="light">Light</option>
                                <option value="regular" selected>Regular</option>
                                <option value="medium">Medium</option>
                                <option value="bold">Bold</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>ARIA Properties</h4>
                            <input type="text" placeholder="aria-label" oninput="changeTypographyProp('aria-label', this.value)" />
                            <input type="text" placeholder="aria-level (1-6)" oninput="changeTypographyProp('aria-level', this.value)" />
                            <input type="text" placeholder="aria-describedby" oninput="changeTypographyProp('aria-describedby', this.value)" />
                            <input type="text" placeholder="aria-labelledby" oninput="changeTypographyProp('aria-labelledby', this.value)" />
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTypographyProp('aria-hidden', this.checked ? 'true' : 'false')" />
                                    <span>Hide from screen readers</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Usage examples of mjo-typography component.</p>

                <h3>Heading Hierarchy</h3>
                <div class="component-showcase typography-showcase">
                    <mjo-typography tag="h1" size="heading1" weight="bold">Main Title (H1)</mjo-typography>
                    <mjo-typography tag="h2" size="heading2" weight="bold">Section Heading (H2)</mjo-typography>
                    <mjo-typography tag="h3" size="heading3" weight="medium">Subsection Heading (H3)</mjo-typography>
                    <mjo-typography tag="h4" size="base" weight="medium">Sub-subsection (H4)</mjo-typography>
                    <mjo-typography tag="h5" size="body1" weight="medium">Minor Heading (H5)</mjo-typography>
                </div>

                <h3>Typography Sizes</h3>
                <div class="component-showcase typography-showcase">
                    <mjo-typography size="heading1" weight="bold">Heading 1 Size</mjo-typography>
                    <mjo-typography size="heading2" weight="bold">Heading 2 Size</mjo-typography>
                    <mjo-typography size="heading3" weight="medium">Heading 3 Size</mjo-typography>
                    <mjo-typography size="base" weight="regular">Base Size (Default)</mjo-typography>
                    <mjo-typography size="body1" weight="regular">Body 1 Size</mjo-typography>
                    <mjo-typography size="body2" weight="regular">Body 2 Size</mjo-typography>
                    <mjo-typography size="body3" weight="regular">Body 3 Size (Smallest)</mjo-typography>
                </div>

                <h3>Font Weights</h3>
                <div class="component-showcase typography-showcase">
                    <mjo-typography size="base" weight="light">Light Weight (300)</mjo-typography>
                    <mjo-typography size="base" weight="regular">Regular Weight (400)</mjo-typography>
                    <mjo-typography size="base" weight="medium">Medium Weight (500)</mjo-typography>
                    <mjo-typography size="base" weight="bold">Bold Weight (600)</mjo-typography>
                </div>

                <h3>Semantic Structure</h3>
                <div class="component-showcase typography-showcase">
                    <article class="article-example">
                        <mjo-typography tag="h1" size="heading1" weight="bold">Article Title</mjo-typography>

                        <mjo-typography tag="p" size="base" weight="regular">
                            This is a paragraph that demonstrates proper semantic structure. It provides context and readability for both users and screen
                            readers.
                        </mjo-typography>

                        <mjo-typography tag="h2" size="heading2" weight="medium">Section Heading</mjo-typography>

                        <mjo-typography tag="p" size="body1" weight="regular">
                            Another paragraph with body1 size. Notice how the semantic structure is maintained while visual appearance can be customized
                            independently.
                        </mjo-typography>

                        <mjo-typography tag="h3" size="heading3" weight="medium">Subsection</mjo-typography>

                        <mjo-typography tag="p" size="body2" weight="regular"> This paragraph uses body2 size for smaller, secondary content. </mjo-typography>
                    </article>
                </div>

                <h3>Inline Typography</h3>
                <div class="component-showcase typography-showcase">
                    <mjo-typography tag="p" size="base" weight="regular">
                        This paragraph contains
                        <mjo-typography tag="span" size="base" weight="bold">bold inline text</mjo-typography>,
                        <mjo-typography tag="span" size="body2" weight="medium">smaller text</mjo-typography>, and
                        <mjo-typography tag="span" size="base" weight="light">light weight text</mjo-typography>
                        all inline.
                    </mjo-typography>
                </div>

                <h3>ARIA Enhanced Typography</h3>
                <div class="component-showcase typography-showcase">
                    <mjo-typography tag="h2" size="heading1" weight="bold" aria-level="3" aria-label="Technical specifications section">
                        Visual H1, Semantic H3
                    </mjo-typography>

                    <mjo-typography tag="p" size="base" weight="regular" aria-describedby="usage-note">
                        This text has additional description referenced by ID.
                    </mjo-typography>

                    <mjo-typography tag="p" size="body2" weight="light" id="usage-note"> Note: This is the referenced descriptive content. </mjo-typography>

                    <mjo-typography tag="span" size="body3" weight="light" aria-hidden="true">
                        ★ ★ ★ Decorative content (hidden from screen readers) ★ ★ ★
                    </mjo-typography>
                </div>

                <h3>No Wrapper (tag="none")</h3>
                <div class="component-showcase typography-showcase">
                    <div>
                        Regular div with
                        <mjo-typography tag="none" size="body1" weight="bold"> unstyled typography content </mjo-typography>
                        that inherits styling without semantic markup.
                    </div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(typographyTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/typography-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-typography.css"],
        });
    }
}
