import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-button.js";
import "../../src/mjo-drawer.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-textarea.js";
import "../../src/mjo-textfield.js";
import "../../src/mjo-typography.js";

import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("drawer-component")
export class DrawerComponent extends LitElement {
    @state() private selectedPosition: "left" | "right" | "top" | "bottom" = "right";
    @state() private isBlocked = false;
    @state() private customTitle = "Drawer Title";
    @state() private customContent = "This is the drawer content. You can place any content here.";
    @state() private customWidth = "400";
    @state() private customHeight = "300";
    @state() private animationDuration = 200;

    // Event logs
    @state() private eventLogs: string[] = [];

    render() {
        return html`
            <h1>Drawer Component Examples</h1>

            <section-container label="Interactive Drawer Playground">
                <playground-grid>
                    <div slot="demo" class="drawer-demo">
                        <mjo-drawer id="playground-drawer"></mjo-drawer>
                        <div class="demo-buttons">
                            <mjo-button @click=${this.#showDrawer}>Show Drawer</mjo-button>
                            <mjo-button variant="ghost" @click=${this.#showDrawerWithoutTitle}>Show Without Title</mjo-button>
                            <mjo-button variant="ghost" @click=${this.#showCustomContentDrawer}>Show Custom Content</mjo-button>
                        </div>
                    </div>

                    <control-group slot="controls" label="Position" columns="4">
                        <mjo-button size="small" variant=${this.selectedPosition === "left" ? "default" : "ghost"} @click=${() => this.setPosition("left")}>
                            Left
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedPosition === "right" ? "default" : "ghost"} @click=${() => this.setPosition("right")}>
                            Right
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedPosition === "top" ? "default" : "ghost"} @click=${() => this.setPosition("top")}>
                            Top
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedPosition === "bottom" ? "default" : "ghost"} @click=${() => this.setPosition("bottom")}>
                            Bottom
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Options" columns="1">
                        <mjo-button size="small" variant=${this.isBlocked ? "default" : "ghost"} @click=${this.toggleBlocked}>
                            ${this.isBlocked ? "Unblock" : "Block"} (Prevent closing)
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Content Configuration" columns="1">
                        <mjo-textfield
                            label="Title"
                            .value=${this.customTitle}
                            @input=${this.#handleTitleChange}
                            placeholder="Enter drawer title"
                        ></mjo-textfield>
                        <mjo-textarea
                            label="Content"
                            .value=${this.customContent}
                            @input=${this.#handleContentChange}
                            placeholder="Enter drawer content"
                            rows="3"
                        ></mjo-textarea>
                    </control-group>

                    <control-group slot="controls" label="Size Configuration" columns="2">
                        <mjo-textfield
                            label="Width (px)"
                            .value=${this.customWidth}
                            @input=${this.#handleWidthChange}
                            placeholder="400"
                            helperText="For left/right positions"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Height (px)"
                            .value=${this.customHeight}
                            @input=${this.#handleHeightChange}
                            placeholder="300"
                            helperText="For top/bottom positions"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Animation" columns="1">
                        <mjo-textfield
                            label="Animation Duration (ms)"
                            type="number"
                            .value=${this.animationDuration.toString()}
                            @input=${this.#handleAnimationDurationChange}
                            placeholder="200"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Actions" columns="2">
                        <mjo-button size="small" variant="ghost" @click=${this.resetDrawer}>Reset to Defaults</mjo-button>
                        <mjo-button size="small" variant="ghost" @click=${this.clearEventLog}>Clear Event Log</mjo-button>
                    </control-group>
                </playground-grid>
            </section-container>

            <section-container label="Drawer Positions Showcase">
                <showcases-grid>
                    <div class="showcase-item">
                        <h4>Left Drawer</h4>
                        <mjo-drawer id="left-drawer"></mjo-drawer>
                        <mjo-button @click=${() => this.#showPositionDrawer("left")}>Show Left</mjo-button>
                    </div>
                    <div class="showcase-item">
                        <h4>Right Drawer</h4>
                        <mjo-drawer id="right-drawer"></mjo-drawer>
                        <mjo-button @click=${() => this.#showPositionDrawer("right")}>Show Right</mjo-button>
                    </div>
                    <div class="showcase-item">
                        <h4>Top Drawer</h4>
                        <mjo-drawer id="top-drawer"></mjo-drawer>
                        <mjo-button @click=${() => this.#showPositionDrawer("top")}>Show Top</mjo-button>
                    </div>
                    <div class="showcase-item">
                        <h4>Bottom Drawer</h4>
                        <mjo-drawer id="bottom-drawer"></mjo-drawer>
                        <mjo-button @click=${() => this.#showPositionDrawer("bottom")}>Show Bottom</mjo-button>
                    </div>
                </showcases-grid>
            </section-container>

            <section-container label="Content Examples">
                <showcases-grid>
                    <div class="showcase-item">
                        <h4>Simple Text Content</h4>
                        <mjo-drawer id="text-drawer"></mjo-drawer>
                        <mjo-button @click=${this.#showTextContentDrawer}>Show Text Drawer</mjo-button>
                    </div>
                    <div class="showcase-item">
                        <h4>Form Content</h4>
                        <mjo-drawer id="form-drawer"></mjo-drawer>
                        <mjo-button @click=${this.#showFormContentDrawer}>Show Form Drawer</mjo-button>
                    </div>
                    <div class="showcase-item">
                        <h4>List Content</h4>
                        <mjo-drawer id="list-drawer"></mjo-drawer>
                        <mjo-button @click=${this.#showListContentDrawer}>Show List Drawer</mjo-button>
                    </div>
                    <div class="showcase-item">
                        <h4>Blocked Drawer</h4>
                        <mjo-drawer id="blocked-drawer"></mjo-drawer>
                        <mjo-button @click=${this.#showBlockedDrawer}>Show Blocked</mjo-button>
                    </div>
                </showcases-grid>
            </section-container>

            <div class="event-demo">
                <section-container label="Event Logging">
                    <div class="event-log">
                        <h5>Event Log</h5>
                        <div class="log-output">${this.eventLogs.length > 0 ? this.eventLogs.join("\n") : "No events logged yet."}</div>
                    </div>
                </section-container>
            </div>
        `;
    }

