# mjo-chip

Flexible, theme-aware chip component for displaying compact information with multiple variants, colors, sizes, and interactive capabilities including closable functionality and custom icons.

## HTML Usage

```html
<mjo-chip label="Default Chip"></mjo-chip>
<mjo-chip label="Primary" color="primary"></mjo-chip>
<mjo-chip label="Closable Tag" color="secondary" closable></mjo-chip>
<mjo-chip label="With Icon" startIcon="star" variant="flat"></mjo-chip>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-icon";

@customElement("example-chip-basic")
export class ExampleChipBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                <mjo-chip label="Default"></mjo-chip>
                <mjo-chip label="Primary" color="primary"></mjo-chip>
                <mjo-chip label="Secondary" color="secondary"></mjo-chip>
                <mjo-chip label="Success" color="success"></mjo-chip>
                <mjo-chip label="Warning" color="warning"></mjo-chip>
                <mjo-chip label="Info" color="info"></mjo-chip>
                <mjo-chip label="Error" color="error"></mjo-chip>
            </div>
        `;
    }
}
```

## Variants Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-icon";

@customElement("example-chip-variants")
export class ExampleChipVariants extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div>
                    <h4>Solid Variant (Default)</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Default" variant="solid"></mjo-chip>
                        <mjo-chip label="Primary" color="primary" variant="solid"></mjo-chip>
                        <mjo-chip label="Success" color="success" variant="solid"></mjo-chip>
                        <mjo-chip label="Warning" color="warning" variant="solid"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Bordered Variant</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Default" variant="bordered"></mjo-chip>
                        <mjo-chip label="Primary" color="primary" variant="bordered"></mjo-chip>
                        <mjo-chip label="Success" color="success" variant="bordered"></mjo-chip>
                        <mjo-chip label="Error" color="error" variant="bordered"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Light Variant</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Default" variant="light"></mjo-chip>
                        <mjo-chip label="Primary" color="primary" variant="light"></mjo-chip>
                        <mjo-chip label="Secondary" color="secondary" variant="light"></mjo-chip>
                        <mjo-chip label="Info" color="info" variant="light"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Flat Variant</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Default" variant="flat"></mjo-chip>
                        <mjo-chip label="Primary" color="primary" variant="flat"></mjo-chip>
                        <mjo-chip label="Warning" color="warning" variant="flat"></mjo-chip>
                        <mjo-chip label="Error" color="error" variant="flat"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Faded Variant</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Default" variant="faded"></mjo-chip>
                        <mjo-chip label="Primary" color="primary" variant="faded"></mjo-chip>
                        <mjo-chip label="Success" color="success" variant="faded"></mjo-chip>
                        <mjo-chip label="Info" color="info" variant="faded"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Shadow Variant</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Default" variant="shadow"></mjo-chip>
                        <mjo-chip label="Primary" color="primary" variant="shadow"></mjo-chip>
                        <mjo-chip label="Secondary" color="secondary" variant="shadow"></mjo-chip>
                        <mjo-chip label="Warning" color="warning" variant="shadow"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Dot Variant</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Default" variant="dot"></mjo-chip>
                        <mjo-chip label="Primary" color="primary" variant="dot"></mjo-chip>
                        <mjo-chip label="Success" color="success" variant="dot"></mjo-chip>
                        <mjo-chip label="Error" color="error" variant="dot"></mjo-chip>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Sizes and Radius Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-icon";

@customElement("example-chip-sizes")
export class ExampleChipSizes extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Sizes</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                        <mjo-chip label="Small" color="primary" size="small"></mjo-chip>
                        <mjo-chip label="Medium (Default)" color="primary" size="medium"></mjo-chip>
                        <mjo-chip label="Large" color="primary" size="large"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Border Radius Options</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                        <mjo-chip label="None" color="secondary" radius="none"></mjo-chip>
                        <mjo-chip label="Small" color="secondary" radius="small"></mjo-chip>
                        <mjo-chip label="Medium" color="secondary" radius="medium"></mjo-chip>
                        <mjo-chip label="Large" color="secondary" radius="large"></mjo-chip>
                        <mjo-chip label="Full (Default)" color="secondary" radius="full"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Size and Variant Combinations</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                            <span style="min-width: 80px; font-weight: 500;">Small:</span>
                            <mjo-chip label="Solid" color="success" size="small" variant="solid"></mjo-chip>
                            <mjo-chip label="Bordered" color="success" size="small" variant="bordered"></mjo-chip>
                            <mjo-chip label="Flat" color="success" size="small" variant="flat"></mjo-chip>
                            <mjo-chip label="Dot" color="success" size="small" variant="dot"></mjo-chip>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                            <span style="min-width: 80px; font-weight: 500;">Medium:</span>
                            <mjo-chip label="Solid" color="warning" size="medium" variant="solid"></mjo-chip>
                            <mjo-chip label="Bordered" color="warning" size="medium" variant="bordered"></mjo-chip>
                            <mjo-chip label="Flat" color="warning" size="medium" variant="flat"></mjo-chip>
                            <mjo-chip label="Dot" color="warning" size="medium" variant="dot"></mjo-chip>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                            <span style="min-width: 80px; font-weight: 500;">Large:</span>
                            <mjo-chip label="Solid" color="error" size="large" variant="solid"></mjo-chip>
                            <mjo-chip label="Bordered" color="error" size="large" variant="bordered"></mjo-chip>
                            <mjo-chip label="Flat" color="error" size="large" variant="flat"></mjo-chip>
                            <mjo-chip label="Dot" color="error" size="large" variant="dot"></mjo-chip>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Icons and Closable Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-icon";
import "mjo-litui/mjo-button";

@customElement("example-chip-icons")
export class ExampleChipIcons extends LitElement {
    @state() private removedChips: Set<string> = new Set();

    private handleChipClose(event: CustomEvent) {
        const chipValue = event.detail.value;
        if (chipValue) {
            this.removedChips = new Set([...this.removedChips, chipValue]);
        }
    }

    private resetChips() {
        this.removedChips = new Set();
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Start Icons</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Star" startIcon="star" color="primary"></mjo-chip>
                        <mjo-chip label="Heart" startIcon="heart" color="error" variant="flat"></mjo-chip>
                        <mjo-chip label="Home" startIcon="home" color="info" variant="bordered"></mjo-chip>
                        <mjo-chip label="User" startIcon="user" color="success" variant="dot"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>End Icons</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Download" endIcon="download" color="secondary"></mjo-chip>
                        <mjo-chip label="Upload" endIcon="upload" color="warning" variant="flat"></mjo-chip>
                        <mjo-chip label="Settings" endIcon="settings" color="default" variant="bordered"></mjo-chip>
                        <mjo-chip label="External" endIcon="external-link" color="info" variant="light"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Both Start and End Icons</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Complete" startIcon="check" endIcon="arrow-right" color="success"></mjo-chip>
                        <mjo-chip label="Processing" startIcon="clock" endIcon="refresh" color="warning" variant="flat"></mjo-chip>
                        <mjo-chip label="Error" startIcon="alert-triangle" endIcon="x" color="error" variant="bordered"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Closable Chips</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                        ${!this.removedChips.has("tag1")
                            ? html` <mjo-chip label="JavaScript" color="primary" value="tag1" closable @close=${this.handleChipClose}></mjo-chip> `
                            : ""} ${!this.removedChips.has("tag2")
                            ? html` <mjo-chip label="TypeScript" color="info" value="tag2" closable variant="flat" @close=${this.handleChipClose}></mjo-chip> `
                            : ""} ${!this.removedChips.has("tag3")
                            ? html`
                                  <mjo-chip
                                      label="Web Components"
                                      color="success"
                                      value="tag3"
                                      closable
                                      variant="bordered"
                                      @close=${this.handleChipClose}
                                  ></mjo-chip>
                              `
                            : ""} ${!this.removedChips.has("tag4")
                            ? html` <mjo-chip label="CSS" color="warning" value="tag4" closable @close=${this.handleChipClose}></mjo-chip> `
                            : ""} ${!this.removedChips.has("tag5")
                            ? html` <mjo-chip label="HTML" color="error" value="tag5" closable variant="dot" @close=${this.handleChipClose}></mjo-chip> `
                            : ""}
                    </div>
                    <mjo-button @click=${this.resetChips} variant="ghost" size="small"> Reset All Tags </mjo-button>
                </div>

                <div>
                    <h4>Complex Chips with Icons and Close</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Active User" startIcon="user-check" color="success" closable value="user1" @close=${this.handleChipClose}></mjo-chip>
                        <mjo-chip
                            label="Premium Plan"
                            startIcon="crown"
                            color="warning"
                            variant="shadow"
                            closable
                            value="plan1"
                            @close=${this.handleChipClose}
                        ></mjo-chip>
                        <mjo-chip
                            label="Notification"
                            startIcon="bell"
                            color="info"
                            variant="flat"
                            closable
                            value="notif1"
                            @close=${this.handleChipClose}
                        ></mjo-chip>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## States and Interactive Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-icon";
import "mjo-litui/mjo-button";

@customElement("example-chip-states")
export class ExampleChipStates extends LitElement {
    @state() private isDisabled = false;
    @state() private selectedTags: Set<string> = new Set(["web"]);

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    private toggleTag(tag: string) {
        const newSelection = new Set(this.selectedTags);
        if (newSelection.has(tag)) {
            newSelection.delete(tag);
        } else {
            newSelection.add(tag);
        }
        this.selectedTags = newSelection;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Disabled State</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                        <mjo-chip label="Normal" color="primary" ?disabled=${this.isDisabled}></mjo-chip>
                        <mjo-chip label="With Icon" startIcon="star" color="success" ?disabled=${this.isDisabled}></mjo-chip>
                        <mjo-chip label="Closable" color="warning" closable ?disabled=${this.isDisabled}></mjo-chip>
                        <mjo-chip label="Bordered" color="error" variant="bordered" ?disabled=${this.isDisabled}></mjo-chip>
                    </div>
                    <mjo-button @click=${this.toggleDisabled} variant="ghost"> ${this.isDisabled ? "Enable All" : "Disable All"} </mjo-button>
                </div>

                <div>
                    <h4>Interactive Tag Selection</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                        ${["web", "mobile", "desktop", "api", "database"].map(
                            (tag) => html`
                                <mjo-chip
                                    label=${tag.charAt(0).toUpperCase() + tag.slice(1)}
                                    color=${this.selectedTags.has(tag) ? "primary" : "default"}
                                    variant=${this.selectedTags.has(tag) ? "solid" : "bordered"}
                                    startIcon=${this.selectedTags.has(tag) ? "check" : undefined}
                                    style="cursor: pointer;"
                                    @click=${() => this.toggleTag(tag)}
                                ></mjo-chip>
                            `,
                        )}
                    </div>
                    <p style="margin: 0; font-size: 0.9rem; color: #6c757d;">
                        Selected: ${this.selectedTags.size > 0 ? Array.from(this.selectedTags).join(", ") : "None"}
                    </p>
                </div>

                <div>
                    <h4>Status Indicators</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Server Status:</span>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <mjo-chip label="Online" color="success" variant="dot" startIcon="server"></mjo-chip>
                                <mjo-chip label="API Healthy" color="success" variant="flat" startIcon="check-circle"></mjo-chip>
                                <mjo-chip label="Database Connected" color="info" variant="bordered" startIcon="database"></mjo-chip>
                            </div>
                        </div>

                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Build Status:</span>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <mjo-chip label="Tests Passing" color="success" variant="shadow" startIcon="check"></mjo-chip>
                                <mjo-chip label="Coverage 95%" color="warning" variant="flat" startIcon="shield"></mjo-chip>
                                <mjo-chip label="Build #1234" color="info" variant="light" startIcon="package"></mjo-chip>
                            </div>
                        </div>

                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">User Permissions:</span>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <mjo-chip label="Admin" color="error" variant="solid" startIcon="shield-check"></mjo-chip>
                                <mjo-chip label="Write Access" color="warning" variant="flat" startIcon="edit"></mjo-chip>
                                <mjo-chip label="Read Only" color="default" variant="bordered" startIcon="eye"></mjo-chip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Dynamic Chip Management Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-icon";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-chip-dynamic")
export class ExampleChipDynamic extends LitElement {
    @state() private tags: Array<{ id: string; label: string; color: string }> = [
        { id: "1", label: "React", color: "info" },
        { id: "2", label: "Vue", color: "success" },
        { id: "3", label: "Angular", color: "error" },
    ];
    @state() private newTagValue = "";

    private tagColors = ["primary", "secondary", "success", "warning", "info", "error"];

    private addTag() {
        if (this.newTagValue.trim()) {
            const randomColor = this.tagColors[Math.floor(Math.random() * this.tagColors.length)];
            this.tags = [
                ...this.tags,
                {
                    id: Date.now().toString(),
                    label: this.newTagValue.trim(),
                    color: randomColor,
                },
            ];
            this.newTagValue = "";
        }
    }

    private removeTag(event: CustomEvent) {
        const tagId = event.detail.value;
        this.tags = this.tags.filter((tag) => tag.id !== tagId);
    }

    private handleInputKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.addTag();
        }
    }

    private clearAllTags() {
        this.tags = [];
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Dynamic Tag Manager</h4>

                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
                        <mjo-textfield
                            placeholder="Enter tag name"
                            .value=${this.newTagValue}
                            @input=${(e: InputEvent) => (this.newTagValue = (e.target as HTMLInputElement).value)}
                            @keydown=${this.handleInputKeyDown}
                            style="min-width: 200px;"
                        ></mjo-textfield>
                        <mjo-button @click=${this.addTag} color="primary" ?disabled=${!this.newTagValue.trim()}> Add Tag </mjo-button>
                        <mjo-button @click=${this.clearAllTags} variant="ghost" color="error" ?disabled=${this.tags.length === 0}> Clear All </mjo-button>
                    </div>

                    <div style="min-height: 100px; padding: 1rem; border: 2px dashed #e5e7eb; border-radius: 8px; background: #f9fafb;">
                        ${this.tags.length > 0
                            ? html`
                                  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                      ${this.tags.map(
                                          (tag) => html`
                                              <mjo-chip
                                                  label=${tag.label}
                                                  color=${tag.color as any}
                                                  closable
                                                  value=${tag.id}
                                                  variant="flat"
                                                  @close=${this.removeTag}
                                              ></mjo-chip>
                                          `,
                                      )}
                                  </div>
                              `
                            : html` <div style="text-align: center; color: #6b7280; font-style: italic;">No tags yet. Add some tags above!</div> `}
                    </div>

                    <p style="margin: 0; font-size: 0.9rem; color: #6c757d;">Total tags: ${this.tags.length}</p>
                </div>

                <div>
                    <h4>Filter Chips</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Categories:</span>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <mjo-chip label="All" color="default" variant="bordered" startIcon="grid"></mjo-chip>
                                <mjo-chip label="Frontend" color="primary" variant="flat" startIcon="monitor"></mjo-chip>
                                <mjo-chip label="Backend" color="success" variant="flat" startIcon="server"></mjo-chip>
                                <mjo-chip label="DevOps" color="warning" variant="flat" startIcon="settings"></mjo-chip>
                                <mjo-chip label="Mobile" color="info" variant="flat" startIcon="smartphone"></mjo-chip>
                            </div>
                        </div>

                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Experience:</span>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                <mjo-chip label="Beginner" color="success" variant="dot"></mjo-chip>
                                <mjo-chip label="Intermediate" color="warning" variant="dot"></mjo-chip>
                                <mjo-chip label="Advanced" color="error" variant="dot"></mjo-chip>
                                <mjo-chip label="Expert" color="primary" variant="shadow"></mjo-chip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Custom Themes Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoChipTheme } from "mjo-litui/types";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-icon";

@customElement("example-chip-themes")
export class ExampleChipThemes extends LitElement {
    private compactTheme: MjoChipTheme = {
        fontSizeSmallSize: "0.6rem",
        fontSizeMediumSize: "0.75rem",
        fontSizeLargeSize: "0.9rem",
        lineHeightSmallSize: "0.6rem",
        lineHeightMediumSize: "0.75rem",
        lineHeightLargeSize: "0.9rem",
        padding: "0 0.5rem",
        gap: "0.25rem",
    };

    private spaciousTheme: MjoChipTheme = {
        fontSizeSmallSize: "0.9rem",
        fontSizeMediumSize: "1.1rem",
        fontSizeLargeSize: "1.3rem",
        lineHeightSmallSize: "1rem",
        lineHeightMediumSize: "1.2rem",
        lineHeightLargeSize: "1.4rem",
        padding: "0 1.5rem",
        gap: "0.75rem",
    };

    private boldTheme: MjoChipTheme = {
        borderWidthSizeSmall: "2px",
        borderWidthSizeMedium: "3px",
        borderWidthSizeLarge: "4px",
        fontSizeSmallSize: "0.8rem",
        fontSizeMediumSize: "1rem",
        fontSizeLargeSize: "1.2rem",
        padding: "0 1rem",
    };

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Compact Theme</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Small" size="small" color="primary" .theme=${this.compactTheme}></mjo-chip>
                        <mjo-chip label="Medium" size="medium" color="success" .theme=${this.compactTheme}></mjo-chip>
                        <mjo-chip label="Large" size="large" color="warning" .theme=${this.compactTheme}></mjo-chip>
                        <mjo-chip label="With Icon" startIcon="star" color="info" .theme=${this.compactTheme}></mjo-chip>
                        <mjo-chip label="Closable" closable color="error" .theme=${this.compactTheme}></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Spacious Theme</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Small" size="small" color="primary" variant="flat" .theme=${this.spaciousTheme}></mjo-chip>
                        <mjo-chip label="Medium" size="medium" color="success" variant="flat" .theme=${this.spaciousTheme}></mjo-chip>
                        <mjo-chip label="Large" size="large" color="warning" variant="flat" .theme=${this.spaciousTheme}></mjo-chip>
                        <mjo-chip label="With Icon" startIcon="heart" color="error" .theme=${this.spaciousTheme}></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Bold Borders Theme</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Small Border" size="small" color="primary" variant="bordered" .theme=${this.boldTheme}></mjo-chip>
                        <mjo-chip label="Medium Border" size="medium" color="success" variant="bordered" .theme=${this.boldTheme}></mjo-chip>
                        <mjo-chip label="Large Border" size="large" color="error" variant="bordered" .theme=${this.boldTheme}></mjo-chip>
                        <mjo-chip label="Faded Style" color="info" variant="faded" .theme=${this.boldTheme}></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Comparison with Default</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Default:</span>
                            <div style="display: inline-flex; flex-wrap: wrap; gap: 0.5rem;">
                                <mjo-chip label="Standard" color="primary"></mjo-chip>
                                <mjo-chip label="With Icon" startIcon="check" color="success"></mjo-chip>
                                <mjo-chip label="Bordered" variant="bordered" color="warning"></mjo-chip>
                            </div>
                        </div>
                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Compact:</span>
                            <div style="display: inline-flex; flex-wrap: wrap; gap: 0.5rem;">
                                <mjo-chip label="Standard" color="primary" .theme=${this.compactTheme}></mjo-chip>
                                <mjo-chip label="With Icon" startIcon="check" color="success" .theme=${this.compactTheme}></mjo-chip>
                                <mjo-chip label="Bordered" variant="bordered" color="warning" .theme=${this.compactTheme}></mjo-chip>
                            </div>
                        </div>
                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Spacious:</span>
                            <div style="display: inline-flex; flex-wrap: wrap; gap: 0.5rem;">
                                <mjo-chip label="Standard" color="primary" .theme=${this.spaciousTheme}></mjo-chip>
                                <mjo-chip label="With Icon" startIcon="check" color="success" .theme=${this.spaciousTheme}></mjo-chip>
                                <mjo-chip label="Bordered" variant="bordered" color="warning" .theme=${this.spaciousTheme}></mjo-chip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name        | Type                                                                                   | Default     | Reflects | Description                                                   |
| ----------- | -------------------------------------------------------------------------------------- | ----------- | -------- | ------------------------------------------------------------- |
| `label`     | `string`                                                                               | `""`        | no       | Text content displayed in the chip                            |
| `color`     | `"primary" \| "secondary" \| "default" \| "success" \| "warning" \| "info" \| "error"` | `"default"` | no       | Semantic color scheme applied to the chip                     |
| `variant`   | `"solid" \| "bordered" \| "light" \| "flat" \| "faded" \| "shadow" \| "dot"`           | `"solid"`   | no       | Visual styling variant that affects appearance and background |
| `size`      | `"small" \| "medium" \| "large"`                                                       | `"medium"`  | no       | Controls the overall size including font size and padding     |
| `radius`    | `"small" \| "medium" \| "large" \| "full" \| "none"`                                   | `"full"`    | no       | Border radius applied to the chip (full creates pill shape)   |
| `startIcon` | `string \| undefined`                                                                  | `undefined` | no       | Icon displayed at the beginning of the chip content           |
| `endIcon`   | `string \| undefined`                                                                  | `undefined` | no       | Icon displayed at the end of the chip content                 |
| `closable`  | `boolean`                                                                              | `false`     | no       | Adds a close button that emits close event when clicked       |
| `disabled`  | `boolean`                                                                              | `false`     | no       | Disables interaction and applies disabled styling             |
| `value`     | `string \| undefined`                                                                  | `undefined` | no       | Optional value passed in the close event detail               |

### Behavior Notes

-   The `dot` variant adds a colored dot indicator at the beginning of the chip
-   Closable chips automatically remove themselves from DOM when close button is clicked
-   Icons scale with the chip size automatically
-   The `value` property is useful for identifying chips in close event handlers
-   Color variants affect both background and text colors based on the selected variant

## Slots

| Slot      | Description                                                             |
| --------- | ----------------------------------------------------------------------- |
| (default) | Currently not implemented; content is provided via the `label` property |

## Events

| Event   | Detail                           | Emitted When                                  | Notes                                                    |
| ------- | -------------------------------- | --------------------------------------------- | -------------------------------------------------------- |
| `close` | `{ value: string \| undefined }` | Close button is clicked (closable chips only) | Bubbles and is composed; chip removes itself after event |

## Methods

The component doesn't expose public methods. Interaction is handled through properties and events.

## CSS Variables

The component provides extensive customization through CSS variables with fallbacks to the global design system.

### Typography and Sizing

| Variable                             | Fallback | Used For                        |
| ------------------------------------ | -------- | ------------------------------- |
| `--mjo-chip-font-size-small-size`    | `0.75em` | Small chip font size            |
| `--mjo-chip-font-size-medium-size`   | `0.9em`  | Medium chip font size (default) |
| `--mjo-chip-font-size-large-size`    | `1.1em`  | Large chip font size            |
| `--mjo-chip-line-height-small-size`  | `0.75em` | Small chip line height          |
| `--mjo-chip-line-height-medium-size` | `1em`    | Medium chip line height         |
| `--mjo-chip-line-height-large-size`  | `1.2em`  | Large chip line height          |

### Structure and Spacing

| Variable             | Fallback   | Used For                  |
| -------------------- | ---------- | ------------------------- |
| `--mjo-chip-padding` | `0 0.75em` | Internal padding          |
| `--mjo-chip-gap`     | `0.4em`    | Gap between chip elements |

### Border Widths

| Variable                              | Fallback | Used For                 |
| ------------------------------------- | -------- | ------------------------ |
| `--mjo-chip-border-width-size-small`  | `1px`    | Small chip border width  |
| `--mjo-chip-border-width-size-medium` | `2px`    | Medium chip border width |
| `--mjo-chip-border-width-size-large`  | `3px`    | Large chip border width  |

### Semantic Colors

The component uses the global semantic color system:

#### Primary Colors

-   `--mjo-primary-color` / `--mjo-primary-foreground-color`
-   `--mjo-primary-color-alpha2` (flat variant)
-   `--mjo-primary-color-alpha5` (shadow variant)

#### Secondary Colors

-   `--mjo-secondary-color` / `--mjo-secondary-foreground-color`
-   `--mjo-secondary-color-alpha2` (flat variant)
-   `--mjo-secondary-color-alpha5` (shadow variant)

#### Status Colors

-   `--mjo-color-success` / `--mjo-color-info` / `--mjo-color-warning` / `--mjo-color-error`
-   Corresponding alpha variants for flat and shadow styles

#### Gray Scale

-   `--mjo-color-gray-400` (default background)
-   `--mjo-color-gray-600` (faded variant)
-   `--mjo-color-gray-200` (borders)
-   `--mjo-color-white` / `--mjo-color-black` (text)

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-chip-{property-name}`.

