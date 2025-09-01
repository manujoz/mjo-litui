import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-button.js";
import "../../src/mjo-checkbox.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-textfield.js";

import { MjoCheckbox } from "../../src/mjo-checkbox.js";
import { MjoCheckboxChangeEvent } from "../../src/types/mjo-checkbox.js";
import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("checkbox-component")
export class CheckboxComponent extends LitElement {
    @state() private selectedColor: "primary" | "secondary" = "primary";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private isDisabled = false;
    @state() private hasLabel = true;
    @state() private hasError = false;
    @state() private isChecked = false;
    @state() private isIndeterminate = false;
    @state() private checkboxValue = "checkbox-value";
    @state() private customLabel = "Checkbox Option";
    @state() private customHelperText = "";
    @state() private customAriaLabel = "";
    @state() private checkboxName = "demo-checkbox";
    @state() private checkboxGroup = "";

    render() {
        return html`
            <h1>Checkbox Component Examples</h1>

            <section-container label="Interactive Checkbox Playground">
                <playground-grid>
                    <mjo-checkbox
                        slot="demo"
                        id="playground-checkbox"
                        .name=${this.checkboxName}
                        .value=${this.checkboxValue}
                        .color=${this.selectedColor}
                        .size=${this.selectedSize}
                        .label=${this.hasLabel ? this.customLabel : undefined}
                        .helperText=${this.customHelperText || undefined}
                        .aria-label=${this.customAriaLabel || undefined}
                        .checkgroup=${this.checkboxGroup || undefined}
                        ?checked=${this.isChecked}
                        ?indeterminate=${this.isIndeterminate}
                        ?disabled=${this.isDisabled}
                        ?error=${this.hasError}
                        @mjo-checkbox:change=${this.#handleCheckboxChange}
                        @mjo-checkbox:indeterminate-change=${this.#handleIndeterminateChange}
                        @mjo-checkbox:focus=${this.#handleCheckboxFocus}
                        @mjo-checkbox:blur=${this.#handleCheckboxBlur}
                    ></mjo-checkbox>

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
                        <mjo-button size="small" variant=${this.isIndeterminate ? "default" : "ghost"} @click=${() => this.toggleIndeterminate()}>
                            Indeterminate
                        </mjo-button>
                        <mjo-button size="small" variant=${this.isDisabled ? "default" : "ghost"} @click=${() => this.toggleDisabled()}> Disabled </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Display Options" columns="2">
                        <mjo-button size="small" variant=${this.hasLabel ? "default" : "ghost"} @click=${() => this.toggleLabel()}> Show Label </mjo-button>
                        <mjo-button size="small" variant=${this.hasError ? "default" : "ghost"} @click=${() => this.toggleError()}> Error </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Checkbox Settings" columns="1">
                        <mjo-textfield
                            label="Checkbox Name"
                            .value=${this.checkboxName}
                            @input=${this.#handleNameChange}
                            size="small"
                            placeholder="Group name for checkboxes"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Checkbox Value"
                            .value=${this.checkboxValue}
                            @input=${this.#handleValueChange}
                            size="small"
                            placeholder="Value when checked"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Check Group"
                            .value=${this.checkboxGroup}
                            @input=${this.#handleGroupChange}
                            size="small"
                            placeholder="Group for related checkboxes"
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
                        <mjo-button size="small" color="success" @click=${this.resetCheckbox}> Reset Settings </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.toggleSelection}> Toggle Selection </mjo-button>
                        <mjo-button size="small" color="secondary" @click=${this.setIndeterminate}> Set Indeterminate </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="value-display">
                    <h4>Current State:</h4>
                    <div class="values">
                        <span><strong>Checked:</strong> ${this.isChecked}</span>
                        <span><strong>Indeterminate:</strong> ${this.isIndeterminate}</span>
                        <span><strong>Value:</strong> ${this.checkboxValue}</span>
                        <span><strong>Name:</strong> ${this.checkboxName}</span>
                        <span><strong>Group:</strong> ${this.checkboxGroup || "None"}</span>
                        <span><strong>Color:</strong> ${this.selectedColor}</span>
                        <span><strong>Size:</strong> ${this.selectedSize}</span>
                    </div>
                </div>
            </section-container>

            <section-container label="Basic Usage Examples" description="Simple checkbox implementations for common use cases.">
                <showcases-grid columns="2">
                    <mjo-checkbox name="basic-checkbox" value="option1" label="Accept terms and conditions" color="primary" size="medium"></mjo-checkbox>

                    <mjo-checkbox
                        name="newsletter"
                        value="subscribe"
                        label="Subscribe to newsletter"
                        helperText="Get updates about new features"
                        color="primary"
                        size="medium"
                        checked
                    ></mjo-checkbox>
                </showcases-grid>
            </section-container>

            <section-container label="Checkbox Groups" description="Multiple checkboxes for multi-selection scenarios.">
                <showcases-grid columns="1">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Select your interests:</h4>
                        <mjo-checkbox
                            name="interests"
                            value="technology"
                            label="Technology & Programming"
                            helperText="Latest tech news and tutorials"
                            color="primary"
                            size="medium"
                            checked
                            @mjo-checkbox:change=${this.#handleInterestChange}
                        ></mjo-checkbox>
                        <mjo-checkbox
                            name="interests"
                            value="design"
                            label="Design & UX"
                            helperText="UI/UX trends and best practices"
                            color="primary"
                            size="medium"
                            @mjo-checkbox:change=${this.#handleInterestChange}
                        ></mjo-checkbox>
                        <mjo-checkbox
                            name="interests"
                            value="business"
                            label="Business & Marketing"
                            helperText="Growth strategies and insights"
                            color="primary"
                            size="medium"
                            checked
                            @mjo-checkbox:change=${this.#handleInterestChange}
                        ></mjo-checkbox>
                    </div>
                </showcases-grid>

                <showcases-grid columns="1">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Notification preferences:</h4>
                        <mjo-checkbox name="notifications" value="email" label="Email notifications" color="secondary" size="medium" checked></mjo-checkbox>
                        <mjo-checkbox name="notifications" value="sms" label="SMS notifications" color="secondary" size="medium"></mjo-checkbox>
                        <mjo-checkbox name="notifications" value="push" label="Push notifications" color="secondary" size="medium" checked></mjo-checkbox>
                    </div>
                </showcases-grid>
            </section-container>

            <section-container label="Different Sizes">
                <showcases-grid columns="3">
                    <mjo-checkbox name="size-demo" value="small" label="Small Checkbox" size="small" color="primary" checked></mjo-checkbox>

                    <mjo-checkbox name="size-demo" value="medium" label="Medium Checkbox" size="medium" color="primary" checked></mjo-checkbox>

                    <mjo-checkbox name="size-demo" value="large" label="Large Checkbox" size="large" color="primary" checked></mjo-checkbox>
                </showcases-grid>
            </section-container>

            <section-container label="Color Variants">
                <showcases-grid columns="2">
                    <mjo-checkbox name="color-demo1" value="primary" label="Primary Color" color="primary" size="medium" checked></mjo-checkbox>

                    <mjo-checkbox name="color-demo2" value="secondary" label="Secondary Color" color="secondary" size="medium" checked></mjo-checkbox>
                </showcases-grid>
            </section-container>

            <section-container label="Indeterminate State" description="Checkboxes with partial selection state for hierarchical data.">
                <showcases-grid columns="1">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Select all or some features:</h4>
                        <mjo-checkbox
                            id="master-checkbox"
                            name="features"
                            value="all"
                            label="All Features"
                            color="primary"
                            size="medium"
                            indeterminate
                            @mjo-checkbox:change=${this.#handleMasterChange}
                        ></mjo-checkbox>
                        <div style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px;">
                            <mjo-checkbox
                                name="sub-features"
                                value="feature1"
                                label="Feature 1 - Advanced Analytics"
                                color="primary"
                                size="small"
                                checked
                                @mjo-checkbox:change=${this.#handleSubFeatureChange}
                            ></mjo-checkbox>
                            <mjo-checkbox
                                name="sub-features"
                                value="feature2"
                                label="Feature 2 - Real-time Sync"
                                color="primary"
                                size="small"
                                @mjo-checkbox:change=${this.#handleSubFeatureChange}
                            ></mjo-checkbox>
                            <mjo-checkbox
                                name="sub-features"
                                value="feature3"
                                label="Feature 3 - API Access"
                                color="primary"
                                size="small"
                                checked
                                @mjo-checkbox:change=${this.#handleSubFeatureChange}
                            ></mjo-checkbox>
                        </div>
                    </div>
                </showcases-grid>
            </section-container>

            <section-container label="States & Options" description="Various checkbox states and configuration options.">
                <showcases-grid columns="2">
                    <mjo-checkbox name="states1" value="disabled" label="Disabled Checkbox" color="primary" size="medium" disabled></mjo-checkbox>

                    <mjo-checkbox
                        name="states2"
                        value="error"
                        label="Error State"
                        color="primary"
                        size="medium"
                        error
                        helperText="This field has an error"
                    ></mjo-checkbox>
                </showcases-grid>

                <showcases-grid columns="2">
                    <mjo-checkbox
                        name="states3"
                        value="helper"
                        label="With Helper Text"
                        helperText="Additional information about this option"
                        color="primary"
                        size="medium"
                        checked
                    ></mjo-checkbox>

                    <mjo-checkbox name="states4" value="aria" color="primary" size="medium" checked aria-label="Checkbox without visible label"></mjo-checkbox>
                </showcases-grid>
            </section-container>

            <section-container label="Form Integration Example">
                <mjo-form>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Account settings:</h4>
                            <mjo-checkbox
                                name="account-settings"
                                value="two-factor"
                                label="Enable two-factor authentication"
                                helperText="Adds an extra layer of security"
                                color="primary"
                                size="medium"
                                checked
                            ></mjo-checkbox>
                            <mjo-checkbox
                                name="account-settings"
                                value="email-notifications"
                                label="Receive email notifications"
                                helperText="Get notified about important updates"
                                color="primary"
                                size="medium"
                            ></mjo-checkbox>
                            <mjo-checkbox
                                name="account-settings"
                                value="marketing"
                                label="Receive marketing emails"
                                helperText="Stay updated with news and offers"
                                color="primary"
                                size="medium"
                            ></mjo-checkbox>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Privacy preferences:</h4>
                            <mjo-checkbox
                                name="privacy"
                                value="analytics"
                                label="Allow analytics tracking"
                                color="secondary"
                                size="medium"
                                checked
                            ></mjo-checkbox>
                            <mjo-checkbox name="privacy" value="cookies" label="Accept cookies" color="secondary" size="medium" checked></mjo-checkbox>
                        </div>
                    </div>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Save Settings</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset Form</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Event tracking checkboxes:</h4>
                        <mjo-checkbox
                            name="events"
                            value="option1"
                            label="Option 1"
                            color="primary"
                            size="medium"
                            @mjo-checkbox:change=${this.#logEvent}
                            @mjo-checkbox:focus=${this.#logEvent}
                            @mjo-checkbox:blur=${this.#logEvent}
                        ></mjo-checkbox>
                        <mjo-checkbox
                            name="events"
                            value="option2"
                            label="Option 2 (with indeterminate)"
                            color="primary"
                            size="medium"
                            indeterminate
                            @mjo-checkbox:change=${this.#logEvent}
                            @mjo-checkbox:indeterminate-change=${this.#logEvent}
                            @mjo-checkbox:focus=${this.#logEvent}
                            @mjo-checkbox:blur=${this.#logEvent}
                        ></mjo-checkbox>
                        <mjo-checkbox
                            name="events"
                            value="option3"
                            label="Option 3"
                            color="primary"
                            size="medium"
                            checked
                            @mjo-checkbox:change=${this.#logEvent}
                            @mjo-checkbox:focus=${this.#logEvent}
                            @mjo-checkbox:blur=${this.#logEvent}
                        ></mjo-checkbox>
                    </div>

                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div id="event-output" class="log-output">Events will appear here...</div>
                    </div>
                </div>
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
        // Clear indeterminate when manually toggling checked
        if (this.isIndeterminate) {
            this.isIndeterminate = false;
        }
    }

    private toggleIndeterminate() {
        this.isIndeterminate = !this.isIndeterminate;
        // Clear checked when setting indeterminate
        if (this.isIndeterminate) {
            this.isChecked = false;
        }
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

    private resetCheckbox() {
        this.selectedColor = "primary";
        this.selectedSize = "medium";
        this.isDisabled = false;
        this.hasLabel = true;
        this.hasError = false;
        this.isChecked = false;
        this.isIndeterminate = false;
        this.checkboxValue = "checkbox-value";
        this.customLabel = "Checkbox Option";
        this.customHelperText = "";
        this.customAriaLabel = "";
        this.checkboxName = "demo-checkbox";
        this.checkboxGroup = "";
    }

    private toggleSelection() {
        this.isChecked = !this.isChecked;
        if (this.isIndeterminate) {
            this.isIndeterminate = false;
        }
    }

    private setIndeterminate() {
        this.isIndeterminate = true;
        this.isChecked = false;
    }

    #handleCheckboxChange = (event: CustomEvent) => {
        const { checked, indeterminate } = event.detail;
        this.isChecked = checked;
        this.isIndeterminate = indeterminate;
        console.log("Checkbox change:", event.detail);
    };

    #handleIndeterminateChange = (event: CustomEvent) => {
        const { indeterminate, checked } = event.detail;
        this.isIndeterminate = indeterminate;
        this.isChecked = checked;
        console.log("Indeterminate change:", event.detail);
    };

    #handleCheckboxFocus = (event: CustomEvent) => {
        console.log("Checkbox focus:", event.detail);
    };

    #handleCheckboxBlur = (event: CustomEvent) => {
        console.log("Checkbox blur:", event.detail);
    };

    #handleInterestChange = (event: CustomEvent) => {
        console.log("Interest selected:", event.detail.value, "checked:", event.detail.checked);
    };

    #handleMasterChange = (event: MjoCheckboxChangeEvent) => {
        console.log("Master checkbox changed:", event.detail);

        const { checked } = event.detail;

        const subCheckboxes = this.shadowRoot?.querySelectorAll("mjo-checkbox[name='sub-features']");
        subCheckboxes?.forEach((checkbox) => {
            (checkbox as MjoCheckbox).checked = checked;
        });
        // In a real scenario, you would update all sub-checkboxes here
    };

    #handleSubFeatureChange = (event: MjoCheckboxChangeEvent) => {
        console.log("Sub-feature changed:", event.detail.value, "checked:", event.detail.checked);

        const masterCheckbox = this.shadowRoot?.querySelector("mjo-checkbox[name='features']") as MjoCheckbox;

        const subCheckboxes = this.shadowRoot?.querySelectorAll("mjo-checkbox[name='sub-features']");

        let allChecked = true;
        let allUnchecked = true;
        subCheckboxes?.forEach((checkbox) => {
            if (!(checkbox as MjoCheckbox).checked) {
                allChecked = false;
            }
            if ((checkbox as MjoCheckbox).checked) {
                allUnchecked = false;
            }
        });

        if (allChecked) {
            masterCheckbox.checked = true;
            masterCheckbox.indeterminate = false;
        } else if (allUnchecked) {
            masterCheckbox.checked = false;
            masterCheckbox.indeterminate = false;
        } else {
            masterCheckbox.setIndeterminate(true);
        }

        // In a real scenario, you would update the master checkbox state here
    };

    #handleNameChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.checkboxName = target.value;
    };

    #handleValueChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.checkboxValue = target.value;
    };

    #handleGroupChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.checkboxGroup = target.value;
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
                indeterminate: event.detail.indeterminate,
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
        "checkbox-component": CheckboxComponent;
    }
}
