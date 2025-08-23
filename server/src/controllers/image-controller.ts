import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class ImageController {
    /**
     * Renders the complete demo page for mjo-image
     */
    async renderImagePage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-image");

        if (!component) {
            throw new Error("mjo-image component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `A responsive image component with error handling, loading states, and accessibility features.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const imageTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Image Playground</h2>
                <p class="subtitle">Customize and interact with images in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-image id="playground-image" src="https://picsum.photos/400/300" alt="Interactive Demo Image" fit="cover"></mjo-image>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Image Source</h4>
                            <input
                                type="text"
                                placeholder="Enter image URL..."
                                oninput="changeImageProp('src', this.value)"
                                value="https://picsum.photos/400/300"
                            />
                        </div>

                        <div class="control-group">
                            <h4>Alt Text</h4>
                            <input type="text" placeholder="Enter alt text..." oninput="changeImageProp('alt', this.value)" value="Interactive Demo Image" />
                        </div>

                        <div class="control-group">
                            <h4>Object Fit</h4>
                            <select onchange="changeImageProp('fit', this.value)">
                                <option value="contain">Contain</option>
                                <option value="cover" selected>Cover</option>
                                <option value="fill">Fill</option>
                                <option value="none">None</option>
                                <option value="scale-down">Scale Down</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>States & Interactions</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeImageProp('loading', this.checked || false)" />
                                    <span>Loading State</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeImageProp('clickable', this.checked || false)" />
                                    <span>Clickable</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeImageProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeImageProp('lazy', this.checked || false)" />
                                    <span>Lazy Loading</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>ARIA Label</h4>
                            <input type="text" placeholder="Enter ARIA label..." oninput="changeImageProp('aria-label', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Quick Image Sources</h4>
                            <div class="quick-sources">
                                <button onclick="changeImageProp('src', 'https://picsum.photos/400/300')">Random 400x300</button>
                                <button onclick="changeImageProp('src', 'https://picsum.photos/600/400')">Random 600x400</button>
                                <button onclick="changeImageProp('src', 'https://picsum.photos/200/200')">Random 200x200</button>
                                <button onclick="changeImageProp('src', 'https://invalid-url.example/image.jpg')">Broken Link</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Usage examples of mjo-image component.</p>

                <h3>Object Fit Options</h3>
                <div class="image-grid">
                    <div class="image-example">
                        <h4>Cover (default)</h4>
                        <mjo-image src="https://picsum.photos/300/200" alt="Cover example" fit="cover"></mjo-image>
                    </div>
                    <div class="image-example">
                        <h4>Contain</h4>
                        <mjo-image src="https://picsum.photos/300/200" alt="Contain example" fit="contain"></mjo-image>
                    </div>
                    <div class="image-example">
                        <h4>Fill</h4>
                        <mjo-image src="https://picsum.photos/300/200" alt="Fill example" fit="fill"></mjo-image>
                    </div>
                    <div class="image-example">
                        <h4>Scale Down</h4>
                        <mjo-image src="https://picsum.photos/150/100" alt="Scale down example" fit="scale-down"></mjo-image>
                    </div>
                </div>

                <h3>Loading States</h3>
                <div class="component-showcase">
                    <mjo-image src="https://picsum.photos/200/150" alt="Normal image"></mjo-image>
                    <mjo-image src="https://picsum.photos/200/150" alt="Loading image" loading></mjo-image>
                </div>

                <h3>Error Handling</h3>
                <div class="component-showcase">
                    <mjo-image src="https://picsum.photos/200/150" alt="Valid image"></mjo-image>
                    <mjo-image src="https://invalid-url.example/image.jpg" alt="Broken image"></mjo-image>
                </div>

                <h3>Clickable Images</h3>
                <div class="component-showcase">
                    <mjo-image src="https://picsum.photos/200/150?random=1" alt="Clickable image 1" clickable></mjo-image>
                    <mjo-image src="https://picsum.photos/200/150?random=2" alt="Clickable image 2" clickable></mjo-image>
                    <mjo-image src="https://picsum.photos/200/150?random=3" alt="Clickable image 3" clickable></mjo-image>
                </div>

                <h3>Disabled State</h3>
                <div class="component-showcase">
                    <mjo-image src="https://picsum.photos/200/150?random=4" alt="Regular image" clickable></mjo-image>
                    <mjo-image src="https://picsum.photos/200/150?random=5" alt="Disabled image" clickable disabled></mjo-image>
                </div>

                <h3>Lazy Loading</h3>
                <div class="lazy-loading-demo">
                    <p>Scroll down to see lazy-loaded images:</p>
                    <div class="spacer"></div>
                    <div class="component-showcase">
                        <mjo-image src="https://picsum.photos/200/150?random=6" alt="Lazy loaded image 1" lazy></mjo-image>
                        <mjo-image src="https://picsum.photos/200/150?random=7" alt="Lazy loaded image 2" lazy></mjo-image>
                        <mjo-image src="https://picsum.photos/200/150?random=8" alt="Lazy loaded image 3" lazy></mjo-image>
                    </div>
                </div>

                <h3>Different Sizes</h3>
                <div class="size-examples">
                    <div class="size-example">
                        <h4>Small (100x75)</h4>
                        <div class="image-container small">
                            <mjo-image src="https://picsum.photos/200/150?random=9" alt="Small image"></mjo-image>
                        </div>
                    </div>
                    <div class="size-example">
                        <h4>Medium (200x150)</h4>
                        <div class="image-container medium">
                            <mjo-image src="https://picsum.photos/200/150?random=10" alt="Medium image"></mjo-image>
                        </div>
                    </div>
                    <div class="size-example">
                        <h4>Large (300x225)</h4>
                        <div class="image-container large">
                            <mjo-image src="https://picsum.photos/300/225?random=11" alt="Large image"></mjo-image>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(imageTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/image-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-image.css"],
        });
    }
}
