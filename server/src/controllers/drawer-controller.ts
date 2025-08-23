import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class DrawerController {
    /**
     * Renders the complete demo page for mjo-drawer
     */
    async renderDrawerPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-drawer");

        if (!component) {
            throw new Error("mjo-drawer component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays a drawer/sidebar overlay with content and navigation.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const drawerTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Drawer Playground</h2>
                <p class="subtitle">Customize and interact with drawers in real-time. Test different positions, sizes, and configurations.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-drawer id="playground-drawer"></mjo-drawer>
                        <div class="drawer-controls">
                            <mjo-button onclick="openDrawer()" color="primary">Open Drawer</mjo-button>
                            <mjo-button onclick="closeDrawer()" variant="ghost" color="secondary">Close Drawer</mjo-button>
                        </div>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Position</h4>
                            <select onchange="changeDrawerProp('position', this.value)">
                                <option value="left">Left</option>
                                <option value="right" selected>Right</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Title</h4>
                            <input type="text" placeholder="Enter title..." oninput="changeDrawerProp('title', this.value)" value="Sample Drawer" />
                        </div>

                        <div class="control-group">
                            <h4>Width (for left/right)</h4>
                            <input type="text" placeholder="e.g. 400px or 50%" oninput="changeDrawerProp('width', this.value)" value="400px" />
                        </div>

                        <div class="control-group">
                            <h4>Height (for top/bottom)</h4>
                            <input type="text" placeholder="e.g. 300px or 40%" oninput="changeDrawerProp('height', this.value)" value="300px" />
                        </div>

                        <div class="control-group">
                            <h4>Animation Duration (ms)</h4>
                            <input
                                type="number"
                                min="100"
                                max="2000"
                                step="100"
                                oninput="changeDrawerProp('animationDuration', Number(this.value))"
                                value="200"
                            />
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDrawerProp('blocked', this.checked)" />
                                    <span>Blocked (no close button/ESC)</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" checked onchange="changeDrawerProp('trapFocus', this.checked)" />
                                    <span>Trap Focus</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" checked onchange="changeDrawerProp('restoreFocus', this.checked)" />
                                    <span>Restore Focus</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" checked onchange="changeDrawerProp('closeOnEscape', this.checked)" />
                                    <span>Close on Escape</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Content Type</h4>
                            <select onchange="changeDrawerProp('contentType', this.value)">
                                <option value="text" selected>Text</option>
                                <option value="form">Form</option>
                                <option value="list">List</option>
                                <option value="cards">Cards</option>
                                <option value="custom">Custom HTML</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>ARIA Labels</h4>
                            <input type="text" placeholder="aria-labelledby ID" oninput="changeDrawerProp('ariaLabelledby', this.value)" value="" />
                            <input type="text" placeholder="aria-describedby ID" oninput="changeDrawerProp('ariaDescribedby', this.value)" value="" />
                            <input type="text" placeholder="Alternative label" oninput="changeDrawerProp('label', this.value)" value="" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Different use cases and configurations of mjo-drawer component.</p>

                <h3>Position Examples</h3>
                <div class="component-showcase drawer-examples">
                    <div class="drawer-demo-group">
                        <h4>Left Drawer</h4>
                        <mjo-drawer id="left-drawer"></mjo-drawer>
                        <mjo-button onclick="showLeftDrawer()" color="primary">Open Left</mjo-button>
                    </div>
                    <div class="drawer-demo-group">
                        <h4>Right Drawer</h4>
                        <mjo-drawer id="right-drawer"></mjo-drawer>
                        <mjo-button onclick="showRightDrawer()" color="secondary">Open Right</mjo-button>
                    </div>
                    <div class="drawer-demo-group">
                        <h4>Top Drawer</h4>
                        <mjo-drawer id="top-drawer"></mjo-drawer>
                        <mjo-button onclick="showTopDrawer()" color="success">Open Top</mjo-button>
                    </div>
                    <div class="drawer-demo-group">
                        <h4>Bottom Drawer</h4>
                        <mjo-drawer id="bottom-drawer"></mjo-drawer>
                        <mjo-button onclick="showBottomDrawer()" color="warning">Open Bottom</mjo-button>
                    </div>
                </div>

                <h3>Size Examples</h3>
                <div class="component-showcase drawer-examples">
                    <div class="drawer-demo-group">
                        <h4>Small Width (250px)</h4>
                        <mjo-drawer id="small-drawer"></mjo-drawer>
                        <mjo-button onclick="showSmallDrawer()" color="info">Open Small</mjo-button>
                    </div>
                    <div class="drawer-demo-group">
                        <h4>Large Width (600px)</h4>
                        <mjo-drawer id="large-drawer"></mjo-drawer>
                        <mjo-button onclick="showLargeDrawer()" color="error">Open Large</mjo-button>
                    </div>
                    <div class="drawer-demo-group">
                        <h4>Percentage Width (60%)</h4>
                        <mjo-drawer id="percent-drawer"></mjo-drawer>
                        <mjo-button onclick="showPercentDrawer()" color="primary" variant="ghost">Open 60%</mjo-button>
                    </div>
                </div>

                <h3>Content Examples</h3>
                <div class="component-showcase drawer-examples">
                    <div class="drawer-demo-group">
                        <h4>Form Content</h4>
                        <mjo-drawer id="form-drawer"></mjo-drawer>
                        <mjo-button onclick="showFormDrawer()" color="primary">Open Form</mjo-button>
                    </div>
                    <div class="drawer-demo-group">
                        <h4>List Content</h4>
                        <mjo-drawer id="list-drawer"></mjo-drawer>
                        <mjo-button onclick="showListDrawer()" color="secondary">Open List</mjo-button>
                    </div>
                    <div class="drawer-demo-group">
                        <h4>Navigation Content</h4>
                        <mjo-drawer id="nav-drawer"></mjo-drawer>
                        <mjo-button onclick="showNavDrawer()" color="success">Open Navigation</mjo-button>
                    </div>
                </div>

                <h3>Special Configurations</h3>
                <div class="component-showcase drawer-examples">
                    <div class="drawer-demo-group">
                        <h4>Blocked Drawer</h4>
                        <mjo-drawer id="blocked-drawer"></mjo-drawer>
                        <mjo-button onclick="showBlockedDrawer()" color="warning">Open Blocked</mjo-button>
                        <small>No close button, ESC key disabled</small>
                    </div>
                    <div class="drawer-demo-group">
                        <h4>No Title Drawer</h4>
                        <mjo-drawer id="notitle-drawer"></mjo-drawer>
                        <mjo-button onclick="showNoTitleDrawer()" color="info">Open No Title</mjo-button>
                    </div>
                    <div class="drawer-demo-group">
                        <h4>Custom Animation</h4>
                        <mjo-drawer id="slow-drawer"></mjo-drawer>
                        <mjo-button onclick="showSlowDrawer()" color="error" variant="dashed">Open Slow (1s)</mjo-button>
                    </div>
                </div>

                <h3>Accessibility Features</h3>
                <div class="component-showcase drawer-examples">
                    <div class="drawer-demo-group">
                        <h4>ARIA Labeled</h4>
                        <mjo-drawer id="aria-drawer" aria-labelledby="drawer-title" aria-describedby="drawer-desc"></mjo-drawer>
                        <mjo-button onclick="showAriaDrawer()" color="primary">Open ARIA Enhanced</mjo-button>
                        <small>Proper ARIA labels for screen readers</small>
                    </div>
                    <div class="drawer-demo-group">
                        <h4>Focus Management</h4>
                        <mjo-drawer id="focus-drawer"></mjo-drawer>
                        <mjo-button onclick="showFocusDrawer()" color="secondary">Test Focus Trap</mjo-button>
                        <small>Focus trap and restoration enabled</small>
                    </div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(drawerTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/drawer-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-drawer.css"],
        });
    }
}
