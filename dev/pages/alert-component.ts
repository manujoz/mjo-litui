import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-alert.js";
import "../../src/mjo-button.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-textarea.js";
import "../../src/mjo-textfield.js";

import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("alert-component")
export class AlertComponent extends LitElement {
    @state() private selectedType: "success" | "info" | "warning" | "error" = "info";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private selectedRounded: "none" | "small" | "medium" | "large" = "medium";
    @state() private selectedAnimation: "fade" | "slide" | "scale" | "none" = "fade";
    @state() private selectedAriaLive: "polite" | "assertive" | "off" = "polite";
    @state() private isClosable = false;
    @state() private hideIcon = false;
    @state() private focusOnShow = false;
    @state() private autoClose = false;
    @state() private persistent = false;
    @state() private currentMessage = "This is an alert message";
    @state() private currentDetail = "Additional details about the alert can be provided here.";
    @state() private autoCloseDelay = 5000;
    @state() private animationDuration = 200;
    @state() private isVisible = true;

    render() {
        return html`
            <h1>Alert Component Examples</h1>

            <section-container label="Interactive Alert Playground">
                <playground-grid>
                    <mjo-alert
                        slot="demo"
                        id="playground-alert"
                        .type=${this.selectedType}
                        .size=${this.selectedSize}
                        .rounded=${this.selectedRounded}
                        .animation=${this.selectedAnimation}
                        .ariaLive=${this.selectedAriaLive}
                        .message=${this.currentMessage}
                        .detail=${this.currentDetail}
                        .autoCloseDelay=${this.autoCloseDelay}
                        .animationDuration=${this.animationDuration}
                        ?closable=${this.isClosable}
                        ?hideIcon=${this.hideIcon}
                        ?focusOnShow=${this.focusOnShow}
                        ?autoClose=${this.autoClose}
                        ?persistent=${this.persistent}
                        ?hidden=${!this.isVisible}
                        @mjo-alert:will-show=${this.#handleAlertEvent}
                        @mjo-alert:opened=${this.#handleAlertEvent}
                        @mjo-alert:will-close=${this.#handleAlertEvent}
                        @mjo-alert:closed=${this.#handleAlertEvent}
                    ></mjo-alert>

                    <control-group slot="controls" label="Type" columns="4">
                        <mjo-button
                            size="small"
                            color="info"
                            variant=${this.selectedType === "info" ? "default" : "ghost"}
                            @click=${() => this.setType("info")}
                        >
                            Info
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="success"
                            variant=${this.selectedType === "success" ? "default" : "ghost"}
                            @click=${() => this.setType("success")}
                        >
                            Success
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="warning"
                            variant=${this.selectedType === "warning" ? "default" : "ghost"}
                            @click=${() => this.setType("warning")}
                        >
                            Warning
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="error"
                            variant=${this.selectedType === "error" ? "default" : "ghost"}
                            @click=${() => this.setType("error")}
                        >
                            Error
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

                    <control-group slot="controls" label="Border Radius" columns="4">
                        <mjo-button size="small" variant=${this.selectedRounded === "none" ? "default" : "ghost"} @click=${() => this.setRounded("none")}>
                            None
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedRounded === "small" ? "default" : "ghost"} @click=${() => this.setRounded("small")}>
                            Small
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedRounded === "medium" ? "default" : "ghost"} @click=${() => this.setRounded("medium")}>
                            Medium
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedRounded === "large" ? "default" : "ghost"} @click=${() => this.setRounded("large")}>
                            Large
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Animation" columns="4">
                        <mjo-button size="small" variant=${this.selectedAnimation === "fade" ? "default" : "ghost"} @click=${() => this.setAnimation("fade")}>
                            Fade
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedAnimation === "slide" ? "default" : "ghost"} @click=${() => this.setAnimation("slide")}>
                            Slide
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedAnimation === "scale" ? "default" : "ghost"} @click=${() => this.setAnimation("scale")}>
                            Scale
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedAnimation === "none" ? "default" : "ghost"} @click=${() => this.setAnimation("none")}>
                            None
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Options" columns="2">
                        <mjo-button size="small" variant=${this.isClosable ? "default" : "ghost"} @click=${() => this.toggleClosable()}> Closable </mjo-button>
                        <mjo-button size="small" variant=${this.hideIcon ? "default" : "ghost"} @click=${() => this.toggleHideIcon()}> Hide Icon </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Behavior" columns="2">
                        <mjo-button size="small" variant=${this.focusOnShow ? "default" : "ghost"} @click=${() => this.toggleFocusOnShow()}>
                            Focus on Show
                        </mjo-button>
                        <mjo-button size="small" variant=${this.autoClose ? "default" : "ghost"} @click=${() => this.toggleAutoClose()}>
                            Auto Close
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Accessibility" columns="3">
                        <mjo-button size="small" variant=${this.selectedAriaLive === "polite" ? "default" : "ghost"} @click=${() => this.setAriaLive("polite")}>
                            Polite
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.selectedAriaLive === "assertive" ? "default" : "ghost"}
                            @click=${() => this.setAriaLive("assertive")}
                        >
                            Assertive
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedAriaLive === "off" ? "default" : "ghost"} @click=${() => this.setAriaLive("off")}>
                            Off
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Timing Settings" columns="1">
                        <mjo-textfield
                            label="Auto Close Delay (ms)"
                            .value=${String(this.autoCloseDelay)}
                            type="number"
                            min="1000"
                            max="30000"
                            step="500"
                            @input=${this.#handleDelayChange}
                            size="small"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Animation Duration (ms)"
                            .value=${String(this.animationDuration)}
                            type="number"
                            min="0"
                            max="2000"
                            step="50"
                            @input=${this.#handleAnimationDurationChange}
                            size="small"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Content" columns="1">
                        <mjo-textfield label="Message" .value=${this.currentMessage} @input=${this.#handleMessageChange} size="small"></mjo-textfield>
                        <mjo-textarea label="Detail" .value=${this.currentDetail} @input=${this.#handleDetailChange} size="small" rows="3"></mjo-textarea>
                    </control-group>

                    <control-group slot="controls" label="Actions" columns="1">
                        <mjo-button size="small" color="primary" @click=${this.showAlert}>Show Alert</mjo-button>
                        <mjo-button size="small" color="secondary" @click=${this.hideAlert}>Hide Alert</mjo-button>
                        <mjo-button size="small" color="success" @click=${this.resetAlert}>Reset Settings</mjo-button>
                        <mjo-button size="small" color="warning" @click=${this.announceAlert}>Announce Alert</mjo-button>
                    </control-group>
                </playground-grid>

                <div class="status-display">
                    <h4>Alert Status:</h4>
                    <div class="status">
                        <span><strong>Visible:</strong> ${this.isVisible ? "Yes" : "No"}</span>
                        <span><strong>Type:</strong> ${this.selectedType}</span>
                        <span><strong>Size:</strong> ${this.selectedSize}</span>
                        <span><strong>Auto Close:</strong> ${this.autoClose ? `Yes (${this.autoCloseDelay}ms)` : "No"}</span>
                        <span><strong>Animation:</strong> ${this.selectedAnimation} (${this.animationDuration}ms)</span>
                    </div>
                </div>
            </section-container>

            <section-container label="Alert Types" description="Different alert types for various message contexts.">
                <showcases-grid columns="2">
                    <mjo-alert
                        type="success"
                        message="Operation completed successfully"
                        detail="Your changes have been saved and applied."
                        closable
                    ></mjo-alert>

                    <mjo-alert type="info" message="Information notice" detail="This is some important information you should know about." closable></mjo-alert>

                    <mjo-alert type="warning" message="Warning message" detail="Please review your settings before proceeding." closable></mjo-alert>

                    <mjo-alert type="error" message="Error occurred" detail="Something went wrong. Please try again or contact support." closable></mjo-alert>
                </showcases-grid>
            </section-container>

            <section-container label="Different Sizes">
                <showcases-grid columns="3">
                    <mjo-alert type="info" size="small" message="Small alert" detail="Compact size for less important messages." closable></mjo-alert>

                    <mjo-alert type="info" size="medium" message="Medium alert" detail="Standard size for most use cases." closable></mjo-alert>

                    <mjo-alert
                        type="info"
                        size="large"
                        message="Large alert"
                        detail="Prominent size for important messages that need attention."
                        closable
                    ></mjo-alert>
                </showcases-grid>
            </section-container>

            <section-container label="Border Radius Options">
                <showcases-grid columns="4">
                    <mjo-alert type="success" rounded="none" message="No radius" detail="Sharp corners for modern designs." closable></mjo-alert>

                    <mjo-alert type="info" rounded="small" message="Small radius" detail="Subtle rounded corners." closable></mjo-alert>

                    <mjo-alert type="warning" rounded="medium" message="Medium radius" detail="Balanced rounded corners." closable></mjo-alert>

                    <mjo-alert type="error" rounded="large" message="Large radius" detail="Pronounced rounded corners." closable></mjo-alert>
                </showcases-grid>
            </section-container>

            <section-container label="Auto-Close Alerts" description="Alerts that automatically disappear after a specified time.">
                <showcases-grid columns="2">
                    <mjo-alert
                        type="success"
                        message="Auto-close alert"
                        detail="This alert will close automatically after 3 seconds."
                        autoClose
                        autoCloseDelay="3000"
                        closable
                    ></mjo-alert>

                    <mjo-alert
                        type="info"
                        message="Longer auto-close"
                        detail="This alert will close automatically after 7 seconds."
                        autoClose
                        autoCloseDelay="7000"
                        closable
                    ></mjo-alert>
                </showcases-grid>
            </section-container>

            <section-container label="Animation Types" description="Different animation styles for showing and hiding alerts.">
                <showcases-grid columns="4">
                    <mjo-alert type="info" animation="fade" message="Fade animation" detail="Smooth fade in/out effect." closable></mjo-alert>

                    <mjo-alert type="success" animation="slide" message="Slide animation" detail="Slide in/out from the side." closable></mjo-alert>

                    <mjo-alert type="warning" animation="scale" message="Scale animation" detail="Scale up/down effect." closable></mjo-alert>

                    <mjo-alert type="error" animation="none" message="No animation" detail="Instant show/hide without animation." closable></mjo-alert>
                </showcases-grid>
            </section-container>

            <section-container label="Special Options" description="Various configuration options and special behaviors.">
                <showcases-grid columns="2">
                    <mjo-alert type="warning" message="Alert without icon" detail="Icons can be hidden when not needed." hideIcon closable></mjo-alert>

                    <mjo-alert type="info" message="Non-closable alert" detail="Some alerts should not be dismissible by users."></mjo-alert>
                </showcases-grid>

                <showcases-grid columns="2">
                    <mjo-alert
                        type="success"
                        message="Focus on show"
                        detail="This alert will receive focus when shown for accessibility."
                        focusOnShow
                        closable
                    ></mjo-alert>

                    <mjo-alert
                        type="error"
                        message="Persistent alert"
                        detail="This alert cannot be closed even with the close button."
                        persistent
                        closable
                    ></mjo-alert>
                </showcases-grid>
            </section-container>

            <section-container label="Accessibility Features" description="Screen reader and keyboard navigation support.">
                <showcases-grid columns="3">
                    <mjo-alert type="info" message="Polite announcement" detail="Screen readers announce this politely." ariaLive="polite" closable></mjo-alert>

                    <mjo-alert
                        type="warning"
                        message="Assertive announcement"
                        detail="Screen readers interrupt to announce this."
                        ariaLive="assertive"
                        closable
                    ></mjo-alert>

                    <mjo-alert
                        type="error"
                        message="No announcement"
                        detail="Screen readers won't announce this automatically."
                        ariaLive="off"
                        closable
                    ></mjo-alert>
                </showcases-grid>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <mjo-alert
                        id="event-alert"
                        type="info"
                        message="Event tracking alert"
                        detail="This alert tracks all lifecycle events."
                        closable
                        @mjo-alert:will-show=${this.#logEvent}
                        @mjo-alert:opened=${this.#logEvent}
                        @mjo-alert:will-close=${this.#logEvent}
                        @mjo-alert:closed=${this.#logEvent}
                    ></mjo-alert>

                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div id="event-output" class="log-output">Events will appear here...</div>
                    </div>

                    <div class="event-actions">
                        <mjo-button size="small" @click=${this.#showEventAlert}>Show Event Alert</mjo-button>
                        <mjo-button size="small" @click=${this.#hideEventAlert}>Hide Event Alert</mjo-button>
                        <mjo-button size="small" @click=${this.#clearEventLog}>Clear Log</mjo-button>
                    </div>
                </div>
            </section-container>
        `;
    }

