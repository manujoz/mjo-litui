# mjo-modal

A modal dialog component with controller architecture for displaying overlay content.

## Overview

The `mjo-modal` component provides a powerful modal system for displaying overlay content. It uses a controller architecture that creates a global modal container in the document body, allowing modals to appear above any content regardless of parent element constraints like `overflow: hidden`.

## Basic Usage

### HTML

```html
<mjo-modal></mjo-modal>
```

### Simple Modal Display

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-basic")
export class ExampleModalBasic extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private openSimpleModal() {
        this.modalComponent.controller.show({
            title: "Welcome",
            content: html`
                <div style="padding: 1rem;">
                    <p>This is a simple modal with basic content.</p>
                    <p>You can close it by clicking the X button or clicking outside.</p>
                </div>
            `,
        });
    }

    private openHtmlModal() {
        this.modalComponent.controller.show({
            title: "HTML Content",
            content: `
        <div style="padding: 1rem;">
          <h4>Rich HTML Content</h4>
          <p>This modal contains <strong>HTML string content</strong> with styling.</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </div>
      `,
        });
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem;">
                <mjo-button @click=${this.openSimpleModal}> Open Simple Modal </mjo-button>
                <mjo-button @click=${this.openHtmlModal}> Open HTML Modal </mjo-button>
            </div>

            <mjo-modal></mjo-modal>
        `;
    }
}
```

## Modal Sizes and Positioning

Configure modal dimensions and close button positioning:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";

@customElement("example-modal-sizes")
export class ExampleModalSizes extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private openSmallModal() {
        this.modalComponent.controller.show({
            title: "Small Modal",
            width: 300,
            content: html`
                <div style="padding: 1rem;">
                    <p>This is a small modal (300px width).</p>
                </div>
            `,
        });
    }

    private openLargeModal() {
        this.modalComponent.controller.show({
            title: "Large Modal",
            width: "80vw",
            content: html`
                <div style="padding: 2rem;">
                    <p>This is a large modal (80% viewport width).</p>
                    <p>It automatically adapts to the content size and viewport.</p>
                </div>
            `,
        });
    }

    private openOutsideCloseModal() {
        this.modalComponent.controller.show({
            title: "Outside Close Button",
            closePosition: "out",
            content: html`
                <div style="padding: 1rem;">
                    <p>This modal has the close button positioned outside the modal container.</p>
                    <p>Notice the white X button in the top-right corner.</p>
                </div>
            `,
        });
    }

    private openInsideCloseModal() {
        this.modalComponent.controller.show({
            title: "Inside Close Button",
            closePosition: "in",
            content: html`
                <div style="padding: 1rem;">
                    <p>This modal has the close button inside the modal container.</p>
                    <p>The close button is smaller and positioned within the modal.</p>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <mjo-button @click=${this.openSmallModal}> Small Modal </mjo-button>
                <mjo-button @click=${this.openLargeModal}> Large Modal </mjo-button>
                <mjo-button @click=${this.openOutsideCloseModal}> Outside Close </mjo-button>
                <mjo-button @click=${this.openInsideCloseModal}> Inside Close </mjo-button>
            </div>

            <mjo-modal></mjo-modal>
        `;
    }
}
```

## Auto-Close and Blocking

Configure automatic closing and modal blocking:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-behavior")
export class ExampleModalBehavior extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private openAutoCloseModal() {
        this.modalComponent.controller.show({
            title: "Auto-Close Modal",
            time: 3000,
            content: html`
                <div style="padding: 1rem;">
                    <p>This modal will automatically close after 3 seconds.</p>
                    <p>You can still close it manually if needed.</p>
                </div>
            `,
            onClose: () => {
                console.log("Auto-close modal was closed");
            },
        });
    }

    private openBlockedModal() {
        this.modalComponent.controller.show({
            title: "Blocked Modal",
            blocked: true,
            content: html`
                <div style="padding: 1rem;">
                    <p>This modal is blocked - you cannot close it by clicking outside or using the X button.</p>
                    <p>You must use the button below to close it.</p>
                    <mjo-button @click=${() => this.modalComponent.controller.close()}> Close Modal </mjo-button>
                </div>
            `,
        });
    }

    private openCallbackModal() {
        this.modalComponent.controller.show({
            title: "Modal with Callback",
            content: html`
                <div style="padding: 1rem;">
                    <p>This modal has a callback function that executes when closed.</p>
                    <p>Check the console when you close this modal.</p>
                </div>
            `,
            onClose: () => {
                alert("Modal was closed! Check the console for more info.");
                console.log("Modal closed at:", new Date().toLocaleTimeString());
            },
        });
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <mjo-button @click=${this.openAutoCloseModal}> Auto-Close (3s) </mjo-button>
                <mjo-button @click=${this.openBlockedModal} variant="warning"> Blocked Modal </mjo-button>
                <mjo-button @click=${this.openCallbackModal}> With Callback </mjo-button>
            </div>

            <mjo-modal></mjo-modal>
        `;
    }
}
```

## Complex Content and Animations

Advanced modal content and custom animations:

```ts
import { LitElement, html, css } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-card";

