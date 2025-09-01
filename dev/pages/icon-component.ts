import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

// Import some icons from mjo-icons for demonstrations
import { AiOutlineBell, AiOutlineHeart, AiOutlineHome, AiOutlineSetting, AiOutlineStar, AiOutlineUser } from "mjo-icons/ai";
import { FaCheck, FaDownload, FaEdit, FaMinus, FaPlus, FaSave, FaTimes, FaTrash } from "mjo-icons/fa";
import { MdArrowBack, MdArrowForward, MdClose, MdMenu, MdRefresh, MdSearch } from "mjo-icons/md";

import "../../src/mjo-button.js";
import "../../src/mjo-icon.js";
import "../../src/mjo-textfield.js";

import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("icon-component")
export class IconComponent extends LitElement {
    @state() private selectedSize: "small" | "medium" | "large" | "xl" = "medium";
    @state() private selectedAnimation: "none" | "spin" | "pulse" | "rotate" = "none";
    @state() private isClickable = false;
    @state() private isDisabled = false;
    @state() private isLoading = false;
    @state() private customSvg =
        `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/></svg>`;
    @state() private customAriaLabel = "Shield icon";
    @state() private eventLog: string[] = [];

    // Sample SVG icons for demonstrations
    private sampleIcons = {
        home: AiOutlineHome,
        user: AiOutlineUser,
        settings: AiOutlineSetting,
        bell: AiOutlineBell,
        heart: AiOutlineHeart,
        star: AiOutlineStar,
        check: FaCheck,
        times: FaTimes,
        plus: FaPlus,
        minus: FaMinus,
        edit: FaEdit,
        trash: FaTrash,
        save: FaSave,
        download: FaDownload,
        search: MdSearch,
        menu: MdMenu,
        close: MdClose,
        arrowBack: MdArrowBack,
        arrowForward: MdArrowForward,
        refresh: MdRefresh,
    };