### MjoChipTheme Interface

```ts
interface MjoChipTheme {
    borderWidthSizeSmall?: string;
    borderWidthSizeMedium?: string;
    borderWidthSizeLarge?: string;
    fontSizeSmallSize?: string;
    fontSizeMediumSize?: string;
    fontSizeLargeSize?: string;
    gap?: string;
    lineHeightSmallSize?: string;
    lineHeightMediumSize?: string;
    lineHeightLargeSize?: string;
    padding?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoChipTheme } from "mjo-litui/types";
import "mjo-litui/mjo-chip";

@customElement("example-chip-themed")
export class ExampleChipThemed extends LitElement {
    private customTheme: MjoChipTheme = {
        fontSizeMediumSize: "1rem",
        lineHeightMediumSize: "1.2rem",
        padding: "0.25rem 1rem",
        gap: "0.5rem",
        borderWidthSizeMedium: "2px",
    };

    render() {
        return html`
            <div style="display: flex; gap: 0.5rem;">
                <mjo-chip label="Custom Theme" color="primary" startIcon="star" .theme=${this.customTheme}></mjo-chip>
                <mjo-chip label="Themed Bordered" color="success" variant="bordered" .theme=${this.customTheme}></mjo-chip>
            </div>
        `;
    }
}
```

## CSS Custom Properties Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-chip";

