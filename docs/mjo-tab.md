# mjo-tab

Individual tab panel component that displays content when active within a tab navigation system.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Organize and display different sections of content in a tab interface
- Create multi-step forms or wizards with tab navigation
- Build dashboard layouts with categorized information
- Implement settings panels with grouped configuration options

## Import

```typescript
import "mjo-litui/mjo-tabs";
```

**Note**: The `mjo-tab` component is automatically imported when you import `mjo-tabs`. You don't need to import it separately.

## Properties

| Property | Type      | Description                                         | Default | Required |
| -------- | --------- | --------------------------------------------------- | ------- | -------- |
| `active` | `boolean` | Indicates whether this tab is currently active      | `false` | No       |
| `label`  | `string`  | Text displayed in the tab button for this tab panel | `"Tab"` | No       |

## Accessibility

### Best Practices

- Always provide descriptive labels for each tab using the `label` property
- Ensure tab content is meaningful and follows a logical order
- Include sufficient content contrast for readability

### ARIA Support

The component implements proper ARIA attributes:

- **`role="tabpanel"`**: Identifies the content as a tab panel
- **`aria-labelledby`**: Associates the panel with its tab button
- **`hidden`**: Properly hides inactive tab content from screen readers

### Keyboard Interactions

Keyboard navigation is handled by the parent `mjo-tabs` component:

- **Tab**: Moves focus to the tab navigation
- **Arrow Keys**: Navigate between tabs (Left/Right for horizontal, Up/Down for vertical)
- **Enter/Space**: Activate the focused tab
- **Home/End**: Jump to first/last tab

## Usage Examples

### Basic Tab Usage

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-tabs";

@customElement("my-component")
export class MyComponent extends LitElement {
    render() {
        return html`
            <mjo-tabs>
                <mjo-tab label="Overview">
                    <h3>Overview Section</h3>
                    <p>Main content goes here.</p>
                </mjo-tab>

                <mjo-tab label="Details">
                    <h3>Detailed Information</h3>
                    <p>Additional details and specifications.</p>
                </mjo-tab>

                <mjo-tab label="Settings">
                    <h3>Configuration</h3>
                    <p>User settings and preferences.</p>
                </mjo-tab>
            </mjo-tabs>
        `;
    }
}
```

### Dynamic Tab Content

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-tabs";

@customElement("dynamic-tabs")
export class DynamicTabs extends LitElement {
    @state() private userData = {
        name: "John Doe",
        email: "john@example.com",
        role: "Developer",
    };

    render() {
        return html`
            <mjo-tabs variant="solid" color="primary">
                <mjo-tab label="Profile">
                    <div class="profile-content">
                        <h3>User Profile</h3>
                        <p><strong>Name:</strong> ${this.userData.name}</p>
                        <p><strong>Email:</strong> ${this.userData.email}</p>
                        <p><strong>Role:</strong> ${this.userData.role}</p>
                    </div>
                </mjo-tab>

                <mjo-tab label="Activity">
                    <div class="activity-content">
                        <h3>Recent Activity</h3>
                        <ul>
                            ${this.getRecentActivities().map((activity) => html` <li>${activity}</li> `)}
                        </ul>
                    </div>
                </mjo-tab>
            </mjo-tabs>
        `;
    }

    private getRecentActivities() {
        return ["Logged in at 9:00 AM", "Updated profile information", "Completed project review"];
    }
}
```

### Complex Content with Components

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-tabs";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";

