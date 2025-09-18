import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

// Import components
import "../../src/mjo-button.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-switch.js";
import "../../src/mjo-textfield.js";

// Import dev components
import { MjoTextfield } from "../../src/mjo-textfield.js";
import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("textfield-component")
export class TextfieldComponent extends LitElement {
    @state() private selectedColor: "primary" | "secondary" = "primary";
    @state() private selectedVariant: MjoTextfield["variant"] = "default";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private selectedType: "text" | "password" | "email" | "tel" | "url" | "number" = "text";
    @state() private autoCapitalize: "none" | "sentences" | "words" | "characters" = "none";
    @state() private isDisabled = false;
    @state() private isReadonly = false;
    @state() private isFullwidth = false;
    @state() private autoFocus = false;
    @state() private selectOnFocus = false;
    @state() private clearabled = false;
    @state() private nospiners = false;
    @state() private counter = false;
    @state() private currentValue = "";
    @state() private currentLabel = "Label";
    @state() private currentPlaceholder = "Enter text...";
    @state() private currentHelperText = "";
    @state() private currentName = "example-field";
    @state() private currentStartIcon = "";
    @state() private currentEndIcon = "";
    @state() private currentStartImage = "";
    @state() private currentEndImage = "";
    @state() private currentPrefixText = "";
    @state() private currentSuffixText = "";
    @state() private currentMin = "";
    @state() private currentMax = "";
    @state() private currentMinlength = "";
    @state() private currentMaxlength = "";
    @state() private currentStep = "";
    @state() private currentAutoComplete = "";

    // Event logs
    @state() private eventLogs: string[] = [];

