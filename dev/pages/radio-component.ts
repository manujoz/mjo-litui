import { MjoRadioChangeEvent } from "../../src/types/mjo-radio.js";

import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-button.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-radio-group.js";
import "../../src/mjo-radio.js";
import "../../src/mjo-textfield.js";

import "../components/control-group.js";
import "../components/examples/radio/custom-radio.js";
import "../components/examples/radio/user-radio.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("radio-component")
export class RadioComponent extends LitElement {
    @state() private selectedColor: "primary" | "secondary" = "primary";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private isDisabled = false;
    @state() private hasLabel = true;
    @state() private hasError = false;
    @state() private isChecked = false;
    @state() private radioValue = "option1";
    @state() private customLabel = "Radio Option";
    @state() private customHelperText = "";
    @state() private customAriaLabel = "";
    @state() private radioName = "demo-radio";

    render() {
        return html`
            <h1>Radio Component Examples</h1>

            <section-container label="Interactive Radio Playground">
                <playground-grid>
                    <mjo-radio
                        slot="demo"
                        id="playground-radio"
                        .name=${this.radioName}
                        .value=${this.radioValue}
                        .color=${this.selectedColor}
                        .size=${this.selectedSize}
                        .label=${this.hasLabel ? this.customLabel : undefined}
                        .helperText=${this.customHelperText || undefined}
                        .aria-label=${this.customAriaLabel || undefined}
                        ?checked=${this.isChecked}
                        ?disabled=${this.isDisabled}
                        ?error=${this.hasError}
                        @mjo-radio:change=${this.#handleRadioChange}
                        @mjo-radio:focus=${this.#handleRadioFocus}
                        @mjo-radio:blur=${this.#handleRadioBlur}
                    ></mjo-radio>

                    <control-group slot="controls" label="Color" columns="2">
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
                    </control-group>

                    <control-group slot="controls" label="Size" columns="3">
                        <mjo-button size="small" variant=${this.selectedSize === "small" ? "default" : "ghost"} @click=${() => this.setSize("small")}>
                            Small
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedSize === "medium" ? "default" : "ghost"} @click=${() => this.setSize("medium")}>
                            Medium
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedSize === "large" ? "default" : "ghost"} @click=${() => this.setSize("large")}>
                            Large
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="States" columns="3">
                        <mjo-button size="small" variant=${this.isChecked ? "default" : "ghost"} @click=${() => this.toggleChecked()}> Checked </mjo-button>
                        <mjo-button size="small" variant=${this.isDisabled ? "default" : "ghost"} @click=${() => this.toggleDisabled()}> Disabled </mjo-button>
                        <mjo-button size="small" variant=${this.hasError ? "default" : "ghost"} @click=${() => this.toggleError()}> Error </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Display Options" columns="1">
                        <mjo-button size="small" variant=${this.hasLabel ? "default" : "ghost"} @click=${() => this.toggleLabel()}> Show Label </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Radio Settings" columns="1">
                        <mjo-textfield
                            label="Radio Name"
                            .value=${this.radioName}
                            @input=${this.#handleNameChange}
                            size="small"
                            placeholder="Group name for radio buttons"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Radio Value"
                            .value=${this.radioValue}
                            @input=${this.#handleValueChange}
                            size="small"
                            placeholder="Value when selected"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Content & Accessibility" columns="1">
                        <mjo-textfield label="Custom Label" .value=${this.customLabel} @input=${this.#handleLabelChange} size="small"></mjo-textfield>
                        <mjo-textfield
                            label="Helper Text"
                            .value=${this.customHelperText}
                            @input=${this.#handleHelperTextChange}
                            size="small"
                            placeholder="Additional information"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Aria Label"
                            .value=${this.customAriaLabel}
                            @input=${this.#handleAriaLabelChange}
                            size="small"
                            placeholder="Custom accessibility label"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Actions" columns="1">
                        <mjo-button size="small" color="success" @click=${this.resetRadio}> Reset Settings </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.toggleSelection}> Toggle Selection </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="value-display">
                    <h4>Current State:</h4>
                    <div class="values">
                        <span><strong>Checked:</strong> ${this.isChecked}</span>
                        <span><strong>Value:</strong> ${this.radioValue}</span>
                        <span><strong>Name:</strong> ${this.radioName}</span>
                        <span><strong>Color:</strong> ${this.selectedColor}</span>
                        <span><strong>Size:</strong> ${this.selectedSize}</span>
                    </div>
                </div>
            </section-container>

            <section-container label="Basic Usage Examples" description="Simple radio button implementations for common use cases.">
                <showcases-grid columns="2">
                    <mjo-radio name="basic-radio" value="yes" label="Yes" color="primary" size="medium"></mjo-radio>

                    <mjo-radio name="basic-radio" value="no" label="No" color="primary" size="medium"></mjo-radio>
                </showcases-grid>
            </section-container>

            <section-container label="Radio Groups" description="Multiple radio buttons grouped together for single selection.">
                <showcases-grid columns="1">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Choose your plan:</h4>
                        <mjo-radio-group>
                            <mjo-radio
                                name="plan"
                                value="basic"
                                label="Basic Plan - $9.99/month"
                                helperText="Perfect for individuals"
                                color="primary"
                                size="medium"
                                checked
                                @mjo-radio:change=${this.#handlePlanChange}
                            ></mjo-radio>
                            <mjo-radio
                                name="plan"
                                value="premium"
                                label="Premium Plan - $19.99/month"
                                helperText="Great for small teams"
                                color="primary"
                                size="medium"
                                @mjo-radio:change=${this.#handlePlanChange}
                            ></mjo-radio>
                            <mjo-radio
                                name="plan"
                                value="enterprise"
                                label="Enterprise Plan - $49.99/month"
                                helperText="For large organizations"
                                color="primary"
                                size="medium"
                                @mjo-radio:change=${this.#handlePlanChange}
                            ></mjo-radio>
                        </mjo-radio-group>
                    </div>
                </showcases-grid>

                <showcases-grid columns="1">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Payment method:</h4>
                        <mjo-radio name="payment" value="credit" label="Credit Card" color="secondary" size="medium" checked></mjo-radio>
                        <mjo-radio name="payment" value="paypal" label="PayPal" color="secondary" size="medium"></mjo-radio>
                        <mjo-radio name="payment" value="bank" label="Bank Transfer" color="secondary" size="medium"></mjo-radio>
                    </div>
                </showcases-grid>
            </section-container>

            <section-container label="Different Sizes">
                <showcases-grid columns="3">
                    <mjo-radio name="size-demo" value="small" label="Small Radio" size="small" color="primary"></mjo-radio>

                    <mjo-radio name="size-demo" value="medium" label="Medium Radio" size="medium" color="primary" checked></mjo-radio>

                    <mjo-radio name="size-demo" value="large" label="Large Radio" size="large" color="primary"></mjo-radio>
                </showcases-grid>
            </section-container>

            <section-container label="Color Variants">
                <showcases-grid columns="2">
                    <mjo-radio name="color-demo1" value="primary" label="Primary Color" color="primary" size="medium" checked></mjo-radio>

                    <mjo-radio name="color-demo2" value="secondary" label="Secondary Color" color="secondary" size="medium" checked></mjo-radio>
                </showcases-grid>
            </section-container>

            <section-container label="States & Options" description="Various radio button states and configuration options.">
                <showcases-grid columns="2">
                    <mjo-radio name="states1" value="disabled" label="Disabled Radio" color="primary" size="medium" disabled></mjo-radio>

                    <mjo-radio
                        name="states2"
                        value="error"
                        label="Error State"
                        color="primary"
                        size="medium"
                        error
                        helperText="This field has an error"
                    ></mjo-radio>
                </showcases-grid>

                <showcases-grid columns="2">
                    <mjo-radio
                        name="states3"
                        value="helper"
                        label="With Helper Text"
                        helperText="Additional information about this option"
                        color="primary"
                        size="medium"
                    ></mjo-radio>

                    <mjo-radio name="states4" value="aria" color="primary" size="medium" aria-label="Radio button without visible label"></mjo-radio>
                </showcases-grid>
            </section-container>

            <section-container label="Form Integration Example">
                <mjo-form>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Newsletter frequency:</h4>
                            <mjo-radio
                                name="newsletter"
                                value="daily"
                                label="Daily updates"
                                helperText="Receive updates every day"
                                color="primary"
                                size="medium"
                            ></mjo-radio>
                            <mjo-radio
                                name="newsletter"
                                value="weekly"
                                label="Weekly digest"
                                helperText="Receive updates once a week"
                                color="primary"
                                size="medium"
                                checked
                            ></mjo-radio>
                            <mjo-radio
                                name="newsletter"
                                value="monthly"
                                label="Monthly summary"
                                helperText="Receive updates once a month"
                                color="primary"
                                size="medium"
                            ></mjo-radio>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Account type:</h4>
                            <mjo-radio name="account" value="personal" label="Personal Account" color="secondary" size="medium" checked></mjo-radio>
                            <mjo-radio name="account" value="business" label="Business Account" color="secondary" size="medium"></mjo-radio>
                        </div>
                    </div>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Submit Form</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset Form</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Event tracking radios:</h4>
                        <mjo-radio
                            name="events"
                            value="option1"
                            label="Option 1"
                            color="primary"
                            size="medium"
                            @mjo-radio:change=${this.#logEvent}
                            @mjo-radio:focus=${this.#logEvent}
                            @mjo-radio:blur=${this.#logEvent}
                        ></mjo-radio>
                        <mjo-radio
                            name="events"
                            value="option2"
                            label="Option 2"
                            color="primary"
                            size="medium"
                            @mjo-radio:change=${this.#logEvent}
                            @mjo-radio:focus=${this.#logEvent}
                            @mjo-radio:blur=${this.#logEvent}
                        ></mjo-radio>
                        <mjo-radio
                            name="events"
                            value="option3"
                            label="Option 3"
                            color="primary"
                            size="medium"
                            @mjo-radio:change=${this.#logEvent}
                            @mjo-radio:focus=${this.#logEvent}
                            @mjo-radio:blur=${this.#logEvent}
                        ></mjo-radio>
                    </div>

                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div id="event-output" class="log-output">Events will appear here...</div>
                    </div>
                </div>
            </section-container>

            <section-container label="Custom Radio Component Example">
                <showcases-grid columns="2">
                    <div>
                        <p style="margin: 0; padding: 0 0 5px; color: var(--mjo-foreground-color-low, #333);">Select size:</p>
                        <mjo-radio-group class="radio-group-size">
                            <custom-radio label="XS" value="xs" name="size"></custom-radio>
                            <custom-radio label="S" value="s" name="size"></custom-radio>
                            <custom-radio label="M" value="m" name="size" checked></custom-radio>
                            <custom-radio label="L" value="l" name="size"></custom-radio>
                            <custom-radio label="XL" value="xl" name="size"></custom-radio>
                        </mjo-radio-group>
                    </div>
                    <div>
                        <mjo-radio-group class="radio-group-users">
                            <user-radio
                                name="user"
                                userName="Manu Overa"
                                userRole="Software Engineer"
                                src="https://i.pravatar.cc/150?img=3"
                                checked
                                value="id1"
                            ></user-radio>
                            <user-radio
                                name="user"
                                userName="Ramon Ramirez"
                                userRole="Product Manager"
                                src="https://i.pravatar.cc/150?img=6"
                                value="id2"
                            ></user-radio>
                            <user-radio
                                name="user"
                                userName="Lorena Fernandez"
                                userRole="UX Designer"
                                src="https://i.pravatar.cc/150?img=7"
                                value="id3"
                            ></user-radio>
                        </mjo-radio-group>
                    </div>
                </showcases-grid>
            </section-container>
        `;
    }

