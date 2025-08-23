import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class ModalController {
    /**
     * Renders the complete demo page for mjo-modal
     */
    async renderModalPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-modal");

        if (!component) {
            throw new Error("mjo-modal component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that creates modal dialogs with advanced accessibility features and customization options.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const modalTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">📋 Modal Examples & Showcase</h2>
                <p class="subtitle">Explore different modal configurations and features. Click buttons to open modals with various settings.</p>

                <div class="playground-container interactive-demo">
                    <div class="showcase-grid">
                        <div class="showcase-item">
                            <h4>Basic Modal</h4>
                            <button class="demo-button" onclick="showBasicModal()">Open Basic Modal</button>
                            <p class="description">Simple modal with close button and backdrop</p>
                        </div>

                        <div class="showcase-item">
                            <h4>Modal with Title</h4>
                            <button class="demo-button" onclick="showTitledModal()">Open with Title</button>
                            <p class="description">Modal with a title header and content</p>
                        </div>

                        <div class="showcase-item">
                            <h4>Blocked Modal</h4>
                            <button class="demo-button" onclick="showBlockedModal()">Open Blocked</button>
                            <p class="description">Modal that cannot be closed by clicking backdrop</p>
                        </div>

                        <div class="showcase-item">
                            <h4>Auto-Close Modal</h4>
                            <button class="demo-button" onclick="showAutoCloseModal()">Auto Close (3s)</button>
                            <p class="description">Modal that automatically closes after 3 seconds</p>
                        </div>

                        <div class="showcase-item">
                            <h4>Custom Width</h4>
                            <button class="demo-button" onclick="showWideModal()">Open Wide Modal</button>
                            <p class="description">Modal with custom width (700px)</p>
                        </div>

                        <div class="showcase-item">
                            <h4>Outside Close Button</h4>
                            <button class="demo-button" onclick="showOutsideCloseModal()">Outside Close</button>
                            <p class="description">Modal with close button positioned outside</p>
                        </div>

                        <div class="showcase-item">
                            <h4>Complex Content</h4>
                            <button class="demo-button" onclick="showComplexModal()">Complex Content</button>
                            <p class="description">Modal with forms, buttons, and interactive elements</p>
                        </div>

                        <div class="showcase-item">
                            <h4>Accessibility Features</h4>
                            <button class="demo-button" onclick="showAccessibilityModal()">A11y Modal</button>
                            <p class="description">Modal with enhanced accessibility features</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Usage Examples</h2>
                <p class="subtitle">Code examples showing how to use the modal component.</p>

                <h3>JavaScript/TypeScript Usage</h3>
                <div class="code-showcase">
                    <pre><code class="language-typescript">// Basic usage
const modal = document.querySelector('mjo-modal');
modal.controller.show({
    content: 'Hello, World!',
    title: 'Basic Modal'
});

// Advanced configuration
modal.controller.show({
    content: 'This modal will auto-close',
    title: 'Auto-Close Modal',
    time: 3000,
    width: 600,
    blocked: false,
    closePosition: 'in',
    animationDuration: 300,
    onClose: () => console.log('Modal closed')
});</code></pre>
                </div>

                <h3>HTML Declaration</h3>
                <div class="code-showcase">
                    <pre><code class="language-html">&lt;!-- Basic modal --&gt;
&lt;mjo-modal id="basic-modal"&gt;&lt;/mjo-modal&gt;

&lt;!-- Modal with accessibility features --&gt;
&lt;mjo-modal 
    id="accessible-modal"
    aria-labelledby="modal-title"
    aria-describedby="modal-content"
    trap-focus
    restore-focus
    close-on-escape
    prevent-body-scroll&gt;
&lt;/mjo-modal&gt;</code></pre>
                </div>

                <h3>Programmatic Control</h3>
                <div class="code-showcase">
                    <pre><code class="language-typescript">// Show modal
modal.controller.show({
    content: 'Modal content here',
    title: 'Optional title'
});

// Close modal programmatically
modal.controller.close();</code></pre>
                </div>
            </div>

            <!-- Hidden modal instances for demos -->
            <mjo-modal id="demo-modal"></mjo-modal>
        `;

        return ssrRenderer.renderPage(modalTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/modal-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-modal.css"],
        });
    }
}
