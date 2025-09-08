import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-accordion.js";
import "../../src/mjo-button.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-textfield.js";

import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("accordion-component")
export class AccordionComponent extends LitElement {
    @state() private selectedVariant: "light" | "shadow" | "bordered" | "splitted" = "light";
    @state() private selectionMode: "single" | "multiple" = "single";
    @state() private isCompact = false;
    @state() private firstItemDisabled = false;
    @state() private firstItemExpanded = false;
    @state() private secondItemExpanded = false;
    @state() private thirdItemExpanded = false;
    @state() private customTitle1 = "Accordion Item 1";
    @state() private customTitle2 = "Accordion Item 2";
    @state() private customTitle3 = "Accordion Item 3";
    @state() private customSubtitle1 = "Subtitle for first item";
    @state() private customSubtitle2 = "";
    @state() private customSubtitle3 = "Subtitle for third item";

    render() {
        return html`
            <h1>Accordion Component Examples</h1>

            <section-container label="Interactive Accordion Playground">
                <playground-grid>
                    <mjo-accordion
                        slot="demo"
                        id="playground-accordion"
                        .variant=${this.selectedVariant}
                        .selectionMode=${this.selectionMode}
                        ?compact=${this.isCompact}
                        @mjo-accordion:toggle=${this.#handleAccordionToggle}
                        @mjo-accordion:will-expand=${this.#logEvent}
                        @mjo-accordion:expanded=${this.#logEvent}
                        @mjo-accordion:will-collapse=${this.#logEvent}
                        @mjo-accordion:collapsed=${this.#logEvent}
                    >
                        <mjo-accordion-item
                            .itemTitle=${this.customTitle1}
                            .itemSubtitle=${this.customSubtitle1}
                            ?disabled=${this.firstItemDisabled}
                            ?expanded=${this.firstItemExpanded}
                        >
                            <div style="padding: 16px;">
                                <p>This is the content of the first accordion item. It can contain any HTML content.</p>
                                <mjo-button size="small" color="primary">Action Button</mjo-button>
                            </div>
                        </mjo-accordion-item>

                        <mjo-accordion-item .itemTitle=${this.customTitle2} .itemSubtitle=${this.customSubtitle2} ?expanded=${this.secondItemExpanded}>
                            <div style="padding: 16px;">
                                <p>Second accordion item with more detailed content. You can include lists, images, forms, or any other HTML elements.</p>
                                <ul>
                                    <li>Feature 1</li>
                                    <li>Feature 2</li>
                                    <li>Feature 3</li>
                                </ul>
                            </div>
                        </mjo-accordion-item>

                        <mjo-accordion-item .itemTitle=${this.customTitle3} .itemSubtitle=${this.customSubtitle3} ?expanded=${this.thirdItemExpanded}>
                            <div style="padding: 16px;">
                                <p>Third accordion item demonstrating how multiple items work together.</p>
                                <mjo-textfield label="Example input" size="small"></mjo-textfield>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>

                    <control-group slot="controls" label="Variant" columns="2">
                        <mjo-button size="small" variant=${this.selectedVariant === "light" ? "default" : "ghost"} @click=${() => this.setVariant("light")}>
                            Light
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedVariant === "shadow" ? "default" : "ghost"} @click=${() => this.setVariant("shadow")}>
                            Shadow
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.selectedVariant === "bordered" ? "default" : "ghost"}
                            @click=${() => this.setVariant("bordered")}
                        >
                            Bordered
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.selectedVariant === "splitted" ? "default" : "ghost"}
                            @click=${() => this.setVariant("splitted")}
                        >
                            Splitted
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Selection Mode" columns="2">
                        <mjo-button
                            size="small"
                            variant=${this.selectionMode === "single" ? "default" : "ghost"}
                            @click=${() => this.setSelectionMode("single")}
                        >
                            Single
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.selectionMode === "multiple" ? "default" : "ghost"}
                            @click=${() => this.setSelectionMode("multiple")}
                        >
                            Multiple
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Options" columns="2">
                        <mjo-button size="small" variant=${this.isCompact ? "default" : "ghost"} @click=${() => this.toggleCompact()}> Compact </mjo-button>
                        <mjo-button size="small" variant=${this.firstItemDisabled ? "default" : "ghost"} @click=${() => this.toggleFirstItemDisabled()}>
                            Disable First
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Expand/Collapse" columns="2">
                        <mjo-button size="small" color="success" @click=${this.expandAll}> Expand All </mjo-button>
                        <mjo-button size="small" color="error" @click=${this.collapseAll}> Collapse All </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Item Titles" columns="1">
                        <mjo-textfield label="First Item Title" .value=${this.customTitle1} @input=${this.#handleTitle1Change} size="small"></mjo-textfield>
                        <mjo-textfield label="Second Item Title" .value=${this.customTitle2} @input=${this.#handleTitle2Change} size="small"></mjo-textfield>
                        <mjo-textfield label="Third Item Title" .value=${this.customTitle3} @input=${this.#handleTitle3Change} size="small"></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Item Subtitles" columns="1">
                        <mjo-textfield
                            label="First Item Subtitle"
                            .value=${this.customSubtitle1}
                            @input=${this.#handleSubtitle1Change}
                            size="small"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Second Item Subtitle"
                            .value=${this.customSubtitle2}
                            @input=${this.#handleSubtitle2Change}
                            size="small"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Third Item Subtitle"
                            .value=${this.customSubtitle3}
                            @input=${this.#handleSubtitle3Change}
                            size="small"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Actions" columns="1">
                        <mjo-button size="small" color="success" @click=${this.resetAccordion}> Reset to Defaults </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.randomizeStates}> Randomize States </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="value-display">
                    <h4>Current State:</h4>
                    <div class="values">
                        <span><strong>Variant:</strong> ${this.selectedVariant}</span>
                        <span><strong>Selection Mode:</strong> ${this.selectionMode}</span>
                        <span><strong>Compact:</strong> ${this.isCompact}</span>
                        <span><strong>First Item Disabled:</strong> ${this.firstItemDisabled}</span>
                        <span><strong>Expanded Items:</strong> ${this.getExpandedItemsStatus()}</span>
                    </div>
                </div>
            </section-container>

            <section-container label="Basic Usage Examples" description="Simple accordion implementations for common use cases.">
                <showcases-grid columns="2">
                    <mjo-accordion variant="light" selectionMode="single">
                        <mjo-accordion-item itemTitle="General Information" expanded>
                            <div style="padding: 16px;">
                                <p>Basic information about our services and policies.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Contact Details">
                            <div style="padding: 16px;">
                                <p>How to get in touch with our support team.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Frequently Asked Questions">
                            <div style="padding: 16px;">
                                <p>Answers to the most common questions.</p>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>

                    <mjo-accordion variant="shadow" selectionMode="single">
                        <mjo-accordion-item itemTitle="Account Settings" itemSubtitle="Manage your profile">
                            <div style="padding: 16px;">
                                <p>Update your account information and preferences.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Privacy & Security" itemSubtitle="Control your data">
                            <div style="padding: 16px;">
                                <p>Manage your privacy settings and security options.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Notifications" itemSubtitle="Communication preferences">
                            <div style="padding: 16px;">
                                <p>Choose how and when you receive notifications.</p>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </showcases-grid>
            </section-container>

            <section-container label="Variant Styles" description="Different visual styles for accordions.">
                <showcases-grid columns="2">
                    <mjo-accordion variant="bordered" selectionMode="single">
                        <mjo-accordion-item itemTitle="Bordered Style">
                            <div style="padding: 16px;">
                                <p>Accordion with bordered variant styling.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Clean Lines">
                            <div style="padding: 16px;">
                                <p>Provides clear visual separation between items.</p>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>

                    <mjo-accordion variant="splitted" selectionMode="single">
                        <mjo-accordion-item itemTitle="Splitted Style">
                            <div style="padding: 16px;">
                                <p>Each item appears as a separate card.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Card Layout">
                            <div style="padding: 16px;">
                                <p>Great for modern, spaced-out designs.</p>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </showcases-grid>
            </section-container>

            <section-container label="Selection Modes" description="Single vs multiple item expansion.">
                <showcases-grid columns="2">
                    <mjo-accordion variant="shadow" selectionMode="single">
                        <mjo-accordion-item itemTitle="Single Mode - Item 1">
                            <div style="padding: 16px;">
                                <p>Only one item can be expanded at a time.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Single Mode - Item 2">
                            <div style="padding: 16px;">
                                <p>Opening this will close others automatically.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Single Mode - Item 3">
                            <div style="padding: 16px;">
                                <p>Perfect for FAQs or step-by-step guides.</p>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>

                    <mjo-accordion variant="shadow" selectionMode="multiple">
                        <mjo-accordion-item itemTitle="Multiple Mode - Item 1" expanded>
                            <div style="padding: 16px;">
                                <p>Multiple items can be open simultaneously.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Multiple Mode - Item 2" expanded>
                            <div style="padding: 16px;">
                                <p>Great for comparing information side by side.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Multiple Mode - Item 3">
                            <div style="padding: 16px;">
                                <p>Useful for complex forms or detailed content.</p>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </showcases-grid>
            </section-container>

            <section-container label="Compact vs Normal Size">
                <showcases-grid columns="2">
                    <mjo-accordion variant="bordered" selectionMode="single">
                        <mjo-accordion-item itemTitle="Normal Size - Title">
                            <div style="padding: 16px;">
                                <p>Standard spacing for better readability.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Normal Size - Another Title">
                            <div style="padding: 16px;">
                                <p>Comfortable padding and spacing.</p>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>

                    <mjo-accordion variant="bordered" selectionMode="single" compact>
                        <mjo-accordion-item itemTitle="Compact Size - Title">
                            <div style="padding: 16px;">
                                <p>Reduced spacing for denser layouts.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Compact Size - Another Title">
                            <div style="padding: 16px;">
                                <p>Perfect when space is limited.</p>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </showcases-grid>
            </section-container>

            <section-container label="Special Cases" description="Disabled items and different content types.">
                <showcases-grid columns="2">
                    <mjo-accordion variant="shadow" selectionMode="single">
                        <mjo-accordion-item itemTitle="Active Item">
                            <div style="padding: 16px;">
                                <p>This item is fully functional.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Disabled Item" disabled>
                            <div style="padding: 16px;">
                                <p>This content cannot be accessed.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Another Active Item">
                            <div style="padding: 16px;">
                                <p>Normal functionality restored.</p>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>

                    <mjo-accordion variant="splitted" selectionMode="single">
                        <mjo-accordion-item itemTitle="Rich Content Example">
                            <div style="padding: 16px;">
                                <h4>Embedded Form</h4>
                                <mjo-textfield label="Name" size="small"></mjo-textfield>
                                <mjo-textfield label="Email" type="email" size="small" style="margin-top: 8px;"></mjo-textfield>
                                <mjo-button size="small" color="primary" style="margin-top: 12px;">Submit</mjo-button>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="List Content">
                            <div style="padding: 16px;">
                                <h4>Features List</h4>
                                <ul>
                                    <li>Feature A</li>
                                    <li>Feature B</li>
                                    <li>Feature C</li>
                                </ul>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </showcases-grid>
            </section-container>

            <section-container label="Form Integration Example">
                <mjo-form>
                    <mjo-accordion variant="bordered" selectionMode="multiple">
                        <mjo-accordion-item itemTitle="Personal Information" itemSubtitle="Required fields" expanded>
                            <div style="padding: 16px;">
                                <mjo-grid columns="2" gap="12px">
                                    <mjo-textfield label="First Name" name="firstName" required></mjo-textfield>
                                    <mjo-textfield label="Last Name" name="lastName" required></mjo-textfield>
                                </mjo-grid>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Contact Details" itemSubtitle="How to reach you">
                            <div style="padding: 16px;">
                                <mjo-grid columns="1" gap="12px">
                                    <mjo-textfield label="Email" name="email" type="email"></mjo-textfield>
                                    <mjo-textfield label="Phone" name="phone" type="tel"></mjo-textfield>
                                </mjo-grid>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Additional Information" itemSubtitle="Optional details">
                            <div style="padding: 16px;">
                                <mjo-textfield label="Company" name="company"></mjo-textfield>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Submit Form</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset Form</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <mjo-accordion
                        id="event-accordion"
                        variant="shadow"
                        selectionMode="single"
                        @mjo-accordion:toggle=${this.#logEvent}
                        @mjo-accordion:will-expand=${this.#logEvent}
                        @mjo-accordion:expanded=${this.#logEvent}
                        @mjo-accordion:will-collapse=${this.#logEvent}
                        @mjo-accordion:collapsed=${this.#logEvent}
                    >
                        <mjo-accordion-item itemTitle="Event Tracking Item 1">
                            <div style="padding: 16px;">
                                <p>Interact with this accordion to see events logged below.</p>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Event Tracking Item 2">
                            <div style="padding: 16px;">
                                <p>Events include toggle, will-expand, expanded, will-collapse, and collapsed.</p>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>

                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div id="event-output" class="log-output">Events will appear here...</div>
                    </div>
                </div>
            </section-container>
        `;
    }

