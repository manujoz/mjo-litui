import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-button.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-tabs.js";

import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("tabs-component")
export class TabsComponent extends LitElement {
    @state() private selectedVariant: "light" | "solid" | "bordered" = "light";
    @state() private selectedColor: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info" = "default";
    @state() private isVertical = false;
    @state() private dynamicTabCount = 3;

    render() {
        return html`
            <h1>Tabs Component Examples</h1>
            <section-container label="Interactive Tabs Playground">
                <playground-grid>
                    <mjo-tabs
                        slot="demo"
                        id="playground-tabs"
                        variant=${this.selectedVariant}
                        color=${this.selectedColor}
                        ?vertical=${this.isVertical}
                        @mjo-tabs:changed=${this.#handleTabChange}
                        @mjo-tabs:updated=${this.#handleTabUpdate}
                    >
                        <mjo-tab label="Design">
                            <div class="tab-content">
                                <h4>🎨 Design Tab</h4>
                                <p>This tab contains design-related content. You can customize the appearance of tabs using different variants and colors.</p>
                                <div class="demo-buttons">
                                    <mjo-button size="small" color="primary">Primary Action</mjo-button>
                                    <mjo-button size="small" variant="ghost">Secondary Action</mjo-button>
                                </div>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Development">
                            <div class="tab-content">
                                <h4>⚡ Development Tab</h4>
                                <p>Development content goes here. This demonstrates how tab content can be structured.</p>
                                <pre class="code-block">
const tabs = document.querySelector('mjo-tabs');
tabs.setTab(1); // Switch to second tab</pre
                                >
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Testing">
                            <div class="tab-content">
                                <h4>🧪 Testing Tab</h4>
                                <p>Testing and QA content. Each tab can contain complex content including forms, images, and interactive elements.</p>
                                <ul class="feature-list">
                                    <li>✅ Unit Testing</li>
                                    <li>✅ Integration Testing</li>
                                    <li>✅ E2E Testing</li>
                                    <li>⏳ Performance Testing</li>
                                </ul>
                            </div>
                        </mjo-tab>
                        ${this.renderDynamicTabs()}
                    </mjo-tabs>
                    <control-group slot="controls" label="Variant" columns="3">
                        <mjo-button size="small" variant=${this.selectedVariant === "light" ? "default" : "ghost"} @click=${() => this.setVariant("light")}>
                            Light
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedVariant === "solid" ? "default" : "ghost"} @click=${() => this.setVariant("solid")}>
                            Solid
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.selectedVariant === "bordered" ? "default" : "ghost"}
                            @click=${() => this.setVariant("bordered")}
                        >
                            Bordered
                        </mjo-button>
                    </control-group>
                    <control-group label="Color" columns="3" slot="controls">
                        <mjo-button size="small" variant=${this.selectedColor === "default" ? "default" : "ghost"} @click=${() => this.setColor("default")}>
                            Default
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="primary"
                            variant=${this.selectedColor === "primary" ? "default" : "ghost"}
                            @click=${() => this.setColor("primary")}
                        >
                            Primary
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="secondary"
                            variant=${this.selectedColor === "secondary" ? "default" : "ghost"}
                            @click=${() => this.setColor("secondary")}
                        >
                            Secondary
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="success"
                            variant=${this.selectedColor === "success" ? "default" : "ghost"}
                            @click=${() => this.setColor("success")}
                        >
                            Success
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="warning"
                            variant=${this.selectedColor === "warning" ? "default" : "ghost"}
                            @click=${() => this.setColor("warning")}
                        >
                            Warning
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="error"
                            variant=${this.selectedColor === "error" ? "default" : "ghost"}
                            @click=${() => this.setColor("error")}
                        >
                            Error
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="info"
                            variant=${this.selectedColor === "info" ? "default" : "ghost"}
                            @click=${() => this.setColor("info")}
                        >
                            Info
                        </mjo-button>
                    </control-group>
                    <control-group label="Layout" columns="2" slot="controls">
                        <mjo-button size="small" variant=${!this.isVertical ? "default" : "ghost"} @click=${() => this.setVertical(false)}>
                            Horizontal
                        </mjo-button>
                        <mjo-button size="small" variant=${this.isVertical ? "default" : "ghost"} @click=${() => this.setVertical(true)}> Vertical </mjo-button>
                    </control-group>
                    <control-group label="Tab Actions" columns="1" slot="controls">
                        <mjo-button size="small" color="primary" @click=${() => this.switchToTab(0)}>Go to Design</mjo-button>
                        <mjo-button size="small" color="primary" @click=${() => this.switchToTab(1)}>Go to Development</mjo-button>
                        <mjo-button size="small" color="primary" @click=${() => this.switchToTab(2)}>Go to Testing</mjo-button>
                    </control-group>
                    <control-group label="Dynamic Management" columns="1" slot="controls">
                        <mjo-button size="small" color="success" @click=${this.addDynamicTab}>Add Tab</mjo-button>
                        <mjo-button size="small" color="error" @click=${this.removeDynamicTab}>Remove Tab</mjo-button>
                    </control-group>
                </playground-grid>
            </section-container>
            <section-container label="Variants" description="Different visual styles for the tabs.">
                <showcases-grid label="Light variant" columns="1">
                    <mjo-tabs variant="light" color="primary">
                        <mjo-tab label="Home">
                            <div class="sample-content">
                                <p>Welcome to the home section with light variant styling.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="About">
                            <div class="sample-content">
                                <p>About us page content goes here.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Contact">
                            <div class="sample-content">
                                <p>Contact information and form.</p>
                            </div>
                        </mjo-tab>
                    </mjo-tabs>
                </showcases-grid>
                <showcases-grid label="Solid variant" columns="1">
                    <mjo-tabs variant="solid" color="secondary">
                        <mjo-tab label="Dashboard">
                            <div class="sample-content">
                                <p>Dashboard overview with solid styling.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Analytics">
                            <div class="sample-content">
                                <p>Analytics and reports section.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Settings">
                            <div class="sample-content">
                                <p>User settings and preferences.</p>
                            </div>
                        </mjo-tab>
                    </mjo-tabs>
                </showcases-grid>
                <showcases-grid label="Bordered variant" columns="1">
                    <mjo-tabs variant="bordered" color="success">
                        <mjo-tab label="Products">
                            <div class="sample-content">
                                <p>Our product catalog and listings.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Services">
                            <div class="sample-content">
                                <p>Available services and pricing.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Support">
                            <div class="sample-content">
                                <p>Help and support resources.</p>
                            </div>
                        </mjo-tab>
                    </mjo-tabs>
                </showcases-grid>
            </section-container>
            <section-container label="Color Themes">
                <showcases-grid columns="2">
                    <mjo-tabs variant="light" color="warning">
                        <mjo-tab label="Warnings">
                            <div class="sample-content">
                                <p>Important warnings and alerts.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Guidelines">
                            <div class="sample-content">
                                <p>Safety guidelines and best practices.</p>
                            </div>
                        </mjo-tab>
                    </mjo-tabs>
                    <mjo-tabs variant="light" color="error">
                        <mjo-tab label="Errors">
                            <div class="sample-content">
                                <p>Error handling and troubleshooting.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Debug">
                            <div class="sample-content">
                                <p>Debug information and logs.</p>
                            </div>
                        </mjo-tab>
                    </mjo-tabs>
                </showcases-grid>
            </section-container>
            <section-container label="Vertical Layout">
                <showcases-grid columns="2">
                    <mjo-tabs variant="light" color="info" vertical>
                        <mjo-tab label="Navigation">
                            <div class="sample-content">
                                <p>Vertical navigation example with light styling.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Content">
                            <div class="sample-content">
                                <p>Main content area in vertical layout.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Sidebar">
                            <div class="sample-content">
                                <p>Sidebar information and tools.</p>
                            </div>
                        </mjo-tab>
                    </mjo-tabs>
                    <mjo-tabs variant="solid" color="primary" vertical>
                        <mjo-tab label="Profile">
                            <div class="sample-content">
                                <p>User profile settings and information.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Security">
                            <div class="sample-content">
                                <p>Security and privacy options.</p>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Billing">
                            <div class="sample-content">
                                <p>Billing and subscription information.</p>
                            </div>
                        </mjo-tab>
                    </mjo-tabs>
                </showcases-grid>
            </section-container>

            <section-container label="Complex Content Example">
                <showcases-grid>
                    <mjo-tabs variant="bordered" color="default">
                        <mjo-tab label="Overview">
                            <div class="rich-content">
                                <h4>📊 Project Overview</h4>
                                <div class="stats-grid">
                                    <div class="stat-card">
                                        <div class="stat-value">1,234</div>
                                        <div class="stat-label">Total Users</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-value">98.5%</div>
                                        <div class="stat-label">Uptime</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-value">42</div>
                                        <div class="stat-label">Active Projects</div>
                                    </div>
                                </div>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Details">
                            <div class="rich-content">
                                <h4>📋 Detailed Information</h4>
                                <p>This tab demonstrates how complex content can be organized within tabs.</p>
                                <div class="info-grid">
                                    <div class="info-item"><strong>Created:</strong> January 2024</div>
                                    <div class="info-item"><strong>Last Updated:</strong> Today</div>
                                    <div class="info-item"><strong>Status:</strong> Active</div>
                                    <div class="info-item"><strong>Version:</strong> 1.2.3</div>
                                </div>
                            </div>
                        </mjo-tab>
                        <mjo-tab label="Actions">
                            <div class="rich-content">
                                <h4>⚡ Available Actions</h4>
                                <div class="actions-grid">
                                    <mjo-button color="primary">Export Data</mjo-button>
                                    <mjo-button color="secondary">Generate Report</mjo-button>
                                    <mjo-button>Backup Settings</mjo-button>
                                    <mjo-button color="warning">Reset Configuration</mjo-button>
                                </div>
                            </div>
                        </mjo-tab>
                    </mjo-tabs>
                </showcases-grid>
            </section-container>
        `;
    }