    private setColor(color: "primary" | "secondary") {
        this.selectedColor = color;
    }

    private setSize(size: "small" | "medium" | "large") {
        this.selectedSize = size;
    }

    private toggleChecked() {
        this.isChecked = !this.isChecked;
    }

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    private toggleLabel() {
        this.hasLabel = !this.hasLabel;
    }

    private toggleError() {
        this.hasError = !this.hasError;
    }

    private resetRadio() {
        this.selectedColor = "primary";
        this.selectedSize = "medium";
        this.isDisabled = false;
        this.hasLabel = true;
        this.hasError = false;
        this.isChecked = false;
        this.radioValue = "option1";
        this.customLabel = "Radio Option";
        this.customHelperText = "";
        this.customAriaLabel = "";
        this.radioName = "demo-radio";
    }

    private toggleSelection() {
        this.isChecked = !this.isChecked;
    }

    #handleRadioChange = (event: CustomEvent) => {
        const { checked } = event.detail;
        this.isChecked = checked;
        console.log("Radio change:", event.detail);
    };

    #handleRadioFocus = (event: CustomEvent) => {
        console.log("Radio focus:", event.detail);
    };

    #handleRadioBlur = (event: CustomEvent) => {
        console.log("Radio blur:", event.detail);
    };

    #handlePlanChange = (event: MjoRadioChangeEvent) => {
        if (event.detail.element.checked) {
            console.log("Plan selected:", event.detail.value);
        }
    };

    #handleNameChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.radioName = target.value;
    };

    #handleValueChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.radioValue = target.value;
    };

    #handleLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customLabel = target.value;
    };

    #handleHelperTextChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customHelperText = target.value;
    };

    #handleAriaLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customAriaLabel = target.value;
    };

    #logEvent = (event: CustomEvent) => {
        const output = this.shadowRoot?.querySelector("#event-output");
        if (output) {
            const time = new Date().toLocaleTimeString();
            console.log(event.detail);

            // Create a safe copy of event.detail without circular references
            const safeDetail = {
                checked: event.detail.checked,
                value: event.detail.value,
                name: event.detail.name,
                // Avoid including the element reference to prevent circular structure
                elementId: event.detail.element?.id || "unknown",
            };

            const eventInfo = `[${time}] ${event.type}: ${JSON.stringify(safeDetail)}\n`;
            output.textContent = eventInfo + (output.textContent || "").split("\n").slice(0, 9).join("\n");
        }
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

            .value-display {
                margin-top: 20px;
                padding: 16px;
                background: var(--mjo-background-color-high, #f5f5f5);
                border-radius: 8px;
                border: 1px solid var(--mjo-border-color, #ddd);
            }

            .value-display h4 {
                margin: 0 0 12px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
            }

            .values {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .values span {
                font-size: 0.95rem;
                color: var(--mjo-foreground-color, #333);
            }

            .values strong {
                color: var(--mjo-foreground-color, #222);
                font-weight: 600;
                margin-right: 8px;
            }

            .form-actions {
                display: flex;
                gap: 12px;
                margin-top: 20px;
                flex-wrap: wrap;
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

            h4 {
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
                font-weight: 500;
            }

            .radio-group-size {
                position: relative;
                display: flex;
                gap: 15px;
            }
            .radio-group-users {
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
                }

                .event-demo {
                    gap: 16px;
                }

                .form-actions {
                    flex-direction: column;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "radio-component": RadioComponent;
    }
}