    private setVariant(variant: "light" | "shadow" | "bordered" | "splitted") {
        this.selectedVariant = variant;
    }

    private setSelectionMode(mode: "single" | "multiple") {
        this.selectionMode = mode;
        // Reset expansion states when changing mode
        if (mode === "single") {
            this.secondItemExpanded = false;
            this.thirdItemExpanded = false;
        }
    }

    private toggleCompact() {
        this.isCompact = !this.isCompact;
    }

    private toggleFirstItemDisabled() {
        this.firstItemDisabled = !this.firstItemDisabled;
        if (this.firstItemDisabled) {
            this.firstItemExpanded = false;
        }
    }

    private expandAll() {
        if (this.selectionMode === "multiple") {
            this.firstItemExpanded = true;
            this.secondItemExpanded = true;
            this.thirdItemExpanded = true;
        }
    }

    private collapseAll() {
        this.firstItemExpanded = false;
        this.secondItemExpanded = false;
        this.thirdItemExpanded = false;
    }

    private resetAccordion() {
        this.selectedVariant = "light";
        this.selectionMode = "single";
        this.isCompact = false;
        this.firstItemDisabled = false;
        this.firstItemExpanded = false;
        this.secondItemExpanded = false;
        this.thirdItemExpanded = false;
        this.customTitle1 = "Accordion Item 1";
        this.customTitle2 = "Accordion Item 2";
        this.customTitle3 = "Accordion Item 3";
        this.customSubtitle1 = "Subtitle for first item";
        this.customSubtitle2 = "";
        this.customSubtitle3 = "Subtitle for third item";
    }