    render() {
        return html`
            <h1>MJO Textfield Component</h1>

            <section-container label="Interactive Demo" description="Test different textfield configurations">
                <playground-grid>
                    <!-- Demo Section -->
                    <mjo-textfield
                        slot="demo"
                        variant=${this.selectedVariant}
                        color=${this.selectedColor}
                        size=${this.selectedSize}
                        type=${this.selectedType}
                        autoCapitalize=${this.autoCapitalize}
                        ?disabled=${this.isDisabled}
                        ?readonly=${this.isReadonly}
                        ?fullwidth=${this.isFullwidth}
                        ?autoFocus=${this.autoFocus}
                        ?selectOnFocus=${this.selectOnFocus}
                        ?clearabled=${this.clearabled}
                        ?nospiners=${this.nospiners}
                        ?counter=${this.counter}
                        .value=${this.currentValue}
                        label=${ifDefined(this.currentLabel || undefined)}
                        placeholder=${ifDefined(this.currentPlaceholder || undefined)}
                        helperText=${ifDefined(this.currentHelperText || undefined)}
                        name=${ifDefined(this.currentName || undefined)}
                        startIcon=${ifDefined(this.currentStartIcon || undefined)}
                        endIcon=${ifDefined(this.currentEndIcon || undefined)}
                        startImage=${ifDefined(this.currentStartImage || undefined)}
                        endImage=${ifDefined(this.currentEndImage || undefined)}
                        prefixText=${ifDefined(this.currentPrefixText || undefined)}
                        suffixText=${ifDefined(this.currentSuffixText || undefined)}
                        min=${ifDefined(this.currentMin ? Number(this.currentMin) : undefined)}
                        max=${ifDefined(this.currentMax ? Number(this.currentMax) : undefined)}
                        minlength=${ifDefined(this.currentMinlength ? Number(this.currentMinlength) : undefined)}
                        maxlength=${ifDefined(this.currentMaxlength ? Number(this.currentMaxlength) : undefined)}
                        step=${ifDefined(this.currentStep ? Number(this.currentStep) : undefined)}
                        autoComplete=${ifDefined((this.currentAutoComplete as MjoTextfield["autoComplete"]) || undefined)}
                        @mjo-textfield-input=${this.#logEvent}
                        @mjo-textfield-change=${this.#logEvent}
                        @mjo-textfield-focus=${this.#logEvent}
                        @mjo-textfield-blur=${this.#logEvent}
                        @mjo-textfield-keyup=${this.#logEvent}
                        @mjo-textfield-clear=${this.#logEvent}
                        @mjo-textfield-password-toggle=${this.#logEvent}
                    ></mjo-textfield>

                    <!-- Controls Section -->
                    <control-group slot="controls" label="Color" columns="2">
                        <mjo-button variant=${this.selectedColor === "primary" ? "default" : "ghost"} size="small" @click=${() => this.setColor("primary")}
                            >Primary</mjo-button
                        >
                        <mjo-button variant=${this.selectedColor === "secondary" ? "default" : "ghost"} size="small" @click=${() => this.setColor("secondary")}
                            >Secondary</mjo-button
                        >
                    </control-group>

                    <control-group slot="controls" label="Color" columns="3">
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

                    <control-group slot="controls" label="Size" columns="3">
                        ${(["small", "medium", "large"] as const).map(
                            (size) =>
                                html`<mjo-button variant=${size === this.selectedSize ? "default" : "ghost"} size="small" @click=${() => this.setSize(size)}
                                    >${size}</mjo-button
                                >`,
                        )}
                    </control-group>

                    <control-group slot="controls" label="Type" columns="3">
                        ${(["text", "password", "email", "tel", "url", "number"] as const).map(
                            (type) =>
                                html`<mjo-button variant=${type === this.selectedType ? "default" : "ghost"} size="small" @click=${() => this.setType(type)}
                                    >${type}</mjo-button
                                >`,
                        )}
                    </control-group>

                    <control-group slot="controls" label="Auto Capitalize" columns="2">
                        ${(["none", "sentences", "words", "characters"] as const).map(
                            (cap) =>
                                html`<mjo-button
                                    variant=${cap === this.autoCapitalize ? "default" : "ghost"}
                                    size="small"
                                    @click=${() => this.setAutoCapitalize(cap)}
                                    >${cap}</mjo-button
                                >`,
                        )}
                    </control-group>

                    <control-group slot="controls" label="States" columns="3">
                        <mjo-switch label="Disabled" size="small" ?checked=${this.isDisabled} @change=${this.toggleDisabled}></mjo-switch>
                        <mjo-switch label="Readonly" size="small" ?checked=${this.isReadonly} @change=${this.toggleReadonly}></mjo-switch>
                        <mjo-switch label="Fullwidth" size="small" ?checked=${this.isFullwidth} @change=${this.toggleFullwidth}></mjo-switch>
                    </control-group>

                    <control-group slot="controls" label="Features" columns="3">
                        <mjo-switch label="Auto Focus" size="small" ?checked=${this.autoFocus} @change=${this.toggleAutoFocus}></mjo-switch>
                        <mjo-switch label="Select on Focus" size="small" ?checked=${this.selectOnFocus} @change=${this.toggleSelectOnFocus}></mjo-switch>
                        <mjo-switch label="Clearable" size="small" ?checked=${this.clearabled} @change=${this.toggleClearabled}></mjo-switch>
                    </control-group>

                    <control-group slot="controls" label="Options" columns="2">
                        <mjo-switch label="No Spiners" size="small" ?checked=${this.nospiners} @change=${this.toggleNospiners}></mjo-switch>
                        <mjo-switch label="Counter" size="small" ?checked=${this.counter} @change=${this.toggleCounter}></mjo-switch>
                    </control-group>

                    <control-group slot="controls" label="Basic Content" columns="1">
                        <mjo-textfield
                            label="Value"
                            .value=${this.currentValue}
                            @input=${this.#handleValueChange}
                            size="small"
                            placeholder="Current value"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Label"
                            .value=${this.currentLabel}
                            @input=${this.#handleLabelChange}
                            size="small"
                            placeholder="Field label"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Placeholder"
                            .value=${this.currentPlaceholder}
                            @input=${this.#handlePlaceholderChange}
                            size="small"
                            placeholder="Placeholder text"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Helper Text"
                            .value=${this.currentHelperText}
                            @input=${this.#handleHelperTextChange}
                            size="small"
                            placeholder="Helper or hint text"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Name"
                            .value=${this.currentName}
                            @input=${this.#handleNameChange}
                            size="small"
                            placeholder="Field name attribute"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Icons & Images" columns="1">
                        <mjo-textfield
                            label="Start Icon"
                            .value=${this.currentStartIcon}
                            @input=${this.#handleStartIconChange}
                            size="small"
                            placeholder="e.g., user, search, email"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="End Icon"
                            .value=${this.currentEndIcon}
                            @input=${this.#handleEndIconChange}
                            size="small"
                            placeholder="e.g., check, arrow-right"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Start Image URL"
                            .value=${this.currentStartImage}
                            @input=${this.#handleStartImageChange}
                            size="small"
                            placeholder="Image URL for start position"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="End Image URL"
                            .value=${this.currentEndImage}
                            @input=${this.#handleEndImageChange}
                            size="small"
                            placeholder="Image URL for end position"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Prefix & Suffix" columns="1">
                        <mjo-textfield
                            label="Prefix Text"
                            .value=${this.currentPrefixText}
                            @input=${this.#handlePrefixTextChange}
                            size="small"
                            placeholder="Text before input"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Suffix Text"
                            .value=${this.currentSuffixText}
                            @input=${this.#handleSuffixTextChange}
                            size="small"
                            placeholder="Text after input"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Validation" columns="1">
                        <mjo-textfield
                            label="Min Value/Length"
                            .value=${this.currentMin}
                            @input=${this.#handleMinChange}
                            size="small"
                            placeholder="Minimum value or length"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Max Value/Length"
                            .value=${this.currentMax}
                            @input=${this.#handleMaxChange}
                            size="small"
                            placeholder="Maximum value or length"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Min Length"
                            .value=${this.currentMinlength}
                            @input=${this.#handleMinlengthChange}
                            size="small"
                            placeholder="Minimum text length"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Max Length"
                            .value=${this.currentMaxlength}
                            @input=${this.#handleMaxlengthChange}
                            size="small"
                            placeholder="Maximum text length"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Step"
                            .value=${this.currentStep}
                            @input=${this.#handleStepChange}
                            size="small"
                            placeholder="Step value for number inputs"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Auto Complete"
                            .value=${this.currentAutoComplete}
                            @input=${this.#handleAutoCompleteChange}
                            size="small"
                            placeholder="e.g., email, name, tel"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Actions" columns="3">
                        <mjo-button @click=${this.resetTextfield} size="small">Reset All</mjo-button>
                        <mjo-button @click=${this.loadExample} size="small" color="secondary">Load Example</mjo-button>
                        <mjo-button @click=${this.clearEventLog} size="small" variant="dashed">Clear Log</mjo-button>
                    </control-group>
                </playground-grid>

                <!-- Configuration Display -->
                <div class="config-display">
                    <h4>Current Configuration:</h4>
                    <div class="config-grid">
                        <div class="config-section">
                            <h5>Basic</h5>
                            <div class="config-values">
                                <span><strong>Value:</strong> "${this.currentValue}"</span>
                                <span><strong>Type:</strong> ${this.selectedType}</span>
                                <span><strong>Size:</strong> ${this.selectedSize}</span>
                                <span><strong>Color:</strong> ${this.selectedColor}</span>
                            </div>
                        </div>
                        <div class="config-section">
                            <h5>Features</h5>
                            <div class="config-values">
                                <span
                                    ><strong>States:</strong> ${[
                                        this.isDisabled && "Disabled",
                                        this.isReadonly && "Readonly",
                                        this.isFullwidth && "Fullwidth",
                                        this.clearabled && "Clearable",
                                        this.counter && "Counter",
                                    ]
                                        .filter(Boolean)
                                        .join(", ") || "None"}</span
                                >
                                <span
                                    ><strong>Icons:</strong> ${[this.currentStartIcon && "Start", this.currentEndIcon && "End"].filter(Boolean).join(", ") ||
                                    "None"}</span
                                >
                                <span
                                    ><strong>Prefix/Suffix:</strong> ${[this.currentPrefixText && "Prefix", this.currentSuffixText && "Suffix"]
                                        .filter(Boolean)
                                        .join(", ") || "None"}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </section-container>

            <!-- Event Demonstration -->
            <section-container label="Event Demonstration" description="Monitor textfield events in real-time">
                <div class="event-demo">
                    <div class="demo-textfields">
                        <h5>Interactive Event Test Fields:</h5>
                        <div class="demo-fields">
                            <mjo-textfield
                                label="Event Test 1"
                                placeholder="Type here to generate events"
                                clearabled
                                counter
                                maxlength="50"
                                @mjo-textfield-input=${this.#logEvent}
                                @mjo-textfield-change=${this.#logEvent}
                                @mjo-textfield-focus=${this.#logEvent}
                                @mjo-textfield-blur=${this.#logEvent}
                                @mjo-textfield-clear=${this.#logEvent}
                            ></mjo-textfield>
                            <mjo-textfield
                                label="Password Test"
                                type="password"
                                placeholder="Password field"
                                @mjo-textfield-password-toggle=${this.#logEvent}
                                @mjo-textfield-input=${this.#logEvent}
                            ></mjo-textfield>
                        </div>
                    </div>

                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div class="log-output">
                            ${this.eventLogs.length > 0 ? this.eventLogs.join("\n") : "No events yet. Try interacting with the textfields above."}
                        </div>
                    </div>
                </div>
            </section-container>

            <!-- Size Variants Showcase -->
            <section-container label="Size Variants" description="Different textfield sizes">
                <showcases-grid columns="3">
                    <mjo-textfield label="Small Size" size="small" placeholder="Small textfield" value="Small text"></mjo-textfield>
                    <mjo-textfield label="Medium Size" size="medium" placeholder="Medium textfield" value="Medium text"></mjo-textfield>
                    <mjo-textfield label="Large Size" size="large" placeholder="Large textfield" value="Large text"></mjo-textfield>
                </showcases-grid>
            </section-container>

            <!-- Type Variants Showcase -->
            <section-container label="Input Types" description="Different input types supported">
                <showcases-grid columns="3">
                    <mjo-textfield label="Text" type="text" placeholder="Enter text" startIcon="text"></mjo-textfield>
                    <mjo-textfield label="Password" type="password" placeholder="Enter password" startIcon="lock"></mjo-textfield>
                    <mjo-textfield label="Email" type="email" placeholder="Enter email" startIcon="email"></mjo-textfield>
                    <mjo-textfield label="Telephone" type="tel" placeholder="Enter phone" startIcon="phone"></mjo-textfield>
                    <mjo-textfield label="URL" type="url" placeholder="Enter URL" startIcon="link"></mjo-textfield>
                    <mjo-textfield label="Number" type="number" placeholder="Enter number" startIcon="hash" min="0" max="100"></mjo-textfield>
                </showcases-grid>
            </section-container>

            <!-- Color Variants Showcase -->
            <section-container label="Color Variants" description="Primary and secondary color schemes">
                <showcases-grid columns="2">
                    <mjo-textfield label="Primary Color" color="primary" placeholder="Primary colored field" value="Primary" startIcon="star"></mjo-textfield>
                    <mjo-textfield
                        label="Secondary Color"
                        color="secondary"
                        placeholder="Secondary colored field"
                        value="Secondary"
                        startIcon="heart"
                    ></mjo-textfield>
                </showcases-grid>
            </section-container>

            <!-- Icon Examples -->
            <section-container label="Icon Examples" description="Textfields with various icons">
                <showcases-grid columns="2">
                    <mjo-textfield label="Search" startIcon="search" placeholder="Search something..." clearabled></mjo-textfield>
                    <mjo-textfield label="User" startIcon="user" endIcon="check" placeholder="Username" value="john_doe"></mjo-textfield>
                    <mjo-textfield label="Email" startIcon="email" placeholder="your@email.com" type="email"></mjo-textfield>
                    <mjo-textfield label="Location" startIcon="location" endIcon="arrow-right" placeholder="Enter location"></mjo-textfield>
                </showcases-grid>
            </section-container>

            <!-- Prefix/Suffix Examples -->
            <section-container label="Prefix & Suffix Text" description="Text elements before and after input">
                <showcases-grid columns="2">
                    <mjo-textfield label="Website" prefixText="https://" placeholder="example.com" suffixText=".com"></mjo-textfield>
                    <mjo-textfield label="Price" prefixText="$" placeholder="0.00" type="number" step="0.01"></mjo-textfield>
                    <mjo-textfield label="Weight" placeholder="70" suffixText="kg" type="number"></mjo-textfield>
                    <mjo-textfield label="Percentage" placeholder="50" suffixText="%" type="number" min="0" max="100"></mjo-textfield>
                </showcases-grid>
            </section-container>

            <!-- Helper Text & Validation -->
            <section-container label="Helper Text & Validation" description="Fields with helper text and validation">
                <showcases-grid columns="2">
                    <mjo-textfield
                        label="Username"
                        placeholder="Enter username"
                        helperText="Must be at least 3 characters long"
                        minlength="3"
                        counter
                        maxlength="20"
                    ></mjo-textfield>
                    <mjo-textfield
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        helperText="Must contain at least 8 characters"
                        minlength="8"
                        counter
                        maxlength="50"
                    ></mjo-textfield>
                    <mjo-textfield
                        label="Age"
                        type="number"
                        placeholder="Enter your age"
                        helperText="Must be between 18 and 100"
                        min="18"
                        max="100"
                    ></mjo-textfield>
                    <mjo-textfield label="Phone" type="tel" placeholder="(555) 123-4567" helperText="Enter your phone number" startIcon="phone"></mjo-textfield>
                </showcases-grid>
            </section-container>

            <!-- States Showcase -->
            <section-container label="States & Features" description="Different states and special features">
                <showcases-grid columns="2">
                    <mjo-textfield label="Normal" placeholder="Normal state" value="Normal text"></mjo-textfield>
                    <mjo-textfield label="Disabled" placeholder="Disabled state" value="Disabled text" disabled></mjo-textfield>
                    <mjo-textfield label="Readonly" placeholder="Readonly state" value="Readonly text" readonly></mjo-textfield>
                    <mjo-textfield label="Clearable" placeholder="With clear button" value="Clear me" clearabled></mjo-textfield>
                    <mjo-textfield label="Counter" placeholder="With character counter" helperText="Type some text" counter maxlength="100"></mjo-textfield>
                    <mjo-textfield
                        label="Select on Focus"
                        placeholder="Click to see selection"
                        value="This text will be selected"
                        selectOnFocus
                    ></mjo-textfield>
                </showcases-grid>
            </section-container>

            <!-- Form Integration -->
            <section-container label="Form Integration" description="Textfields in form context">
                <mjo-form>
                    <mjo-grid columns="2" gap="20px">
                        <mjo-textfield label="First Name" name="firstName" placeholder="Enter first name" required clearabled></mjo-textfield>
                        <mjo-textfield label="Last Name" name="lastName" placeholder="Enter last name" required clearabled></mjo-textfield>
                        <mjo-textfield label="Email" name="email" type="email" placeholder="your@email.com" required startIcon="email"></mjo-textfield>
                        <mjo-textfield label="Phone" name="phone" type="tel" placeholder="(555) 123-4567" startIcon="phone"></mjo-textfield>
                        <div style="grid-column: 1 / -1;">
                            <mjo-textfield label="Address" name="address" placeholder="Enter your address" fullwidth startIcon="location"></mjo-textfield>
                        </div>
                    </mjo-grid>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Submit Form</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset Form</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <!-- Fullwidth Example -->
            <section-container label="Full Width" description="Textfields that span the full container width">
                <div class="fullwidth-demo">
                    <mjo-textfield
                        label="Full Width Field"
                        placeholder="This field spans the full width of its container"
                        fullwidth
                        startIcon="expand"
                        helperText="This textfield adapts to its container width"
                    ></mjo-textfield>
                </div>
            </section-container>
        `;
    }