    render() {
        return html`
            <h1>Icon Component Examples</h1>

            <section-container label="Interactive Icon Playground">
                <playground-grid>
                    <mjo-icon
                        slot="demo"
                        id="playground-icon"
                        .src=${this.customSvg}
                        .size=${this.selectedSize}
                        .animation=${this.selectedAnimation}
                        .ariaLabel=${this.customAriaLabel}
                        ?clickable=${this.isClickable}
                        ?disabled=${this.isDisabled}
                        ?loading=${this.isLoading}
                        @mjo-icon:click=${this.#handleIconClick}
                        @mjo-icon:load=${this.#handleIconLoad}
                        @mjo-icon:error=${this.#handleIconError}
                    ></mjo-icon>

                    <control-group slot="controls" label="Size" columns="4">
                        <mjo-button size="small" variant=${this.selectedSize === "small" ? "default" : "ghost"} @click=${() => this.setSize("small")}>
                            Small
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedSize === "medium" ? "default" : "ghost"} @click=${() => this.setSize("medium")}>
                            Medium
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedSize === "large" ? "default" : "ghost"} @click=${() => this.setSize("large")}>
                            Large
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedSize === "xl" ? "default" : "ghost"} @click=${() => this.setSize("xl")}>
                            XL
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Animation" columns="4">
                        <mjo-button size="small" variant=${this.selectedAnimation === "none" ? "default" : "ghost"} @click=${() => this.setAnimation("none")}>
                            None
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedAnimation === "spin" ? "default" : "ghost"} @click=${() => this.setAnimation("spin")}>
                            Spin
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedAnimation === "pulse" ? "default" : "ghost"} @click=${() => this.setAnimation("pulse")}>
                            Pulse
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.selectedAnimation === "rotate" ? "default" : "ghost"}
                            @click=${() => this.setAnimation("rotate")}
                        >
                            Rotate
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="States" columns="3">
                        <mjo-button size="small" variant=${this.isClickable ? "default" : "ghost"} @click=${() => this.toggleClickable()}>
                            Clickable
                        </mjo-button>
                        <mjo-button size="small" variant=${this.isDisabled ? "default" : "ghost"} @click=${() => this.toggleDisabled()}> Disabled </mjo-button>
                        <mjo-button size="small" variant=${this.isLoading ? "default" : "ghost"} @click=${() => this.toggleLoading()}> Loading </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Custom SVG" columns="1">
                        <mjo-textfield
                            label="SVG Code"
                            .value=${this.customSvg}
                            @input=${this.#handleSvgChange}
                            size="small"
                            placeholder="Enter SVG code..."
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Aria Label"
                            .value=${this.customAriaLabel}
                            @input=${this.#handleAriaLabelChange}
                            size="small"
                            placeholder="Icon description"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Quick Icons" columns="3">
                        <mjo-button size="small" @click=${() => this.setIcon("shield")}>Shield</mjo-button>
                        <mjo-button size="small" @click=${() => this.setIcon("heart")}>Heart</mjo-button>
                        <mjo-button size="small" @click=${() => this.setIcon("star")}>Star</mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Actions" columns="1">
                        <mjo-button size="small" color="success" @click=${this.resetIcon}> Reset Icon </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.clearEventLog}> Clear Events </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="icon-display">
                    <h4>Current Configuration:</h4>
                    <div class="config">
                        <span><strong>Size:</strong> ${this.selectedSize}</span>
                        <span><strong>Animation:</strong> ${this.selectedAnimation}</span>
                        <span><strong>Clickable:</strong> ${this.isClickable}</span>
                        <span><strong>Disabled:</strong> ${this.isDisabled}</span>
                        <span><strong>Loading:</strong> ${this.isLoading}</span>
                    </div>
                </div>

                ${this.eventLog.length > 0
                    ? html`
                          <div class="event-log">
                              <h4>Event Log:</h4>
                              <div class="log-content">${this.eventLog.map((log) => html`<div class="log-entry">${log}</div>`)}</div>
                          </div>
                      `
                    : ""}
            </section-container>

            <section-container label="Basic Usage Examples" description="Common icon implementations with different sizes and states.">
                <showcases-grid columns="4">
                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.home} size="medium"></mjo-icon>
                        <span>Home</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.user} size="medium"></mjo-icon>
                        <span>User</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.settings} size="medium"></mjo-icon>
                        <span>Settings</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.bell} size="medium"></mjo-icon>
                        <span>Notifications</span>
                    </div>
                </showcases-grid>
            </section-container>

            <section-container label="Different Sizes" description="Icons rendered in various predefined sizes.">
                <showcases-grid columns="4">
                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.star} size="small"></mjo-icon>
                        <span>Small</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.star} size="medium"></mjo-icon>
                        <span>Medium</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.star} size="large"></mjo-icon>
                        <span>Large</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.star} size="xl"></mjo-icon>
                        <span>Extra Large</span>
                    </div>
                </showcases-grid>
            </section-container>

            <section-container label="Animations" description="Icons with different animation effects.">
                <showcases-grid columns="4">
                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.refresh} size="large" animation="spin"></mjo-icon>
                        <span>Spin</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.heart} size="large" animation="pulse"></mjo-icon>
                        <span>Pulse</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.refresh} size="large" animation="rotate"></mjo-icon>
                        <span>Rotate</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.star} size="large" animation="none"></mjo-icon>
                        <span>No Animation</span>
                    </div>
                </showcases-grid>
            </section-container>

            <section-container label="Interactive Icons" description="Clickable icons with hover and focus states.">
                <showcases-grid columns="4">
                    <div class="icon-demo">
                        <mjo-icon
                            .src=${this.sampleIcons.heart}
                            size="large"
                            clickable
                            .ariaLabel=${"Like this item"}
                            @mjo-icon:click=${() => this.showToast("Heart clicked!")}
                        ></mjo-icon>
                        <span>Clickable Heart</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon
                            .src=${this.sampleIcons.edit}
                            size="large"
                            clickable
                            aria-label="Edit item"
                            @mjo-icon:click=${() => this.showToast("Edit clicked!")}
                        ></mjo-icon>
                        <span>Edit Button</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon
                            .src=${this.sampleIcons.trash}
                            size="large"
                            clickable
                            aria-label="Delete item"
                            @mjo-icon:click=${() => this.showToast("Delete clicked!")}
                        ></mjo-icon>
                        <span>Delete Action</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon
                            .src=${this.sampleIcons.download}
                            size="large"
                            clickable
                            aria-label="Download file"
                            @mjo-icon:click=${() => this.showToast("Download clicked!")}
                        ></mjo-icon>
                        <span>Download</span>
                    </div>
                </showcases-grid>
            </section-container>

            <section-container label="States & Options" description="Icons in different states including disabled and loading.">
                <showcases-grid columns="4">
                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.settings} size="large"></mjo-icon>
                        <span>Normal</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.settings} size="large" clickable></mjo-icon>
                        <span>Clickable</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon .src=${this.sampleIcons.settings} size="large" disabled></mjo-icon>
                        <span>Disabled</span>
                    </div>

                    <div class="icon-demo">
                        <mjo-icon size="large" loading></mjo-icon>
                        <span>Loading</span>
                    </div>
                </showcases-grid>
            </section-container>

            <section-container label="Icon Collections" description="Groups of related icons for different use cases.">
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    <div>
                        <h4>Navigation Icons:</h4>
                        <showcases-grid columns="6">
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.home} size="medium" clickable></mjo-icon>
                                <span>Home</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.menu} size="medium" clickable></mjo-icon>
                                <span>Menu</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.arrowBack} size="medium" clickable></mjo-icon>
                                <span>Back</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.arrowForward} size="medium" clickable></mjo-icon>
                                <span>Forward</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.search} size="medium" clickable></mjo-icon>
                                <span>Search</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.close} size="medium" clickable></mjo-icon>
                                <span>Close</span>
                            </div>
                        </showcases-grid>
                    </div>

                    <div>
                        <h4>Action Icons:</h4>
                        <showcases-grid columns="6">
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.plus} size="medium" clickable></mjo-icon>
                                <span>Add</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.minus} size="medium" clickable></mjo-icon>
                                <span>Remove</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.edit} size="medium" clickable></mjo-icon>
                                <span>Edit</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.save} size="medium" clickable></mjo-icon>
                                <span>Save</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.trash} size="medium" clickable></mjo-icon>
                                <span>Delete</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.refresh} size="medium" clickable></mjo-icon>
                                <span>Refresh</span>
                            </div>
                        </showcases-grid>
                    </div>

                    <div>
                        <h4>Status Icons:</h4>
                        <showcases-grid columns="6">
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.check} size="medium" style="color: green;"></mjo-icon>
                                <span>Success</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.times} size="medium" style="color: red;"></mjo-icon>
                                <span>Error</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.bell} size="medium" style="color: orange;"></mjo-icon>
                                <span>Warning</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.user} size="medium" style="color: blue;"></mjo-icon>
                                <span>User</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.heart} size="medium" style="color: pink;"></mjo-icon>
                                <span>Favorite</span>
                            </div>
                            <div class="icon-demo">
                                <mjo-icon .src=${this.sampleIcons.star} size="medium" style="color: gold;"></mjo-icon>
                                <span>Featured</span>
                            </div>
                        </showcases-grid>
                    </div>
                </div>
            </section-container>

            <section-container label="Button Integration" description="Icons integrated with buttons for common UI patterns.">
                <showcases-grid columns="3">
                    <mjo-button>
                        <mjo-icon .src=${this.sampleIcons.plus} size="small"></mjo-icon>
                        Add Item
                    </mjo-button>

                    <mjo-button variant="ghost">
                        <mjo-icon .src=${this.sampleIcons.edit} size="small"></mjo-icon>
                        Edit
                    </mjo-button>

                    <mjo-button color="error" variant="outline">
                        <mjo-icon .src=${this.sampleIcons.trash} size="small"></mjo-icon>
                        Delete
                    </mjo-button>
                </showcases-grid>

                <showcases-grid columns="4">
                    <mjo-button size="small">
                        <mjo-icon .src=${this.sampleIcons.save} size="small"></mjo-icon>
                    </mjo-button>

                    <mjo-button size="small">
                        <mjo-icon .src=${this.sampleIcons.download} size="small"></mjo-icon>
                    </mjo-button>

                    <mjo-button size="small">
                        <mjo-icon .src=${this.sampleIcons.search} size="small"></mjo-icon>
                    </mjo-button>

                    <mjo-button size="small">
                        <mjo-icon .src=${this.sampleIcons.settings} size="small"></mjo-icon>
                    </mjo-button>
                </showcases-grid>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <div style="display: flex; gap: 16px; align-items: center;">
                        <mjo-icon
                            .src=${this.sampleIcons.heart}
                            size="large"
                            clickable
                            aria-label="Toggle favorite"
                            @mjo-icon:click=${this.#logIconEvent}
                        ></mjo-icon>
                        <mjo-icon
                            .src=${this.sampleIcons.star}
                            size="large"
                            clickable
                            aria-label="Rate this item"
                            @mjo-icon:click=${this.#logIconEvent}
                        ></mjo-icon>
                        <mjo-icon
                            .src=${this.sampleIcons.bell}
                            size="large"
                            clickable
                            aria-label="Enable notifications"
                            @mjo-icon:click=${this.#logIconEvent}
                        ></mjo-icon>
                        <mjo-icon
                            .src=${this.customSvg}
                            size="large"
                            clickable
                            aria-label="Custom action"
                            @mjo-icon:load=${this.#logIconEvent}
                            @mjo-icon:error=${this.#logIconEvent}
                            @mjo-icon:click=${this.#logIconEvent}
                        ></mjo-icon>
                    </div>

                    <div class="event-log">
                        <h5>Icon Events:</h5>
                        <div id="icon-event-output" class="log-output">Click icons above to see events...</div>
                    </div>
                </div>
            </section-container>
        `;
    }