    private renderDynamicTabs() {
        const dynamicTabs = [];
        for (let i = 4; i <= this.dynamicTabCount; i++) {
            dynamicTabs.push(html`
                <mjo-tab label="Dynamic ${i - 3}">
                    <div class="tab-content">
                        <h4>🚀 Dynamic Tab ${i - 3}</h4>
                        <p>This tab was added dynamically at ${new Date().toLocaleTimeString()}.</p>
                        <div class="dynamic-features">
                            <div class="feature-item"><strong>Tab Number:</strong> ${i - 3}</div>
                            <div class="feature-item"><strong>Creation Time:</strong> ${new Date().toLocaleString()}</div>
                            <div class="feature-item"><strong>Type:</strong> Dynamic Content</div>
                        </div>
                    </div>
                </mjo-tab>
            `);
        }
        return dynamicTabs;
    }

    private setVariant(variant: "light" | "solid" | "bordered") {
        this.selectedVariant = variant;
    }

    private setColor(color: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info") {
        this.selectedColor = color;
    }

    private setVertical(vertical: boolean) {
        this.isVertical = vertical;
    }

    private switchToTab(index: number) {
        const tabs = this.shadowRoot?.querySelector("#playground-tabs") as any;
        if (tabs && tabs.setTab) {
            tabs.setTab(index);
        }
    }

