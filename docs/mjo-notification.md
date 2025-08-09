# mjo-notification

A notification system for displaying positioned toast notifications with controller architecture.

## Overview

The `mjo-notification` component provides a powerful notification system for displaying positioned toast notifications. It uses a controller architecture that creates a global notification container in the document body, allowing notifications to appear in any corner of the screen regardless of parent element constraints like `overflow: hidden`.

## Basic Usage

### HTML

```html
<mjo-notification position="top-right"></mjo-notification>
```

### Simple Notification Display

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoNotification } from "mjo-litui/types";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";

@customElement("example-notification-basic")
export class ExampleNotificationBasic extends LitElement {
    @query("mjo-notification")
    private notificationComponent!: MjoNotification;

    private showInfoNotification() {
        this.notificationComponent.controller.show({
            title: "Information",
            message: "This is an informational notification",
            type: "info",
        });
    }

    private showSuccessNotification() {
        this.notificationComponent.controller.show({
            title: "Success",
            message: "Operation completed successfully!",
            type: "success",
        });
    }

    private showWarningNotification() {
        this.notificationComponent.controller.show({
            title: "Warning",
            message: "Please check your input",
            type: "warning",
        });
    }

    private showErrorNotification() {
        this.notificationComponent.controller.show({
            title: "Error",
            message: "An error occurred. Please try again.",
            type: "error",
        });
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <mjo-button @click=${this.showInfoNotification}>Show Info</mjo-button>
                <mjo-button @click=${this.showSuccessNotification} variant="success">Show Success</mjo-button>
                <mjo-button @click=${this.showWarningNotification} variant="warning">Show Warning</mjo-button>
                <mjo-button @click=${this.showErrorNotification} variant="danger">Show Error</mjo-button>
            </div>

            <mjo-notification position="top-right"></mjo-notification>
        `;
    }
}
```

## Positioning Options

Configure notification positioning in any corner of the screen:

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoNotification, NotificationPositions } from "mjo-litui/types";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-select";

@customElement("example-notification-positions")
export class ExampleNotificationPositions extends LitElement {
    @query("mjo-notification")
    private notificationComponent!: MjoNotification;

    @state()
    private currentPosition: NotificationPositions = "top-right";

    private positions: { value: NotificationPositions; label: string }[] = [
        { value: "top-right", label: "Top Right" },
        { value: "top-left", label: "Top Left" },
        { value: "bottom-right", label: "Bottom Right" },
        { value: "bottom-left", label: "Bottom Left" },
    ];

    private showNotificationAtPosition() {
        this.notificationComponent.controller.show({
            title: `${this.currentPosition.replace("-", " ").toUpperCase()}`,
            message: `Notification positioned at ${this.currentPosition}`,
            type: "info",
            time: 4000,
        });
    }

    private onPositionChange(event: any) {
        this.currentPosition = event.target.value;
        this.notificationComponent.position = this.currentPosition;
        this.notificationComponent.controller.setPosition(this.currentPosition);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <label>Position:</label>
                    <mjo-select .value=${this.currentPosition} @change=${this.onPositionChange}>
                        ${this.positions.map((pos) => html` <mjo-option value=${pos.value}>${pos.label}</mjo-option> `)}
                    </mjo-select>
                </div>

                <mjo-button @click=${this.showNotificationAtPosition}> Show Notification at ${this.currentPosition} </mjo-button>
            </div>

            <mjo-notification .position=${this.currentPosition}></mjo-notification>
        `;
    }
}
```

## Notification Types and Styling

The component supports four notification types with distinct styling:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoNotification, NotificationTypes } from "mjo-litui/types";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";

@customElement("example-notification-types")
export class ExampleNotificationTypes extends LitElement {
    @query("mjo-notification")
    private notificationComponent!: MjoNotification;

    private showNotification(type: NotificationTypes, title: string, message: string) {
        this.notificationComponent.controller.show({
            title,
            message,
            type,
            time: 5000,
        });
    }