@customElement("example-modal-advanced")
export class ExampleModalAdvanced extends LitElement {
    static styles = css`
        .form-container {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .button-group {
            display: flex;
            gap: 0.5rem;
            justify-content: flex-end;
            margin-top: 1rem;
        }

        .image-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            padding: 1rem;
        }

        .image-item {
            aspect-ratio: 1;
            background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
            border-radius: 8px;
            display: grid;
            place-items: center;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .image-item:hover {
            transform: scale(1.05);
        }
    `;

    @query("mjo-modal")
    private modalComponent!: MjoModal;

    @state()
    private formData = { name: "", email: "", message: "" };

    private openFormModal() {
        this.modalComponent.controller.show({
            title: "Contact Form",
            width: 500,
            content: html`
                <div class="form-container">
                    <mjo-textfield label="Name" .value=${this.formData.name} @input=${(e: any) => (this.formData = { ...this.formData, name: e.target.value })}>
                    </mjo-textfield>

                    <mjo-textfield
                        label="Email"
                        type="email"
                        .value=${this.formData.email}
                        @input=${(e: any) => (this.formData = { ...this.formData, email: e.target.value })}
                    >
                    </mjo-textfield>

                    <mjo-textfield
                        label="Message"
                        multiline
                        rows="4"
                        .value=${this.formData.message}
                        @input=${(e: any) => (this.formData = { ...this.formData, message: e.target.value })}
                    >
                    </mjo-textfield>

                    <div class="button-group">
                        <mjo-button variant="ghost" @click=${() => this.modalComponent.controller.close()}> Cancel </mjo-button>
                        <mjo-button @click=${this.submitForm}> Submit </mjo-button>
                    </div>
                </div>
            `,
        });
    }

    private openGalleryModal() {
        this.modalComponent.controller.show({
            title: "Image Gallery",
            width: "90vw",
            content: html`
                <div class="image-gallery">
                    ${Array.from(
                        { length: 8 },
                        (_, i) => html`
                            <div class="image-item" @click=${() => this.openImageDetail(i + 1)}>
                                <span>Image ${i + 1}</span>
                            </div>
                        `,
                    )}
                </div>
            `,
        });
    }

    private openImageDetail(imageNumber: number) {
        this.modalComponent.controller.show({
            title: `Image ${imageNumber} Details`,
            width: 600,
            animationDuration: 300,
            content: html`
                <div style="padding: 1.5rem; text-align: center;">
                    <div
                        style="width: 100%; height: 300px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 8px; display: grid; place-items: center; margin-bottom: 1rem;"
                    >
                        <span style="color: white; font-size: 2rem;">Image ${imageNumber}</span>
                    </div>
                    <h3>Image ${imageNumber} Title</h3>
                    <p>This is a detailed view of image ${imageNumber}. Here you can see more information about this particular image.</p>
                    <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem;">
                        <mjo-button variant="ghost">Download</mjo-button>
                        <mjo-button variant="ghost">Share</mjo-button>
                        <mjo-button @click=${() => this.modalComponent.controller.close()}>Close</mjo-button>
                    </div>
                </div>
            `,
        });
    }

