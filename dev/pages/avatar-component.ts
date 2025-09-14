import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import "../../src/mjo-avatar.js";
import "../../src/mjo-button.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-textfield.js";

import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("avatar-component")
export class AvatarComponent extends LitElement {
    @state() private selectedColor: "default" | "primary" | "secondary" | "success" | "warning" | "info" | "error" = "default";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private selectedRadius: "small" | "medium" | "large" | "full" | "none" = "full";
    @state() private isBordered = false;
    @state() private isDisabled = false;
    @state() private isClickable = false;
    @state() private isNameColoured = false;
    @state() private currentSrc = "https://i.pravatar.cc/150?img=36";
    @state() private currentName = "John Doe";
    @state() private currentValue = "";
    @state() private currentAlt = "";
    @state() private currentFallbackIcon = "mjo-icons:user";
    @state() private currentAriaDescribedby = "";

    render() {
        return html`
            <h1>Avatar Component Examples</h1>

            <section-container label="Interactive Avatar Playground">
                <playground-grid>
                    <mjo-avatar
                        slot="demo"
                        id="playground-avatar"
                        .src=${this.currentSrc}
                        .name=${this.currentName}
                        .value=${this.currentValue}
                        .alt=${this.currentAlt}
                        .fallbackIcon=${this.currentFallbackIcon}
                        .color=${this.selectedColor}
                        .size=${this.selectedSize}
                        .radius=${this.selectedRadius}
                        aria-describedby=${ifDefined(this.currentAriaDescribedby || undefined)}
                        ?bordered=${this.isBordered}
                        ?disabled=${this.isDisabled}
                        ?clickable=${this.isClickable}
                        ?nameColoured=${this.isNameColoured}
                        @mjo-avatar:click=${this.#handleAvatarClick}
                        @mjo-avatar:error=${this.#handleAvatarError}
                    ></mjo-avatar>

                    <control-group slot="controls" label="Color" columns="4">
                        <mjo-button size="small" variant=${this.selectedColor === "default" ? "default" : "ghost"} @click=${() => this.setColor("default")}>
                            Default
                        </mjo-button>
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
                        <mjo-button
                            size="small"
                            color="success"
                            variant=${this.selectedColor === "success" ? "default" : "ghost"}
                            @click=${() => this.setColor("success")}
                        >
                            Success
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="More Colors" columns="3">
                        <mjo-button
                            size="small"
                            color="warning"
                            variant=${this.selectedColor === "warning" ? "default" : "ghost"}
                            @click=${() => this.setColor("warning")}
                        >
                            Warning
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="info"
                            variant=${this.selectedColor === "info" ? "default" : "ghost"}
                            @click=${() => this.setColor("info")}
                        >
                            Info
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="error"
                            variant=${this.selectedColor === "error" ? "default" : "ghost"}
                            @click=${() => this.setColor("error")}
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

                    <control-group slot="controls" label="Radius" columns="3">
                        <mjo-button size="small" variant=${this.selectedRadius === "small" ? "default" : "ghost"} @click=${() => this.setRadius("small")}>
                            Small
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedRadius === "medium" ? "default" : "ghost"} @click=${() => this.setRadius("medium")}>
                            Medium
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedRadius === "large" ? "default" : "ghost"} @click=${() => this.setRadius("large")}>
                            Large
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="More Radius" columns="2">
                        <mjo-button size="small" variant=${this.selectedRadius === "full" ? "default" : "ghost"} @click=${() => this.setRadius("full")}>
                            Full
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedRadius === "none" ? "default" : "ghost"} @click=${() => this.setRadius("none")}>
                            None
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="States" columns="2">
                        <mjo-button size="small" variant=${this.isBordered ? "default" : "ghost"} @click=${() => this.toggleBordered()}> Bordered </mjo-button>
                        <mjo-button size="small" variant=${this.isDisabled ? "default" : "ghost"} @click=${() => this.toggleDisabled()}> Disabled </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Interaction" columns="2">
                        <mjo-button size="small" variant=${this.isClickable ? "default" : "ghost"} @click=${() => this.toggleClickable()}>
                            Clickable
                        </mjo-button>
                        <mjo-button size="small" variant=${this.isNameColoured ? "default" : "ghost"} @click=${() => this.toggleNameColoured()}>
                            Name Colored
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Content Settings" columns="1">
                        <mjo-textfield
                            label="Image URL"
                            .value=${this.currentSrc}
                            @input=${this.#handleSrcChange}
                            size="small"
                            placeholder="Enter image URL"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Name"
                            .value=${this.currentName}
                            @input=${this.#handleNameChange}
                            size="small"
                            placeholder="Enter name for initials"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Value"
                            .value=${this.currentValue}
                            @input=${this.#handleValueChange}
                            size="small"
                            placeholder="Custom value"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Accessibility & Fallback" columns="1">
                        <mjo-textfield
                            label="Alt Text"
                            .value=${this.currentAlt}
                            @input=${this.#handleAltChange}
                            size="small"
                            placeholder="Alternative text for image"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Fallback Icon"
                            .value=${this.currentFallbackIcon}
                            @input=${this.#handleFallbackIconChange}
                            size="small"
                            placeholder="Icon name for fallback"
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
                        <mjo-button size="small" color="success" @click=${this.loadSampleImage}> Load Sample Image </mjo-button>
                        <mjo-button size="small" color="warning" @click=${this.breakImage}> Break Image (Test Error) </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.resetAvatar}> Reset All </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="config-display">
                    <h4>Current Configuration:</h4>
                    <div class="config-values">
                        <span><strong>Source:</strong> ${this.currentSrc || "None"}</span>
                        <span><strong>Name:</strong> ${this.currentName || "None"}</span>
                        <span><strong>Value:</strong> ${this.currentValue || "None"}</span>
                        <span><strong>Size:</strong> ${this.selectedSize}</span>
                        <span><strong>Color:</strong> ${this.selectedColor}</span>
                        <span><strong>Radius:</strong> ${this.selectedRadius}</span>
                        <span
                            ><strong>States:</strong> ${[
                                this.isBordered && "Bordered",
                                this.isDisabled && "Disabled",
                                this.isClickable && "Clickable",
                                this.isNameColoured && "Name Colored",
                            ]
                                .filter(Boolean)
                                .join(", ") || "None"}</span
                        >
                    </div>
                </div>
            </section-container>

            <section-container label="Basic Usage Examples" description="Common avatar implementations with different content types.">
                <showcases-grid columns="4">
                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        name="John Doe"
                        alt="John Doe profile picture"
                        size="medium"
                        color="primary"
                    ></mjo-avatar>

                    <mjo-avatar name="Jane Smith" size="medium" color="secondary" nameColoured></mjo-avatar>

                    <mjo-avatar fallbackIcon="mjo-icons:user" size="medium" color="default"></mjo-avatar>

                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1494790108755-2616b612d9e8?w=100&h=100&fit=crop&crop=face"
                        name="Sarah Wilson"
                        alt="Sarah Wilson profile picture"
                        size="medium"
                        color="success"
                        clickable
                    ></mjo-avatar>
                </showcases-grid>
            </section-container>

            <section-container label="Different Sizes">
                <showcases-grid columns="3">
                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                        name="Small Avatar"
                        size="small"
                        color="primary"
                    ></mjo-avatar>

                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                        name="Medium Avatar"
                        size="medium"
                        color="primary"
                    ></mjo-avatar>

                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                        name="Large Avatar"
                        size="large"
                        color="primary"
                    ></mjo-avatar>
                </showcases-grid>
            </section-container>

            <section-container label="Color Variants">
                <showcases-grid columns="4">
                    <mjo-avatar name="D" color="default" size="medium"></mjo-avatar>
                    <mjo-avatar name="P" color="primary" size="medium"></mjo-avatar>
                    <mjo-avatar name="S" color="secondary" size="medium"></mjo-avatar>
                    <mjo-avatar name="G" color="success" size="medium"></mjo-avatar>
                </showcases-grid>
                <showcases-grid columns="3">
                    <mjo-avatar name="W" color="warning" size="medium"></mjo-avatar>
                    <mjo-avatar name="I" color="info" size="medium"></mjo-avatar>
                    <mjo-avatar name="E" color="error" size="medium"></mjo-avatar>
                </showcases-grid>
            </section-container>

            <section-container label="Border Radius Variants">
                <showcases-grid columns="5">
                    <mjo-avatar name="SM" color="primary" size="medium" radius="small"></mjo-avatar>
                    <mjo-avatar name="MD" color="primary" size="medium" radius="medium"></mjo-avatar>
                    <mjo-avatar name="LG" color="primary" size="medium" radius="large"></mjo-avatar>
                    <mjo-avatar name="FL" color="primary" size="medium" radius="full"></mjo-avatar>
                    <mjo-avatar name="NO" color="primary" size="medium" radius="none"></mjo-avatar>
                </showcases-grid>
            </section-container>

            <section-container label="Bordered Avatars">
                <showcases-grid columns="4">
                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                        name="Emma"
                        color="primary"
                        size="medium"
                        bordered
                    ></mjo-avatar>
                    <mjo-avatar name="Alex" color="secondary" size="medium" bordered nameColoured></mjo-avatar>
                    <mjo-avatar fallbackIcon="mjo-icons:star" color="warning" size="medium" bordered></mjo-avatar>
                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
                        name="Mike"
                        color="error"
                        size="medium"
                        bordered
                        clickable
                    ></mjo-avatar>
                </showcases-grid>
            </section-container>

            <section-container label="Name Initials with Auto Colors">
                <showcases-grid columns="6">
                    <mjo-avatar name="Alice Johnson" nameColoured size="medium"></mjo-avatar>
                    <mjo-avatar name="Bob Wilson" nameColoured size="medium"></mjo-avatar>
                    <mjo-avatar name="Carol Davis" nameColoured size="medium"></mjo-avatar>
                    <mjo-avatar name="David Brown" nameColoured size="medium"></mjo-avatar>
                    <mjo-avatar name="Eva Miller" nameColoured size="medium"></mjo-avatar>
                    <mjo-avatar name="Frank Garcia" nameColoured size="medium"></mjo-avatar>
                </showcases-grid>
            </section-container>

            <section-container label="Fallback Icons">
                <showcases-grid columns="4">
                    <mjo-avatar fallbackIcon="mjo-icons:user" color="primary" size="medium"></mjo-avatar>
                    <mjo-avatar fallbackIcon="mjo-icons:star" color="secondary" size="medium"></mjo-avatar>
                    <mjo-avatar fallbackIcon="mjo-icons:heart" color="error" size="medium"></mjo-avatar>
                    <mjo-avatar fallbackIcon="mjo-icons:settings" color="info" size="medium"></mjo-avatar>
                </showcases-grid>
            </section-container>

            <section-container label="Clickable Avatars" description="Interactive avatars that respond to user clicks.">
                <showcases-grid columns="3">
                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        name="Click Me"
                        value="user-1"
                        size="medium"
                        color="primary"
                        clickable
                    ></mjo-avatar>
                    <mjo-avatar name="Interactive" value="user-2" size="medium" color="secondary" clickable nameColoured></mjo-avatar>
                    <mjo-avatar fallbackIcon="mjo-icons:user" value="user-3" size="medium" color="success" clickable></mjo-avatar>
                </showcases-grid>
            </section-container>

            <section-container label="States & Error Handling">
                <showcases-grid columns="3">
                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1494790108755-2616b612d9e8?w=100&h=100&fit=crop&crop=face"
                        name="Normal"
                        size="medium"
                        color="primary"
                    ></mjo-avatar>
                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1494790108755-2616b612d9e8?w=100&h=100&fit=crop&crop=face"
                        name="Disabled"
                        size="medium"
                        color="primary"
                        disabled
                    ></mjo-avatar>
                    <mjo-avatar
                        src="https://invalid-url-for-error-test.jpg"
                        name="Error Fallback"
                        fallbackIcon="mjo-icons:user"
                        size="medium"
                        color="error"
                    ></mjo-avatar>
                </showcases-grid>
            </section-container>

            <section-container label="Avatar Group Example" description="Common pattern for displaying multiple avatars together.">
                <div class="avatar-group">
                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        name="John"
                        size="medium"
                        color="primary"
                        clickable
                    ></mjo-avatar>
                    <mjo-avatar
                        src="https://images.unsplash.com/photo-1494790108755-2616b612d9e8?w=100&h=100&fit=crop&crop=face"
                        name="Jane"
                        size="medium"
                        color="secondary"
                        clickable
                    ></mjo-avatar>
                    <mjo-avatar name="Mike" size="medium" color="success" nameColoured clickable></mjo-avatar>
                    <mjo-avatar name="Sarah" size="medium" color="warning" nameColoured clickable></mjo-avatar>
                    <mjo-avatar fallbackIcon="mjo-icons:more" size="medium" color="info" clickable value="+3 more"></mjo-avatar>
                </div>
            </section-container>

            <section-container label="Form Integration Example">
                <mjo-form>
                    <mjo-grid columns="2" gap="20px">
                        <div class="form-field">
                            <label>Profile Picture</label>
                            <mjo-avatar name="Profile" size="large" color="primary" clickable value="upload-avatar"></mjo-avatar>
                            <small>Click to upload a new profile picture</small>
                        </div>

                        <div class="form-field">
                            <label>Team Member Selection</label>
                            <div class="avatar-selection">
                                <mjo-avatar name="Alice" size="medium" color="primary" clickable value="alice" nameColoured></mjo-avatar>
                                <mjo-avatar name="Bob" size="medium" color="secondary" clickable value="bob" nameColoured></mjo-avatar>
                                <mjo-avatar name="Carol" size="medium" color="success" clickable value="carol" nameColoured></mjo-avatar>
                            </div>
                        </div>
                    </mjo-grid>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Save Profile</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <div class="demo-avatars">
                        <mjo-avatar
                            id="event-avatar-1"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                            name="Event Test"
                            value="avatar-1"
                            size="medium"
                            color="primary"
                            clickable
                            @mjo-avatar:click=${this.#logEvent}
                            @mjo-avatar:error=${this.#logEvent}
                        ></mjo-avatar>
                        <mjo-avatar
                            id="event-avatar-2"
                            src="https://invalid-image-url.jpg"
                            name="Error Test"
                            fallbackIcon="mjo-icons:user"
                            value="avatar-2"
                            size="medium"
                            color="error"
                            clickable
                            @mjo-avatar:click=${this.#logEvent}
                            @mjo-avatar:error=${this.#logEvent}
                        ></mjo-avatar>
                    </div>

                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div id="event-output" class="log-output">Click avatars or trigger errors to see events...</div>
                    </div>
                </div>
            </section-container>
        `;
    }