    private randomizeStates() {
        this.selectedVariant = ["light", "shadow", "bordered", "splitted"][Math.floor(Math.random() * 4)] as any;
        this.selectionMode = Math.random() > 0.5 ? "multiple" : "single";
        this.isCompact = Math.random() > 0.5;
        this.firstItemDisabled = Math.random() > 0.8;

        if (this.selectionMode === "multiple") {
            this.firstItemExpanded = Math.random() > 0.5;
            this.secondItemExpanded = Math.random() > 0.5;
            this.thirdItemExpanded = Math.random() > 0.5;
        } else {
            const randomIndex = Math.floor(Math.random() * 4);
            this.firstItemExpanded = randomIndex === 0;
            this.secondItemExpanded = randomIndex === 1;
            this.thirdItemExpanded = randomIndex === 2;
        }
    }

    private getExpandedItemsStatus(): string {
        const expanded = [];
        if (this.firstItemExpanded) expanded.push("1");
        if (this.secondItemExpanded) expanded.push("2");
        if (this.thirdItemExpanded) expanded.push("3");
        return expanded.length > 0 ? expanded.join(", ") : "None";
    }

    #handleAccordionToggle = (event: CustomEvent) => {
        const { item, expanded } = event.detail;

        // Update our state based on which item was toggled
        const items = this.shadowRoot?.querySelectorAll("mjo-accordion-item");
        if (items) {
            const itemIndex = Array.from(items).indexOf(item);
            switch (itemIndex) {
                case 0:
                    this.firstItemExpanded = expanded;
                    break;
                case 1:
                    this.secondItemExpanded = expanded;
                    break;
                case 2:
                    this.thirdItemExpanded = expanded;
                    break;
            }
        }
    };

    #handleTitle1Change = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customTitle1 = target.value;
    };

    #handleTitle2Change = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customTitle2 = target.value;
    };

    #handleTitle3Change = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customTitle3 = target.value;
    };

    #handleSubtitle1Change = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customSubtitle1 = target.value;
    };

    #handleSubtitle2Change = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customSubtitle2 = target.value;
    };

    #handleSubtitle3Change = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customSubtitle3 = target.value;
    };

    #logEvent = (event: CustomEvent) => {
        const output = this.shadowRoot?.querySelector("#event-output");
        if (output) {
            const time = new Date().toLocaleTimeString();
            console.log(event.detail);

            // Create a safe copy of event.detail without circular references
            const safeDetail = {
                expanded: event.detail.expanded,
                itemTitle: event.detail.item?.itemTitle || "Unknown",
                accordionVariant: event.detail.accordion?.variant || "Unknown",
                accordionSelectionMode: event.detail.accordion?.selectionMode || "Unknown",
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

            /* Custom styling for demo content */
            mjo-accordion {
                max-width: 100%;
            }

            mjo-grid {
                width: 100%;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "accordion-component": AccordionComponent;
    }
}