    private showWithoutIcon() {
        this.notificationComponent.controller.show({
            title: "No Icon Notification",
            message: "This notification has no type, so no icon is displayed",
            time: 4000,
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <mjo-button @click=${() => this.showNotification("info", "Information", "ℹ️ This is important information for you to know")} variant="ghost">
                    Info Notification
                </mjo-button>

                <mjo-button @click=${() => this.showNotification("success", "Success", "✅ Your action was completed successfully")} variant="success">
                    Success Notification
                </mjo-button>

                <mjo-button @click=${() => this.showNotification("warning", "Warning", "⚠️ Please review this important warning")} variant="warning">
                    Warning Notification
                </mjo-button>

                <mjo-button @click=${() => this.showNotification("error", "Error", "❌ An error occurred during processing")} variant="danger">
                    Error Notification
                </mjo-button>

                <mjo-button @click=${this.showWithoutIcon} variant="ghost"> No Icon Notification </mjo-button>
            </div>

            <mjo-notification position="top-right"></mjo-notification>
        `;
    }
}
```

## Auto-Close and Callbacks

Configure automatic closing and callback functions:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoNotification } from "mjo-litui/types";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";

@customElement("example-notification-timing")
export class ExampleNotificationTiming extends LitElement {
    @query("mjo-notification")
    private notificationComponent!: MjoNotification;

    private showPersistentNotification() {
        this.notificationComponent.controller.show({
            title: "Persistent Notification",
            message: "This notification stays until manually closed",
            type: "info",
            // No time property = stays until manually closed
        });
    }

    private showQuickNotification() {
        this.notificationComponent.controller.show({
            title: "Quick Notification",
            message: "This disappears in 2 seconds",
            type: "success",
            time: 2000,
        });
    }

    private showCallbackNotification() {
        this.notificationComponent.controller.show({
            title: "Callback Notification",
            message: "Check console when this closes",
            type: "warning",
            time: 3000,
            onClose: () => {
                console.log("Notification closed at:", new Date().toLocaleTimeString());
                alert("Notification was closed!");
            },
        });
    }

    private async showAsyncNotification() {
        const notification = await this.notificationComponent.controller.show({
            title: "Async Control",
            message: "This will be closed programmatically in 2 seconds",
            type: "info",
        });

        // Close programmatically after 2 seconds
        setTimeout(() => {
            notification.close();
        }, 2000);
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <mjo-button @click=${this.showPersistentNotification}> Persistent Notification </mjo-button>
                <mjo-button @click=${this.showQuickNotification}> Quick (2s) </mjo-button>
                <mjo-button @click=${this.showCallbackNotification}> With Callback </mjo-button>
                <mjo-button @click=${this.showAsyncNotification}> Async Control </mjo-button>
            </div>

            <mjo-notification position="top-right"></mjo-notification>
        `;
    }
}
```

## Complex Content and Rich Messages

Notifications can contain rich HTML content and Lit templates:

```ts
import { LitElement, html, css } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoNotification } from "mjo-litui/types";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-avatar";

@customElement("example-notification-rich-content")
export class ExampleNotificationRichContent extends LitElement {
    static styles = css`
        .notification-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }

        .user-notification {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin: 0.5rem 0;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(45deg, #667eea, #764ba2);
            transition: width 0.3s ease;
        }
    `;

    @query("mjo-notification")
    private notificationComponent!: MjoNotification;

    @state()
    private uploadProgress = 0;

    private showUserMentionNotification() {
        this.notificationComponent.controller.show({
            title: "New Mention",
            message: html`
                <div class="user-notification">
                    <mjo-avatar src="https://via.placeholder.com/40x40/667eea/ffffff?text=JD" alt="John Doe"> </mjo-avatar>
                    <div>
                        <strong>John Doe</strong> mentioned you in a comment:<br />
                        <em>"Could you review this when you have a chance?"</em>
                    </div>
                </div>
            `,
            type: "info",
            time: 8000,
        });
    }

    private showActionNotification() {
        this.notificationComponent.controller.show({
            title: "Action Required",
            message: html`
                <div>
                    <p>Your document is ready for review. What would you like to do?</p>
                    <div class="notification-actions">
                        <mjo-button size="small" @click=${this.handleApprove}> Approve </mjo-button>
                        <mjo-button size="small" variant="ghost" @click=${this.handleReject}> Reject </mjo-button>
                    </div>
                </div>
            `,
            type: "warning",
        });
    }

    private showProgressNotification() {
        this.uploadProgress = 0;
        const notification = this.notificationComponent.controller.show({
            title: "Uploading Files",
            message: html`
                <div>
                    <p>Uploading documents... ${this.uploadProgress}%</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${this.uploadProgress}%"></div>
                    </div>
                </div>
            `,
            type: "info",
        });

        // Simulate progress updates
        const interval = setInterval(() => {
            this.uploadProgress += 10;

            // Update notification content
            this.notificationComponent.controller.show({
                title: "Uploading Files",
                message: html`
                    <div>
                        <p>Uploading documents... ${this.uploadProgress}%</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${this.uploadProgress}%"></div>
                        </div>
                    </div>
                `,
                type: "info",
            });

            if (this.uploadProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.notificationComponent.controller.show({
                        title: "Upload Complete",
                        message: "✅ All files uploaded successfully!",
                        type: "success",
                        time: 3000,
                    });
                }, 500);
            }
        }, 500);
    }

    private handleApprove() {
        this.notificationComponent.controller.show({
            title: "Approved",
            message: "Document has been approved and published.",
            type: "success",
            time: 3000,
        });
    }

    private handleReject() {
        this.notificationComponent.controller.show({
            title: "Rejected",
            message: "Document has been rejected and returned to author.",
            type: "error",
            time: 3000,
        });
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <mjo-button @click=${this.showUserMentionNotification}> User Mention </mjo-button>
                <mjo-button @click=${this.showActionNotification}> Action Required </mjo-button>
                <mjo-button @click=${this.showProgressNotification}> Progress Notification </mjo-button>
            </div>

            <mjo-notification position="top-right"></mjo-notification>
        `;
    }
}
```

## Threshold and Queue Management

Control the maximum number of notifications displayed simultaneously:

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoNotification } from "mjo-litui/types";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-textfield";

@customElement("example-notification-threshold")
export class ExampleNotificationThreshold extends LitElement {
    @query("mjo-notification")
    private notificationComponent!: MjoNotification;

    @state()
    private threshold = 3;

    @state()
    private messageCount = 0;

    private updateThreshold(event: any) {
        this.threshold = parseInt(event.target.value) || 3;
        this.notificationComponent.threshold = this.threshold;
    }

    private showBulkNotifications() {
        const messages = [
            { title: "Message 1", message: "First notification in the queue", type: "info" as const },
            { title: "Message 2", message: "Second notification in the queue", type: "success" as const },
            { title: "Message 3", message: "Third notification in the queue", type: "warning" as const },
            { title: "Message 4", message: "Fourth notification (may push others out)", type: "error" as const },
            { title: "Message 5", message: "Fifth notification (will push first out)", type: "info" as const },
            { title: "Message 6", message: "Sixth notification (will push second out)", type: "success" as const },
        ];

        messages.forEach((msg, index) => {
            setTimeout(() => {
                this.notificationComponent.controller.show({
                    title: msg.title,
                    message: msg.message,
                    type: msg.type,
                    time: 10000, // Long duration to see queue behavior
                });
            }, index * 800);
        });
    }

    private showRapidNotifications() {
        for (let i = 1; i <= 10; i++) {
            setTimeout(() => {
                this.notificationComponent.controller.show({
                    title: `Rapid Notification #${i}`,
                    message: `This is rapid notification number ${i}`,
                    type: i % 2 === 0 ? "success" : "info",
                    time: 3000,
                });
            }, i * 300);
        }
    }

    private showSingleNotification() {
        this.messageCount++;
        this.notificationComponent.controller.show({
            title: `Notification #${this.messageCount}`,
            message: `This is notification number ${this.messageCount}`,
            type: "info",
            time: 5000,
        });
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <label>Notification Threshold:</label>
                    <mjo-textfield type="number" .value=${this.threshold.toString()} @input=${this.updateThreshold} min="1" max="10" style="width: 100px;">
                    </mjo-textfield>
                    <span>Max ${this.threshold} notifications visible</span>
                </div>

                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <mjo-button @click=${this.showSingleNotification}> Add Single Notification </mjo-button>
                    <mjo-button @click=${this.showBulkNotifications}> Show Bulk Demo (6 notifications) </mjo-button>
                    <mjo-button @click=${this.showRapidNotifications}> Rapid Fire (10 notifications) </mjo-button>
                </div>
            </div>

            <mjo-notification position="top-right" .threshold=${this.threshold}></mjo-notification>
        `;
    }
}
```

## Context Sharing Example

The notification controller can be shared across component hierarchies using `@lit/context`, allowing child components to display notifications from a parent container. This is especially useful for applications where notification functionality needs to be accessible from deeply nested components.

```ts
import { LitElement, html, PropertyValues } from "lit";
import { customElement, provide, consume, query } from "lit/decorators.js";
import { createContext } from "@lit/context";
import type { MjoNotification, NotificationController } from "mjo-litui/types";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-form";

// Create a context for the notification controller
const notificationContext = createContext<NotificationController>("notification-controller");

@customElement("main-app-component")
export class MainAppComponent extends LitElement {
    @provide({ context: notificationContext })
    notificationController!: NotificationController;

    @query("mjo-notification")
    private notification!: MjoNotification;

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        // Assign the notification controller to the context provider after the notification is available
        this.notificationController = this.notification.controller;
    }

    render() {
        return html`
            <div style="padding: 2rem;">
                <h2>Main Application</h2>
                <p>This main component provides a notification controller to all child components through context.</p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                    <system-monitor-component></system-monitor-component>
                    <user-activity-component></user-activity-component>
                </div>

                <div style="margin-top: 2rem;">
                    <form-submission-component></form-submission-component>
                </div>

                <!-- The notification instance that provides the controller -->
                <mjo-notification position="top-right" threshold="5"></mjo-notification>
            </div>
        `;
    }
}

@customElement("system-monitor-component")
export class SystemMonitorComponent extends LitElement {
    @consume({ context: notificationContext, subscribe: true })
    notificationController!: NotificationController;

    private checkSystemHealth() {
        // Simulate system check
        setTimeout(() => {
            this.notificationController.show({
                title: "System Health Check",
                message: "All systems are running normally",
                type: "success",
                time: 4000,
            });
        }, 500);
    }

    private simulateWarning() {
        this.notificationController.show({
            title: "High CPU Usage",
            message: "CPU usage is at 85%. Consider closing unnecessary applications.",
            type: "warning",
            time: 8000,
        });
    }

    private simulateError() {
        this.notificationController.show({
            title: "Database Connection Lost",
            message: html`
                <div>
                    <p>Connection to the database has been lost.</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                        <mjo-button size="small" @click=${this.reconnectDatabase}> Reconnect </mjo-button>
                        <mjo-button size="small" variant="ghost" @click=${this.showDetails}> Details </mjo-button>
                    </div>
                </div>
            `,
            type: "error",
        });
    }

    private reconnectDatabase() {
        this.notificationController.show({
            title: "Reconnecting...",
            message: "Attempting to reconnect to database",
            type: "info",
            time: 2000,
        });

        setTimeout(() => {
            this.notificationController.show({
                title: "Connection Restored",
                message: "Database connection has been successfully restored",
                type: "success",
                time: 3000,
            });
        }, 2000);
    }

    private showDetails() {
        this.notificationController.show({
            title: "Error Details",
            message: "Connection timeout after 30 seconds. Server may be overloaded.",
            type: "info",
            time: 5000,
        });
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>System Monitor</h4>
                    <p>Monitor system health and receive notifications for issues.</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
                        <mjo-button @click=${this.checkSystemHealth} variant="success"> Health Check </mjo-button>
                        <mjo-button @click=${this.simulateWarning} variant="warning"> CPU Warning </mjo-button>
                        <mjo-button @click=${this.simulateError} variant="danger"> DB Error </mjo-button>
                    </div>
                </div>
            </mjo-card>
        `;
    }
}

