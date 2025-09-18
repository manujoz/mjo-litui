import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-button.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-switch.js";
import "../../src/mjo-textarea.js";
import "../../src/mjo-textfield.js";

import { ifDefined } from "lit/directives/if-defined.js";
import { MjoTextarea } from "../../src/mjo-textarea.js";
import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("textarea-component")
export class TextareaComponent extends LitElement {
    @state() private selectedColor: "primary" | "secondary" = "primary";
    @state() private selectedVariant: MjoTextarea["variant"] = "default";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private isDisabled = false;
    @state() private isReadonly = false;
    @state() private isFullwidth = false;
    @state() private hasCounter = false;
    @state() private selectOnFocus = false;
    @state() private autoFocus = false;
    @state() private currentValue = "";
    @state() private currentPlaceholder = "Enter your text here...";
    @state() private currentLabel = "Textarea Label";
    @state() private currentHelperText = "";
    @state() private currentStartIcon = "";
    @state() private currentEndIcon = "";
    @state() private currentStartImage = "";
    @state() private currentEndImage = "";
    @state() private currentRows = 3;
    @state() private currentMaxHeight?: number;
    @state() private currentMaxLength?: number;
    @state() private currentMinLength?: number;
    @state() private currentName = "example-textarea";
    @state() private currentAutoCapitalize: "off" | "none" | "on" | "sentences" | "words" | "characters" = "sentences";
    @state() private currentAutoComplete: AutoFillContactField | "" = "";
    @state() private currentAriaLabel = "";

    // Event logs
    @state() private eventLogs: string[] = [];

