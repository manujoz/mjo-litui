# mjo-drawer

Dynamic side panel component providing slide-out content areas with configurable positioning, animations, overlay management, and comprehensive accessibility support including ARIA patterns, focus management, and keyboard navigation.

## HTML Usage

```html
<mjo-drawer id="myDrawer"></mjo-drawer>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";

@customElement("example-drawer-basic")
export class ExampleDrawerBasic extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    private openDrawer() {
        this.drawer.controller.show({
            title: "Basic Drawer",
            content: html`
                <div style="padding: 1rem;">
                    <p>This is a basic drawer with some content.</p>
                    <p>You can put any HTML content here.</p>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div>
                <mjo-button @click=${this.openDrawer} color="primary"> Open Basic Drawer </mjo-button>
                <mjo-drawer></mjo-drawer>
            </div>
        `;
    }
}
```

## Context Sharing Example

The drawer controller can be shared across component hierarchies using `@lit/context`, allowing child components to trigger drawers from a parent container. This is especially useful for applications where drawer functionality needs to be accessible from deeply nested components.

```ts
import { LitElement, html, PropertyValues } from "lit";
import { customElement, provide, consume, query } from "lit/decorators.js";
import { createContext } from "@lit/context";
import type { MjoDrawer, DrawerController } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";

// Create a context for the drawer controller
const drawerContext = createContext<DrawerController>("drawer-controller");

@customElement("main-app-component")
export class MainAppComponent extends LitElement {
    @provide({ context: drawerContext })
    drawerController!: DrawerController;

    @query("mjo-drawer")
    private drawer!: MjoDrawer;

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        // Assign the drawer controller to the context provider after the drawer is available
        this.drawerController = this.drawer.controller;
    }

    render() {
        return html`
            <div style="padding: 2rem;">
                <h2>Main Application</h2>
                <p>This main component provides a drawer controller to all child components through context.</p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                    <navigation-menu></navigation-menu>
                    <settings-panel></settings-panel>
                </div>

                <div style="margin-top: 2rem;">
                    <toolbar-component></toolbar-component>
                </div>

                <!-- The drawer instance that provides the controller -->
                <mjo-drawer></mjo-drawer>
            </div>
        `;
    }
}

@customElement("navigation-menu")
export class NavigationMenu extends LitElement {
    @consume({ context: drawerContext, subscribe: true })
    drawerController!: DrawerController;

    private openNavDrawer() {
        this.drawerController.show({
            title: "Navigation Menu",
            position: "left",
            width: 350,
            content: html`
                <div style="padding: 1rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-button variant="ghost" style="justify-content: flex-start;">🏠 Home</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">📊 Dashboard</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">👤 Profile</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">⚙️ Settings</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">📈 Analytics</mjo-button>
                    </div>
                </div>
            `,
        });
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>Navigation Component</h4>
                    <p>This component consumes the drawer controller from context.</p>
                    <mjo-button @click=${this.openNavDrawer} color="primary"> Open Navigation </mjo-button>
                </div>
            </mjo-card>
        `;
    }
}

@customElement("settings-panel")
export class SettingsPanel extends LitElement {
    @consume({ context: drawerContext, subscribe: true })
    drawerController!: DrawerController;