@customElement("user-activity-component")
export class UserActivityComponent extends LitElement {
    @consume({ context: notificationContext, subscribe: true })
    notificationController!: NotificationController;

    private simulateUserLogin() {
        const users = ["Alice Johnson", "Bob Smith", "Carol Williams", "David Brown"];
        const randomUser = users[Math.floor(Math.random() * users.length)];

        this.notificationController.show({
            title: "New User Login",
            message: html`
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: #4caf50;"></div>
                    <span><strong>${randomUser}</strong> has logged in</span>
                </div>
            `,
            type: "info",
            time: 4000,
        });
    }

    private simulateNewMessage() {
        this.notificationController.show({
            title: "New Message",
            message: html`
                <div>
                    <p><strong>Sarah Connor:</strong> "The project timeline looks good. Let's proceed with the next phase."</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                        <mjo-button size="small" @click=${this.replyToMessage}> Reply </mjo-button>
                        <mjo-button size="small" variant="ghost" @click=${this.markAsRead}> Mark Read </mjo-button>
                    </div>
                </div>
            `,
            type: "info",
        });
    }

    private replyToMessage() {
        this.notificationController.show({
            title: "Reply Sent",
            message: "Your reply has been sent to Sarah Connor",
            type: "success",
            time: 3000,
        });
    }