@customElement("example-chip-css-custom")
export class ExampleChipCssCustom extends LitElement {
    static styles = css`
        .custom-chip {
            --mjo-chip-padding: 0.5rem 1.25rem;
            --mjo-chip-gap: 0.6rem;
            --mjo-chip-font-size-medium-size: 1.1rem;
            --mjo-chip-border-width-size-medium: 3px;
        }

        .minimal-chip {
            --mjo-chip-padding: 0.125rem 0.5rem;
            --mjo-chip-gap: 0.25rem;
            --mjo-chip-font-size-medium-size: 0.8rem;
        }
    `;

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <h4>Custom Styled Chips</h4>
                    <div style="display: flex; gap: 0.5rem;">
                        <mjo-chip class="custom-chip" label="Large Custom" color="primary" startIcon="star"></mjo-chip>
                        <mjo-chip class="custom-chip" label="Bordered Custom" color="success" variant="bordered"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Minimal Styled Chips</h4>
                    <div style="display: flex; gap: 0.5rem;">
                        <mjo-chip class="minimal-chip" label="Compact" color="info"></mjo-chip>
                        <mjo-chip class="minimal-chip" label="Small" color="warning" startIcon="zap"></mjo-chip>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Real-World Use Cases Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-icon";

@customElement("example-chip-use-cases")
export class ExampleChipUseCases extends LitElement {
    @state() private selectedFilters: Set<string> = new Set();

