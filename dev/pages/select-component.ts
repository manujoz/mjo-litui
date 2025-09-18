import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import "../../src/components/select/mjo-option.js";
import "../../src/mjo-button.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-select.js";
import "../../src/mjo-textfield.js";

import { MjoSelect } from "../../src/mjo-select.js";
import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("select-component")
export class SelectComponent extends LitElement {
    @state() private selectedColor: "primary" | "secondary" = "primary";
    @state() private selectedVariant: MjoSelect["variant"] = "default";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private isDisabled = false;
    @state() private isRequired = false;
    @state() private isFullwidth = false;
    @state() private isSearchable = false;
    @state() private isAutoFocus = false;
    @state() private isSelectOnFocus = false;
    @state() private currentValue = "option2";
    @state() private currentName = "demo-select";
    @state() private currentLabel = "Select an option";
    @state() private currentPlaceholder = "Choose an option...";
    @state() private currentHelperText = "Please select one of the available options";
    @state() private currentStartIcon = "";
    @state() private currentEndIcon = "";
    @state() private currentStartImage = "";
    @state() private currentEndImage = "";
    @state() private currentPrefixText = "";
    @state() private currentSuffixText = "";
    @state() private currentAriaDescribedby = "";
    @state() private currentAriaLabelledby = "";