    private markAsRead() {
        this.notificationController.show({
            title: "Message Marked as Read",
            message: "Message moved to read folder",
            type: "info",
            time: 2000,
        });
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>User Activity</h4>
                    <p>Track user activities and receive real-time notifications.</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
                        <mjo-button @click=${this.simulateUserLogin}> Simulate Login </mjo-button>
                        <mjo-button @click=${this.simulateNewMessage}> New Message </mjo-button>
                    </div>
                </div>
            </mjo-card>
        `;
    }
}

@customElement("form-submission-component")
export class FormSubmissionComponent extends LitElement {
    @consume({ context: notificationContext, subscribe: true })
    notificationController!: NotificationController;

    private async submitForm() {
        // Show processing notification
        const processingNotification = await this.notificationController.show({
            title: "Processing Form",
            message: "Please wait while we process your submission...",
            type: "info",
        });

        try {
            // Simulate form processing
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Close processing notification
            processingNotification.close();

            // Show success notification
            this.notificationController.show({
                title: "Form Submitted Successfully",
                message: html`
                    <div>
                        <p>Your form has been submitted and is being reviewed.</p>
                        <p><strong>Reference ID:</strong> #${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    </div>
                `,
                type: "success",
                time: 6000,
            });

            // Show follow-up notification
            setTimeout(() => {
                this.notificationController.show({
                    title: "Next Steps",
                    message: "You will receive an email confirmation within 24 hours.",
                    type: "info",
                    time: 5000,
                });
            }, 2000);
        } catch (error) {
            processingNotification.close();
            this.notificationController.show({
                title: "Submission Failed",
                message: "There was an error processing your form. Please try again.",
                type: "error",
                time: 5000,
            });
        }
    }

    private saveAsDraft() {
        this.notificationController.show({
            title: "Draft Saved",
            message: "Your form has been saved as a draft. You can continue editing later.",
            type: "success",
            time: 3000,
        });
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>Form Submission</h4>
                    <p>Submit forms and receive notifications about the process.</p>

                    <mjo-form style="margin: 1rem 0;">
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <mjo-textfield label="Full Name" required></mjo-textfield>
                            <mjo-textfield label="Email" type="email" required></mjo-textfield>
                            <mjo-textfield label="Message" multiline rows="3"></mjo-textfield>
                        </div>
                    </mjo-form>

                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        <mjo-button @click=${this.submitForm}> Submit Form </mjo-button>
                        <mjo-button @click=${this.saveAsDraft} variant="ghost"> Save Draft </mjo-button>
                    </div>
                </div>
            </mjo-card>
        `;
    }
}
```

This pattern allows any component in the application hierarchy to display notifications without needing to pass the controller through props or maintaining multiple notification instances.

## Theme Customization

### Using mjo-theme

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoNotification } from "mjo-litui/types";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";

@customElement("example-notification-theming")
export class ExampleNotificationTheming extends LitElement {
    @query("mjo-notification")
    private notificationComponent!: MjoNotification;

    private showThemedNotification() {
        this.notificationComponent.controller.show({
            title: "Themed Notification",
            message: "This notification uses custom theme colors and styling.",
            type: "info",
            time: 5000,
        });
    }

    render() {
        return html`
            <mjo-theme
                .theme=${{
                    notification: {
                        backgroundColor: "#f8f9fa",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                        radius: "12px",
                        margin: "20px",
                        titleFontSize: "1.1em",
                        titleFontWeight: "600",
                        titleColor: "#2c3e50",
                        messageFontSize: "0.95em",
                        messageColor: "#34495e",
                        closeHoverBackgroundColor: "#e9ecef",
                    },
                }}
            >
                <div style="padding: 2rem;">
                    <h3>Custom Notification Theme</h3>
                    <p>Notifications will appear with custom styling</p>

                    <mjo-button @click=${this.showThemedNotification}> Show Themed Notification </mjo-button>
                </div>

                <mjo-notification position="top-right"></mjo-notification>
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
import type { MjoNotification } from "mjo-litui/types";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";