    private openSettingsDrawer() {
        this.drawerController.show({
            title: "Application Settings",
            position: "right",
            width: 450,
            content: html`
                <div style="padding: 1rem;">
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <h5>User Preferences</h5>
                        <mjo-button variant="ghost" style="justify-content: space-between;">
                            <span>Dark Mode</span>
                            <span>Off</span>
                        </mjo-button>
                        <mjo-button variant="ghost" style="justify-content: space-between;">
                            <span>Notifications</span>
                            <span>On</span>
                        </mjo-button>
                        <mjo-button variant="ghost" style="justify-content: space-between;">
                            <span>Auto-save</span>
                            <span>On</span>
                        </mjo-button>

                        <h5 style="margin-top: 1rem;">Account Settings</h5>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">Change Password</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">Privacy Settings</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">Export Data</mjo-button>
                    </div>
                </div>
            `,
        });
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>Settings Component</h4>
                    <p>Another child component using the shared drawer controller.</p>
                    <mjo-button @click=${this.openSettingsDrawer} color="secondary"> Open Settings </mjo-button>
                </div>
            </mjo-card>
        `;
    }
}

@customElement("toolbar-component")
export class ToolbarComponent extends LitElement {
    @consume({ context: drawerContext, subscribe: true })
    drawerController!: DrawerController;

    private openHelpDrawer() {
        this.drawerController.show({
            title: "Help & Documentation",
            position: "top",
            height: "60vh",
            content: html`
                <div style="padding: 2rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                        <mjo-card>
                            <div style="padding: 1rem;">
                                <h5>🚀 Getting Started</h5>
                                <p>Learn the basics and set up your workspace</p>
                            </div>
                        </mjo-card>

                        <mjo-card>
                            <div style="padding: 1rem;">
                                <h5>📖 User Guide</h5>
                                <p>Comprehensive guide to all features</p>
                            </div>
                        </mjo-card>

                        <mjo-card>
                            <div style="padding: 1rem;">
                                <h5>🛠️ Troubleshooting</h5>
                                <p>Common issues and solutions</p>
                            </div>
                        </mjo-card>

                        <mjo-card>
                            <div style="padding: 1rem;">
                                <h5>💬 Support</h5>
                                <p>Contact our support team</p>
                            </div>
                        </mjo-card>
                    </div>
                </div>
            `,
        });
    }

    private openQuickActionsDrawer() {
        this.drawerController.show({
            title: "Quick Actions",
            position: "bottom",
            height: 200,
            content: html`
                <div style="padding: 1rem;">
                    <div style="display: flex; justify-content: space-around; align-items: center; height: 100%;">
                        <mjo-button variant="ghost" style="flex-direction: column; gap: 0.5rem;">
                            <span style="font-size: 1.5rem;">💾</span>
                            <span>Save</span>
                        </mjo-button>
                        <mjo-button variant="ghost" style="flex-direction: column; gap: 0.5rem;">
                            <span style="font-size: 1.5rem;">📤</span>
                            <span>Export</span>
                        </mjo-button>
                        <mjo-button variant="ghost" style="flex-direction: column; gap: 0.5rem;">
                            <span style="font-size: 1.5rem;">🔄</span>
                            <span>Sync</span>
                        </mjo-button>
                        <mjo-button variant="ghost" style="flex-direction: column; gap: 0.5rem;">
                            <span style="font-size: 1.5rem;">📊</span>
                            <span>Reports</span>
                        </mjo-button>
                    </div>
                </div>
            `,
        });
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>Toolbar Component</h4>
                    <p>This toolbar component can also access the shared drawer for help and quick actions.</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        <mjo-button @click=${this.openHelpDrawer} color="info" size="small"> Help </mjo-button>
                        <mjo-button @click=${this.openQuickActionsDrawer} color="success" size="small"> Quick Actions </mjo-button>
                    </div>
                </div>
            </mjo-card>
        `;
    }
}
```

### Context Benefits

-   **Single Drawer Instance**: One drawer in the main component can be used by all children
-   **Overflow Prevention**: The drawer-container renders in the document body, bypassing any parent `overflow: hidden` styles
-   **Clean Architecture**: Child components don't need to manage their own drawer instances
-   **Consistent Behavior**: All drawers share the same styling and animation behavior
-   **Memory Efficient**: Only one drawer container is created regardless of how many components use it

### Setup Requirements

1. **Install Context**: `npm install @lit/context`
2. **Create Context**: Define a context for the drawer controller
3. **Provide Controller**: Use `@provide` in the main component with the drawer instance
4. **Consume Controller**: Use `@consume` in child components to access the shared controller

This pattern is particularly useful for:

-   **Navigation systems** where multiple components can trigger navigation drawers
-   **Settings panels** accessible from various parts of the application
-   **Help systems** that can be triggered from any component
-   **Complex applications** with deeply nested component hierarchies

## Positioning Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";

@customElement("example-drawer-positions")
export class ExampleDrawerPositions extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    private openDrawer(position: "left" | "right" | "top" | "bottom", title: string) {
        this.drawer.controller.show({
            title: `${title} Drawer`,
            position,
            content: html`
                <div style="padding: 1rem;">
                    <h4>Content from the ${position}</h4>
                    <p>This drawer slides in from the ${position} side of the screen.</p>
                    <p>The position affects both the animation direction and the default dimensions.</p>
                    <ul>
                        <li>Left/Right drawers have configurable width</li>
                        <li>Top/Bottom drawers have configurable height</li>
                        <li>All positions support custom styling</li>
                    </ul>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <h4>Drawer Positions</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; max-width: 400px;">
                    <mjo-button @click=${() => this.openDrawer("left", "Left")} color="primary"> Left Drawer </mjo-button>
                    <mjo-button @click=${() => this.openDrawer("right", "Right")} color="secondary"> Right Drawer </mjo-button>
                    <mjo-button @click=${() => this.openDrawer("top", "Top")} color="success"> Top Drawer </mjo-button>
                    <mjo-button @click=${() => this.openDrawer("bottom", "Bottom")} color="warning"> Bottom Drawer </mjo-button>
                </div>
                <mjo-drawer></mjo-drawer>
            </div>
        `;
    }
}
```