    private setColor(color: "default" | "primary" | "secondary" | "success" | "warning" | "info" | "error") {
        this.selectedColor = color;
    }

    private setSize(size: "small" | "medium" | "large") {
        this.selectedSize = size;
    }

    private setRadius(radius: "small" | "medium" | "large" | "full" | "none") {
        this.selectedRadius = radius;
    }

    private toggleBordered() {
        this.isBordered = !this.isBordered;
    }

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    private toggleClickable() {
        this.isClickable = !this.isClickable;
    }

    private toggleNameColoured() {
        this.isNameColoured = !this.isNameColoured;
    }

    private loadSampleImage() {
        const sampleImages = [
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1494790108755-2616b612d9e8?w=100&h=100&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        ];
        this.currentSrc = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    }

    private breakImage() {
        this.currentSrc = "https://invalid-image-url-for-testing-error.jpg";
    }

    private resetAvatar() {
        this.currentSrc = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
        this.currentName = "John Doe";
        this.currentValue = "";
        this.currentAlt = "";
        this.currentFallbackIcon = "mjo-icons:user";
        this.currentAriaDescribedby = "";
        this.selectedColor = "default";
        this.selectedSize = "medium";
        this.selectedRadius = "full";
        this.isBordered = false;
        this.isDisabled = false;
        this.isClickable = false;
        this.isNameColoured = false;
    }