    private submitForm() {
        console.log("Form data:", this.formData);
        this.modalComponent.controller.close();

        // Show success modal
        setTimeout(() => {
            this.modalComponent.controller.show({
                title: "Success!",
                content: html`
                    <div style="padding: 1.5rem; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                        <p>Your message has been sent successfully!</p>
                        <p>We'll get back to you soon.</p>
                    </div>
                `,
                time: 3000,
            });
        }, 100);
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem;">
                <mjo-button @click=${this.openFormModal}> Contact Form Modal </mjo-button>
                <mjo-button @click=${this.openGalleryModal}> Gallery Modal </mjo-button>
            </div>

            <mjo-modal></mjo-modal>
        `;
    }
}
```

## Context Sharing Example

The modal controller can be shared across component hierarchies using `@lit/context`, allowing child components to display modals from a parent container. This is especially useful for applications where modal functionality needs to be accessible from deeply nested components.

```ts
import { LitElement, html, PropertyValues } from "lit";
import { customElement, provide, consume, query } from "lit/decorators.js";
import { createContext } from "@lit/context";
import type { MjoModal, ModalController } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";
import "mjo-litui/mjo-textfield";

// Create a context for the modal controller
const modalContext = createContext<ModalController>("modal-controller");

@customElement("main-app-component")
export class MainAppComponent extends LitElement {
    @provide({ context: modalContext })
    modalController!: ModalController;

    @query("mjo-modal")
    private modal!: MjoModal;

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        // Assign the modal controller to the context provider after the modal is available
        this.modalController = this.modal.controller;
    }

    render() {
        return html`
            <div style="padding: 2rem;">
                <h2>Main Application</h2>
                <p>This main component provides a modal controller to all child components through context.</p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                    <user-management-component></user-management-component>
                    <content-editor-component></content-editor-component>
                </div>

                <div style="margin-top: 2rem;">
                    <confirmation-dialogs></confirmation-dialogs>
                </div>

                <!-- The modal instance that provides the controller -->
                <mjo-modal></mjo-modal>
            </div>
        `;
    }
}

@customElement("user-management-component")
export class UserManagementComponent extends LitElement {
    @consume({ context: modalContext, subscribe: true })
    modalController!: ModalController;

    private openUserProfile() {
        this.modalController.show({
            title: "User Profile",
            width: 500,
            content: html`
                <div style="padding: 1.5rem;">
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <mjo-textfield label="Full Name" value="John Doe"></mjo-textfield>
                        <mjo-textfield label="Email" value="john@example.com"></mjo-textfield>
                        <mjo-textfield label="Role" value="Administrator"></mjo-textfield>

                        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                            <mjo-button variant="ghost" @click=${() => this.modalController.close()}> Cancel </mjo-button>
                            <mjo-button @click=${this.saveProfile}> Save Changes </mjo-button>
                        </div>
                    </div>
                </div>
            `,
        });
    }

    private deleteUser() {
        this.modalController.show({
            title: "Confirm Deletion",
            content: html`
                <div style="padding: 1.5rem; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h3>Delete User Account?</h3>
                    <p>This action cannot be undone. The user will lose access to all their data.</p>

                    <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1.5rem;">
                        <mjo-button variant="ghost" @click=${() => this.modalController.close()}> Cancel </mjo-button>
                        <mjo-button variant="danger" @click=${this.confirmDelete}> Delete User </mjo-button>
                    </div>
                </div>
            `,
            blocked: true,
        });
    }

    private saveProfile() {
        this.modalController.close();
        // Show success feedback
        setTimeout(() => {
            this.modalController.show({
                title: "Success",
                content: html`
                    <div style="padding: 1.5rem; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                        <p>User profile updated successfully!</p>
                    </div>
                `,
                time: 2000,
            });
        }, 100);
    }

    private confirmDelete() {
        this.modalController.close();
        setTimeout(() => {
            this.modalController.show({
                title: "User Deleted",
                content: html`
                    <div style="padding: 1.5rem; text-align: center;">
                        <p>User account has been permanently deleted.</p>
                    </div>
                `,
                time: 2000,
            });
        }, 100);
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>User Management</h4>
                    <p>Manage user accounts and profiles using shared modal controller.</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
                        <mjo-button @click=${this.openUserProfile}> Edit Profile </mjo-button>
                        <mjo-button @click=${this.deleteUser} variant="danger"> Delete User </mjo-button>
                    </div>
                </div>
            </mjo-card>
        `;
    }
}