    render() {
        return html`
            <h1>Textarea Component Examples</h1>

            <section-container label="Interactive Textarea Playground">
                <playground-grid>
                    <mjo-textarea
                        slot="demo"
                        id="playground-textarea"
                        variant=${this.selectedVariant}
                        .value=${this.currentValue}
                        .placeholder=${this.currentPlaceholder}
                        .label=${this.currentLabel}
                        .helperText=${this.currentHelperText}
                        startIcon=${ifDefined(this.currentStartIcon || undefined)}
                        endIcon=${ifDefined(this.currentEndIcon || undefined)}
                        startImage=${ifDefined(this.currentStartImage || undefined)}
                        endImage=${ifDefined(this.currentEndImage || undefined)}
                        .name=${this.currentName}
                        .autoCapitalize=${this.currentAutoCapitalize}
                        .autoComplete=${this.currentAutoComplete || undefined}
                        .ariaLabel=${this.currentAriaLabel}
                        .rows=${this.currentRows}
                        .maxHeight=${this.currentMaxHeight}
                        .maxlength=${this.currentMaxLength}
                        .minlength=${this.currentMinLength}
                        .color=${this.selectedColor}
                        .size=${this.selectedSize}
                        ?disabled=${this.isDisabled}
                        ?readonly=${this.isReadonly}
                        ?fullwidth=${this.isFullwidth}
                        ?counter=${this.hasCounter}
                        ?selectOnFocus=${this.selectOnFocus}
                        ?autoFocus=${this.autoFocus}
                        @mjo-textarea:input=${this.#logEvent}
                        @mjo-textarea:change=${this.#logEvent}
                        @mjo-textarea:focus=${this.#logEvent}
                        @mjo-textarea:blur=${this.#logEvent}
                        @mjo-textarea:keyup=${this.#logEvent}
                        @mjo-textarea:clear=${this.#logEvent}
                    ></mjo-textarea>

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

                    <control-group slot="controls" label="Variants" columns="3">
                        <mjo-button variant=${this.selectedVariant === "default" ? "default" : "ghost"} size="small" @click=${() => this.setVariant("default")}
                            >Default</mjo-button
                        >
                        <mjo-button variant=${this.selectedVariant === "flat" ? "default" : "ghost"} size="small" @click=${() => this.setVariant("flat")}
                            >Flat</mjo-button
                        >
                        <mjo-button variant=${this.selectedVariant === "ghost" ? "default" : "ghost"} size="small" @click=${() => this.setVariant("ghost")}
                            >Ghost</mjo-button
                        >
                    </control-group>

                    <control-group slot="controls" label="Sizes" columns="3">
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
                        <mjo-switch label="Disabled" size="small" ?checked=${this.isDisabled} @change=${this.toggleDisabled}></mjo-switch>
                        <mjo-switch label="Readonly" size="small" ?checked=${this.isReadonly} @change=${this.toggleReadonly}></mjo-switch>
                        <mjo-switch label="Fullwidth" size="small" ?checked=${this.isFullwidth} @change=${this.toggleFullwidth}></mjo-switch>
                    </control-group>

                    <control-group slot="controls" label="Features" columns="3">
                        <mjo-switch label="Counter" size="small" ?checked=${this.hasCounter} @change=${this.toggleCounter}></mjo-switch>
                        <mjo-switch label="Select on Focus" size="small" ?checked=${this.selectOnFocus} @change=${this.toggleSelectOnFocus}></mjo-switch>
                        <mjo-switch label="Auto Focus" size="small" ?checked=${this.autoFocus} @change=${this.toggleAutoFocus}></mjo-switch>
                    </control-group>

                    <control-group slot="controls" label="Content & Labels" columns="1">
                        <mjo-textfield
                            label="Value"
                            .value=${this.currentValue}
                            @input=${this.#handleValueChange}
                            size="small"
                            placeholder="Enter textarea value"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Placeholder"
                            .value=${this.currentPlaceholder}
                            @input=${this.#handlePlaceholderChange}
                            size="small"
                            placeholder="Enter placeholder text"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Label"
                            .value=${this.currentLabel}
                            @input=${this.#handleLabelChange}
                            size="small"
                            placeholder="Enter label text"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Helper Text"
                            .value=${this.currentHelperText}
                            @input=${this.#handleHelperTextChange}
                            size="small"
                            placeholder="Enter helper text"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Icons & Images" columns="1">
                        <mjo-textfield
                            label="Start Icon"
                            .value=${this.currentStartIcon}
                            @input=${this.#handleStartIconChange}
                            size="small"
                            placeholder="e.g., mjo-icons:user"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="End Icon"
                            .value=${this.currentEndIcon}
                            @input=${this.#handleEndIconChange}
                            size="small"
                            placeholder="e.g., mjo-icons:search"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Start Image URL"
                            .value=${this.currentStartImage}
                            @input=${this.#handleStartImageChange}
                            size="small"
                            placeholder="Enter image URL"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="End Image URL"
                            .value=${this.currentEndImage}
                            @input=${this.#handleEndImageChange}
                            size="small"
                            placeholder="Enter image URL"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Configuration" columns="1">
                        <mjo-textfield
                            label="Rows"
                            type="number"
                            .value=${this.currentRows.toString()}
                            @input=${this.#handleRowsChange}
                            size="small"
                            placeholder="Number of rows"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Max Height (px)"
                            type="number"
                            .value=${this.currentMaxHeight?.toString() || ""}
                            @input=${this.#handleMaxHeightChange}
                            size="small"
                            placeholder="Maximum height in pixels"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Max Length"
                            type="number"
                            .value=${this.currentMaxLength?.toString() || ""}
                            @input=${this.#handleMaxLengthChange}
                            size="small"
                            placeholder="Maximum character count"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Min Length"
                            type="number"
                            .value=${this.currentMinLength?.toString() || ""}
                            @input=${this.#handleMinLengthChange}
                            size="small"
                            placeholder="Minimum character count"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Auto Capitalize" columns="2">
                        <mjo-button
                            size="small"
                            variant=${this.currentAutoCapitalize === "sentences" ? "default" : "ghost"}
                            @click=${() => this.setAutoCapitalize("sentences")}
                        >
                            Sentences
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.currentAutoCapitalize === "words" ? "default" : "ghost"}
                            @click=${() => this.setAutoCapitalize("words")}
                        >
                            Words
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.currentAutoCapitalize === "characters" ? "default" : "ghost"}
                            @click=${() => this.setAutoCapitalize("characters")}
                        >
                            Characters
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.currentAutoCapitalize === "off" ? "default" : "ghost"}
                            @click=${() => this.setAutoCapitalize("off")}
                        >
                            Off
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Additional Settings" columns="1">
                        <mjo-textfield
                            label="Name"
                            .value=${this.currentName}
                            @input=${this.#handleNameChange}
                            size="small"
                            placeholder="Form field name"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Auto Complete"
                            .value=${this.currentAutoComplete}
                            @input=${this.#handleAutoCompleteChange}
                            size="small"
                            placeholder="e.g., email, name, etc."
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Aria Label"
                            .value=${this.currentAriaLabel}
                            @input=${this.#handleAriaLabelChange}
                            size="small"
                            placeholder="Accessibility label"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Quick Actions" columns="1">
                        <mjo-button size="small" color="success" @click=${this.loadSampleContent}> Load Sample Content </mjo-button>
                        <mjo-button size="small" color="warning" @click=${this.clearTextarea}> Clear Textarea </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.resetTextarea}> Reset All </mjo-button>
                        <mjo-button size="small" color="info" @click=${this.clearEventLog}> Clear Events </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="config-display">
                    <h4>Current Configuration:</h4>
                    <div class="config-values">
                        <span><strong>Value:</strong> ${this.currentValue || "Empty"}</span>
                        <span><strong>Size:</strong> ${this.selectedSize}</span>
                        <span><strong>Color:</strong> ${this.selectedColor}</span>
                        <span><strong>Rows:</strong> ${this.currentRows}</span>
                        <span><strong>Max Length:</strong> ${this.currentMaxLength || "None"}</span>
                        <span
                            ><strong>States:</strong> ${[
                                this.isDisabled && "Disabled",
                                this.isReadonly && "Readonly",
                                this.isFullwidth && "Fullwidth",
                                this.hasCounter && "Counter",
                                this.selectOnFocus && "Select on Focus",
                                this.autoFocus && "Auto Focus",
                            ]
                                .filter(Boolean)
                                .join(", ") || "None"}</span
                        >
                    </div>
                </div>
            </section-container>

            <section-container label="Event Monitoring" description="Real-time event logging for the playground textarea">
                <div class="event-demo">
                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div class="log-output">
                            ${this.eventLogs.length > 0 ? this.eventLogs.join("\n") : "No events yet. Try interacting with the textarea above."}
                        </div>
                    </div>
                </div>
            </section-container>

            <section-container label="Basic Usage Examples" description="Common textarea implementations with different configurations.">
                <showcases-grid columns="2">
                    <mjo-textarea label="Basic Textarea" placeholder="Enter your message..." value="Hello world!" size="medium" color="primary"></mjo-textarea>

                    <mjo-textarea
                        label="With Helper Text"
                        placeholder="Type here..."
                        helperText="This is some helpful information"
                        size="medium"
                        color="secondary"
                        rows="2"
                    ></mjo-textarea>

                    <mjo-textarea
                        label="With Counter"
                        placeholder="Limited text..."
                        maxlength="100"
                        counter
                        size="medium"
                        color="primary"
                        rows="3"
                    ></mjo-textarea>

                    <mjo-textarea
                        label="With Icons"
                        placeholder="Message with icons..."
                        startIcon="mjo-icons:user"
                        endIcon="mjo-icons:send"
                        size="medium"
                        color="secondary"
                        rows="2"
                    ></mjo-textarea>
                </showcases-grid>
            </section-container>

            <section-container label="Size Variants">
                <showcases-grid columns="3">
                    <mjo-textarea label="Small Textarea" placeholder="Small size..." size="small" color="primary" rows="2"></mjo-textarea>

                    <mjo-textarea label="Medium Textarea" placeholder="Medium size..." size="medium" color="primary" rows="3"></mjo-textarea>

                    <mjo-textarea label="Large Textarea" placeholder="Large size..." size="large" color="primary" rows="3"></mjo-textarea>
                </showcases-grid>
            </section-container>

            <section-container label="Color Variants">
                <showcases-grid columns="2">
                    <mjo-textarea label="Primary Color" placeholder="Primary color theme..." color="primary" size="medium" rows="2"></mjo-textarea>

                    <mjo-textarea label="Secondary Color" placeholder="Secondary color theme..." color="secondary" size="medium" rows="2"></mjo-textarea>
                </showcases-grid>
            </section-container>

            <section-container label="Feature Examples">
                <showcases-grid columns="2">
                    <mjo-textarea
                        label="Auto-resize (no max height)"
                        placeholder="Type multiple lines to see auto-resize..."
                        rows="1"
                        size="medium"
                        color="primary"
                    ></mjo-textarea>

                    <mjo-textarea
                        label="Auto-resize with max height"
                        placeholder="Type multiple lines, limited height..."
                        rows="1"
                        maxHeight="120"
                        size="medium"
                        color="secondary"
                    ></mjo-textarea>

                    <mjo-textarea
                        label="Character Counter"
                        placeholder="Type to see character count..."
                        maxlength="150"
                        counter
                        size="medium"
                        color="primary"
                        rows="3"
                    ></mjo-textarea>

                    <mjo-textarea
                        label="Select on Focus"
                        value="This text will be selected when focused"
                        selectOnFocus
                        size="medium"
                        color="secondary"
                        rows="2"
                    ></mjo-textarea>
                </showcases-grid>
            </section-container>

            <section-container label="States Examples">
                <showcases-grid columns="2">
                    <mjo-textarea label="Normal State" placeholder="Normal textarea..." size="medium" color="primary" rows="2"></mjo-textarea>

                    <mjo-textarea
                        label="Disabled State"
                        placeholder="Disabled textarea..."
                        value="This textarea is disabled"
                        disabled
                        size="medium"
                        color="primary"
                        rows="2"
                    ></mjo-textarea>

                    <mjo-textarea
                        label="Readonly State"
                        value="This textarea is readonly - you can't edit this text"
                        readonly
                        size="medium"
                        color="secondary"
                        rows="2"
                    ></mjo-textarea>

                    <mjo-textarea
                        label="Fullwidth Textarea"
                        placeholder="This textarea takes full width..."
                        fullwidth
                        size="medium"
                        color="primary"
                        rows="3"
                    ></mjo-textarea>
                </showcases-grid>
            </section-container>

            <section-container label="Form Integration Example">
                <mjo-form>
                    <mjo-grid columns="1" gap="20px">
                        <mjo-textarea
                            label="Message"
                            name="message"
                            placeholder="Enter your message here..."
                            maxlength="500"
                            counter
                            helperText="Please provide a detailed message"
                            rows="4"
                            size="medium"
                            color="primary"
                            required
                        ></mjo-textarea>

                        <mjo-textarea
                            label="Comments (Optional)"
                            name="comments"
                            placeholder="Any additional comments..."
                            rows="3"
                            size="medium"
                            color="secondary"
                        ></mjo-textarea>

                        <div class="form-actions">
                            <mjo-button type="submit" color="primary">Submit Form</mjo-button>
                            <mjo-button type="reset" variant="ghost">Reset Form</mjo-button>
                        </div>
                    </mjo-grid>
                </mjo-form>
            </section-container>

            <section-container label="Auto Capitalize Examples">
                <showcases-grid columns="2">
                    <mjo-textarea
                        label="Sentences (Default)"
                        placeholder="first letter of sentences will be capitalized"
                        autoCapitalize="sentences"
                        size="medium"
                        color="primary"
                        rows="2"
                    ></mjo-textarea>

                    <mjo-textarea
                        label="Words"
                        placeholder="first letter of each word will be capitalized"
                        autoCapitalize="words"
                        size="medium"
                        color="secondary"
                        rows="2"
                    ></mjo-textarea>

                    <mjo-textarea
                        label="Characters"
                        placeholder="all characters will be capitalized"
                        autoCapitalize="characters"
                        size="medium"
                        color="primary"
                        rows="2"
                    ></mjo-textarea>

                    <mjo-textarea label="Off" placeholder="no auto capitalization" autoCapitalize="off" size="medium" color="secondary" rows="2"></mjo-textarea>
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

    private setVariant(variant: MjoTextarea["variant"]) {
        this.selectedVariant = variant;
    }

    private setAutoCapitalize(value: "off" | "none" | "on" | "sentences" | "words" | "characters") {
        this.currentAutoCapitalize = value;
    }

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    private toggleReadonly() {
        this.isReadonly = !this.isReadonly;
    }

    private toggleFullwidth() {
        this.isFullwidth = !this.isFullwidth;
    }

    private toggleCounter() {
        this.hasCounter = !this.hasCounter;
    }

    private toggleSelectOnFocus() {
        this.selectOnFocus = !this.selectOnFocus;
    }

    private toggleAutoFocus() {
        this.autoFocus = !this.autoFocus;
    }

    private loadSampleContent() {
        const sampleTexts = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "This is a multi-line text example.\nIt contains several lines\nto demonstrate the textarea functionality.",
            "🌟 Welcome to our textarea component!\n\nThis is a sample text with emojis and formatting.\n\n• Feature 1\n• Feature 2\n• Feature 3",
            "Short sample text",
            "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
        ];
        this.currentValue = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    }

    private clearTextarea() {
        this.currentValue = "";
    }

    private resetTextarea() {
        this.selectedColor = "primary";
        this.selectedSize = "medium";
        this.isDisabled = false;
        this.isReadonly = false;
        this.isFullwidth = false;
        this.hasCounter = false;
        this.selectOnFocus = false;
        this.autoFocus = false;
        this.currentValue = "";
        this.currentPlaceholder = "Enter your text here...";
        this.currentLabel = "Textarea Label";
        this.currentHelperText = "";
        this.currentStartIcon = "";
        this.currentEndIcon = "";
        this.currentStartImage = "";
        this.currentEndImage = "";
        this.currentRows = 3;
        this.currentMaxHeight = undefined;
        this.currentMaxLength = undefined;
        this.currentMinLength = undefined;
        this.currentName = "example-textarea";
        this.currentAutoCapitalize = "sentences";
        this.currentAutoComplete = "";
        this.currentAriaLabel = "";
    }

    private clearEventLog() {
        this.eventLogs = [];
    }

    #handleValueChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentValue = target.value;
    };

    #handlePlaceholderChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentPlaceholder = target.value;
    };

    #handleLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentLabel = target.value;
    };

    #handleHelperTextChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentHelperText = target.value;
    };

    #handleStartIconChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentStartIcon = target.value;
    };

    #handleEndIconChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentEndIcon = target.value;
    };

    #handleStartImageChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentStartImage = target.value;
    };

    #handleEndImageChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentEndImage = target.value;
    };

    #handleRowsChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentRows = parseInt(target.value) || 1;
    };

    #handleMaxHeightChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMaxHeight = target.value ? parseInt(target.value) : undefined;
    };

    #handleMaxLengthChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMaxLength = target.value ? parseInt(target.value) : undefined;
    };

    #handleMinLengthChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMinLength = target.value ? parseInt(target.value) : undefined;
    };

    #handleNameChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentName = target.value;
    };

    #handleAutoCompleteChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentAutoComplete = (target.value as AutoFillContactField) || "";
    };

    #handleAriaLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentAriaLabel = target.value;
    };

    #logEvent = (event: CustomEvent) => {
        const timestamp = new Date().toLocaleTimeString();
        const eventType = event.type;

        // Create a safe copy of event.detail to avoid circular references
        const safeDetail = {
            value: event.detail.value || "",
            previousValue: event.detail.previousValue || "",
            key: event.detail.key || "",
            inputType: event.detail.inputType || "",
        };

        const logEntry = `[${timestamp}] ${eventType}: ${JSON.stringify(safeDetail)}`;
        this.eventLogs = [logEntry, ...this.eventLogs.slice(0, 19)]; // Keep last 20 events
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
                max-height: 300px;
                overflow-y: auto;
                min-height: 50px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
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
        "textarea-component": TextareaComponent;
    }
}