    private setSize(size: "small" | "medium" | "large" | "xl") {
        this.selectedSize = size;
    }

    private setAnimation(animation: "none" | "spin" | "pulse" | "rotate") {
        this.selectedAnimation = animation;
    }

    private toggleClickable() {
        this.isClickable = !this.isClickable;
    }

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    private toggleLoading() {
        this.isLoading = !this.isLoading;
    }

    private setIcon(type: string) {
        switch (type) {
            case "shield":
                this.customSvg = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/></svg>`;
                this.customAriaLabel = "Shield icon";
                break;
            case "heart":
                this.customSvg = this.sampleIcons.heart;
                this.customAriaLabel = "Heart icon";
                break;
            case "star":
                this.customSvg = this.sampleIcons.star;
                this.customAriaLabel = "Star icon";
                break;
        }
    }

    private resetIcon() {
        this.selectedSize = "medium";
        this.selectedAnimation = "none";
        this.isClickable = false;
        this.isDisabled = false;
        this.isLoading = false;
        this.customSvg = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/></svg>`;
        this.customAriaLabel = "Shield icon";
    }

    private clearEventLog() {
        this.eventLog = [];
    }

    private showToast(message: string) {
        alert(message); // Simple alert for demo, in real app you'd use a proper toast
    }

    #handleSvgChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customSvg = target.value;
    };