    private setType(type: "success" | "info" | "warning" | "error") {
        this.selectedType = type;
    }

    private setSize(size: "small" | "medium" | "large") {
        this.selectedSize = size;
    }

    private setRounded(rounded: "none" | "small" | "medium" | "large") {
        this.selectedRounded = rounded;
    }

    private setAnimation(animation: "fade" | "slide" | "scale" | "none") {
        this.selectedAnimation = animation;
    }

    private setAriaLive(ariaLive: "polite" | "assertive" | "off") {
        this.selectedAriaLive = ariaLive;
    }

    private toggleClosable() {
        this.isClosable = !this.isClosable;
    }

    private toggleHideIcon() {
        this.hideIcon = !this.hideIcon;
    }

    private toggleFocusOnShow() {
        this.focusOnShow = !this.focusOnShow;
    }

    private toggleAutoClose() {
        this.autoClose = !this.autoClose;
    }

    private showAlert() {
        this.isVisible = true;
        const alert = this.shadowRoot?.querySelector("#playground-alert") as any;
        if (alert && alert.show) {
            alert.show();
        }
    }

    private hideAlert() {
        const alert = this.shadowRoot?.querySelector("#playground-alert") as any;
        if (alert && alert.hide) {
            alert.hide();
        }
    }

    private announceAlert() {
        const alert = this.shadowRoot?.querySelector("#playground-alert") as any;
        if (alert && alert.announce) {
            alert.announce();
        }
    }