    private setColor(color: "primary" | "secondary") {
        this.selectedColor = color;
    }

    private setVariant(variant: MjoTextfield["variant"]) {
        this.selectedVariant = variant;
    }

    private setSize(size: "small" | "medium" | "large") {
        this.selectedSize = size;
    }

    private setType(type: "text" | "password" | "email" | "tel" | "url" | "number") {
        this.selectedType = type;
    }

    private setAutoCapitalize(cap: "none" | "sentences" | "words" | "characters") {
        this.autoCapitalize = cap;
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

    private toggleAutoFocus() {
        this.autoFocus = !this.autoFocus;
    }

    private toggleSelectOnFocus() {
        this.selectOnFocus = !this.selectOnFocus;
    }

    private toggleClearabled() {
        this.clearabled = !this.clearabled;
    }

    private toggleNospiners() {
        this.nospiners = !this.nospiners;
    }

    private toggleCounter() {
        this.counter = !this.counter;
    }

    private resetTextfield() {
        this.selectedColor = "primary";
        this.selectedSize = "medium";
        this.selectedType = "text";
        this.autoCapitalize = "none";
        this.isDisabled = false;
        this.isReadonly = false;
        this.isFullwidth = false;
        this.autoFocus = false;
        this.selectOnFocus = false;
        this.clearabled = false;
        this.nospiners = false;
        this.counter = false;
        this.currentValue = "";
        this.currentLabel = "Label";
        this.currentPlaceholder = "Enter text...";
        this.currentHelperText = "";
        this.currentName = "example-field";
        this.currentStartIcon = "";
        this.currentEndIcon = "";
        this.currentStartImage = "";
        this.currentEndImage = "";
        this.currentPrefixText = "";
        this.currentSuffixText = "";
        this.currentMin = "";
        this.currentMax = "";
        this.currentMinlength = "";
        this.currentMaxlength = "";
        this.currentStep = "";
        this.currentAutoComplete = "";
    }

    private loadExample() {
        this.selectedColor = "primary";
        this.selectedSize = "medium";
        this.selectedType = "email";
        this.currentValue = "john.doe@example.com";
        this.currentLabel = "Email Address";
        this.currentPlaceholder = "Enter your email";
        this.currentHelperText = "We'll never share your email";
        this.currentStartIcon = "email";
        this.clearabled = true;
        this.counter = true;
        this.currentMaxlength = "50";
        this.currentAutoComplete = "email";
    }

    private clearEventLog() {
        this.eventLogs = [];
    }

    // Event handlers for controls
    #handleValueChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentValue = target.value;
    };