@customElement("content-editor-component")
export class ContentEditorComponent extends LitElement {
    @consume({ context: modalContext, subscribe: true })
    modalController!: ModalController;

    private openEditor() {
        this.modalController.show({
            title: "Content Editor",
            width: "80vw",
            content: html`
                <div style="padding: 1.5rem;">
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <mjo-textfield label="Title" value="Sample Article"></mjo-textfield>
                        <mjo-textfield label="Content" multiline rows="10" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."> </mjo-textfield>

                        <div style="display: flex; gap: 0.5rem; justify-content: space-between; margin-top: 1rem;">
                            <div style="display: flex; gap: 0.5rem;">
                                <mjo-button variant="ghost">Preview</mjo-button>
                                <mjo-button variant="ghost">Save Draft</mjo-button>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <mjo-button variant="ghost" @click=${() => this.modalController.close()}> Cancel </mjo-button>
                                <mjo-button @click=${this.publishContent}> Publish </mjo-button>
                            </div>
                        </div>
                    </div>
                </div>
            `,
        });
    }

    private publishContent() {
        this.modalController.close();
        setTimeout(() => {
            this.modalController.show({
                title: "Published!",
                content: html`
                    <div style="padding: 1.5rem; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
                        <p>Your content has been published successfully!</p>
                    </div>
                `,
                time: 2000,
            });
        }, 100);
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>Content Editor</h4>
                    <p>Create and edit content using the modal interface.</p>
                    <mjo-button @click=${this.openEditor} style="margin-top: 1rem;"> Open Editor </mjo-button>
                </div>
            </mjo-card>
        `;
    }
}

@customElement("confirmation-dialogs")
export class ConfirmationDialogs extends LitElement {
    @consume({ context: modalContext, subscribe: true })
    modalController!: ModalController;

    private showConfirmationSeries() {
        // First confirmation
        this.modalController.show({
            title: "Step 1: Initial Confirmation",
            content: html`
                <div style="padding: 1.5rem; text-align: center;">
                    <p>Do you want to proceed with the multi-step process?</p>
                    <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem;">
                        <mjo-button variant="ghost" @click=${() => this.modalController.close()}> Cancel </mjo-button>
                        <mjo-button @click=${this.showStep2}> Continue </mjo-button>
                    </div>
                </div>
            `,
        });
    }

    private showStep2() {
        this.modalController.show({
            title: "Step 2: Final Confirmation",
            content: html`
                <div style="padding: 1.5rem; text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">⚠️</div>
                    <p>This is the final step. Are you absolutely sure?</p>
                    <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem;">
                        <mjo-button variant="ghost" @click=${this.showConfirmationSeries}> Back </mjo-button>
                        <mjo-button variant="success" @click=${this.showSuccess}> Confirm </mjo-button>
                    </div>
                </div>
            `,
        });
    }

    private showSuccess() {
        this.modalController.show({
            title: "Process Complete",
            content: html`
                <div style="padding: 1.5rem; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                    <p>Multi-step process completed successfully!</p>
                </div>
            `,
            time: 3000,
        });
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>Confirmation Dialogs</h4>
                    <p>Chain multiple modals for complex workflows.</p>
                    <mjo-button @click=${this.showConfirmationSeries} style="margin-top: 1rem;"> Start Multi-Step Process </mjo-button>
                </div>
            </mjo-card>
        `;
    }
}
```

This pattern allows any component in the application hierarchy to display modals without needing to pass the controller through props or maintaining multiple modal instances.

## Theme Customization

### Using mjo-theme

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-theming")
export class ExampleModalTheming extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private showThemedModal() {
        this.modalComponent.controller.show({
            title: "Themed Modal",
            content: html`
                <div style="padding: 1.5rem;">
                    <p>This modal uses custom theme colors and styling.</p>
                    <p>Notice the custom background, border radius, and shadows.</p>
                </div>
            `,
        });
    }

    render() {
        return html`
            <mjo-theme
                .theme=${{
                    modal: {
                        backgroundColor: "#f8f9fa",
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
                        radius: "16px",
                        width: "500px",
                        iconCloseSize: "20px",
                        titleBorderColor: "#e9ecef",
                    },
                }}
            >
                <div style="padding: 2rem;">
                    <h3>Custom Modal Theme</h3>
                    <p>Modals will appear with custom styling</p>

                    <mjo-button @click=${this.showThemedModal}> Show Themed Modal </mjo-button>
                </div>

                <mjo-modal></mjo-modal>
            </mjo-theme>
        `;
    }
}
```