    private setPosition(position: "left" | "right" | "top" | "bottom") {
        this.selectedPosition = position;
    }

    private toggleBlocked() {
        this.isBlocked = !this.isBlocked;
    }

    private resetDrawer() {
        this.selectedPosition = "right";
        this.isBlocked = false;
        this.customTitle = "Drawer Title";
        this.customContent = "This is the drawer content. You can place any content here.";
        this.customWidth = "400";
        this.customHeight = "300";
        this.animationDuration = 200;
    }

    private clearEventLog() {
        this.eventLogs = [];
    }

    #handleTitleChange = (event: Event) => {
        this.customTitle = (event.target as HTMLInputElement).value;
    };

    #handleContentChange = (event: Event) => {
        this.customContent = (event.target as HTMLTextAreaElement).value;
    };

    #handleWidthChange = (event: Event) => {
        this.customWidth = (event.target as HTMLInputElement).value;
    };

    #handleHeightChange = (event: Event) => {
        this.customHeight = (event.target as HTMLInputElement).value;
    };

    #handleAnimationDurationChange = (event: Event) => {
        this.animationDuration = parseInt((event.target as HTMLInputElement).value) || 200;
    };

    #showDrawer = () => {
        const drawer = this.shadowRoot?.getElementById("playground-drawer") as any;
        if (drawer?.controller) {
            drawer.controller.show({
                title: this.customTitle,
                content: this.customContent,
                position: this.selectedPosition,
                width: this.selectedPosition === "left" || this.selectedPosition === "right" ? parseInt(this.customWidth) : undefined,
                height: this.selectedPosition === "top" || this.selectedPosition === "bottom" ? parseInt(this.customHeight) : undefined,
                blocked: this.isBlocked,
                animationDuration: this.animationDuration,
                onOpen: () => this.#logEvent("Drawer opened"),
                onClose: () => this.#logEvent("Drawer closed"),
            });
        }
    };

    #showDrawerWithoutTitle = () => {
        const drawer = this.shadowRoot?.getElementById("playground-drawer") as any;
        if (drawer?.controller) {
            drawer.controller.show({
                content: this.customContent,
                position: this.selectedPosition,
                width: this.selectedPosition === "left" || this.selectedPosition === "right" ? parseInt(this.customWidth) : undefined,
                height: this.selectedPosition === "top" || this.selectedPosition === "bottom" ? parseInt(this.customHeight) : undefined,
                blocked: this.isBlocked,
                animationDuration: this.animationDuration,
                onOpen: () => this.#logEvent("Drawer without title opened"),
                onClose: () => this.#logEvent("Drawer without title closed"),
            });
        }
    };

    #showCustomContentDrawer = () => {
        const drawer = this.shadowRoot?.getElementById("playground-drawer") as any;
        if (drawer?.controller) {
            drawer.controller.show({
                title: "Custom Content Drawer",
                content: html`
                    <div style="padding: 20px;">
                        <mjo-typography size="body1" weight="medium">Custom HTML Content</mjo-typography>
                        <mjo-typography size="body2" style="margin-top: 10px;">
                            This drawer contains custom HTML elements instead of plain text.
                        </mjo-typography>
                        <div style="margin-top: 20px; display: flex; gap: 10px;">
                            <mjo-button size="small" color="primary">Action 1</mjo-button>
                            <mjo-button size="small" variant="ghost">Action 2</mjo-button>
                        </div>
                    </div>
                `,
                position: this.selectedPosition,
                width: this.selectedPosition === "left" || this.selectedPosition === "right" ? parseInt(this.customWidth) : undefined,
                height: this.selectedPosition === "top" || this.selectedPosition === "bottom" ? parseInt(this.customHeight) : undefined,
                blocked: this.isBlocked,
                animationDuration: this.animationDuration,
                onOpen: () => this.#logEvent("Custom content drawer opened"),
                onClose: () => this.#logEvent("Custom content drawer closed"),
            });
        }
    };

    #showPositionDrawer = (position: "left" | "right" | "top" | "bottom") => {
        const drawer = this.shadowRoot?.getElementById(`${position}-drawer`) as any;
        if (drawer?.controller) {
            drawer.controller.show({
                title: `${position.charAt(0).toUpperCase() + position.slice(1)} Drawer`,
                content: `This is a drawer positioned on the ${position} side of the screen.`,
                position: position,
                width: position === "left" || position === "right" ? 350 : undefined,
                height: position === "top" || position === "bottom" ? 250 : undefined,
                onOpen: () => this.#logEvent(`${position} drawer opened`),
                onClose: () => this.#logEvent(`${position} drawer closed`),
            });
        }
    };

    #showTextContentDrawer = () => {
        const drawer = this.shadowRoot?.getElementById("text-drawer") as any;
        if (drawer?.controller) {
            drawer.controller.show({
                title: "Simple Text Content",
                content: "This is a simple text content drawer. It contains only plain text without any complex HTML elements.",
                position: "right",
                width: 400,
                onOpen: () => this.#logEvent("Text content drawer opened"),
                onClose: () => this.#logEvent("Text content drawer closed"),
            });
        }
    };

    #showFormContentDrawer = () => {
        const drawer = this.shadowRoot?.getElementById("form-drawer") as any;
        if (drawer?.controller) {
            drawer.controller.show({
                title: "Form Content",
                content: html`
                    <div style="padding: 20px;">
                        <mjo-form>
                            <mjo-textfield label="Name" placeholder="Enter your name"></mjo-textfield>
                            <mjo-textfield label="Email" type="email" placeholder="Enter your email"></mjo-textfield>
                            <mjo-textarea label="Message" placeholder="Enter your message" rows="4"></mjo-textarea>
                            <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
                                <mjo-button variant="ghost">Cancel</mjo-button>
                                <mjo-button color="primary">Submit</mjo-button>
                            </div>
                        </mjo-form>
                    </div>
                `,
                position: "right",
                width: 450,
                onOpen: () => this.#logEvent("Form content drawer opened"),
                onClose: () => this.#logEvent("Form content drawer closed"),
            });
        }
    };

    #showListContentDrawer = () => {
        const drawer = this.shadowRoot?.getElementById("list-drawer") as any;
        if (drawer?.controller) {
            drawer.controller.show({
                title: "List Content",
                content: html`
                    <div style="padding: 20px;">
                        <mjo-typography size="body1" weight="medium" style="margin-bottom: 15px;">Menu Items</mjo-typography>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <mjo-button variant="ghost" style="justify-content: flex-start;">Dashboard</mjo-button>
                            <mjo-button variant="ghost" style="justify-content: flex-start;">Users</mjo-button>
                            <mjo-button variant="ghost" style="justify-content: flex-start;">Settings</mjo-button>
                            <mjo-button variant="ghost" style="justify-content: flex-start;">Reports</mjo-button>
                            <mjo-button variant="ghost" style="justify-content: flex-start;">Help</mjo-button>
                        </div>
                    </div>
                `,
                position: "left",
                width: 300,
                onOpen: () => this.#logEvent("List content drawer opened"),
                onClose: () => this.#logEvent("List content drawer closed"),
            });
        }
    };

    #showBlockedDrawer = () => {
        const drawer = this.shadowRoot?.getElementById("blocked-drawer") as any;
        if (drawer?.controller) {
            drawer.controller.show({
                title: "Blocked Drawer",
                content: html`
                    <div style="padding: 20px;">
                        <mjo-typography size="body1" weight="medium">This drawer is blocked</mjo-typography>
                        <mjo-typography size="body2" style="margin-top: 10px;">
                            You cannot close this drawer by clicking outside or pressing ESC. Use the close button or the button below.
                        </mjo-typography>
                        <div style="margin-top: 20px;">
                            <mjo-button
                                @click=${() => {
                                    drawer.controller.close();
                                    this.#logEvent("Blocked drawer closed programmatically");
                                }}
                            >
                                Close Drawer
                            </mjo-button>
                        </div>
                    </div>
                `,
                position: "right",
                width: 400,
                blocked: true,
                onOpen: () => this.#logEvent("Blocked drawer opened"),
                onClose: () => this.#logEvent("Blocked drawer closed"),
            });
        }
    };

    #logEvent = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        this.eventLogs = [...this.eventLogs, `[${timestamp}] ${message}`];
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

            .drawer-demo {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                padding: 40px 20px;
                min-height: 200px;
                border: 2px dashed var(--mjo-border-color, #ddd);
                border-radius: 8px;
                background: var(--mjo-background-color-high, #f9f9f9);
            }

            .demo-buttons {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                justify-content: center;
            }

            .showcase-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                padding: 20px;
                border: 1px solid var(--mjo-border-color, #ddd);
                border-radius: 8px;
                background: var(--mjo-background-color, #fff);
            }

            .showcase-item h4 {
                margin: 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
                text-align: center;
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

                .demo-buttons {
                    flex-direction: column;
                    align-items: center;
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
        "drawer-component": DrawerComponent;
    }
}