    #handleAriaLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customAriaLabel = target.value;
    };

    #handleIconClick = (event: CustomEvent) => {
        console.log("Playground icon clicked:", event.detail);
        this.eventLog = [`[${new Date().toLocaleTimeString()}] Playground icon clicked`, ...this.eventLog.slice(0, 4)];
        this.requestUpdate();
    };

    #handleIconLoad = (event: CustomEvent) => {
        console.log("Icon loaded:", event.detail);
        this.eventLog = [`[${new Date().toLocaleTimeString()}] Icon loaded successfully`, ...this.eventLog.slice(0, 4)];
        this.requestUpdate();
    };

    #handleIconError = (event: CustomEvent) => {
        console.log("Icon error:", event.detail);
        this.eventLog = [`[${new Date().toLocaleTimeString()}] Icon error: ${event.detail.error}`, ...this.eventLog.slice(0, 4)];
        this.requestUpdate();
    };

    #logIconEvent = (event: CustomEvent) => {
        const output = this.shadowRoot?.querySelector("#icon-event-output");
        if (output) {
            const time = new Date().toLocaleTimeString();
            console.log("Icon event:", event.detail);

            let eventInfo = "";
            switch (event.type) {
                case "mjo-icon:click":
                    eventInfo = `[${time}] Icon clicked - Event: ${event.detail.originalEvent?.type}`;
                    break;
                case "mjo-icon:load":
                    eventInfo = `[${time}] Icon loaded - Source: ${event.detail.src?.substring(0, 50)}...`;
                    break;
                case "mjo-icon:error":
                    eventInfo = `[${time}] Icon error - ${event.detail.error}`;
                    break;
                default:
                    eventInfo = `[${time}] ${event.type}`;
            }

            output.textContent = eventInfo + "\n" + (output.textContent || "").split("\n").slice(0, 9).join("\n");
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

            h4,
            h5 {
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
                font-weight: 500;
                margin: 0 0 16px 0;
            }

            h5 {
                font-size: 1em;
                margin: 0 0 8px 0;
            }

            .icon-display {
                margin-top: 20px;
                padding: 16px;
                background: var(--mjo-background-color-high, #f5f5f5);
                border-radius: 8px;
                border: 1px solid var(--mjo-border-color, #ddd);
            }

            .icon-display h4 {
                margin: 0 0 12px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
            }

            .config {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .config span {
                font-size: 0.95rem;
                color: var(--mjo-foreground-color, #333);
            }

            .config strong {
                color: var(--mjo-foreground-color, #222);
                font-weight: 600;
                margin-right: 8px;
            }

            .icon-demo {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                padding: 16px;
                border-radius: 8px;
                background: var(--mjo-background-color, #fff);
                border: 1px solid var(--mjo-border-color, #ddd);
                transition: all 0.2s ease;
            }

            .icon-demo:hover {
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                transform: translateY(-1px);
            }

            .icon-demo span {
                font-size: 0.875rem;
                color: var(--mjo-foreground-color-medium, #666);
                text-align: center;
            }

            .event-demo {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .event-log {
                margin-top: 20px;
                padding: 16px;
                background: var(--mjo-background-color-high, #f5f5f5);
                border-radius: 8px;
                border: 1px solid var(--mjo-border-color, #ddd);
            }

            .event-log h4 {
                margin: 0 0 12px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
            }

            .log-content {
                display: flex;
                flex-direction: column;
                gap: 4px;
                max-height: 200px;
                overflow-y: auto;
            }

            .log-entry {
                font-family: "Courier New", Courier, monospace;
                font-size: 0.85rem;
                color: var(--mjo-foreground-color, #333);
                padding: 4px 8px;
                background: var(--mjo-background-color, #fff);
                border-radius: 4px;
                border: 1px solid var(--mjo-border-color-light, #eee);
            }

            .log-output {
                background: var(--mjo-background-color, #fff);
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

            /* Button integration styles */
            mjo-button {
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
                }

                .event-demo {
                    gap: 16px;
                }

                .icon-demo {
                    padding: 12px;
                }
            }

            @media (max-width: 480px) {
                showcases-grid[columns="4"] {
                    --columns: 2;
                }

                showcases-grid[columns="6"] {
                    --columns: 3;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "icon-component": IconComponent;
    }
}