@customElement("example-notification-theme-mixin")
export class ExampleNotificationThemeMixin extends ThemeMixin(LitElement) {
    @query("mjo-notification")
    private notificationComponent!: MjoNotification;

    private showCustomNotification() {
        this.notificationComponent.controller.show({
            title: "Component-Level Theme",
            message: "This notification has component-level theme overrides.",
            type: "success",
            time: 4000,
        });
    }

    render() {
        return html`
            <div style="padding: 2rem;">
                <h3>Component-Level Notification Theming</h3>

                <mjo-button @click=${this.showCustomNotification}> Show Custom Notification </mjo-button>

                <mjo-notification
                    position="top-right"
                    .theme=${{
                        backgroundColor: "#fff3cd",
                        boxShadow: "0 4px 20px rgba(255, 193, 7, 0.3)",
                        radius: "8px",
                        titleColor: "#856404",
                        messageColor: "#664d03",
                    }}
                >
                </mjo-notification>
            </div>
        `;
    }
}
```

## Multiple Notification Systems

You can have multiple notification systems with different positions:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoNotification } from "mjo-litui/types";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";

@customElement("example-multiple-notifications")
export class ExampleMultipleNotifications extends LitElement {
    @query('mjo-notification[position="top-right"]')
    private topRightNotification!: MjoNotification;

    @query('mjo-notification[position="bottom-left"]')
    private bottomLeftNotification!: MjoNotification;

    private showSystemNotification() {
        this.topRightNotification.controller.show({
            title: "System Notification",
            message: "This appears in the top-right corner for system messages.",
            type: "info",
            time: 4000,
        });
    }

    private showUserNotification() {
        this.bottomLeftNotification.controller.show({
            title: "User Action",
            message: "This appears in the bottom-left corner for user-related notifications.",
            type: "success",
            time: 4000,
        });
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem;">
                <mjo-button @click=${this.showSystemNotification}> System Notification (Top-Right) </mjo-button>
                <mjo-button @click=${this.showUserNotification}> User Notification (Bottom-Left) </mjo-button>
            </div>

            <!-- Multiple notification systems -->
            <mjo-notification position="top-right" threshold="3"></mjo-notification>
            <mjo-notification position="bottom-left" threshold="2"></mjo-notification>
        `;
    }
}
```

## Properties

| Name        | Type                    | Default       | Description                                                                               |
| ----------- | ----------------------- | ------------- | ----------------------------------------------------------------------------------------- |
| `position`  | `NotificationPositions` | `"top-right"` | Position of notifications: `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"` |
| `threshold` | `number`                | `4`           | Maximum number of notifications displayed simultaneously                                  |
| `theme`     | `MjoNotificationTheme`  | `{}`          | Theme configuration for the notification container                                        |

