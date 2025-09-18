import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

// Import components
import "../../src/mjo-button.js";
import "../../src/mjo-color-picker.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-switch.js";
import "../../src/mjo-textfield.js";

// Import dev components
import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("color-picker-component")
export class ColorPickerComponent extends LitElement {
    @state() private selectedColor: "primary" | "secondary" = "primary";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private selectedFormat: "hex" | "hexalpha" | "rgb" | "rgba" | "hsl" | "hsla" | "hwb" | "oklch" | "lab" | "lch" | "oklab" | "color" = "hex";
    @state() private isDisabled = false;
    @state() private isRounded = false;
    @state() private hideErrors = false;
    @state() private showValue = false;
    @state() private currentValue = "#3b82f6";
    @state() private currentLabel = "Choose Color";
    @state() private currentName = "color";
    @state() private currentHelperText = "Select your preferred color";
    @state() private currentAriaDescribedby = "";

    // Event logs
    @state() private eventLogs: string[] = [];

    render() {
        return html`
            <h1>Color Picker Component Examples</h1>

            <section-container label="Interactive Color Picker Playground">
                <playground-grid>
                    <mjo-color-picker
                        slot="demo"
                        id="playground-color-picker"
                        .color=${this.selectedColor}
                        .size=${this.selectedSize}
                        .format=${this.selectedFormat}
                        .value=${this.currentValue}
                        .label=${this.currentLabel}
                        .name=${this.currentName}
                        .helperText=${this.currentHelperText}
                        aria-describedby=${ifDefined(this.currentAriaDescribedby || undefined)}
                        ?disabled=${this.isDisabled}
                        ?rounded=${this.isRounded}
                        ?hideErrors=${this.hideErrors}
                        ?showValue=${this.showValue}
                        @change=${this.#logEvent}
                        @input=${this.#logEvent}
                        @mjo-color-picker:change=${this.#logEvent}
                        @mjo-color-picker:input=${this.#logEvent}
                        @mjo-color-picker:focus=${this.#logEvent}
                        @mjo-color-picker:blur=${this.#logEvent}
                        @mjo-color-picker:format-change=${this.#logEvent}
                    ></mjo-color-picker>

                    <control-group slot="controls" label="Color Scheme" columns="2">
                        <mjo-button size="small" variant=${this.selectedColor === "primary" ? "default" : "ghost"} @click=${() => this.setColor("primary")}>
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

                    <control-group slot="controls" label="Color Format" columns="3">
                        <mjo-button size="small" variant=${this.selectedFormat === "hex" ? "default" : "ghost"} @click=${() => this.setFormat("hex")}>
                            Hex
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedFormat === "rgb" ? "default" : "ghost"} @click=${() => this.setFormat("rgb")}>
                            RGB
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedFormat === "hsl" ? "default" : "ghost"} @click=${() => this.setFormat("hsl")}>
                            HSL
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="More Formats" columns="3">
                        <mjo-button size="small" variant=${this.selectedFormat === "rgba" ? "default" : "ghost"} @click=${() => this.setFormat("rgba")}>
                            RGBA
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedFormat === "hsla" ? "default" : "ghost"} @click=${() => this.setFormat("hsla")}>
                            HSLA
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedFormat === "hwb" ? "default" : "ghost"} @click=${() => this.setFormat("hwb")}>
                            HWB
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Advanced Formats" columns="3">
                        <mjo-button size="small" variant=${this.selectedFormat === "oklch" ? "default" : "ghost"} @click=${() => this.setFormat("oklch")}>
                            OKLCH
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedFormat === "lab" ? "default" : "ghost"} @click=${() => this.setFormat("lab")}>
                            LAB
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedFormat === "lch" ? "default" : "ghost"} @click=${() => this.setFormat("lch")}>
                            LCH
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="States" columns="2">
                        <mjo-switch label="Disabled" size="small" ?checked=${this.isDisabled} @change=${this.toggleDisabled}></mjo-switch>
                        <mjo-switch label="Rounded" size="small" ?checked=${this.isRounded} @change=${this.toggleRounded}></mjo-switch>
                    </control-group>

                    <control-group slot="controls" label="Options" columns="2">
                        <mjo-switch label="Hide Errors" size="small" ?checked=${this.hideErrors} @change=${this.toggleHideErrors}></mjo-switch>
                        <mjo-switch label="Show Value" size="small" ?checked=${this.showValue} @change=${this.toggleShowValue}></mjo-switch>
                    </control-group>

                    <control-group slot="controls" label="Content Settings" columns="1">
                        <mjo-textfield
                            label="Color Value"
                            .value=${this.currentValue}
                            @input=${this.#handleValueChange}
                            size="small"
                            placeholder="Enter color value (hex, rgb, etc.)"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Label"
                            .value=${this.currentLabel}
                            @input=${this.#handleLabelChange}
                            size="small"
                            placeholder="Label for the color picker"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Name"
                            .value=${this.currentName}
                            @input=${this.#handleNameChange}
                            size="small"
                            placeholder="Form field name"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Helper & Accessibility" columns="1">
                        <mjo-textfield
                            label="Helper Text"
                            .value=${this.currentHelperText}
                            @input=${this.#handleHelperTextChange}
                            size="small"
                            placeholder="Help text for users"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Aria Describedby"
                            .value=${this.currentAriaDescribedby}
                            @input=${this.#handleAriaDescribedbyChange}
                            size="small"
                            placeholder="ID of describing element"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Quick Actions" columns="1">
                        <mjo-button size="small" color="success" @click=${this.loadPresetColors}> Load Preset Colors </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.resetColorPicker}> Reset All </mjo-button>
                        <mjo-button size="small" color="warning" @click=${this.clearEventLog}> Clear Event Log </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="config-display">
                    <h4>Current Configuration:</h4>
                    <div class="config-values">
                        <span><strong>Value:</strong> ${this.currentValue}</span>
                        <span><strong>Format:</strong> ${this.selectedFormat}</span>
                        <span><strong>Size:</strong> ${this.selectedSize}</span>
                        <span><strong>Color Scheme:</strong> ${this.selectedColor}</span>
                        <span
                            ><strong>States:</strong> ${[
                                this.isDisabled && "Disabled",
                                this.isRounded && "Rounded",
                                this.hideErrors && "Hide Errors",
                                this.showValue && "Show Value",
                            ]
                                .filter(Boolean)
                                .join(", ") || "None"}</span
                        >
                    </div>
                </div>
            </section-container>

            <!-- Event Demo Section -->
            <section-container label="Event Demonstration" description="Monitor color picker events in real-time">
                <div class="event-demo">
                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div class="log-output">
                            ${this.eventLogs.length > 0 ? this.eventLogs.join("\n") : "No events yet. Try interacting with the color picker above."}
                        </div>
                    </div>
                </div>
            </section-container>

            <section-container label="Basic Usage Examples" description="Common color picker implementations.">
                <showcases-grid columns="3">
                    <mjo-color-picker
                        label="Primary Color"
                        value="#3b82f6"
                        size="medium"
                        color="primary"
                        format="hex"
                        helperText="Choose primary brand color"
                    ></mjo-color-picker>

                    <mjo-color-picker label="Background Color" value="#f8fafc" size="medium" color="secondary" format="hex" showValue></mjo-color-picker>

                    <mjo-color-picker
                        label="Accent Color"
                        value="hsl(220, 14%, 96%)"
                        size="medium"
                        color="primary"
                        format="hsl"
                        showValue
                        rounded
                    ></mjo-color-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Different Sizes">
                <showcases-grid columns="3">
                    <mjo-color-picker label="Small Picker" value="#ef4444" size="small" color="primary" format="hex"></mjo-color-picker>

                    <mjo-color-picker label="Medium Picker" value="#22c55e" size="medium" color="primary" format="hex"></mjo-color-picker>

                    <mjo-color-picker label="Large Picker" value="#8b5cf6" size="large" color="primary" format="hex"></mjo-color-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Color Format Examples">
                <showcases-grid columns="2">
                    <mjo-color-picker label="Hex Format" value="#ff6b6b" format="hex" showValue size="medium"></mjo-color-picker>

                    <mjo-color-picker label="RGB Format" value="rgb(255, 107, 107)" format="rgb" showValue size="medium"></mjo-color-picker>

                    <mjo-color-picker label="HSL Format" value="hsl(0, 100%, 71%)" format="hsl" showValue size="medium"></mjo-color-picker>

                    <mjo-color-picker label="RGBA Format" value="rgba(255, 107, 107, 0.8)" format="rgba" showValue size="medium"></mjo-color-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Color Scheme Variants">
                <showcases-grid columns="2">
                    <mjo-color-picker label="Primary Theme" value="#3b82f6" color="primary" size="medium" showValue></mjo-color-picker>

                    <mjo-color-picker label="Secondary Theme" value="#8b5cf6" color="secondary" size="medium" showValue></mjo-color-picker>
                </showcases-grid>
            </section-container>

            <section-container label="States & Options">
                <showcases-grid columns="2">
                    <mjo-color-picker label="Normal Picker" value="#10b981" size="medium" showValue></mjo-color-picker>

                    <mjo-color-picker label="Disabled Picker" value="#6b7280" size="medium" disabled showValue></mjo-color-picker>

                    <mjo-color-picker label="Rounded Picker" value="#f59e0b" size="medium" rounded showValue></mjo-color-picker>

                    <mjo-color-picker
                        label="With Value Display"
                        value="#ec4899"
                        size="medium"
                        showValue
                        helperText="Shows color value below"
                    ></mjo-color-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Form Integration Example">
                <mjo-form>
                    <mjo-grid columns="2" gap="20px">
                        <mjo-color-picker
                            label="Primary Brand Color"
                            name="primary-color"
                            value="#3b82f6"
                            format="hex"
                            helperText="Choose your primary brand color"
                            showValue
                        ></mjo-color-picker>

                        <mjo-color-picker
                            label="Secondary Color"
                            name="secondary-color"
                            value="#8b5cf6"
                            format="hex"
                            color="secondary"
                            helperText="Choose your secondary color"
                            showValue
                        ></mjo-color-picker>

                        <mjo-color-picker
                            label="Background Color"
                            name="background-color"
                            value="#f8fafc"
                            format="hex"
                            helperText="Choose background color"
                            showValue
                        ></mjo-color-picker>

                        <mjo-color-picker
                            label="Accent Color"
                            name="accent-color"
                            value="#22c55e"
                            format="hsl"
                            helperText="Choose accent color"
                            showValue
                        ></mjo-color-picker>
                    </mjo-grid>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Save Color Palette</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Advanced Format Examples" description="Modern color formats with wide gamut support">
                <showcases-grid columns="2">
                    <mjo-color-picker
                        label="OKLCH Format"
                        value="oklch(0.7 0.15 180)"
                        format="oklch"
                        showValue
                        helperText="OKLCH perceptually uniform"
                    ></mjo-color-picker>

                    <mjo-color-picker label="LAB Format" value="lab(70 -45 0)" format="lab" showValue helperText="CIE LAB color space"></mjo-color-picker>

                    <mjo-color-picker
                        label="HWB Format"
                        value="hwb(240 20% 30%)"
                        format="hwb"
                        showValue
                        helperText="Hue, Whiteness, Blackness"
                    ></mjo-color-picker>

                    <mjo-color-picker label="LCH Format" value="lch(70 50 180)" format="lch" showValue helperText="Lightness, Chroma, Hue"></mjo-color-picker>
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

    private setFormat(format: "hex" | "hexalpha" | "rgb" | "rgba" | "hsl" | "hsla" | "hwb" | "oklch" | "lab" | "lch" | "oklab" | "color") {
        this.selectedFormat = format;
    }

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    private toggleRounded() {
        this.isRounded = !this.isRounded;
    }

    private toggleHideErrors() {
        this.hideErrors = !this.hideErrors;
    }

    private toggleShowValue() {
        this.showValue = !this.showValue;
    }

    private loadPresetColors() {
        const presetColors = [
            "#3b82f6", // Blue
            "#ef4444", // Red
            "#22c55e", // Green
            "#f59e0b", // Amber
            "#8b5cf6", // Purple
            "#ec4899", // Pink
            "#10b981", // Emerald
            "#f97316", // Orange
        ];
        this.currentValue = presetColors[Math.floor(Math.random() * presetColors.length)];
    }

    private resetColorPicker() {
        this.selectedColor = "primary";
        this.selectedSize = "medium";
        this.selectedFormat = "hex";
        this.isDisabled = false;
        this.isRounded = false;
        this.hideErrors = false;
        this.showValue = false;
        this.currentValue = "#3b82f6";
        this.currentLabel = "Choose Color";
        this.currentName = "color";
        this.currentHelperText = "Select your preferred color";
        this.currentAriaDescribedby = "";
    }

    private clearEventLog() {
        this.eventLogs = [];
    }

    #handleValueChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentValue = target.value;
    };

    #handleLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentLabel = target.value;
    };

    #handleNameChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentName = target.value;
    };

    #handleHelperTextChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentHelperText = target.value;
    };

    #handleAriaDescribedbyChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentAriaDescribedby = target.value;
    };

    #logEvent = (event: CustomEvent | Event) => {
        const timestamp = new Date().toLocaleTimeString();
        const eventType = event.type;

        let eventDetail = "No detail";
        if ("detail" in event && event.detail) {
            try {
                eventDetail = JSON.stringify(event.detail, null, 2);
            } catch {
                eventDetail = String(event.detail);
            }
        } else if (event.target && "value" in event.target) {
            eventDetail = `value: "${(event.target as HTMLInputElement).value}"`;
        }

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

            .config-display {
                margin-top: 20px;
                padding: 16px;
                background: var(--mjo-background-color-high, #f5f5f5);
                border-radius: 8px;
                border: 1px solid var(--mjo-border-color, #ddd);
            }

            .config-display h4 {
                margin: 0 0 12px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
            }

            .config-values {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .config-values span {
                font-size: 0.95rem;
                color: var(--mjo-foreground-color, #333);
            }

            .config-values strong {
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
        "color-picker-component": ColorPickerComponent;
    }
}