@customElement("dashboard-tabs")
export class DashboardTabs extends LitElement {
    render() {
        return html`
            <mjo-tabs variant="bordered" color="default">
                <mjo-tab label="Dashboard">
                    <div class="dashboard-grid">
                        <mjo-card>
                            <h4>Total Users</h4>
                            <p class="stat-value">1,234</p>
                        </mjo-card>

                        <mjo-card>
                            <h4>Active Projects</h4>
                            <p class="stat-value">42</p>
                        </mjo-card>

                        <mjo-card>
                            <h4>Uptime</h4>
                            <p class="stat-value">98.5%</p>
                        </mjo-card>
                    </div>
                </mjo-tab>

                <mjo-tab label="Actions">
                    <div class="actions-panel">
                        <h3>Quick Actions</h3>
                        <mjo-button color="primary">Export Data</mjo-button>
                        <mjo-button color="secondary">Generate Report</mjo-button>
                        <mjo-button>Backup Settings</mjo-button>
                    </div>
                </mjo-tab>

                <mjo-tab label="Reports">
                    <div class="reports-content">
                        <h3>Monthly Reports</h3>
                        <p>View and download monthly performance reports.</p>
                    </div>
                </mjo-tab>
            </mjo-tabs>
        `;
    }
}
```

### Programmatic Tab Management

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { MjoTabs } from "mjo-litui/mjo-tabs";
import "mjo-litui/mjo-tabs";
import "mjo-litui/mjo-button";

@customElement("wizard-form")
export class WizardForm extends LitElement {
    @state() private currentStep = 0;
    @state() private formData = {
        name: "",
        email: "",
        preferences: "",
    };

    render() {
        return html`
            <div class="wizard-container">
                <mjo-tabs id="wizard-tabs">
                    <mjo-tab label="Step 1: Basic Info">
                        <h3>Basic Information</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            .value=${this.formData.name}
                            @input=${(e: Event) => this.updateField("name", (e.target as HTMLInputElement).value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            .value=${this.formData.email}
                            @input=${(e: Event) => this.updateField("email", (e.target as HTMLInputElement).value)}
                        />
                        <mjo-button @click=${() => this.goToNextStep()}> Next Step </mjo-button>
                    </mjo-tab>

                    <mjo-tab label="Step 2: Preferences">
                        <h3>Your Preferences</h3>
                        <textarea
                            placeholder="Enter your preferences"
                            .value=${this.formData.preferences}
                            @input=${(e: Event) => this.updateField("preferences", (e.target as HTMLTextAreaElement).value)}
                        ></textarea>
                        <div class="button-group">
                            <mjo-button variant="ghost" @click=${() => this.goToPreviousStep()}> Back </mjo-button>
                            <mjo-button @click=${() => this.goToNextStep()}> Next Step </mjo-button>
                        </div>
                    </mjo-tab>

                    <mjo-tab label="Step 3: Review">
                        <h3>Review Your Information</h3>
                        <dl>
                            <dt>Name:</dt>
                            <dd>${this.formData.name}</dd>
                            <dt>Email:</dt>
                            <dd>${this.formData.email}</dd>
                            <dt>Preferences:</dt>
                            <dd>${this.formData.preferences}</dd>
                        </dl>
                        <div class="button-group">
                            <mjo-button variant="ghost" @click=${() => this.goToPreviousStep()}> Back </mjo-button>
                            <mjo-button color="success" @click=${() => this.submitForm()}> Submit </mjo-button>
                        </div>
                    </mjo-tab>
                </mjo-tabs>
            </div>
        `;
    }

    private updateField(field: keyof typeof this.formData, value: string) {
        this.formData = { ...this.formData, [field]: value };
    }

    private goToNextStep() {
        const tabs = this.shadowRoot?.querySelector("#wizard-tabs") as MjoTabs;
        if (tabs && this.currentStep < 2) {
            this.currentStep++;
            tabs.setTab(this.currentStep);
        }
    }

    private goToPreviousStep() {
        const tabs = this.shadowRoot?.querySelector("#wizard-tabs") as MjoTabs;
        if (tabs && this.currentStep > 0) {
            this.currentStep--;
            tabs.setTab(this.currentStep);
        }
    }

    private submitForm() {
        console.log("Form submitted:", this.formData);
        // Handle form submission
    }
}
```

## Additional Notes

- The `mjo-tab` component is designed to work exclusively with the `mjo-tabs` parent component
- Tab visibility and activation state are automatically managed by the parent `mjo-tabs` component
- Each `mjo-tab` must have a unique `label` to be properly identified in the tab navigation
- The component automatically generates an ID if one is not provided, ensuring proper ARIA associations
- Content inside tabs is only rendered when the tab becomes active, optimizing initial load performance
- For styling customization, use the CSS parts and variables exposed by the parent `mjo-tabs` component
- When adding or removing tabs dynamically, the parent `mjo-tabs` component will automatically update the tab list and emit a `mjo-tabs:updated` event

For more information about tab navigation behavior, variants, colors, and event handling, see the [mjo-tabs](./mjo-tabs.md) documentation.