## Controller Methods

The `NotificationController` provides the following methods:

### `show(params: NotificationShowParams): Promise<NotificationItem>`

Shows a new notification and returns the notification item instance for programmatic control.

#### Parameters

| Name      | Type                          | Default | Description                                                         |
| --------- | ----------------------------- | ------- | ------------------------------------------------------------------- |
| `message` | `string \| TemplateResult<1>` | -       | The notification message content (HTML string or Lit template)      |
| `title`   | `string`                      | -       | Optional notification title                                         |
| `type`    | `NotificationTypes`           | -       | Notification type: `"info"`, `"success"`, `"warning"`, or `"error"` |
| `time`    | `number`                      | `0`     | Auto-close time in milliseconds (0 = manual close only)             |
| `onClose` | `() => void`                  | -       | Callback function executed when notification closes                 |

### `setPosition(position: NotificationPositions): void`

Changes the position of the notification container.

## Types

```ts
type NotificationPositions = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type NotificationTypes = "info" | "warning" | "error" | "success";

interface NotificationShowParams {
    title?: string;
    message: string | TemplateResult<1>;
    type?: NotificationTypes;
    time?: number;
    onClose?: () => void;
}
```

## Events

This component does not emit custom events. Individual notification items handle their own removal events internally.

## CSS Custom Properties