    #handleSrcChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentSrc = target.value;
    };

    #handleNameChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentName = target.value;
    };

    #handleValueChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentValue = target.value;
    };

    #handleAltChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentAlt = target.value;
    };

    #handleFallbackIconChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentFallbackIcon = target.value;
    };

    #handleAriaDescribedbyChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentAriaDescribedby = target.value;
    };

    #handleAvatarClick = (event: CustomEvent) => {
        console.log("Avatar clicked:", event.detail);
    };

    #handleAvatarError = (event: CustomEvent) => {
        console.log("Avatar error:", event.detail);
    };

    #logEvent = (event: CustomEvent) => {
        const output = this.shadowRoot?.querySelector("#event-output");
        if (output) {
            const time = new Date().toLocaleTimeString();

            // Create a safe copy of event.detail
            const safeDetail = {
                value: event.detail.value,
                message: event.detail.message,
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

            .avatar-group {
                display: flex;
                gap: 12px;
                align-items: center;
                flex-wrap: wrap;
            }

            .form-field {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .form-field label {
                font-weight: 600;
                color: var(--mjo-foreground-color, #333);
                font-size: 0.95rem;
            }

            .form-field small {
                color: var(--mjo-foreground-color-medium, #666);
                font-size: 0.85rem;
            }

            .avatar-selection {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
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

            .demo-avatars {
                display: flex;
                gap: 16px;
                align-items: center;
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

                .avatar-group {
                    gap: 8px;
                }

                .demo-avatars {
                    gap: 12px;
                }

                .avatar-selection {
                    gap: 8px;
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
        "avatar-component": AvatarComponent;
    }
}
