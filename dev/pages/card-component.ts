import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-avatar.js";
import "../../src/mjo-button.js";
import "../../src/mjo-card.js";
import "../../src/mjo-grid.js";

@customElement("card-component")
export class CardComponent extends LitElement {
    @state() private selectedContrast: "low" | "normal" | "high" = "normal";
    @state() private selectedRadius: "none" | "small" | "medium" | "large" = "medium";
    @state() private selectedVariant: "default" | "modern" | "skew" = "default";

    render() {
        return html`
            <div class="demo-container">
                <h2>Card Component Examples</h2>

                <div class="section">
                    <h3>Interactive Card Playground</h3>
                    <div class="playground-grid">
                        <div class="demo-card">
                            <mjo-card contrast=${this.selectedContrast} radius=${this.selectedRadius} variant=${this.selectedVariant}>
                                <div class="card-content">
                                    <h4>Interactive Demo Card</h4>
                                    <p>
                                        Current settings: <strong>${this.selectedContrast}</strong> contrast, <strong>${this.selectedRadius}</strong> radius,
                                        <strong>${this.selectedVariant}</strong> variant
                                    </p>
                                    <p>Use the controls below to customize this card's appearance.</p>
                                </div>
                            </mjo-card>
                        </div>

                        <div class="controls">
                            <div class="control-group">
                                <h4>Contrast</h4>
                                <div class="button-group">
                                    <mjo-button
                                        size="small"
                                        variant=${this.selectedContrast === "low" ? "default" : "ghost"}
                                        @click=${() => this.setContrast("low")}
                                    >
                                        Low
                                    </mjo-button>
                                    <mjo-button
                                        size="small"
                                        variant=${this.selectedContrast === "normal" ? "default" : "ghost"}
                                        @click=${() => this.setContrast("normal")}
                                    >
                                        Normal
                                    </mjo-button>
                                    <mjo-button
                                        size="small"
                                        variant=${this.selectedContrast === "high" ? "default" : "ghost"}
                                        @click=${() => this.setContrast("high")}
                                    >
                                        High
                                    </mjo-button>
                                </div>
                            </div>

                            <div class="control-group">
                                <h4>Radius</h4>
                                <div class="button-group">
                                    <mjo-button
                                        size="small"
                                        variant=${this.selectedRadius === "none" ? "default" : "ghost"}
                                        @click=${() => this.setRadius("none")}
                                    >
                                        None
                                    </mjo-button>
                                    <mjo-button
                                        size="small"
                                        variant=${this.selectedRadius === "small" ? "default" : "ghost"}
                                        @click=${() => this.setRadius("small")}
                                    >
                                        Small
                                    </mjo-button>
                                    <mjo-button
                                        size="small"
                                        variant=${this.selectedRadius === "medium" ? "default" : "ghost"}
                                        @click=${() => this.setRadius("medium")}
                                    >
                                        Medium
                                    </mjo-button>
                                    <mjo-button
                                        size="small"
                                        variant=${this.selectedRadius === "large" ? "default" : "ghost"}
                                        @click=${() => this.setRadius("large")}
                                    >
                                        Large
                                    </mjo-button>
                                </div>
                            </div>

                            <div class="control-group">
                                <h4>Variant</h4>
                                <div class="button-group">
                                    <mjo-button
                                        size="small"
                                        variant=${this.selectedVariant === "default" ? "default" : "ghost"}
                                        @click=${() => this.setVariant("default")}
                                    >
                                        Default
                                    </mjo-button>
                                    <mjo-button
                                        size="small"
                                        variant=${this.selectedVariant === "modern" ? "default" : "ghost"}
                                        @click=${() => this.setVariant("modern")}
                                    >
                                        Modern
                                    </mjo-button>
                                    <mjo-button
                                        size="small"
                                        variant=${this.selectedVariant === "skew" ? "default" : "ghost"}
                                        @click=${() => this.setVariant("skew")}
                                    >
                                        Skew
                                    </mjo-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h3>Contrast Levels</h3>
                    <mjo-grid columns="3" gap="20px">
                        <mjo-card contrast="low" radius="medium">
                            <div class="card-content">
                                <h4>Low Contrast</h4>
                                <p>Subtle background that blends with the page for minimal visual impact.</p>
                            </div>
                        </mjo-card>

                        <mjo-card contrast="normal" radius="medium">
                            <div class="card-content">
                                <h4>Normal Contrast</h4>
                                <p>Balanced appearance that works well in most situations.</p>
                            </div>
                        </mjo-card>

                        <mjo-card contrast="high" radius="medium">
                            <div class="card-content">
                                <h4>High Contrast</h4>
                                <p>Prominent background that makes the card stand out clearly.</p>
                            </div>
                        </mjo-card>
                    </mjo-grid>
                </div>

                <div class="section">
                    <h3>Border Radius Variations</h3>
                    <mjo-grid columns="4" gap="20px">
                        <mjo-card radius="none" contrast="normal">
                            <div class="card-content">
                                <h4>No Radius</h4>
                                <p>Sharp, rectangular corners.</p>
                            </div>
                        </mjo-card>

                        <mjo-card radius="small" contrast="normal">
                            <div class="card-content">
                                <h4>Small Radius</h4>
                                <p>Slightly rounded corners.</p>
                            </div>
                        </mjo-card>

                        <mjo-card radius="medium" contrast="normal">
                            <div class="card-content">
                                <h4>Medium Radius</h4>
                                <p>Moderately rounded corners.</p>
                            </div>
                        </mjo-card>

                        <mjo-card radius="large" contrast="normal">
                            <div class="card-content">
                                <h4>Large Radius</h4>
                                <p>Prominently rounded corners.</p>
                            </div>
                        </mjo-card>
                    </mjo-grid>
                </div>

                <div class="section">
                    <h3>Variant Styles</h3>
                    <mjo-grid columns="3" gap="20px">
                        <mjo-card variant="default" radius="medium" contrast="normal">
                            <div class="card-content">
                                <h4>Default Variant</h4>
                                <p>Traditional rectangular card with standard styling. Perfect for most use cases.</p>
                            </div>
                        </mjo-card>

                        <mjo-card variant="modern" radius="medium" contrast="normal">
                            <div class="card-content">
                                <h4>Modern Variant</h4>
                                <p>Contemporary design with cut corners using clip-path. Great for sophisticated layouts.</p>
                            </div>
                        </mjo-card>

                        <mjo-card variant="skew" radius="medium" contrast="normal">
                            <div class="card-content">
                                <h4>Skew Variant</h4>
                                <p>Dynamic slanted parallelogram shape. Ideal for energetic and modern designs.</p>
                            </div>
                        </mjo-card>
                    </mjo-grid>
                </div>

                <div class="section">
                    <h3>Content Examples</h3>
                    <mjo-grid columns="2" gap="20px">
                        <!-- Profile Card -->
                        <mjo-card contrast="high" radius="large" variant="default">
                            <div class="profile-card">
                                <mjo-avatar name="Sarah Connor" size="large" nameColoured></mjo-avatar>
                                <div class="profile-info">
                                    <h4>Sarah Connor</h4>
                                    <p class="role">UX Designer</p>
                                    <p class="description">Passionate about creating intuitive user experiences.</p>
                                </div>
                                <mjo-button size="small" variant="ghost">Connect</mjo-button>
                            </div>
                        </mjo-card>

                        <!-- Feature Card -->
                        <mjo-card contrast="normal" radius="medium" variant="modern">
                            <div class="feature-card">
                                <div class="icon">🚀</div>
                                <h4>Fast Performance</h4>
                                <p>Lightning-fast loading times and optimized performance for the best user experience.</p>
                                <mjo-button size="small">Learn More</mjo-button>
                            </div>
                        </mjo-card>

                        <!-- Stats Card -->
                        <mjo-card contrast="low" radius="small" variant="skew">
                            <div class="stats-card">
                                <h4>Monthly Stats</h4>
                                <div class="stats-grid">
                                    <div class="stat">
                                        <div class="stat-value">1,234</div>
                                        <div class="stat-label">Users</div>
                                    </div>
                                    <div class="stat">
                                        <div class="stat-value">5,678</div>
                                        <div class="stat-label">Views</div>
                                    </div>
                                    <div class="stat">
                                        <div class="stat-value">90%</div>
                                        <div class="stat-label">Satisfaction</div>
                                    </div>
                                </div>
                            </div>
                        </mjo-card>

                        <!-- Action Card -->
                        <mjo-card contrast="high" radius="medium" variant="default">
                            <div class="action-card">
                                <h4>Newsletter Subscription</h4>
                                <p>Get the latest updates and news directly in your inbox.</p>
                                <div class="action-buttons">
                                    <mjo-button size="small" variant="ghost">Maybe Later</mjo-button>
                                    <mjo-button size="small">Subscribe</mjo-button>
                                </div>
                            </div>
                        </mjo-card>
                    </mjo-grid>
                </div>

                <div class="section">
                    <h3>All Combinations</h3>
                    <div class="combination-grid">${this.renderAllCombinations()}</div>
                </div>
            </div>
        `;
    }