    private toggleFilter(filter: string) {
        const newFilters = new Set(this.selectedFilters);
        if (newFilters.has(filter)) {
            newFilters.delete(filter);
        } else {
            newFilters.add(filter);
        }
        this.selectedFilters = newFilters;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <!-- User Tags -->
                <div>
                    <h4>User Profile Tags</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="React Expert" color="info" variant="flat" startIcon="code"></mjo-chip>
                        <mjo-chip label="Senior Developer" color="primary" variant="shadow" startIcon="star"></mjo-chip>
                        <mjo-chip label="Team Lead" color="warning" variant="solid" startIcon="users"></mjo-chip>
                        <mjo-chip label="Full Stack" color="success" variant="bordered" startIcon="layers"></mjo-chip>
                        <mjo-chip label="Remote" color="default" variant="dot"></mjo-chip>
                    </div>
                </div>

                <!-- Product Categories -->
                <div>
                    <h4>Product Categories</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="Electronics" color="info" variant="flat"></mjo-chip>
                        <mjo-chip label="Bestseller" color="warning" variant="shadow" startIcon="trophy"></mjo-chip>
                        <mjo-chip label="On Sale" color="error" variant="solid" startIcon="tag"></mjo-chip>
                        <mjo-chip label="New Arrival" color="success" variant="dot"></mjo-chip>
                        <mjo-chip label="Limited Edition" color="secondary" variant="faded" startIcon="clock"></mjo-chip>
                    </div>
                </div>

                <!-- Task Status -->
                <div>
                    <h4>Task Management</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Priority:</span>
                            <mjo-chip label="High" color="error" variant="solid" size="small"></mjo-chip>
                            <mjo-chip label="Medium" color="warning" variant="flat" size="small"></mjo-chip>
                            <mjo-chip label="Low" color="success" variant="light" size="small"></mjo-chip>
                        </div>
                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Status:</span>
                            <mjo-chip label="To Do" color="default" variant="bordered" startIcon="circle"></mjo-chip>
                            <mjo-chip label="In Progress" color="info" variant="flat" startIcon="clock"></mjo-chip>
                            <mjo-chip label="Review" color="warning" variant="solid" startIcon="eye"></mjo-chip>
                            <mjo-chip label="Done" color="success" variant="shadow" startIcon="check"></mjo-chip>
                        </div>
                    </div>
                </div>

                <!-- Interactive Filters -->
                <div>
                    <h4>Search Filters</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                        ${["price", "rating", "brand", "category", "availability"].map(
                            (filter) => html`
                                <mjo-chip
                                    label=${filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    color=${this.selectedFilters.has(filter) ? "primary" : "default"}
                                    variant=${this.selectedFilters.has(filter) ? "solid" : "bordered"}
                                    startIcon=${this.selectedFilters.has(filter) ? "check" : "filter"}
                                    style="cursor: pointer;"
                                    @click=${() => this.toggleFilter(filter)}
                                ></mjo-chip>
                            `,
                        )}
                    </div>
                    <p style="margin: 0; font-size: 0.9rem; color: #6c757d;">
                        Active filters: ${this.selectedFilters.size > 0 ? Array.from(this.selectedFilters).join(", ") : "None"}
                    </p>
                </div>

                <!-- Notification Types -->
                <div>
                    <h4>Notification Types</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <mjo-chip label="System Alert" color="error" variant="shadow" startIcon="alert-triangle"></mjo-chip>
                        <mjo-chip label="New Message" color="info" variant="flat" startIcon="message-circle"></mjo-chip>
                        <mjo-chip label="Friend Request" color="success" variant="bordered" startIcon="user-plus"></mjo-chip>
                        <mjo-chip label="Update Available" color="warning" variant="solid" startIcon="download"></mjo-chip>
                        <mjo-chip label="Reminder" color="default" variant="dot" startIcon="bell"></mjo-chip>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## CSS Parts

| Part        | Description                     |
| ----------- | ------------------------------- |
| `container` | The main chip container         |
| `dot`       | The dot indicator (dot variant) |
| `label`     | The text label element          |

## Accessibility Notes

-   Closable chips include proper role and tabindex for keyboard accessibility
-   Use meaningful labels that describe the chip content clearly
-   Consider adding `aria-label` for chips with only icons
-   For interactive chips (filters), ensure proper focus management
-   Color should not be the only way to convey information; use icons or text as well

```html
<!-- Example with enhanced accessibility -->
<mjo-chip label="High Priority Task" color="error" startIcon="alert-triangle" closable aria-label="High priority task, closable"></mjo-chip>
```

## Performance Considerations

-   Large numbers of chips should be virtualized if performance becomes an issue
-   The component uses efficient CSS variables for theming without runtime style recalculation
-   Close functionality removes chips from DOM automatically
-   Icon rendering is optimized through the mjo-icon component

## Design Guidelines

-   **Consistency**: Use consistent color schemes for related chip groups
-   **Clarity**: Choose variants that provide appropriate visual hierarchy
-   **Spacing**: Allow adequate spacing between chips for touch targets
-   **Content**: Keep labels concise and descriptive
-   **Actions**: Use closable chips for removable items, regular chips for display-only content

## Best Practices

### Content Organization

-   Group related chips together logically
-   Use consistent sizing within groups
-   Implement clear visual hierarchy with colors and variants

### Interactive Design

-   Provide visual feedback for interactive chips
-   Use appropriate colors to indicate state (selected, active, etc.)
-   Consider loading states for dynamic chip updates

### Accessibility

-   Ensure sufficient color contrast
-   Provide keyboard navigation for interactive chips
-   Use descriptive labels and ARIA attributes where needed

## Summary

`<mjo-chip>` provides a versatile component for displaying compact, labeled information with extensive customization options. The component supports multiple visual variants, semantic colors, interactive capabilities, and comprehensive theming through ThemeMixin. Use chips for tags, filters, status indicators, user attributes, and other compact data display needs. The component's flexibility makes it suitable for both static display and dynamic, interactive use cases while maintaining consistent styling and accessibility standards.
