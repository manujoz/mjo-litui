# mjo-drawer

Dynamic side panel component providing slide-out content areas with configurable positioning, animations, and overlay management. Supports modal and non-modal behaviors with customizable dimensions and theming.

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

                            <mjo-card>
                                <div style="padding: 1rem;">
                                    <h5 style="margin: 0 0 1rem 0;">Notifications</h5>
                                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                        <mjo-textfield label="Email Notifications" name="emailNotifications" value="Enabled"></mjo-textfield>
                                        <mjo-textfield label="Push Notifications" name="pushNotifications" value="Disabled"></mjo-textfield>
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

    private openNavigationDrawer() {
        this.drawer.controller.show({
            title: "Navigation Menu",
            position: "left",
            width: 350,
            content: html`
                <div style="padding: 1rem; height: 100%; display: flex; flex-direction: column;">
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
                        <h5 style="margin: 0 0 1rem 0; color: #6c757d; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">Main Menu</h5>

                        <mjo-button variant="ghost" style="justify-content: flex-start; padding: 0.75rem 1rem;"> 🏠 Dashboard </mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start; padding: 0.75rem 1rem;"> 👤 Profile </mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start; padding: 0.75rem 1rem;"> 📊 Analytics </mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start; padding: 0.75rem 1rem;"> ⚙️ Settings </mjo-button>

                        <hr style="margin: 1rem 0; border: none; border-top: 1px solid #dee2e6;" />

                        <h5 style="margin: 0 0 1rem 0; color: #6c757d; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">Tools</h5>

                        <mjo-button variant="ghost" style="justify-content: flex-start; padding: 0.75rem 1rem;"> 📝 Notes </mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start; padding: 0.75rem 1rem;"> 📅 Calendar </mjo-button>
                        <mjo-button variant="ghost" style="justify-content: flex-start; padding: 0.75rem 1rem;"> 💬 Messages </mjo-button>
                    </div>

                    <div style="border-top: 1px solid #dee2e6; padding-top: 1rem;">
                        <mjo-button variant="ghost" color="error" style="justify-content: flex-start; padding: 0.75rem 1rem; width: 100%;">
                            🚪 Sign Out
                        </mjo-button>
                    </div>
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
                    <h4>Complex Content Examples</h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <mjo-button @click=${this.openSettingsDrawer} color="primary"> Settings Panel </mjo-button>
                        <mjo-button @click=${this.openNavigationDrawer} color="secondary"> Navigation Menu </mjo-button>
                    </div>
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
    @query("#darkDrawer") darkDrawer!: MjoDrawer;
    @query("#colorfulDrawer") colorfulDrawer!: MjoDrawer;
    @query("#minimalDrawer") minimalDrawer!: MjoDrawer;

    static styles = css`
        .dark-drawer {
            --mjo-drawer-background-color: #1f2937;
            --mjo-drawer-title-border-color: #374151;
            --mjo-drawer-box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
            color: #f3f4f6;
        }

        .colorful-drawer {
            --mjo-drawer-background-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --mjo-drawer-box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
            --mjo-drawer-title-border-color: rgba(255, 255, 255, 0.2);
            color: white;
        }

        .minimal-drawer {
            --mjo-drawer-background-color: #ffffff;
            --mjo-drawer-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            --mjo-drawer-title-border-color: transparent;
        }
    `;

    private openDarkDrawer() {
        this.darkDrawer.controller.show({
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

    private openColorfulDrawer() {
        this.colorfulDrawer.controller.show({
            title: "Gradient Theme",
            position: "left",
            content: html`
                <div style="padding: 1rem;">
                    <h4>Colorful Gradient</h4>
                    <p>This drawer features a beautiful gradient background.</p>
                    <div style="background: rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0; backdrop-filter: blur(10px);">
                        <p style="margin: 0;">Glassmorphism effect with backdrop blur.</p>
                    </div>
                    <mjo-button variant="ghost" style="border: 1px solid rgba(255, 255, 255, 0.3); color: white;"> Ghost Button </mjo-button>
                </div>
            `,
        });
    }

    private openMinimalDrawer() {
        this.minimalDrawer.controller.show({
            title: "Minimal Design",
            position: "top",
            height: "50vh",
            content: html`
                <div style="padding: 2rem;">
                    <h4 style="font-weight: 300; color: #374151;">Clean & Minimal</h4>
                    <p style="color: #6b7280; line-height: 1.6;">This drawer embraces minimalism with clean lines, subtle shadows, and plenty of whitespace.</p>
                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <mjo-button variant="flat" color="primary">Primary</mjo-button>
                        <mjo-button variant="ghost">Secondary</mjo-button>
                    </div>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Themed Drawers</h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <mjo-button @click=${this.openDarkDrawer} color="primary"> Dark Theme </mjo-button>
                        <mjo-button @click=${this.openColorfulDrawer} color="secondary"> Colorful Theme </mjo-button>
                        <mjo-button @click=${this.openMinimalDrawer} color="success"> Minimal Theme </mjo-button>
                    </div>
                </div>

                <div>
                    <h4>CSS Custom Properties</h4>
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem;">
                        <div>--mjo-drawer-background-color</div>
                        <div>--mjo-drawer-box-shadow</div>
                        <div>--mjo-drawer-title-border-color</div>
                        <div>--mjo-drawer-width (for left/right)</div>
                        <div>--mjo-drawer-height (for top/bottom)</div>
                    </div>
                </div>

                <mjo-drawer id="darkDrawer" class="dark-drawer"></mjo-drawer>
                <mjo-drawer id="colorfulDrawer" class="colorful-drawer"></mjo-drawer>
                <mjo-drawer id="minimalDrawer" class="minimal-drawer"></mjo-drawer>
            </div>
        `;
    }
}
```

## Real-World Use Cases Example

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";

@customElement("example-drawer-use-cases")
export class ExampleDrawerUseCases extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;
    @state() private notifications = [
        { id: 1, title: "New message", time: "2 min ago", type: "info" },
        { id: 2, title: "System update", time: "1 hour ago", type: "warning" },
        { id: 3, title: "Task completed", time: "3 hours ago", type: "success" },
    ];

    private openHelpDrawer() {
        this.drawer.controller.show({
            title: "Help & Documentation",
            position: "right",
            width: 450,
            content: html`
                <div style="padding: 1rem; height: 100%; display: flex; flex-direction: column;">
                    <div style="flex: 1; overflow-y: auto;">
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <mjo-card>
                                <div style="padding: 1rem;">
                                    <h5 style="margin: 0 0 0.5rem 0;">🚀 Getting Started</h5>
                                    <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Learn the basics and set up your account</p>
                                </div>
                            </mjo-card>

                            <mjo-card>
                                <div style="padding: 1rem;">
                                    <h5 style="margin: 0 0 0.5rem 0;">📖 User Guide</h5>
                                    <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Comprehensive guide to all features</p>
                                </div>
                            </mjo-card>

                            <mjo-card>
                                <div style="padding: 1rem;">
                                    <h5 style="margin: 0 0 0.5rem 0;">🛠️ Troubleshooting</h5>
                                    <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Common issues and solutions</p>
                                </div>
                            </mjo-card>

                            <mjo-card>
                                <div style="padding: 1rem;">
                                    <h5 style="margin: 0 0 0.5rem 0;">💬 Contact Support</h5>
                                    <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Get help from our support team</p>
                                </div>
                            </mjo-card>
                        </div>
                    </div>
                </div>
            `,
        });
    }

    private openNotificationPanel() {
        this.drawer.controller.show({
            title: "Notifications",
            position: "right",
            width: 400,
            content: html`
                <div style="padding: 1rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        ${this.notifications.map(
                            (notification) => html`
                                <mjo-card>
                                    <div style="padding: 1rem; display: flex; justify-content: space-between; align-items: start;">
                                        <div style="flex: 1;">
                                            <h6 style="margin: 0 0 0.25rem 0;">${notification.title}</h6>
                                            <p style="margin: 0; color: #6b7280; font-size: 0.8rem;">${notification.time}</p>
                                        </div>
                                        <div
                                            style="width: 8px; height: 8px; border-radius: 50%; background-color: ${notification.type === "success"
                                                ? "#10b981"
                                                : notification.type === "warning"
                                                  ? "#f59e0b"
                                                  : "#3b82f6"};"
                                        ></div>
                                    </div>
                                </mjo-card>
                            `,
                        )}
                    </div>
                    <div style="margin-top: 1rem; text-align: center;">
                        <mjo-button variant="ghost" size="small">Mark All as Read</mjo-button>
                    </div>
                </div>
            `,
        });
    }

    private openFilterPanel() {
        this.drawer.controller.show({
            title: "Advanced Filters",
            position: "left",
            width: 350,
            content: html`
                <div style="padding: 1rem;">
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div>
                            <h6 style="margin: 0 0 0.5rem 0;">Date Range</h6>
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">Today</mjo-button>
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">This Week</mjo-button>
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">This Month</mjo-button>
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">Custom Range</mjo-button>
                            </div>
                        </div>

                        <div>
                            <h6 style="margin: 0 0 0.5rem 0;">Categories</h6>
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">📄 Documents</mjo-button>
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">🖼️ Images</mjo-button>
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">🎵 Audio</mjo-button>
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">🎥 Video</mjo-button>
                            </div>
                        </div>

                        <div>
                            <h6 style="margin: 0 0 0.5rem 0;">Status</h6>
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">✅ Completed</mjo-button>
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">🔄 In Progress</mjo-button>
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">📝 Draft</mjo-button>
                                <mjo-button variant="ghost" size="small" style="justify-content: flex-start;">❌ Cancelled</mjo-button>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #dee2e6;">
                        <div style="display: flex; gap: 0.5rem;">
                            <mjo-button color="primary" size="small" style="flex: 1;">Apply Filters</mjo-button>
                            <mjo-button variant="ghost" size="small">Clear</mjo-button>
                        </div>
                    </div>
                </div>
            `,
        });
    }

    private openToolbarDrawer() {
        this.drawer.controller.show({
            title: "Tools & Actions",
            position: "top",
            height: "30vh",
            content: html`
                <div style="padding: 1rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
                        <mjo-button variant="ghost" style="height: 60px; flex-direction: column; gap: 0.25rem;">
                            <span style="font-size: 1.5rem;">📊</span>
                            <span style="font-size: 0.8rem;">Analytics</span>
                        </mjo-button>
                        <mjo-button variant="ghost" style="height: 60px; flex-direction: column; gap: 0.25rem;">
                            <span style="font-size: 1.5rem;">📈</span>
                            <span style="font-size: 0.8rem;">Reports</span>
                        </mjo-button>
                        <mjo-button variant="ghost" style="height: 60px; flex-direction: column; gap: 0.25rem;">
                            <span style="font-size: 1.5rem;">⚙️</span>
                            <span style="font-size: 0.8rem;">Settings</span>
                        </mjo-button>
                        <mjo-button variant="ghost" style="height: 60px; flex-direction: column; gap: 0.25rem;">
                            <span style="font-size: 1.5rem;">🔄</span>
                            <span style="font-size: 0.8rem;">Sync</span>
                        </mjo-button>
                        <mjo-button variant="ghost" style="height: 60px; flex-direction: column; gap: 0.25rem;">
                            <span style="font-size: 1.5rem;">📤</span>
                            <span style="font-size: 0.8rem;">Export</span>
                        </mjo-button>
                        <mjo-button variant="ghost" style="height: 60px; flex-direction: column; gap: 0.25rem;">
                            <span style="font-size: 1.5rem;">📥</span>
                            <span style="font-size: 0.8rem;">Import</span>
                        </mjo-button>
                    </div>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Real-World Use Cases</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-button @click=${this.openHelpDrawer} color="primary"> Help Panel </mjo-button>
                        <mjo-button @click=${this.openNotificationPanel} color="info"> Notifications (${this.notifications.length}) </mjo-button>
                        <mjo-button @click=${this.openFilterPanel} color="secondary"> Advanced Filters </mjo-button>
                        <mjo-button @click=${this.openToolbarDrawer} color="success"> Toolbar Drawer </mjo-button>
                    </div>
                </div>

                <div>
                    <h4>Common Patterns</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                        <mjo-card>
                            <div style="padding: 1rem;">
                                <h5 style="margin: 0 0 0.5rem 0;">Navigation Drawer</h5>
                                <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Left-side menu for app navigation</p>
                            </div>
                        </mjo-card>

                        <mjo-card>
                            <div style="padding: 1rem;">
                                <h5 style="margin: 0 0 0.5rem 0;">Settings Panel</h5>
                                <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Right-side configuration options</p>
                            </div>
                        </mjo-card>

                        <mjo-card>
                            <div style="padding: 1rem;">
                                <h5 style="margin: 0 0 0.5rem 0;">Notification Center</h5>
                                <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Right-side notifications and alerts</p>
                            </div>
                        </mjo-card>

                        <mjo-card>
                            <div style="padding: 1rem;">
                                <h5 style="margin: 0 0 0.5rem 0;">Toolbar Drawer</h5>
                                <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Top/bottom tools and actions</p>
                            </div>
                        </mjo-card>
                    </div>
                </div>

                <mjo-drawer></mjo-drawer>
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

The drawer component doesn't emit custom events. Use the `onOpen` and `onClose` callbacks for lifecycle management.

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

### Interactive Elements

| Variable                      | Fallback  | Used For                      |
| ----------------------------- | --------- | ----------------------------- |
| `--mjo-background-color-high` | `#ffffff` | Close button hover background |
| `--mjo-radius-small`          | `3px`     | Close button border radius    |

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

## CSS Custom Properties Example

```ts
import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";

@customElement("example-drawer-css-custom")
export class ExampleDrawerCssCustom extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    static styles = css`
        .custom-drawer {
            --mjo-drawer-background-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --mjo-drawer-box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
            --mjo-drawer-title-border-color: rgba(255, 255, 255, 0.2);
            --mjo-drawer-width: 600px;
            color: white;
        }
    `;

    private openCustomDrawer() {
        this.drawer.controller.show({
            title: "Custom Styled Drawer",
            content: html`
                <div style="padding: 2rem;">
                    <h4>Beautiful Gradient</h4>
                    <p>This drawer uses CSS custom properties for a unique appearance.</p>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div>
                <mjo-button @click=${this.openCustomDrawer}>Open Custom Drawer</mjo-button>
                <mjo-drawer class="custom-drawer"></mjo-drawer>
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

## Accessibility Notes

-   **Keyboard Navigation**: Drawer content supports full keyboard navigation
-   **Focus Management**: Focus is trapped within drawer when open
-   **Screen Readers**: Title is properly announced when drawer opens
-   **Close Button**: Accessible close button with proper ARIA attributes
-   **Backdrop**: Click outside to close provides expected modal behavior

```html
<!-- Example with accessibility considerations -->
<mjo-drawer aria-label="Settings panel"></mjo-drawer>
```

## Performance Considerations

-   **Dynamic Creation**: Drawer container is created/destroyed with host lifecycle
-   **Animation Performance**: Uses CSS transforms for smooth 60fps animations
-   **Content Rendering**: Content is only rendered when drawer is shown
-   **Memory Management**: Automatic cleanup when component is destroyed
-   **Z-Index Management**: Inherits z-index from host element for proper stacking

## Design Guidelines

-   **Content Organization**: Use clear hierarchy and sections for complex content
-   **Responsive Design**: Consider different drawer sizes for mobile vs desktop
-   **Animation Timing**: Keep animations quick (200-300ms) for responsive feel
-   **Content Density**: Balance information density with usability
-   **Close Methods**: Always provide clear ways to close the drawer

## Best Practices

### Content Design

-   Keep title concise and descriptive
-   Organize content in logical sections
-   Use proper spacing and typography hierarchy
-   Consider scrollable content for longer drawers

### User Experience

-   Provide visual feedback during animations
-   Use consistent positioning conventions
-   Implement proper loading states for async content
-   Consider escape key handling for accessibility

### Performance

-   Lazy load heavy content when drawer opens
-   Use efficient event handling for large lists
-   Consider virtualization for very long content
-   Optimize animations for mobile devices

## Summary

`<mjo-drawer>` provides a flexible, powerful slide-out panel system with comprehensive customization options. The component supports multiple positioning modes, configurable dimensions, modal behaviors, and extensive theming capabilities. Use drawers for navigation menus, settings panels, help documentation, notification centers, and any scenario requiring temporary overlay content. The controller-based API provides programmatic control while maintaining clean separation between the trigger elements and the drawer implementation.
