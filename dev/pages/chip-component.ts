import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

// Import components
import "../../src/mjo-button.js";
import "../../src/mjo-chip.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-switch.js";
import "../../src/mjo-textfield.js";

// Import dev components
import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("chip-component")
export class ChipComponent extends LitElement {
    @state() private selectedColor: "primary" | "secondary" | "default" | "success" | "warning" | "info" | "error" = "primary";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private selectedVariant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot" = "solid";
    @state() private selectedRadius: "small" | "medium" | "large" | "full" | "none" = "full";
    @state() private isClosable = false;
    @state() private isClickable = false;
    @state() private isDisabled = false;
    @state() private customLabel = "Example Chip";
    @state() private startIcon = "";
    @state() private endIcon = "";
    @state() private customValue = "";
    @state() private customAriaDescribedby = "";

    // Event logs
    @state() private eventLogs: string[] = [];

    render() {
        return html`
            <h1>MJO Chip Component</h1>

            <section-container slot="demo" label="Interactive Demo" description="Test different chip configurations">
                <playground-grid>
                    <!-- Demo Section -->
                    <mjo-chip
                        slot="demo"
                        color=${this.selectedColor}
                        size=${this.selectedSize}
                        variant=${this.selectedVariant}
                        radius=${this.selectedRadius}
                        label=${this.customLabel}
                        ?closable=${this.isClosable}
                        ?clickable=${this.isClickable}
                        ?disabled=${this.isDisabled}
                        start-icon=${this.startIcon}
                        end-icon=${this.endIcon}
                        value=${this.customValue}
                        aria-describedby=${this.customAriaDescribedby}
                        @chip-click=${this.#logEvent}
                        @chip-close=${this.#logEvent}
                    ></mjo-chip>

                    <!-- Controls Section -->
                    <control-group slot="controls" label="Color" columns="3">
                        ${(["default", "primary", "secondary", "success", "warning", "info", "error"] as const).map(
                            (color) =>
                                html`<mjo-button variant=${color === this.selectedColor ? "default" : "ghost"} size="small" @click=${() => this.setColor(color)}
                                    >${color}</mjo-button
                                >`,
                        )}
                    </control-group>
                    <control-group slot="controls" label="Size" columns="3">
                        ${(["small", "medium", "large"] as const).map(
                            (size) =>
                                html`<mjo-button variant=${size === this.selectedSize ? "default" : "ghost"} size="small" @click=${() => this.setSize(size)}
                                    >${size}</mjo-button
                                >`,
                        )}
                    </control-group>
                    <control-group slot="controls" label="Variant" columns="4">
                        ${(["solid", "bordered", "light", "flat", "faded", "shadow", "dot"] as const).map(
                            (variant) =>
                                html`<mjo-button
                                    variant=${variant === this.selectedVariant ? "default" : "ghost"}
                                    size="small"
                                    @click=${() => this.setVariant(variant)}
                                    >${variant}</mjo-button
                                >`,
                        )}
                    </control-group>
                    <control-group slot="controls" label="Radius" columns="3">
                        ${(["small", "medium", "large", "full", "none"] as const).map(
                            (radius) =>
                                html`<mjo-button
                                    variant=${radius === this.selectedRadius ? "default" : "ghost"}
                                    size="small"
                                    @click=${() => this.setRadius(radius)}
                                    >${radius}</mjo-button
                                >`,
                        )}
                    </control-group>
                    <control-group slot="controls" label="States" columns="3">
                        <mjo-switch label="Closable" size="small" ?checked=${this.isClosable} @change=${this.toggleClosable}></mjo-switch>
                        <mjo-switch label="Clickable" size="small" ?checked=${this.isClickable} @change=${this.toggleClickable}></mjo-switch>
                        <mjo-switch label="Disabled" size="small" ?checked=${this.isDisabled} @change=${this.toggleDisabled}></mjo-switch>
                    </control-group>
                    <control-group slot="controls" label="Text & Icons" columns="1">
                        <mjo-textfield label="Label" .value=${this.customLabel} @input=${this.#handleLabelChange}></mjo-textfield>
                        <mjo-textfield
                            label="Start Icon"
                            .value=${this.startIcon}
                            placeholder="e.g., user, star, heart"
                            @input=${this.#handleStartIconChange}
                        ></mjo-textfield>
                        <mjo-textfield
                            label="End Icon"
                            .value=${this.endIcon}
                            placeholder="e.g., arrow-right, check"
                            @input=${this.#handleEndIconChange}
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Value"
                            .value=${this.customValue}
                            placeholder="Optional chip value"
                            @input=${this.#handleValueChange}
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Aria Described By"
                            .value=${this.customAriaDescribedby}
                            placeholder="ID of describing element"
                            @input=${this.#handleAriaDescribedbyChange}
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Quick Actions" columns="2">
                        <mjo-button @click=${this.resetChip}>Reset to Default</mjo-button>
                        <mjo-button @click=${this.clearEventLog} variant="dashed">Clear Event Log</mjo-button>
                    </control-group>
                </playground-grid>
            </section-container>

            <!-- Event Demo Section -->
            <section-container label="Event Demonstration" description="Monitor chip events in real-time">
                <div class="event-demo">
                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div class="log-output">
                            ${this.eventLogs.length > 0 ? this.eventLogs.join("\n") : "No events yet. Try interacting with the chip above."}
                        </div>
                    </div>
                </div>
            </section-container>

            <!-- Color Variants Showcase -->
            <section-container label="Color Variants" description="All available color options">
                <showcases-grid columns="4">
                    ${(["primary", "secondary", "default", "success", "warning", "info", "error"] as const).map(
                        (color) => html`<mjo-chip color=${color} label=${color}></mjo-chip>`,
                    )}
                </showcases-grid>
            </section-container>

            <!-- Size Variants Showcase -->
            <section-container label="Size Variants" description="Available size options">
                <showcases-grid columns="3">
                    ${(["small", "medium", "large"] as const).map((size) => html`<mjo-chip size=${size} label="${size} chip"></mjo-chip>`)}
                </showcases-grid>
            </section-container>

            <!-- Variant Styles Showcase -->
            <section-container label="Style Variants" description="Different visual styles">
                <showcases-grid columns="4">
                    ${(["solid", "bordered", "light", "flat", "faded", "shadow", "dot"] as const).map(
                        (variant) => html`<mjo-chip variant=${variant} label=${variant}></mjo-chip>`,
                    )}
                </showcases-grid>
            </section-container>

            <!-- Features Showcase -->
            <section-container label="Feature Examples" description="Various chip configurations">
                <showcases-grid columns="2">
                    <mjo-chip label="Clickable" clickable @chip-click=${this.#logEvent}></mjo-chip>
                    <mjo-chip label="Closable" closable @chip-close=${this.#logEvent}></mjo-chip>
                    <mjo-chip label="With Start Icon" start-icon="user"></mjo-chip>
                    <mjo-chip label="With End Icon" end-icon="arrow-right"></mjo-chip>
                    <mjo-chip label="Both Icons" start-icon="star" end-icon="check"></mjo-chip>
                    <mjo-chip label="Disabled" disabled></mjo-chip>
                    <mjo-chip label="Round Small" size="small" radius="full"></mjo-chip>
                    <mjo-chip label="Square Large" size="large" radius="none"></mjo-chip>
                </showcases-grid>
            </section-container>
        `;
    }