    render() {
        return html`
            <h1>Select Component Examples</h1>

            <section-container label="Interactive Select Playground">
                <playground-grid>
                    <mjo-select
                        slot="demo"
                        id="playground-select"
                        variant=${this.selectedVariant}
                        .value=${this.currentValue}
                        .name=${this.currentName}
                        .label=${this.currentLabel}
                        .placeholder=${this.currentPlaceholder}
                        .helperText=${this.currentHelperText}
                        startIcon=${ifDefined(this.currentStartIcon || undefined)}
                        endIcon=${ifDefined(this.currentEndIcon || undefined)}
                        startImage=${ifDefined(this.currentStartImage || undefined)}
                        endImage=${ifDefined(this.currentEndImage || undefined)}
                        prefixText=${ifDefined(this.currentPrefixText || undefined)}
                        suffixText=${ifDefined(this.currentSuffixText || undefined)}
                        .color=${this.selectedColor}
                        .size=${this.selectedSize}
                        aria-describedby=${ifDefined(this.currentAriaDescribedby || undefined)}
                        aria-labelledby=${ifDefined(this.currentAriaLabelledby || undefined)}
                        ?disabled=${this.isDisabled}
                        ?required=${this.isRequired}
                        ?fullwidth=${this.isFullwidth}
                        ?searchable=${this.isSearchable}
                        ?autoFocus=${this.isAutoFocus}
                        ?selectOnFocus=${this.isSelectOnFocus}
                        @mjo-select:change=${this.#handleSelectChange}
                        @mjo-select:open=${this.#handleSelectOpen}
                        @mjo-select:close=${this.#handleSelectClose}
                        @mjo-select:search=${this.#handleSelectSearch}
                        @mjo-select:focus=${this.#handleSelectFocus}
                        @mjo-select:blur=${this.#handleSelectBlur}
                    >
                        <mjo-option value="option1" text="First Option"></mjo-option>
                        <mjo-option value="option2" text="Second Option"></mjo-option>
                        <mjo-option value="option3" text="Third Option"></mjo-option>
                        <mjo-option value="option4" text="Option with Image"></mjo-option>
                        <mjo-option value="option5" text="Last Option"></mjo-option>
                    </mjo-select>

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

                    <control-group slot="controls" label="States" columns="2">
                        <mjo-button size="small" variant=${this.isDisabled ? "default" : "ghost"} @click=${() => this.toggleDisabled()}> Disabled </mjo-button>
                        <mjo-button size="small" variant=${this.isRequired ? "default" : "ghost"} @click=${() => this.toggleRequired()}> Required </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Layout" columns="1">
                        <mjo-button size="small" variant=${this.isFullwidth ? "default" : "ghost"} @click=${() => this.toggleFullwidth()}>
                            Full Width
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Features" columns="2">
                        <mjo-button size="small" variant=${this.isSearchable ? "default" : "ghost"} @click=${() => this.toggleSearchable()}>
                            Searchable
                        </mjo-button>
                        <mjo-button size="small" variant=${this.isAutoFocus ? "default" : "ghost"} @click=${() => this.toggleAutoFocus()}>
                            Auto Focus
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Focus Behavior" columns="1">
                        <mjo-button size="small" variant=${this.isSelectOnFocus ? "default" : "ghost"} @click=${() => this.toggleSelectOnFocus()}>
                            Select on Focus
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Basic Settings" columns="1">
                        <mjo-textfield
                            label="Label"
                            .value=${this.currentLabel}
                            @input=${this.#handleLabelChange}
                            size="small"
                            placeholder="Enter label text"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Placeholder"
                            .value=${this.currentPlaceholder}
                            @input=${this.#handlePlaceholderChange}
                            size="small"
                            placeholder="Enter placeholder text"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Helper Text"
                            .value=${this.currentHelperText}
                            @input=${this.#handleHelperTextChange}
                            size="small"
                            placeholder="Enter helper text"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Name"
                            .value=${this.currentName}
                            @input=${this.#handleNameChange}
                            size="small"
                            placeholder="Enter input name"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Icons & Images" columns="1">
                        <mjo-textfield
                            label="Start Icon"
                            .value=${this.currentStartIcon}
                            @input=${this.#handleStartIconChange}
                            size="small"
                            placeholder="e.g. mjo-icons:user"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="End Icon"
                            .value=${this.currentEndIcon}
                            @input=${this.#handleEndIconChange}
                            size="small"
                            placeholder="e.g. mjo-icons:search"
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

                    <control-group slot="controls" label="Text Affixes" columns="1">
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

                    <control-group slot="controls" label="Accessibility" columns="1">
                        <mjo-textfield
                            label="Aria Describedby"
                            .value=${this.currentAriaDescribedby}
                            @input=${this.#handleAriaDescribedbyChange}
                            size="small"
                            placeholder="ID of describing element"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Aria Labelledby"
                            .value=${this.currentAriaLabelledby}
                            @input=${this.#handleAriaLabelledbyChange}
                            size="small"
                            placeholder="ID of labeling element"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Quick Actions" columns="1">
                        <mjo-button size="small" color="success" @click=${this.loadSampleData}> Load Sample Data </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.resetSelect}> Reset All </mjo-button>
                        <mjo-button size="small" color="warning" @click=${this.toggleValidationState}> Toggle Validation </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="config-display">
                    <h4>Current Configuration:</h4>
                    <div class="config-values">
                        <span><strong>Value:</strong> ${this.currentValue || "None"}</span>
                        <span><strong>Label:</strong> ${this.currentLabel || "None"}</span>
                        <span><strong>Size:</strong> ${this.selectedSize}</span>
                        <span><strong>Color:</strong> ${this.selectedColor}</span>
                        <span
                            ><strong>States:</strong> ${[
                                this.isDisabled && "Disabled",
                                this.isRequired && "Required",
                                this.isFullwidth && "Full Width",
                                this.isSearchable && "Searchable",
                                this.isAutoFocus && "Auto Focus",
                                this.isSelectOnFocus && "Select on Focus",
                            ]
                                .filter(Boolean)
                                .join(", ") || "None"}</span
                        >
                    </div>
                </div>
            </section-container>

            <section-container label="Basic Usage Examples" description="Common select implementations with different option types.">
                <showcases-grid columns="2">
                    <mjo-select label="Simple Select" placeholder="Choose an option" size="medium" color="primary">
                        <mjo-option value="option1" text="First Option"></mjo-option>
                        <mjo-option value="option2" text="Second Option"></mjo-option>
                        <mjo-option value="option3" text="Third Option"></mjo-option>
                    </mjo-select>

                    <mjo-select label="With Icons" placeholder="Select with icons" size="medium" color="secondary">
                        <mjo-option value="home" text="Home" startIcon="mjo-icons:home"></mjo-option>
                        <mjo-option value="profile" text="Profile" startIcon="mjo-icons:user"></mjo-option>
                        <mjo-option value="settings" text="Settings" startIcon="mjo-icons:settings"></mjo-option>
                        <mjo-option value="logout" text="Logout" startIcon="mjo-icons:logout"></mjo-option>
                    </mjo-select>
                </showcases-grid>
            </section-container>

            <section-container label="Different Sizes">
                <showcases-grid columns="3">
                    <mjo-select label="Small" size="small" color="primary" value="option2">
                        <mjo-option value="option1" text="Small Option 1"></mjo-option>
                        <mjo-option value="option2" text="Small Option 2"></mjo-option>
                        <mjo-option value="option3" text="Small Option 3"></mjo-option>
                    </mjo-select>

                    <mjo-select label="Medium" size="medium" color="primary" value="option2">
                        <mjo-option value="option1" text="Medium Option 1"></mjo-option>
                        <mjo-option value="option2" text="Medium Option 2"></mjo-option>
                        <mjo-option value="option3" text="Medium Option 3"></mjo-option>
                    </mjo-select>

                    <mjo-select label="Large" size="large" color="primary" value="option2">
                        <mjo-option value="option1" text="Large Option 1"></mjo-option>
                        <mjo-option value="option2" text="Large Option 2"></mjo-option>
                        <mjo-option value="option3" text="Large Option 3"></mjo-option>
                    </mjo-select>
                </showcases-grid>
            </section-container>

            <section-container label="Color Variants">
                <showcases-grid columns="2">
                    <mjo-select label="Primary Color" color="primary" value="primary">
                        <mjo-option value="primary" text="Primary Option"></mjo-option>
                        <mjo-option value="alternate" text="Alternative Option"></mjo-option>
                    </mjo-select>

                    <mjo-select label="Secondary Color" color="secondary" value="secondary">
                        <mjo-option value="secondary" text="Secondary Option"></mjo-option>
                        <mjo-option value="alternate" text="Alternative Option"></mjo-option>
                    </mjo-select>
                </showcases-grid>
            </section-container>

            <section-container label="Rich Content Options">
                <showcases-grid columns="1">
                    <mjo-select label="Countries" placeholder="Select a country" searchable fullwidth>
                        <mjo-option value="us" text="United States" startImage="https://flagcdn.com/w20/us.png"></mjo-option>
                        <mjo-option value="uk" text="United Kingdom" startImage="https://flagcdn.com/w20/gb.png"></mjo-option>
                        <mjo-option value="fr" text="France" startImage="https://flagcdn.com/w20/fr.png"></mjo-option>
                        <mjo-option value="de" text="Germany" startImage="https://flagcdn.com/w20/de.png"></mjo-option>
                        <mjo-option value="es" text="Spain" startImage="https://flagcdn.com/w20/es.png"></mjo-option>
                        <mjo-option value="it" text="Italy" startImage="https://flagcdn.com/w20/it.png"></mjo-option>
                        <mjo-option value="jp" text="Japan" startImage="https://flagcdn.com/w20/jp.png"></mjo-option>
                        <mjo-option value="cn" text="China" startImage="https://flagcdn.com/w20/cn.png"></mjo-option>
                    </mjo-select>
                </showcases-grid>
            </section-container>

            <section-container label="With Prefix and Suffix">
                <showcases-grid columns="2">
                    <mjo-select label="Currency" prefixText="$" suffixText="USD">
                        <mjo-option value="100" text="100"></mjo-option>
                        <mjo-option value="500" text="500"></mjo-option>
                        <mjo-option value="1000" text="1000"></mjo-option>
                    </mjo-select>

                    <mjo-select label="File Type" startIcon="mjo-icons:file" endIcon="mjo-icons:arrow-down">
                        <mjo-option value="pdf" text="PDF Document" startIcon="mjo-icons:file-pdf"></mjo-option>
                        <mjo-option value="doc" text="Word Document" startIcon="mjo-icons:file-word"></mjo-option>
                        <mjo-option value="xls" text="Excel Spreadsheet" startIcon="mjo-icons:file-excel"></mjo-option>
                        <mjo-option value="ppt" text="PowerPoint" startIcon="mjo-icons:file-powerpoint"></mjo-option>
                    </mjo-select>
                </showcases-grid>
            </section-container>

            <section-container label="Searchable Select">
                <showcases-grid columns="1">
                    <mjo-select
                        label="Programming Languages"
                        placeholder="Search and select a language..."
                        searchable
                        fullwidth
                        helperText="Start typing to filter the options"
                    >
                        <mjo-option value="javascript" text="JavaScript" startIcon="mjo-icons:code"></mjo-option>
                        <mjo-option value="typescript" text="TypeScript" startIcon="mjo-icons:code"></mjo-option>
                        <mjo-option value="python" text="Python" startIcon="mjo-icons:code"></mjo-option>
                        <mjo-option value="java" text="Java" startIcon="mjo-icons:code"></mjo-option>
                        <mjo-option value="csharp" text="C#" startIcon="mjo-icons:code"></mjo-option>
                        <mjo-option value="php" text="PHP" startIcon="mjo-icons:code"></mjo-option>
                        <mjo-option value="ruby" text="Ruby" startIcon="mjo-icons:code"></mjo-option>
                        <mjo-option value="go" text="Go" startIcon="mjo-icons:code"></mjo-option>
                        <mjo-option value="rust" text="Rust" startIcon="mjo-icons:code"></mjo-option>
                        <mjo-option value="swift" text="Swift" startIcon="mjo-icons:code"></mjo-option>
                    </mjo-select>
                </showcases-grid>
            </section-container>

            <section-container label="States">
                <showcases-grid columns="2">
                    <mjo-select label="Normal Select" color="primary">
                        <mjo-option value="option1" text="Option 1"></mjo-option>
                        <mjo-option value="option2" text="Option 2"></mjo-option>
                    </mjo-select>

                    <mjo-select label="Disabled Select" disabled>
                        <mjo-option value="option1" text="Option 1"></mjo-option>
                        <mjo-option value="option2" text="Option 2"></mjo-option>
                    </mjo-select>
                </showcases-grid>

                <showcases-grid columns="1">
                    <mjo-select label="Required Select" required helperText="This field is required">
                        <mjo-option value="option1" text="Option 1"></mjo-option>
                        <mjo-option value="option2" text="Option 2"></mjo-option>
                    </mjo-select>
                </showcases-grid>
            </section-container>

            <section-container label="Form Integration Example">
                <mjo-form>
                    <mjo-grid columns="2" gap="20px">
                        <mjo-select label="Category" name="category" required color="primary">
                            <mjo-option value="electronics" text="Electronics" startIcon="mjo-icons:devices"></mjo-option>
                            <mjo-option value="clothing" text="Clothing" startIcon="mjo-icons:shirt"></mjo-option>
                            <mjo-option value="books" text="Books" startIcon="mjo-icons:book"></mjo-option>
                            <mjo-option value="sports" text="Sports" startIcon="mjo-icons:sports"></mjo-option>
                        </mjo-select>

                        <mjo-select label="Priority" name="priority" required color="secondary">
                            <mjo-option value="low" text="Low Priority" startIcon="mjo-icons:arrow-down"></mjo-option>
                            <mjo-option value="medium" text="Medium Priority" startIcon="mjo-icons:minus"></mjo-option>
                            <mjo-option value="high" text="High Priority" startIcon="mjo-icons:arrow-up"></mjo-option>
                        </mjo-select>
                    </mjo-grid>

                    <mjo-select label="Location" name="location" searchable fullwidth helperText="Search for your location" placeholder="Type to search...">
                        <mjo-option value="ny" text="New York, NY" startIcon="mjo-icons:location"></mjo-option>
                        <mjo-option value="la" text="Los Angeles, CA" startIcon="mjo-icons:location"></mjo-option>
                        <mjo-option value="chicago" text="Chicago, IL" startIcon="mjo-icons:location"></mjo-option>
                        <mjo-option value="houston" text="Houston, TX" startIcon="mjo-icons:location"></mjo-option>
                        <mjo-option value="phoenix" text="Phoenix, AZ" startIcon="mjo-icons:location"></mjo-option>
                        <mjo-option value="philadelphia" text="Philadelphia, PA" startIcon="mjo-icons:location"></mjo-option>
                    </mjo-select>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Submit Form</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <div class="demo-selects">
                        <mjo-select
                            id="event-select-1"
                            label="Events Test"
                            color="primary"
                            searchable
                            @mjo-select:change=${this.#logEvent}
                            @mjo-select:open=${this.#logEvent}
                            @mjo-select:close=${this.#logEvent}
                            @mjo-select:search=${this.#logEvent}
                            @mjo-select:focus=${this.#logEvent}
                            @mjo-select:blur=${this.#logEvent}
                        >
                            <mjo-option value="event1" text="First Event Option"></mjo-option>
                            <mjo-option value="event2" text="Second Event Option"></mjo-option>
                            <mjo-option value="event3" text="Third Event Option"></mjo-option>
                        </mjo-select>
                    </div>

                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div id="event-output" class="log-output">Interact with the select above to see events...</div>
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

    private setVariant(variant: MjoSelect["variant"]) {
        this.selectedVariant = variant;
    }

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    private toggleRequired() {
        this.isRequired = !this.isRequired;
    }

    private toggleFullwidth() {
        this.isFullwidth = !this.isFullwidth;
    }

    private toggleSearchable() {
        this.isSearchable = !this.isSearchable;
    }

    private toggleAutoFocus() {
        this.isAutoFocus = !this.isAutoFocus;
    }

    private toggleSelectOnFocus() {
        this.isSelectOnFocus = !this.isSelectOnFocus;
    }

    private loadSampleData() {
        this.currentLabel = "Sample Select";
        this.currentPlaceholder = "Choose from sample options...";
        this.currentHelperText = "This is a sample select with predefined options";
        this.currentStartIcon = "mjo-icons:star";
        this.currentPrefixText = "Select:";
        this.isSearchable = true;
        this.isFullwidth = true;
    }

    private resetSelect() {
        this.currentValue = "option2";
        this.currentName = "demo-select";
        this.currentLabel = "Select an option";
        this.currentPlaceholder = "Choose an option...";
        this.currentHelperText = "Please select one of the available options";
        this.currentStartIcon = "";
        this.currentEndIcon = "";
        this.currentStartImage = "";
        this.currentEndImage = "";
        this.currentPrefixText = "";
        this.currentSuffixText = "";
        this.currentAriaDescribedby = "";
        this.currentAriaLabelledby = "";
        this.selectedColor = "primary";
        this.selectedSize = "medium";
        this.isDisabled = false;
        this.isRequired = false;
        this.isFullwidth = false;
        this.isSearchable = false;
        this.isAutoFocus = false;
        this.isSelectOnFocus = false;
    }

    private toggleValidationState() {
        const select = this.shadowRoot?.querySelector("#playground-select") as any;
        if (select) {
            if (select.errormsg) {
                select.errormsg = "";
                select.successmsg = "Selection is valid!";
            } else if (select.successmsg) {
                select.successmsg = "";
            } else {
                select.errormsg = "Please select a valid option";
            }
        }
    }

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

    #handleAriaDescribedbyChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentAriaDescribedby = target.value;
    };

    #handleAriaLabelledbyChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentAriaLabelledby = target.value;
    };

    #handleSelectChange = (event: CustomEvent) => {
        this.currentValue = event.detail.value;
        console.log("Select changed:", event.detail);
    };

    #handleSelectOpen = (event: CustomEvent) => {
        console.log("Select opened:", event.detail);
    };

    #handleSelectClose = (event: CustomEvent) => {
        console.log("Select closed:", event.detail);
    };

    #handleSelectSearch = (event: CustomEvent) => {
        console.log("Select search:", event.detail);
    };

    #handleSelectFocus = (event: CustomEvent) => {
        console.log("Select focused:", event.detail);
    };

    #handleSelectBlur = (event: CustomEvent) => {
        console.log("Select blurred:", event.detail);
    };

    #logEvent = (event: CustomEvent) => {
        const output = this.shadowRoot?.querySelector("#event-output");
        if (output) {
            const time = new Date().toLocaleTimeString();

            // Create a safe copy of event.detail
            const safeDetail = {
                value: event.detail.value,
                option: event.detail.option?.text || event.detail.option?.value,
                query: event.detail.query,
                reason: event.detail.reason,
                elementId: (event.target as Element)?.id || "unknown",
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

            .demo-selects {
                display: flex;
                gap: 16px;
                align-items: flex-start;
                flex-wrap: wrap;
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

                .demo-selects {
                    gap: 12px;
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
        "select-component": SelectComponent;
    }
}