    private setContrast(contrast: "low" | "normal" | "high") {
        this.selectedContrast = contrast;
    }

    private setRadius(radius: "none" | "small" | "medium" | "large") {
        this.selectedRadius = radius;
    }

    private setVariant(variant: "default" | "modern" | "skew") {
        this.selectedVariant = variant;
    }

    private renderAllCombinations() {
        const contrasts: Array<"low" | "normal" | "high"> = ["low", "normal", "high"];
        const variants: Array<"default" | "modern" | "skew"> = ["default", "modern", "skew"];

        return contrasts.map((contrast) =>
            variants.map(
                (variant) => html`
                    <mjo-card contrast=${contrast} radius="medium" variant=${variant}>
                        <div class="combination-card">
                            <h5>${contrast} + ${variant}</h5>
                            <p>Example combination</p>
                        </div>
                    </mjo-card>
                `,
            ),
        );
    }

    static styles = [
        css`
            :host {
                display: block;
                padding: 30px;
                max-width: 1400px;
                margin: 0 auto;
            }

            .demo-container {
                display: flex;
                flex-direction: column;
                gap: 40px;
            }

            .section {
                display: flex;
                flex-direction: column;
                gap: 20px;
                padding: 20px;
                border: 1px solid var(--mjo-border-color, #e0e0e0);
                border-radius: 8px;
                background-color: var(--mjo-background-color-card, #ffffff);
            }

            h2 {
                text-align: center;
                color: var(--mjo-foreground-color-low, #333);
                margin: 0;
            }

            h3 {
                margin: 0;
                color: var(--mjo-foreground-color-low, #333);
                font-size: 1.2em;
                border-bottom: 2px solid var(--mjo-primary-color, #4e9be4);
                padding-bottom: 8px;
            }

            h4,
            h5 {
                margin: 0;
                color: var(--mjo-foreground-color, #222);
            }

            .card-content {
                padding: 10px;
            }

            .card-content h4 {
                margin-bottom: 8px;
            }

            .card-content p {
                margin: 0;
                color: var(--mjo-foreground-color-medium, #666);
                line-height: 1.5;
            }

            .playground-grid {
                display: grid;
                grid-template-columns: 1fr 300px;
                gap: 30px;
                align-items: start;
            }

            @media (max-width: 768px) {
                .playground-grid {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
            }

            .demo-card {
                min-height: 200px;
            }

            .controls {
                display: flex;
                flex-direction: column;
                gap: 20px;
                padding: 20px;
                border: 2px solid var(--mjo-primary-color, #4e9be4);
                border-radius: 8px;
                background-color: var(--mjo-background-color-card, #ffffff);
            }

            .control-group h4 {
                margin-bottom: 8px;
                font-size: 0.9em;
                color: var(--mjo-foreground-color-low, #333);
            }

            .button-group {
                display: flex;
                gap: 4px;
                flex-wrap: wrap;
            }

            .button-group mjo-button {
                flex: 1;
                min-width: 60px;
            }

            /* Profile Card Styles */
            .profile-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                text-align: center;
                padding: 10px;
            }

            .profile-info h4 {
                margin-bottom: 4px;
            }

            .profile-info .role {
                color: var(--mjo-primary-color, #4e9be4);
                font-weight: 600;
                margin-bottom: 8px;
                font-size: 0.9em;
            }

            .profile-info .description {
                font-size: 0.9em;
                margin-bottom: 12px;
            }

            /* Feature Card Styles */
            .feature-card {
                text-align: center;
                padding: 10px;
            }

            .feature-card .icon {
                font-size: 2.5rem;
                margin-bottom: 16px;
            }

            .feature-card h4 {
                margin-bottom: 12px;
            }

            .feature-card p {
                margin-bottom: 20px;
            }

            /* Stats Card Styles */
            .stats-card {
                padding: 10px;
            }

            .stats-card h4 {
                margin-bottom: 16px;
                text-align: center;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
                text-align: center;
            }

            .stat-value {
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--mjo-primary-color, #4e9be4);
                margin-bottom: 4px;
            }

            .stat-label {
                font-size: 0.8rem;
                color: var(--mjo-foreground-color-medium, #666);
            }

            /* Action Card Styles */
            .action-card {
                padding: 10px;
            }

            .action-card h4 {
                margin-bottom: 8px;
            }

            .action-card p {
                margin-bottom: 20px;
            }

            .action-buttons {
                display: flex;
                gap: 8px;
                justify-content: flex-end;
            }

            /* Combination Grid */
            .combination-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
            }

            .combination-card {
                padding: 12px;
                text-align: center;
            }

            .combination-card h5 {
                margin-bottom: 8px;
                font-size: 0.9em;
                text-transform: capitalize;
            }

            .combination-card p {
                margin: 0;
                font-size: 0.8em;
                color: var(--mjo-foreground-color-medium, #666);
            }

            @media (max-width: 1024px) {
                .combination-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (max-width: 600px) {
                .combination-grid {
                    grid-template-columns: 1fr;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "card-component": CardComponent;
    }
}