| Property                                          | Default                                                | Description                                |
| ------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------ |
| `--mjo-notification-background-color`             | `var(--mjo-background-color-low, #ffffff)`             | Background color for notification items    |
| `--mjo-notification-box-shadow`                   | `var(--mjo-box-shadow-2, 0 0 10px rgba(0, 0, 0, 0.1))` | Box shadow for notification items          |
| `--mjo-notification-radius`                       | `var(--mjo-radius-large, 4px)`                         | Border radius for notification items       |
| `--mjo-notification-margin`                       | `15px`                                                 | Margin between notification items          |
| `--mjo-notification-space-vertical`               | `0`                                                    | Vertical spacing from screen edge          |
| `--mjo-notification-space-horizontal`             | `15px`                                                 | Horizontal spacing from screen edge        |
| `--mjo-notification-title-font-size`              | `1em`                                                  | Font size for notification titles          |
| `--mjo-notification-title-font-weight`            | `500`                                                  | Font weight for notification titles        |
| `--mjo-notification-title-color`                  | -                                                      | Color for notification titles              |
| `--mjo-notification-message-font-size`            | `0.9em`                                                | Font size for notification messages        |
| `--mjo-notification-message-color`                | -                                                      | Color for notification messages            |
| `--mjo-notification-close-hover-background-color` | `var(--mjo-background-color-high, #f5f5f5)`            | Background color for close button on hover |

### Theme Interface

```ts
interface MjoNotificationTheme {
    backgroundColor?: string;
    boxShadow?: string;
    radius?: string;
    margin?: string;
    titleFontSize?: string;
    titleFontWeight?: string;
    titleColor?: string;
    closeHoverBackgroundColor?: string;
    messageFontSize?: string;
    messageColor?: string;
}
```

## Technical Notes

-   **Global Container**: Notifications are rendered in containers appended to `document.body`
-   **Z-Index Management**: The container inherits z-index from the host component
-   **Queue Management**: Automatically manages notification threshold and removes oldest notifications
-   **Animation System**: Smooth slide-in and slide-out animations with position-aware directions
-   **Content Flexibility**: Supports both HTML strings and Lit templates for rich content
-   **Theme Inheritance**: Notification container inherits theme from the host component
-   **Position Awareness**: Different animation directions based on screen position

## Accessibility

-   Notifications include appropriate ARIA attributes for screen readers
-   Color-coded by type with distinct icons for each notification type
-   Manual close buttons are keyboard accessible
-   High contrast support for all notification elements
-   Screen reader friendly with proper heading structure

## Best Practices

-   Use appropriate notification types to convey the correct urgency level
-   Keep notification content concise and actionable
-   Provide longer duration for important notifications
-   Use callbacks for notifications that require user acknowledgment
-   Consider the threshold limit to avoid overwhelming users
-   Place notification components at appropriate application levels
-   Use context sharing for large applications with multiple components
-   Group related notifications by using different positions

For additional theming options, see the [Theming Guide](./theming.md).