    #handleLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentLabel = target.value;
    };

    #handlePlaceholderChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentPlaceholder = target.value;
    };

    #handleHelperTextChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentHelperText = target.value;
    };

    #handleNameChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentName = target.value;
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

    #handlePrefixTextChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentPrefixText = target.value;
    };

    #handleSuffixTextChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentSuffixText = target.value;
    };

    #handleMinChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMin = target.value;
    };

    #handleMaxChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMax = target.value;
    };

    #handleMinlengthChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMinlength = target.value;
    };

    #handleMaxlengthChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMaxlength = target.value;
    };

    #handleStepChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentStep = target.value;
    };

    #handleAutoCompleteChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentAutoComplete = target.value;
    };

    #logEvent = (event: CustomEvent) => {
        const timestamp = new Date().toLocaleTimeString();
        const eventType = event.type;

        // Create a safe copy of event detail for logging
        const safeDetail = {
            value: event.detail.value,
            previousValue: event.detail.previousValue,
            key: event.detail.key,
            code: event.detail.code,
            inputType: event.detail.inputType,
            visible: event.detail.visible,
            type: event.detail.type,
            message: event.detail.message,
            elementName: (event.target as HTMLElement)?.tagName?.toLowerCase() || "unknown",
        };

        // Remove undefined properties
        Object.keys(safeDetail).forEach((key) => {
            if (safeDetail[key as keyof typeof safeDetail] === undefined) {
                delete safeDetail[key as keyof typeof safeDetail];
            }
        });

        const logEntry = `[${timestamp}] ${eventType}: ${JSON.stringify(safeDetail)}`;
        this.eventLogs = [logEntry, ...this.eventLogs.slice(0, 14)]; // Keep last 15 events
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
                margin: 0 0 16px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
            }

            .config-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }

            .config-section h5 {
                margin: 0 0 8px 0;
                color: var(--mjo-foreground-color, #222);
                font-size: 1em;
                font-weight: 600;
            }

            .config-values {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .config-values span {
                font-size: 0.9rem;
                color: var(--mjo-foreground-color, #333);
            }

            .config-values strong {
                color: var(--mjo-foreground-color, #222);
                font-weight: 600;
                margin-right: 8px;
            }

            .event-demo {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .demo-textfields h5 {
                margin: 0 0 12px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1em;
            }

            .demo-fields {
                display: grid;
                grid-template-columns: 1fr 1fr;
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
                min-height: 60px;
            }

            .form-actions {
                display: flex;
                gap: 12px;
                margin-top: 20px;
                flex-wrap: wrap;
            }

            .fullwidth-demo {
                width: 100%;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
                }

                .config-grid {
                    grid-template-columns: 1fr;
                    gap: 16px;
                }

                .demo-fields {
                    grid-template-columns: 1fr;
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
        "textfield-component": TextfieldComponent;
    }
}
