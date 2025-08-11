# mjo-theme

The `mjo-theme` component is the central theming system for mjo-litui that generates CSS custom properties from theme configurations. It supports both global and local scoping, light/dark mode switching, and extensive customization through the `MjoThemeConfig` interface.

## Usage

```html
<mjo-theme scope="global" theme="light"></mjo-theme>
```

## Import

```ts
import "mjo-litui/mjo-theme";
```

## Features

-   **Global/Local Scoping**: Apply themes globally (`:root`) or locally (component's Shadow DOM)
-   **Light/Dark Mode**: Built-in support for light and dark theme modes
-   **CSS Custom Properties**: Automatic generation of CSS variables with `--mjo-` prefix
-   **Theme Merging**: Combines default theme with user configurations
-   **Live Updates**: Reactive theme switching without page reload
-   **Component-Specific Themes**: Individual theming for each component type

## Examples

### Basic Global Theme

Apply a global theme that affects the entire application:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";

@customElement("example-global-theme")
export class ExampleGlobalTheme extends LitElement {
    render() {
        return html`
            <mjo-theme scope="global" theme="light"></mjo-theme>
            <mjo-button variant="flat" color="primary">Themed Button</mjo-button>
        `;
    }
}
```

### Dynamic Theme Switching

Toggle between light and dark modes with custom configuration:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

const customColors: Partial<MjoThemeConfig> = {
    light: {
        primaryColor: {
            default: "#1976D2",
            hover: "#1565C0",
        },
    },
    dark: {
        primaryColor: {
            default: "#0F62FE",
            hover: "#0353E9",
        },
    },
};

@customElement("example-theme-toggle")
export class ExampleThemeToggle extends LitElement {
    @state() private isDark = false;

    private toggleTheme = () => {
        this.isDark = !this.isDark;
    };

    render() {
        return html`
            <mjo-theme scope="global" .theme=${this.isDark ? "dark" : "light"} .config=${customColors}> </mjo-theme>

            <div>
                <mjo-button @click=${this.toggleTheme}> Switch to ${this.isDark ? "Light" : "Dark"} Mode </mjo-button>
                <mjo-button variant="outline" color="primary"> Primary Button </mjo-button>
            </div>
        `;
    }
}
```

### Local Theme Scope

Create isolated theme areas that don't affect the global scope:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";

@customElement("example-local-theme")
export class ExampleLocalTheme extends LitElement {
    render() {
        return html`
            <section>
                <h3>Global Theme Area</h3>
                <mjo-button color="primary">Global Button</mjo-button>
            </section>

            <section>
                <h3>Local Dark Theme</h3>
                <mjo-theme theme="dark" scope="local">
                    <mjo-card>
                        <mjo-button color="primary">Dark Themed Button</mjo-button>
                        <mjo-button variant="outline">Another Button</mjo-button>
                    </mjo-card>
                </mjo-theme>
            </section>
        `;
    }
}
```

### Custom Component Theme

Customize specific component themes:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-textfield";
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

const componentTheme: Partial<MjoThemeConfig> = {
    light: {
        components: {
            button: {
                borderRadius: "12px",
                fontSize: "16px",
                padding: "12px 24px",
            },
            textfield: {
                borderRadius: "8px",
                fontSize: "14px",
                padding: "16px",
            },
        },
    },
};

@customElement("example-component-theme")
export class ExampleComponentTheme extends LitElement {
    render() {
        return html`
            <mjo-theme scope="global" theme="light" .config=${componentTheme}></mjo-theme>

            <div>
                <mjo-textfield label="Custom Styled Input" placeholder="Themed textfield"> </mjo-textfield>
                <mjo-button color="primary">Custom Styled Button</mjo-button>
            </div>
        `;
    }
}
```

### Complete Theme Configuration

Example with comprehensive theme customization:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";
import "mjo-litui/mjo-textfield";
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

const fullTheme: Partial<MjoThemeConfig> = {
    light: {
        primaryColor: {
            default: "#6366F1",
            hover: "#4F46E5",
            focus: "#4338CA",
            disabled: "#C7D2FE",
        },
        secondaryColor: {
            default: "#EC4899",
            hover: "#DB2777",
            focus: "#BE185D",
            disabled: "#FBCFE8",
        },
        backgroundColor: "#F8FAFC",
        surfaceColor: "#FFFFFF",
        textColor: "#1E293B",
        borderColor: "#E2E8F0",
        spacing: {
            xs: "4px",
            sm: "8px",
            md: "16px",
            lg: "24px",
            xl: "32px",
        },
        typography: {
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
        },
        components: {
            button: {
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                padding: "10px 20px",
            },
            card: {
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                padding: "24px",
            },
        },
    },
    dark: {
        primaryColor: {
            default: "#818CF8",
            hover: "#6366F1",
            focus: "#4F46E5",
            disabled: "#4C1D95",
        },
        backgroundColor: "#0F172A",
        surfaceColor: "#1E293B",
        textColor: "#F1F5F9",
        borderColor: "#334155",
    },
};

@customElement("example-full-theme")
export class ExampleFullTheme extends LitElement {
    @state() private isDark = false;

    private toggleTheme = () => {
        this.isDark = !this.isDark;
    };

    render() {
        return html`
            <mjo-theme scope="global" .theme=${this.isDark ? "dark" : "light"} .config=${fullTheme}> </mjo-theme>

            <mjo-card>
                <h2>Custom Theme Example</h2>
                <mjo-textfield label="Email" placeholder="Enter your email"> </mjo-textfield>
                <div style="margin-top: 16px;">
                    <mjo-button color="primary" @click=${this.toggleTheme}> Toggle to ${this.isDark ? "Light" : "Dark"} </mjo-button>
                    <mjo-button variant="outline" color="secondary"> Secondary Action </mjo-button>
                </div>
            </mjo-card>
        `;
    }
}
```

## Attributes / Properties

| Name     | Type                      | Default   | Description                                                       |
| -------- | ------------------------- | --------- | ----------------------------------------------------------------- |
| `scope`  | `'global' \| 'local'`     | `'local'` | Where to apply CSS variables: global (`:root`) or local (`:host`) |
| `theme`  | `'light' \| 'dark'`       | `'light'` | Theme mode to apply                                               |
| `config` | `Partial<MjoThemeConfig>` | `{}`      | Custom theme configuration to merge with defaults                 |

## Methods

| Name         | Parameters | Returns | Description                                             |
| ------------ | ---------- | ------- | ------------------------------------------------------- |
| `applyTheme` | `()`       | `void`  | Regenerates and applies the current theme configuration |

## Events

This component does not emit any custom events.

## Slots

| Name      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `default` | Content that will inherit the local theme (when scope="local") |

## CSS Custom Properties

The `mjo-theme` component generates CSS custom properties with the `--mjo-` prefix based on the theme configuration. The following are the main categories:

### Color Variables

| Variable                       | Description                  |
| ------------------------------ | ---------------------------- |
| `--mjo-primary-color`          | Primary color default        |
| `--mjo-primary-color-hover`    | Primary color hover state    |
| `--mjo-primary-color-focus`    | Primary color focus state    |
| `--mjo-primary-color-disabled` | Primary color disabled state |
| `--mjo-secondary-color`        | Secondary color default      |
| `--mjo-background-color`       | Background color             |
| `--mjo-foreground-color`       | Text color                   |
| `--mjo-border-color`           | Border color                 |

### Spacing Variables

| Variable           | Description         |
| ------------------ | ------------------- |
| `--mjo-spacing-xs` | Extra small spacing |
| `--mjo-spacing-sm` | Small spacing       |
| `--mjo-spacing-md` | Medium spacing      |
| `--mjo-spacing-lg` | Large spacing       |
| `--mjo-spacing-xl` | Extra large spacing |

### Typography Variables

| Variable            | Description |
| ------------------- | ----------- |
| `--mjo-font-family` | Font family |
| `--mjo-font-size`   | Font size   |
| `--mjo-font-weight` | Font weight |
| `--mjo-line-height` | Line height |

### Component-Specific Variables

Each component has its own set of CSS variables following the pattern `--mjo-{component}-{property}`. For example:

| Variable                     | Description          |
| ---------------------------- | -------------------- |
| `--mjo-button-border-radius` | Button border radius |
| `--mjo-button-font-size`     | Button font size     |
| `--mjo-button-padding`       | Button padding       |
| `--mjo-card-border-radius`   | Card border radius   |
| `--mjo-card-box-shadow`      | Card box shadow      |

> **Note**: For a complete list of available CSS variables, see [theming.md](./theming.md).

## Theme Configuration Interface

The `MjoThemeConfig` interface provides comprehensive theme customization:

```ts
interface MjoThemeConfig {
    light?: ThemeMode;
    dark?: ThemeMode;
}

interface ThemeMode {
    // Color system
    primaryColor?: ColorShades;
    secondaryColor?: ColorShades;
    backgroundColor?: string;
    surfaceColor?: string;
    textColor?: string;
    borderColor?: string;

    // Layout
    spacing?: SpacingConfig;
    typography?: TypographyConfig;

    // Component themes
    components?: {
        button?: MjoButtonTheme;
        card?: MjoCardTheme;
        textfield?: MjoTextfieldTheme;
        // ... other component themes
    };
}
```

## Best Practices

1. **Global vs Local Scope**: Use `scope="global"` for application-wide themes and `scope="local"` for isolated sections.

2. **Theme Switching**: Store theme preference in localStorage and restore on page load for better user experience.

3. **Performance**: Avoid frequent theme changes as they trigger CSS recalculation.

4. **Custom Properties**: Leverage the generated CSS variables for consistent styling across custom components.

5. **Component Themes**: Use component-specific configurations for fine-grained control over individual components.

## Related Components

-   [All mjo-litui components](./README.md) - Can be themed using mjo-theme
-   [theming.md](./theming.md) - Complete theming guide and CSS variables reference

## Technical Notes

### Theme Generation Process

1. The component merges the default theme with user-provided configuration
2. CSS custom properties are generated from the merged configuration
3. Properties are injected as a `<style>` element in the appropriate scope
4. The kebab-case naming convention is applied to all CSS variables

### Scope Behavior

-   **Global scope (`scope="global"`)**: CSS variables are applied to `:root`, affecting the entire document
-   **Local scope (`scope="local"`)**: CSS variables are applied to `:host`, affecting only the component's shadow DOM and its slotted content

### Theme Persistence

The component does not automatically persist theme preferences. Implement your own storage mechanism:

```ts
// Save theme preference
localStorage.setItem("theme-mode", this.isDark ? "dark" : "light");

// Restore theme preference
const savedTheme = localStorage.getItem("theme-mode") as "light" | "dark";
this.isDark = savedTheme === "dark";
```