    private addDynamicTab = () => {
        if (this.dynamicTabCount < 8) {
            this.dynamicTabCount++;
            // Switch to the new tab after a brief delay
            setTimeout(() => {
                this.switchToTab(this.dynamicTabCount + 2); // +2 because of the 3 original tabs
            }, 100);
        }
    };

    private removeDynamicTab = () => {
        if (this.dynamicTabCount > 3) {
            this.dynamicTabCount--;
            // Make sure we're not on a removed tab
            setTimeout(() => {
                this.switchToTab(0);
            }, 100);
        }
    };

    #handleTabChange = (event: CustomEvent) => {
        console.log(`Tab changed to index ${event.detail.index}:`, event.detail.tab.label);
    };

    #handleTabUpdate = (event: CustomEvent) => {
        console.log(`Tabs updated. Total tabs: ${event.detail.tabs.length}`);
    };

    static styles = [
        css`
            :host {
                display: block;
                padding: 30px;
                max-width: 1400px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                gap: 40px;
            }
            h1 {
                font-size: 2em;
                margin: 0;
                color: var(--mjo-foreground-color, #333);
            }

            /* Tab Content Styles */
            .tab-content {
                padding: 20px;
                color: var(--mjo-foreground-color, #333);
            }

            .sample-content {
                padding: 16px;
                color: var(--mjo-foreground-color, #333);
            }

            .tab-content h4,
            .sample-content p {
                margin: 0 0 12px 0;
            }

            .tab-content p {
                color: var(--mjo-foreground-color-low, #666);
                line-height: 1.6;
            }

            .demo-buttons {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                margin-top: 16px;
            }

            .code-block {
                background: var(--mjo-background-color-high, #f5f5f5);
                border: 1px solid var(--mjo-border-color, #ddd);
                border-radius: 4px;
                padding: 12px;
                font-family: "Courier New", Courier, monospace;
                font-size: 0.9rem;
                color: var(--mjo-foreground-color, #333);
                overflow-x: auto;
                margin: 12px 0;
            }

            .feature-list {
                list-style: none;
                padding: 0;
                margin: 12px 0;
            }

            .feature-list li {
                padding: 6px 0;
                font-size: 0.95rem;
                color: var(--mjo-foreground-color, #333);
            }

            .dynamic-features {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin: 16px 0;
                background: var(--mjo-background-color-high, #f5f5f5);
                border-radius: 8px;
                padding: 16px;
            }

            .feature-item {
                padding: 4px 0;
                border-bottom: 1px solid var(--mjo-border-color-low, #eee);
                font-size: 0.95rem;
                color: var(--mjo-foreground-color, #333);
            }

            .feature-item:last-child {
                border-bottom: none;
            }

            .feature-item strong {
                color: var(--mjo-foreground-color, #222);
                font-weight: 600;
                margin-right: 8px;
            }

            /* Rich Content */
            .rich-content {
                padding: 8px 0;
            }

            .rich-content h4 {
                margin: 0 0 20px 0;
                color: var(--mjo-foreground-color, #333);
                font-weight: 600;
                font-size: 1.3rem;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 16px;
                margin: 20px 0;
            }

            .stat-card {
                background: var(--mjo-background-color-high, #f5f5f5);
                border: 1px solid var(--mjo-border-color, #ddd);
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                transition: all 0.2s ease;
            }

            .stat-card:hover {
                border-color: var(--mjo-primary-color, #4e9be4);
                transform: translateY(-2px);
            }

            .stat-value {
                font-size: 2rem;
                font-weight: 700;
                color: var(--mjo-primary-color, #4e9be4);
                margin-bottom: 4px;
            }

            .stat-label {
                font-size: 0.9rem;
                color: var(--mjo-foreground-color-low, #666);
                font-weight: 500;
            }

            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 12px;
                margin: 20px 0;
            }

            .info-item {
                background: var(--mjo-background-color-high, #f5f5f5);
                border-left: 3px solid var(--mjo-secondary-color, #6c757d);
                padding: 12px 16px;
                border-radius: 0 6px 6px 0;
                font-size: 0.95rem;
                color: var(--mjo-foreground-color, #333);
            }

            .info-item strong {
                color: var(--mjo-foreground-color, #222);
                font-weight: 600;
            }

            .actions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 12px;
                margin: 20px 0;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
                }
                .stats-grid {
                    grid-template-columns: 1fr;
                }

                .info-grid {
                    grid-template-columns: 1fr;
                }

                .actions-grid {
                    grid-template-columns: 1fr;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "tabs-component": TabsComponent;
    }
}
