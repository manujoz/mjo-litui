import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class PaginationController {
    /**
     * Renders the complete demo page for mjo-pagination
     */
    async renderPaginationPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-pagination");

        if (!component) {
            throw new Error("mjo-pagination component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that provides navigation across pages with full accessibility support and animated indicators.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const paginationTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Pagination Playground</h2>
                <p class="subtitle">Customize and interact with pagination in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-pagination id="playground-pagination" totalItems="250" pageSize="10" currentPage="1"></mjo-pagination>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Total Items</h4>
                            <input type="number" min="0" max="10000" value="250" onchange="changePaginationProp('totalItems', this.value)" />
                        </div>

                        <div class="control-group">
                            <h4>Page Size</h4>
                            <select onchange="changePaginationProp('pageSize', this.value)">
                                <option value="5">5</option>
                                <option value="10" selected>10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Current Page</h4>
                            <input type="number" min="1" value="1" onchange="changePaginationProp('currentPage', this.value)" />
                        </div>

                        <div class="control-group">
                            <h4>Sibling Count</h4>
                            <select onchange="changePaginationProp('siblingCount', this.value)">
                                <option value="0">0</option>
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changePaginationProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select onchange="changePaginationProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Locale</h4>
                            <select onchange="changePaginationProp('locale', this.value)">
                                <option value="en" selected>English</option>
                                <option value="es">Spanish</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changePaginationProp('hideFirstLast', this.checked || false)" />
                                    <span>Hide First/Last</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changePaginationProp('hidePrevNext', this.checked || false)" />
                                    <span>Hide Prev/Next</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changePaginationProp('showPageSizeSelector', this.checked || false)" />
                                    <span>Show Page Size Selector</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changePaginationProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Various examples of mjo-pagination component usage.</p>

                <h3>Basic Example</h3>
                <div class="component-showcase">
                    <mjo-pagination totalItems="100" pageSize="10" currentPage="1"></mjo-pagination>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <div class="size-example">
                        <h4>Small</h4>
                        <mjo-pagination totalItems="100" pageSize="10" size="small" currentPage="3"></mjo-pagination>
                    </div>
                    <div class="size-example">
                        <h4>Medium</h4>
                        <mjo-pagination totalItems="100" pageSize="10" size="medium" currentPage="3"></mjo-pagination>
                    </div>
                    <div class="size-example">
                        <h4>Large</h4>
                        <mjo-pagination totalItems="100" pageSize="10" size="large" currentPage="3"></mjo-pagination>
                    </div>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase">
                    <div class="color-example">
                        <h4>Primary</h4>
                        <mjo-pagination totalItems="150" pageSize="15" color="primary" currentPage="5"></mjo-pagination>
                    </div>
                    <div class="color-example">
                        <h4>Secondary</h4>
                        <mjo-pagination totalItems="150" pageSize="15" color="secondary" currentPage="5"></mjo-pagination>
                    </div>
                </div>

                <h3>Navigation Options</h3>
                <div class="component-showcase">
                    <div class="nav-example">
                        <h4>Hide First/Last</h4>
                        <mjo-pagination totalItems="200" pageSize="20" hideFirstLast currentPage="5"></mjo-pagination>
                    </div>
                    <div class="nav-example">
                        <h4>Hide Previous/Next</h4>
                        <mjo-pagination totalItems="200" pageSize="20" hidePrevNext currentPage="5"></mjo-pagination>
                    </div>
                    <div class="nav-example">
                        <h4>Minimal Navigation</h4>
                        <mjo-pagination totalItems="200" pageSize="20" hideFirstLast hidePrevNext currentPage="5"></mjo-pagination>
                    </div>
                </div>

                <h3>Sibling Count</h3>
                <div class="component-showcase">
                    <div class="sibling-example">
                        <h4>Sibling Count: 0</h4>
                        <mjo-pagination totalItems="500" pageSize="25" siblingCount="0" currentPage="10"></mjo-pagination>
                    </div>
                    <div class="sibling-example">
                        <h4>Sibling Count: 1</h4>
                        <mjo-pagination totalItems="500" pageSize="25" siblingCount="1" currentPage="10"></mjo-pagination>
                    </div>
                    <div class="sibling-example">
                        <h4>Sibling Count: 2</h4>
                        <mjo-pagination totalItems="500" pageSize="25" siblingCount="2" currentPage="10"></mjo-pagination>
                    </div>
                </div>

                <h3>With Page Size Selector</h3>
                <div class="component-showcase">
                    <mjo-pagination totalItems="500" pageSize="25" currentPage="3" showPageSizeSelector .pageSizeOptions=${[10, 25, 50, 100]}></mjo-pagination>
                </div>

                <h3>Large Dataset Example</h3>
                <div class="component-showcase">
                    <mjo-pagination
                        totalItems="10000"
                        pageSize="50"
                        currentPage="100"
                        siblingCount="2"
                        showPageSizeSelector
                        .pageSizeOptions=${[25, 50, 100, 250]}
                    ></mjo-pagination>
                </div>

                <h3>Disabled State</h3>
                <div class="component-showcase">
                    <mjo-pagination totalItems="100" pageSize="10" currentPage="5" disabled></mjo-pagination>
                </div>

                <h3>Different Locales</h3>
                <div class="component-showcase">
                    <div class="locale-example">
                        <h4>English (default)</h4>
                        <mjo-pagination totalItems="100" pageSize="10" currentPage="5" locale="en"></mjo-pagination>
                    </div>
                    <div class="locale-example">
                        <h4>Spanish</h4>
                        <mjo-pagination totalItems="100" pageSize="10" currentPage="5" locale="es"></mjo-pagination>
                    </div>
                </div>

                <h3>Real-world Data Table Example</h3>
                <div class="component-showcase">
                    <div class="data-table-example">
                        <div class="mock-table-header">
                            <strong>Sample Data Table (showing 41-60 of 1,247 records)</strong>
                        </div>
                        <div class="mock-table-content">
                            <div class="mock-table-row">
                                <span>ID: 041</span>
                                <span>John Smith</span>
                                <span>john.smith@example.com</span>
                            </div>
                            <div class="mock-table-row">
                                <span>ID: 042</span>
                                <span>Jane Doe</span>
                                <span>jane.doe@example.com</span>
                            </div>
                            <div class="mock-table-row">
                                <span>ID: 043</span>
                                <span>Mike Johnson</span>
                                <span>mike.j@example.com</span>
                            </div>
                            <div class="mock-table-row">
                                <span>...</span>
                                <span>...</span>
                                <span>...</span>
                            </div>
                        </div>
                        <mjo-pagination
                            totalItems="1247"
                            pageSize="20"
                            currentPage="3"
                            showPageSizeSelector
                            .pageSizeOptions=${[10, 20, 50, 100]}
                            size="small"
                        ></mjo-pagination>
                    </div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(paginationTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/pagination-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-pagination.css"],
        });
    }
}