    private resetAlert() {
        this.selectedType = "info";
        this.selectedSize = "medium";
        this.selectedRounded = "medium";
        this.selectedAnimation = "fade";
        this.selectedAriaLive = "polite";
        this.isClosable = false;
        this.hideIcon = false;
        this.focusOnShow = false;
        this.autoClose = false;
        this.persistent = false;
        this.currentMessage = "This is an alert message";
        this.currentDetail = "Additional details about the alert can be provided here.";
        this.autoCloseDelay = 5000;
        this.animationDuration = 200;
        this.isVisible = true;
    }

    #handleDelayChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.autoCloseDelay = Number(target.value);
    };

    #handleAnimationDurationChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.animationDuration = Number(target.value);
    };

    #handleMessageChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMessage = target.value;
    };

    #handleDetailChange = (event: Event) => {
        const target = event.target as HTMLTextAreaElement;
        this.currentDetail = target.value;
    };

    #handleAlertEvent = (event: CustomEvent) => {
        console.log("Alert event:", event.type, event.detail);
        if (event.type === "mjo-alert:closed") {
            this.isVisible = false;
        } else if (event.type === "mjo-alert:opened") {
            this.isVisible = true;
        }
    };

    #showEventAlert = () => {
        const alert = this.shadowRoot?.querySelector("#event-alert") as any;
        if (alert && alert.show) {
            alert.show();
        }
    };

    #hideEventAlert = () => {
        const alert = this.shadowRoot?.querySelector("#event-alert") as any;
        if (alert && alert.hide) {
            alert.hide();
        }
    };

    #clearEventLog = () => {
        const output = this.shadowRoot?.querySelector("#event-output");
        if (output) {
            output.textContent = "Events will appear here...";
        }
    };

    #logEvent = (event: CustomEvent) => {
        const output = this.shadowRoot?.querySelector("#event-output");
        if (output) {
            const time = new Date().toLocaleTimeString();
            console.log(event.detail);

            // Create a safe copy of event.detail without circular references
            const safeDetail = {
                elementId: event.detail.element?.id || "unknown",
                type: event.detail.element?.type || "unknown",
                message: event.detail.element?.message || "",
            };

            const eventInfo = `[${time}] ${event.type}: ${JSON.stringify(safeDetail)}\n`;
            output.textContent =
                eventInfo + (output.textContent === "Events will appear here..." ? "" : output.textContent || "").split("\n").slice(0, 9).join("\n");
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

            .status-display {
                margin-top: 20px;
                padding: 16px;
                background: var(--mjo-background-color-high, #f5f5f5);
                border-radius: 8px;
                border: 1px solid var(--mjo-border-color, #ddd);
            }

            .status-display h4 {
                margin: 0 0 12px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
            }

            .status {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .status span {
                font-size: 0.95rem;
                color: var(--mjo-foreground-color, #333);
            }

            .status strong {
                color: var(--mjo-foreground-color, #222);
                font-weight: 600;
                margin-right: 8px;
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

            .event-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
                }

                .event-demo {
                    gap: 16px;
                }

                .event-actions {
                    flex-direction: column;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "alert-component": AlertComponent;
    }
}