## Dimensions and Styling Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";

@customElement("example-drawer-dimensions")
export class ExampleDrawerDimensions extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    private openWideDrawer() {
        this.drawer.controller.show({
            title: "Wide Navigation",
            position: "left",
            width: 600,
            content: html`
                <div style="padding: 1rem;">
                    <h4>Wide Navigation Drawer</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <mjo-card>
                            <div style="padding: 1rem;">
                                <h5>Section 1</h5>
                                <p>Navigation content can be organized in cards for better structure.</p>
                            </div>
                        </mjo-card>
                        <mjo-card>
                            <div style="padding: 1rem;">
                                <h5>Section 2</h5>
                                <p>The wider drawer provides more space for complex layouts.</p>
                            </div>
                        </mjo-card>
                    </div>
                </div>
            `,
        });
    }

    private openNarrowDrawer() {
        this.drawer.controller.show({
            title: "Quick Menu",
            position: "right",
            width: "300px",
            content: html`
                <div style="padding: 1rem;">
                    <h4>Quick Actions</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-button variant="ghost" style="justify-content: flex-start;">Home</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">Profile</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">Settings</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">Help</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">Logout</mjo-button>
                    </div>
                </div>
            `,
        });
    }

    private openTallDrawer() {
        this.drawer.controller.show({
            title: "Toolbar Panel",
            position: "top",
            height: "40vh",
            content: html`
                <div style="padding: 1rem;">
                    <h4>Extended Toolbar</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${Array.from({ length: 20 }, (_, i) => html` <mjo-button size="small" variant="ghost">Tool ${i + 1}</mjo-button> `)}
                    </div>
                </div>
            `,
        });
    }

    private openShortDrawer() {
        this.drawer.controller.show({
            title: "Status Bar",
            position: "bottom",
            height: 150,
            content: html`
                <div style="padding: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-weight: 500;">Status:</span>
                        <span style="color: green;">Connected</span>
                    </div>
                    <div>
                        <span style="font-weight: 500;">Last Updated:</span>
                        <span>${new Date().toLocaleTimeString()}</span>
                    </div>
                    <mjo-button size="small" color="primary">Refresh</mjo-button>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Custom Widths (Left/Right)</h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <mjo-button @click=${this.openWideDrawer} color="primary"> Wide Drawer (600px) </mjo-button>
                        <mjo-button @click=${this.openNarrowDrawer} color="secondary"> Narrow Drawer (300px) </mjo-button>
                    </div>
                </div>

                <div>
                    <h4>Custom Heights (Top/Bottom)</h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <mjo-button @click=${this.openTallDrawer} color="success"> Tall Drawer (40vh) </mjo-button>
                        <mjo-button @click=${this.openShortDrawer} color="warning"> Short Drawer (150px) </mjo-button>
                    </div>
                </div>

                <mjo-drawer></mjo-drawer>
            </div>
        `;
    }
}
```

## Modal Behavior and Callbacks Example

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-switch";

@customElement("example-drawer-modal")
export class ExampleDrawerModal extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;
    @state() private logs: string[] = [];
    @state() private isBlocked = false;

    private addLog(message: string) {
        this.logs = [...this.logs, `${new Date().toLocaleTimeString()}: ${message}`];
    }

    private openNormalDrawer() {
        this.addLog("Opening normal drawer...");
        this.drawer.controller.show({
            title: "Normal Drawer",
            content: html`
                <div style="padding: 1rem;">
                    <p>This is a normal drawer that can be closed by:</p>
                    <ul>
                        <li>Clicking the X button</li>
                        <li>Clicking outside the drawer (background)</li>
                        <li>Programmatically calling close()</li>
                    </ul>
                    <mjo-button @click=${() => this.drawer.controller.close()} color="primary"> Close Programmatically </mjo-button>
                </div>
            `,
            onOpen: () => this.addLog("Normal drawer opened"),
            onClose: () => this.addLog("Normal drawer closed"),
        });
    }

    private openBlockedDrawer() {
        this.addLog("Opening blocked drawer...");
        this.drawer.controller.show({
            title: "Blocked Drawer",
            blocked: true,
            content: html`
                <div style="padding: 1rem;">
                    <p style="color: #f59e0b; font-weight: 500;">⚠️ This drawer is blocked!</p>
                    <p>Blocked drawers cannot be closed by:</p>
                    <ul>
                        <li>Clicking outside (background clicks are ignored)</li>
                        <li>The X button is hidden</li>
                    </ul>
                    <p>They can only be closed programmatically:</p>
                    <mjo-button @click=${() => this.drawer.controller.close()} color="error"> Force Close </mjo-button>
                </div>
            `,
            onOpen: () => this.addLog("Blocked drawer opened"),
            onClose: () => this.addLog("Blocked drawer closed"),
        });
    }

    private openCustomAnimationDrawer() {
        this.addLog("Opening slow animation drawer...");
        this.drawer.controller.show({
            title: "Slow Animation",
            animationDuration: 1000,
            content: html`
                <div style="padding: 1rem;">
                    <p>This drawer uses a slower animation (1 second).</p>
                    <p>The animation duration affects both opening and closing.</p>
                    <mjo-button @click=${() => this.drawer.controller.close()} color="primary"> Close (Watch Animation) </mjo-button>
                </div>
            `,
            onOpen: () => this.addLog("Slow drawer animation completed"),
            onClose: () => this.addLog("Slow drawer closed"),
        });
    }

    private clearLogs() {
        this.logs = [];
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Modal Behaviors</h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <mjo-button @click=${this.openNormalDrawer} color="primary"> Normal Drawer </mjo-button>
                        <mjo-button @click=${this.openBlockedDrawer} color="warning"> Blocked Drawer </mjo-button>
                        <mjo-button @click=${this.openCustomAnimationDrawer} color="secondary"> Custom Animation </mjo-button>
                    </div>
                </div>

                <div>
                    <h4>Event Log</h4>
                    <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 1rem; max-height: 200px; overflow-y: auto;">
                        ${this.logs.length > 0
                            ? html`
                                  <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                                      ${this.logs.map((log) => html` <div style="font-family: monospace; font-size: 0.9rem;">${log}</div> `)}
                                  </div>
                              `
                            : html` <div style="color: #6c757d; font-style: italic;">No events yet. Open a drawer to see callbacks in action.</div> `}
                    </div>
                    <mjo-button @click=${this.clearLogs} variant="ghost" size="small" style="margin-top: 0.5rem;"> Clear Log </mjo-button>
                </div>

                <mjo-drawer></mjo-drawer>
            </div>
        `;
    }
}
```

## Complex Content Example

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-card";
import "mjo-litui/mjo-form";

@customElement("example-drawer-complex")
export class ExampleDrawerComplex extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;
    @state() private formData: Record<string, string> = {};

    private openSettingsDrawer() {
        this.drawer.controller.show({
            title: "Settings Panel",
            position: "right",
            width: 500,
            content: html`
                <div style="padding: 1rem; height: 100%; display: flex; flex-direction: column;">
                    <mjo-form @submit=${this.handleSettingsSubmit}>
                        <div style="display: flex; flex-direction: column; gap: 1rem; flex: 1;">
                            <mjo-card>
                                <div style="padding: 1rem;">
                                    <h5 style="margin: 0 0 1rem 0;">User Profile</h5>
                                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                        <mjo-textfield label="Display Name" name="displayName" value="John Doe"></mjo-textfield>
                                        <mjo-textfield label="Email" name="email" type="email" value="john@example.com"></mjo-textfield>
                                        <mjo-textfield label="Phone" name="phone" value="+1 234 567 8900"></mjo-textfield>
                                    </div>
                                </div>
                            </mjo-card>

                            <mjo-card>
                                <div style="padding: 1rem;">
                                    <h5 style="margin: 0 0 1rem 0;">Preferences</h5>
                                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                        <mjo-textfield label="Language" name="language" value="English"></mjo-textfield>
                                        <mjo-textfield label="Timezone" name="timezone" value="UTC-8"></mjo-textfield>
                                        <mjo-textfield label="Theme" name="theme" value="Light"></mjo-textfield>
                                    </div>
                                </div>
                            </mjo-card>
                        </div>

                        <div style="display: flex; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid #dee2e6;">
                            <mjo-button type="submit" color="primary" style="flex: 1;">Save Settings</mjo-button>
                            <mjo-button type="button" variant="ghost" @click=${() => this.drawer.controller.close()}>Cancel</mjo-button>
                        </div>
                    </mjo-form>
                </div>
            `,
        });
    }

    private handleSettingsSubmit(event: CustomEvent) {
        const { response } = event.detail;
        if (!response.error) {
            this.formData = response.data || {};
            this.drawer.controller.close();

            // Simulate saving
            setTimeout(() => {
                if (response.submitButton) {
                    response.submitButton.loading = false;
                }
            }, 1000);
        }
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Complex Content</h4>
                    <mjo-button @click=${this.openSettingsDrawer} color="primary"> Settings Panel </mjo-button>
                </div>

                ${Object.keys(this.formData).length > 0
                    ? html`
                          <div>
                              <h4>Last Saved Settings</h4>
                              <mjo-card>
                                  <div style="padding: 1rem;">
                                      ${Object.entries(this.formData).map(
                                          ([key, value]) => html`
                                              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                                  <span style="font-weight: 500;">${key}:</span>
                                                  <span>${value}</span>
                                              </div>
                                          `,
                                      )}
                                  </div>
                              </mjo-card>
                          </div>
                      `
                    : ""}

                <mjo-drawer></mjo-drawer>
            </div>
        `;
    }
}
```

## Custom Themes Example

```ts
import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";