    private setColor(color: "primary" | "secondary" | "default" | "success" | "warning" | "info" | "error") {
        this.selectedColor = color;
    }

    private setSize(size: "small" | "medium" | "large") {
        this.selectedSize = size;
    }

    private setVariant(variant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot") {
        this.selectedVariant = variant;
    }

    private setRadius(radius: "small" | "medium" | "large" | "full" | "none") {
        this.selectedRadius = radius;
    }

    private toggleClosable() {
        this.isClosable = !this.isClosable;
    }

    private toggleClickable() {
        this.isClickable = !this.isClickable;
    }

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    private resetChip() {
        this.selectedColor = "primary";
        this.selectedSize = "medium";
        this.selectedVariant = "solid";
        this.selectedRadius = "full";
        this.isClosable = false;
        this.isClickable = false;
        this.isDisabled = false;
        this.customLabel = "Example Chip";
        this.startIcon = "";
        this.endIcon = "";
        this.customValue = "";
        this.customAriaDescribedby = "";
    }

    private clearEventLog() {
        this.eventLogs = [];
    }

    #handleLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customLabel = target.value;
    };

    #handleStartIconChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.startIcon = target.value;
    };

    #handleEndIconChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.endIcon = target.value;
    };

    #handleValueChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customValue = target.value;
    };

    #handleAriaDescribedbyChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customAriaDescribedby = target.value;
    };

    #logEvent = (event: CustomEvent) => {
        const timestamp = new Date().toLocaleTimeString();
        const eventType = event.type;
        const eventDetail = JSON.stringify(event.detail, null, 2);

        const logEntry = `[${timestamp}] ${eventType}: ${eventDetail}`;
        this.eventLogs = [logEntry, ...this.eventLogs.slice(0, 9)]; // Keep last 10 events
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

            .event-demo {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .event-log h5 {
                margin: 0 0 8px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1em;
            }

            .log-output {
                background: var(--mjo-background-color-high, #f5f5f5);
                border: 1px solid var(--mjo-border-color, #ddd);
                border-radius: 4px;
                padding: 12px;
                font-family: "Courier New", Courier, monospace;
                font-size: 0.85rem;
                color: var(--mjo-foreground-color, #333);
                white-space: pre-wrap;
                max-height: 200px;
                overflow-y: auto;
                min-height: 50px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
                }

                .event-demo {
                    gap: 16px;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "chip-component": ChipComponent;
    }
}