### Using ThemeMixin

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { ThemeMixin } from "mjo-litui/mixins";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-theme-mixin")
export class ExampleModalThemeMixin extends ThemeMixin(LitElement) {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private showCustomModal() {
        this.modalComponent.controller.show({
            title: "Component-Level Theme",
            content: html`
                <div style="padding: 1.5rem;">
                    <p>This modal has component-level theme overrides.</p>
                    <p>Perfect for specific modal styling requirements.</p>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div style="padding: 2rem;">
                <h3>Component-Level Modal Theming</h3>

                <mjo-button @click=${this.showCustomModal}> Show Custom Modal </mjo-button>

                <mjo-modal
                    .theme=${{
                        backgroundColor: "#fff3cd",
                        boxShadow: "0 4px 20px rgba(255, 193, 7, 0.3)",
                        radius: "12px",
                        titleBorderColor: "#ffc107",
                    }}
                >
                </mjo-modal>
            </div>
        `;
    }
}
```

## Programmatic Control

Advanced programmatic control of modal behavior:

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-control")
export class ExampleModalControl extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    @state()
    private modalIsOpen = false;

    @state()
    private progressValue = 0;

    private openProgressModal() {
        this.modalComponent.controller.show({
            title: "Processing...",
            blocked: true,
            content: html`
                <div style="padding: 1.5rem; text-align: center;">
                    <p>Please wait while we process your request.</p>
                    <div style="width: 100%; background: #e0e0e0; border-radius: 10px; margin: 1rem 0;">
                        <div
                            style="width: ${this
                                .progressValue}%; height: 20px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 10px; transition: width 0.3s;"
                        ></div>
                    </div>
                    <p>${this.progressValue}% Complete</p>
                </div>
            `,
        });

        this.modalIsOpen = true;
        this.simulateProgress();
    }

    private simulateProgress() {
        const interval = setInterval(() => {
            this.progressValue += 10;

            // Update modal content
            this.modalComponent.controller.show({
                title: "Processing...",
                blocked: true,
                content: html`
                    <div style="padding: 1.5rem; text-align: center;">
                        <p>Please wait while we process your request.</p>
                        <div style="width: 100%; background: #e0e0e0; border-radius: 10px; margin: 1rem 0;">
                            <div
                                style="width: ${this
                                    .progressValue}%; height: 20px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 10px; transition: width 0.3s;"
                            ></div>
                        </div>
                        <p>${this.progressValue}% Complete</p>
                    </div>
                `,
            });

            if (this.progressValue >= 100) {
                clearInterval(interval);
                this.showCompletionModal();
            }
        }, 500);
    }

    private showCompletionModal() {
        setTimeout(() => {
            this.modalComponent.controller.show({
                title: "Complete!",
                content: html`
                    <div style="padding: 1.5rem; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                        <p>Processing completed successfully!</p>
                        <mjo-button @click=${this.resetDemo} style="margin-top: 1rem;"> Reset Demo </mjo-button>
                    </div>
                `,
                time: 3000,
                onClose: () => this.resetDemo(),
            });
        }, 500);
    }

    private resetDemo() {
        this.modalIsOpen = false;
        this.progressValue = 0;
        this.modalComponent.controller.close();
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem;">
                <mjo-button @click=${this.openProgressModal} .disabled=${this.modalIsOpen}>
                    ${this.modalIsOpen ? "Processing..." : "Start Progress Demo"}
                </mjo-button>

                <mjo-button @click=${this.resetDemo} variant="ghost" .disabled=${!this.modalIsOpen}> Cancel Process </mjo-button>
            </div>

            <mjo-modal></mjo-modal>
        `;
    }
}
```

## Properties

| Name    | Type            | Default | Description                                             |
| ------- | --------------- | ------- | ------------------------------------------------------- |
| `open`  | `boolean`       | `false` | Controls the modal visibility (mainly for internal use) |
| `theme` | `MjoModalTheme` | `{}`    | Theme configuration for the modal container             |

## Controller Methods

The `ModalController` provides the following methods:

### `show(params: ModalShowParams): void`

Shows the modal with the specified configuration.

#### Parameters

| Name                | Type                          | Default | Description                                      |
| ------------------- | ----------------------------- | ------- | ------------------------------------------------ |
| `content`           | `string \| TemplateResult<1>` | -       | The modal content (HTML string or Lit template)  |
| `title`             | `string`                      | -       | Optional modal title                             |
| `width`             | `string \| number`            | -       | Modal width (pixels or CSS value)                |
| `time`              | `number`                      | -       | Auto-close time in milliseconds                  |
| `animationDuration` | `number`                      | `200`   | Animation duration in milliseconds               |
| `blocked`           | `boolean`                     | `false` | Prevents closing by clicking outside or X button |
| `closePosition`     | `"in" \| "out"`               | `"in"`  | Position of the close button                     |
| `onClose`           | `() => void`                  | -       | Callback function executed when modal closes     |

### `close(): void`

Closes the currently open modal.

## Types

```ts
interface ModalShowParams {
    title?: string;
    content: string | TemplateResult<1>;
    time?: number;
    width?: string | number;
    animationDuration?: number;
    blocked?: boolean;
    closePosition?: "out" | "in";
    onClose?: () => void;
}
```

## Events

This component does not emit custom events. The modal container handles internal events for user interactions.

## CSS Custom Properties

| Property                         | Default                                               | Description            |
| -------------------------------- | ----------------------------------------------------- | ---------------------- |
| `--mjo-modal-background-color`   | `var(--mjo-background-color, #fff)`                   | Modal background color |
| `--mjo-modal-box-shadow`         | `var(--mjo-box-shadow3, 0 0 10px rgba(0, 0, 0, 0.5))` | Modal box shadow       |
| `--mjo-modal-radius`             | `var(--mjo-border-radius, 5px)`                       | Modal border radius    |
| `--mjo-modal-width`              | `450px`                                               | Default modal width    |
| `--mjo-modal-icon-close-size`    | `16px` (inside), `30px` (outside)                     | Close button icon size |
| `--mjo-modal-title-border-color` | `var(--mjo-border-color, #ccc)`                       | Title border color     |

### Theme Interface

```ts
interface MjoModalTheme {
    iconCloseSize?: string;
    titleBorderColor?: string;
    backgroundColor?: string;
    radius?: string;
    boxShadow?: string;
    width?: string;
}
```

## Technical Notes

-   **Global Container**: Modals are rendered in a container appended to `document.body`
-   **Z-Index Management**: The container inherits z-index from the host component
-   **Backdrop Filter**: Uses CSS backdrop-filter for modern blur effects
-   **Animation System**: Smooth scale and fade animations with configurable duration
-   **Content Flexibility**: Supports both HTML strings and Lit templates
-   **Theme Inheritance**: Modal container inherits theme from the host component
-   **Responsive Design**: Automatically adapts to viewport size with max-width constraints

## Accessibility

-   Modal traps focus within the modal container
-   Uses semantic HTML structure with proper ARIA attributes
-   Supports keyboard navigation (ESC key to close)
-   High contrast support for close buttons and backgrounds
-   Screen reader friendly with proper heading structure

## Best Practices

-   Use descriptive titles for better user understanding
-   Keep modal content focused and concise
-   Use blocking modals sparingly for critical actions
-   Provide clear action buttons for user guidance
-   Consider mobile viewport constraints when setting width
-   Use context sharing for large applications with multiple components
-   Implement proper error handling in onClose callbacks

For additional theming options, see the [Theming Guide](./theming.md).