@customElement("example-drawer-themes")
export class ExampleDrawerThemes extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    static styles = css`
        .dark-drawer {
            --mjo-drawer-background-color: #1f2937;
            --mjo-drawer-title-border-color: #374151;
            --mjo-drawer-box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
            color: #f3f4f6;
        }
    `;

    private openDarkDrawer() {
        this.drawer.controller.show({
            title: "Dark Theme Drawer",
            position: "right",
            content: html`
                <div style="padding: 1rem;">
                    <h4 style="color: #f3f4f6;">Dark Theme</h4>
                    <p style="color: #d1d5db;">This drawer uses a dark theme with custom colors and shadows.</p>
                    <div style="background: #374151; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <p style="margin: 0; color: #9ca3af;">Dark themed content looks great with proper contrast.</p>
                    </div>
                    <mjo-button color="primary">Action Button</mjo-button>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Themed Drawer</h4>
                    <mjo-button @click=${this.openDarkDrawer} color="primary"> Dark Theme </mjo-button>
                    <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                        Similar theming can be applied for colorful gradients or minimal designs using CSS custom properties.
                    </p>
                </div>

                <mjo-drawer class="dark-drawer"></mjo-drawer>
            </div>
        `;
    }
}
```

## Attributes / Properties

The `mjo-drawer` component doesn't have direct attributes or properties. All configuration is done through the controller's `show()` method.

## Controller Methods

| Method  | Parameters         | Return Type | Description                            |
| ------- | ------------------ | ----------- | -------------------------------------- |
| `show`  | `DrawerShowParams` | `void`      | Opens the drawer with specified config |
| `close` | None               | `void`      | Closes the currently open drawer       |

### DrawerShowParams Interface

| Property            | Type                                     | Default     | Description                                      |
| ------------------- | ---------------------------------------- | ----------- | ------------------------------------------------ |
| `content`           | `string \| TemplateResult<1>`            | Required    | Content to display inside the drawer             |
| `title`             | `string \| undefined`                    | `undefined` | Optional title displayed in the drawer header    |
| `position`          | `"top" \| "right" \| "bottom" \| "left"` | `"right"`   | Side of the screen from which drawer slides      |
| `width`             | `string \| number \| undefined`          | `undefined` | Custom width for left/right drawers              |
| `height`            | `string \| number \| undefined`          | `undefined` | Custom height for top/bottom drawers             |
| `blocked`           | `boolean \| undefined`                   | `false`     | Prevents closing by clicking outside or X button |
| `animationDuration` | `number \| undefined`                    | `200`       | Animation duration in milliseconds               |
| `onOpen`            | `(() => void) \| undefined`              | `undefined` | Callback executed when drawer finishes opening   |
| `onClose`           | `(() => void) \| undefined`              | `undefined` | Callback executed when drawer finishes closing   |

### Accessibility Properties

| Property          | Type                   | Default     | Description                               |
| ----------------- | ---------------------- | ----------- | ----------------------------------------- |
| `ariaLabelledby`  | `string \| undefined`  | `undefined` | ID of element that labels the drawer      |
| `ariaDescribedby` | `string \| undefined`  | `undefined` | ID of element that describes the drawer   |
| `label`           | `string \| undefined`  | `undefined` | Accessible name for the drawer            |
| `trapFocus`       | `boolean \| undefined` | `true`      | Whether to trap focus within the drawer   |
| `restoreFocus`    | `boolean \| undefined` | `true`      | Whether to restore focus when closing     |
| `closeOnEscape`   | `boolean \| undefined` | `true`      | Whether escape key closes the drawer      |
| `initialFocus`    | `string \| undefined`  | `undefined` | Selector for element to focus when opened |

### Behavior Notes

-   **Position**: Affects both animation direction and default dimensions
-   **Dimensions**: Left/right drawers use `width`, top/bottom use `height`
-   **Blocked**: When true, prevents all user-initiated closing actions
-   **Content**: Supports both string HTML and Lit TemplateResult for dynamic content
-   **Callbacks**: Execute after animations complete, not when they start

## Slots

| Slot      | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| (default) | Currently not implemented; content is provided via the `show()` method |

## Events

The drawer component uses callback functions for lifecycle management rather than custom events, as the drawer container is created dynamically in the document body outside the component tree.

### Lifecycle Callbacks

Use the `onOpen` and `onClose` callback functions in the `show()` method parameters:

```ts
this.drawer.controller.show({
    title: "My Drawer",
    content: html`<div>Content here</div>`,
    onOpen: () => {
        console.log("Drawer opened");
        // Drawer is fully opened and ready for interaction
    },
    onClose: () => {
        console.log("Drawer closed");
        // Drawer is fully closed and removed from DOM
        // Focus has been restored to the previous element
    },
});
```

### Callback Timing

-   **`onOpen`**: Called after the opening animation completes and focus trap is activated
-   **`onClose`**: Called after the closing animation completes and the drawer is removed from the DOM

## Methods

| Method | Parameters | Return Type | Description                                        |
| ------ | ---------- | ----------- | -------------------------------------------------- |
| None   | -          | -           | All interaction is through the controller instance |

## CSS Variables

The component provides extensive customization through CSS variables with fallbacks to the global design system.

### Layout and Dimensions

| Variable              | Fallback | Used For                              |
| --------------------- | -------- | ------------------------------------- |
| `--mjo-drawer-width`  | `500px`  | Default width for left/right drawers  |
| `--mjo-drawer-height` | `500px`  | Default height for top/bottom drawers |

### Appearance

| Variable                          | Fallback                                              | Used For                   |
| --------------------------------- | ----------------------------------------------------- | -------------------------- |
| `--mjo-drawer-background-color`   | `var(--mjo-background-color, #fff)`                   | Drawer background color    |
| `--mjo-drawer-box-shadow`         | `var(--mjo-box-shadow3, 0 0 10px rgba(0, 0, 0, 0.5))` | Shadow around drawer       |
| `--mjo-drawer-title-border-color` | `var(--mjo-border-color, #ccc)`                       | Border below title section |

### Accessibility Features

| Variable                            | Fallback                                  | Used For                            |
| ----------------------------------- | ----------------------------------------- | ----------------------------------- |
| `--mjo-drawer-focus-outline-color`  | `var(--mjo-theme-primary-color, #2563eb)` | Focus outline color                 |
| `--mjo-drawer-focus-outline-width`  | `2px`                                     | Focus outline width                 |
| `--mjo-drawer-focus-outline-offset` | `2px`                                     | Focus outline offset                |
| `--mjo-drawer-border-width`         | `1px`                                     | Border width for high contrast mode |
| `--mjo-drawer-border-color`         | `rgba(0, 0, 0, 0.12)`                     | Border color for high contrast mode |

### High Contrast and Accessibility Support

The component includes built-in support for:

-   **High Contrast Mode**: Automatic border styling when `prefers-contrast: high`
-   **Reduced Motion**: Animation disabling when `prefers-reduced-motion: reduce`
-   **Focus Indicators**: Clear focus outlines with customizable colors and sizing

### Global Integration

The component inherits from the global design system:

-   `--mjo-background-color` for consistent backgrounds
-   `--mjo-border-color` for consistent borders
-   `--mjo-space-small` and `--mjo-space-xsmall` for spacing
-   `--mjo-box-shadow3` for consistent shadows

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. However, the drawer doesn't define a specific theme interface since it uses generic CSS variables.

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";

@customElement("example-drawer-themed")
export class ExampleDrawerThemed extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    private customTheme = {
        "drawer-background-color": "#1f2937",
        "drawer-title-border-color": "#374151",
        "drawer-box-shadow": "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
    };

    private openThemedDrawer() {
        this.drawer.controller.show({
            title: "Themed Drawer",
            content: html`<div style="padding: 1rem; color: #f3f4f6;">Dark themed content</div>`,
        });
    }

    render() {
        return html`
            <div>
                <mjo-button @click=${this.openThemedDrawer}>Open Themed Drawer</mjo-button>
                <mjo-drawer .theme=${this.customTheme}></mjo-drawer>
            </div>
        `;
    }
}
```

## Usage Patterns

### Basic Implementation

```ts
// 1. Import the component
import "mjo-litui/mjo-drawer";

// 2. Add to template with query reference
@query("mjo-drawer") drawer!: MjoDrawer;

render() {
    return html`
        <mjo-button @click=${this.openDrawer}>Open</mjo-button>
        <mjo-drawer></mjo-drawer>
    `;
}

// 3. Use controller to show/hide
private openDrawer() {
    this.drawer.controller.show({
        title: "My Drawer",
        content: html`<div>Content here</div>`
    });
}
```

### Advanced Configuration

```ts
private openAdvancedDrawer() {
    this.drawer.controller.show({
        title: "Advanced Settings",
        position: "left",
        width: 450,
        blocked: false,
        animationDuration: 300,
        content: html`<complex-form></complex-form>`,
        onOpen: () => console.log("Drawer opened"),
        onClose: () => this.handleDrawerClose()
    });
}
```

## Accessibility and Keyboard Navigation Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";

@customElement("example-drawer-accessibility")
export class ExampleDrawerAccessibility extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    private openAccessibleDrawer() {
        this.drawer.controller.show({
            title: "Accessible Settings Panel",
            position: "right",
            // Accessibility configuration
            ariaLabelledby: "settings-title",
            ariaDescribedby: "settings-description",
            trapFocus: true,
            closeOnEscape: true,
            initialFocus: "#first-setting",
            content: html`
                <div style="padding: 1rem;">
                    <h3 id="settings-title">Application Settings</h3>
                    <p id="settings-description">Use Tab/Shift+Tab to navigate, Enter/Space to activate, and Escape to close.</p>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
                        <mjo-button id="first-setting" variant="ghost" style="justify-content: flex-start;">🌙 Dark Mode</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">🔔 Notifications</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">💾 Auto-save</mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start;">🔐 Privacy Settings</mjo-button>
                    </div>

                    <div style="margin-top: 1rem;">
                        <label for="demo-input">Demo Input:</label>
                        <input id="demo-input" type="text" placeholder="Type here..." style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;" />
                    </div>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div>
                <mjo-button @click=${this.openAccessibleDrawer} aria-describedby="drawer-help">Open Accessible Drawer</mjo-button>
                <p id="drawer-help" style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                    This drawer includes full keyboard navigation and screen reader support
                </p>
                <mjo-drawer></mjo-drawer>
            </div>
        `;
    }
}
```

## Best Practices

### Content Design

-   Keep titles concise and descriptive
-   Organize content in logical sections with proper hierarchy
-   Consider scrollable content for longer drawers
-   Use consistent positioning conventions for different use cases

### User Experience & Performance

-   Provide visual feedback during animations (200-300ms recommended)
-   Implement proper loading states for async content
-   Lazy load heavy content when drawer opens
-   Consider escape key handling and focus management for accessibility
-   Optimize animations for mobile devices and test with reduced motion preferences

## Summary

`<mjo-drawer>` provides a flexible, powerful slide-out panel system with comprehensive customization options and full accessibility support. The component supports multiple positioning modes, configurable dimensions, modal behaviors, extensive theming capabilities, ARIA patterns, focus management, and keyboard navigation.

### Key Features

-   **Full Accessibility**: ARIA roles, focus trapping, keyboard navigation, screen reader support
-   **Custom Events**: New event naming convention `mjo-component-name:event-name`
-   **Focus Management**: Automatic focus trapping and restoration with customizable initial focus
-   **Keyboard Support**: Escape key handling, Tab navigation, and reduced motion support
-   **High Contrast**: Automatic styling adjustments for accessibility preferences

Use drawers for navigation menus, settings panels, help documentation, notification centers, and any scenario requiring temporary overlay content. The controller-based API provides programmatic control while maintaining clean separation between the trigger elements and the drawer implementation.

### Accessibility Compliance

The component follows WCAG 2.1 guidelines and implements the Modal Dialog design pattern from the W3C ARIA Authoring Practices Guide, ensuring compatibility with assistive technologies and keyboard-only navigation.
