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
        primaryColor: "#1976D2",
    },
    dark: {
        primaryColor: "#0F62FE",
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
    components: {
        mjoButton: {
            borderRadius: "12px",
            fontSize: "16px",
            padding: "12px 24px",
        },
        mjoTextfield: {
            radius: "8px",
            fontSize: "14px",
            padding: "16px",
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
    // Basic properties
    fontSizeMedium: "14px",
    fontWeightRegular: "400",
    spaceMedium: "16px",
    spaceLarge: "24px",
    spaceXlarge: "32px",
    radiusMedium: "8px",

    // Colors
    colors: {
        error: "#EF4444",
        success: "#10B981",
        warning: "#F59E0B",
        info: "#3B82F6",
    },

    light: {
        primaryColor: "#6366F1",
        secondaryColor: "#EC4899",
        backgroundColor: "#F8FAFC",
        foregroundColor: "#1E293B",
        borderColor: "#E2E8F0",
    },
    dark: {
        primaryColor: "#818CF8",
        backgroundColor: "#0F172A",
        foregroundColor: "#F1F5F9",
        borderColor: "#334155",
    },

    components: {
        mjoButton: {
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "10px 20px",
        },
        mjoCard: {
            radiusMedium: "12px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            padding: "24px",
        },
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

## CSS Custom Properties

The `mjo-theme` component generates CSS custom properties with the `--mjo-` prefix based on the theme configuration. The following are the main categories:

### Basic Properties

| Variable                    | Source Property     | Description                 |
| --------------------------- | ------------------- | --------------------------- |
| `--mjo-radius-small`        | `radiusSmall`       | Small border radius         |
| `--mjo-radius-medium`       | `radiusMedium`      | Medium border radius        |
| `--mjo-radius-large`        | `radiusLarge`       | Large border radius         |
| `--mjo-font-size-small`     | `fontSizeSmall`     | Small font size             |
| `--mjo-font-size-xsmall`    | `fontSizeXsmall`    | Extra small font size       |
| `--mjo-font-size-xxsmall`   | `fontSizeXxsmall`   | Extra extra small font size |
| `--mjo-font-size`           | `fontSizeMedium`    | Default font size           |
| `--mjo-font-size-large`     | `fontSizeLarge`     | Large font size             |
| `--mjo-font-size-xlarge`    | `fontSizeXlarge`    | Extra large font size       |
| `--mjo-font-size-xxlarge`   | `fontSizeXxlarge`   | Extra extra large font size |
| `--mjo-font-weight-light`   | `fontWeightLight`   | Light font weight           |
| `--mjo-font-weight-regular` | `fontWeightRegular` | Regular font weight         |
| `--mjo-font-weight-medium`  | `fontWeightMedium`  | Medium font weight          |
| `--mjo-font-weight-bold`    | `fontWeightBold`    | Bold font weight            |

### Spacing Variables

| Variable              | Source Property | Description             |
| --------------------- | --------------- | ----------------------- |
| `--mjo-space-xxsmall` | `spaceXxsmall`  | Extra extra small space |
| `--mjo-space-xsmall`  | `spaceXsmall`   | Extra small space       |
| `--mjo-space-small`   | `spaceSmall`    | Small space             |
| `--mjo-space`         | `spaceMedium`   | Default space           |
| `--mjo-space-large`   | `spaceLarge`    | Large space             |
| `--mjo-space-xlarge`  | `spaceXlarge`   | Extra large space       |
| `--mjo-space-xxlarge` | `spaceXxlarge`  | Extra extra large space |

### Color Variables

| Variable               | Source Property         | Description               |
| ---------------------- | ----------------------- | ------------------------- |
| `--mjo-color-white`    | `colors.white`          | White color               |
| `--mjo-color-black`    | `colors.black`          | Black color               |
| `--mjo-color-error`    | `colors.error`          | Error color               |
| `--mjo-color-success`  | `colors.success`        | Success color             |
| `--mjo-color-warning`  | `colors.warning`        | Warning color             |
| `--mjo-color-info`     | `colors.info`           | Info color                |
| `--mjo-color-blue`     | `colors.blue.default`   | Blue color                |
| `--mjo-color-blue-50`  | `colors.blue.50`        | Blue color shade 50       |
| `--mjo-color-blue-100` | `colors.blue.100`       | Blue color shade 100      |
| `--mjo-color-blue-...` | `colors.blue.*`         | Blue color various shades |
| `--mjo-color-red`      | `colors.red.default`    | Red color                 |
| `--mjo-color-green`    | `colors.green.default`  | Green color               |
| `--mjo-color-yellow`   | `colors.yellow.default` | Yellow color              |
| `--mjo-color-purple`   | `colors.purple.default` | Purple color              |
| `--mjo-color-cyan`     | `colors.cyan.default`   | Cyan color                |
| `--mjo-color-pink`     | `colors.pink.default`   | Pink color                |
| `--mjo-color-gray`     | `colors.gray.default`   | Gray color                |

### Theme Mode Variables

| Variable                           | Source Property (light/dark) | Description                          |
| ---------------------------------- | ---------------------------- | ------------------------------------ |
| `--mjo-primary-color`              | `primaryColor`               | Primary color                        |
| `--mjo-primary-color-hover`        | `primaryColor.hover`         | Primary color hover state            |
| `--mjo-primary-foreground-color`   | `primaryForegroundColor`     | Primary foreground color             |
| `--mjo-secondary-color`            | `secondaryColor`             | Secondary color                      |
| `--mjo-secondary-color-hover`      | `secondaryColor.hover`       | Secondary color hover state          |
| `--mjo-secondary-foreground-color` | `secondaryForegroundColor`   | Secondary foreground color           |
| `--mjo-border-color`               | `borderColor`                | Border color                         |
| `--mjo-border-color-light`         | `borderColor.light`          | Light border color                   |
| `--mjo-border-color-dark`          | `borderColor.dark`           | Dark border color                    |
| `--mjo-background-color`           | `backgroundColor`            | Background color                     |
| `--mjo-background-color-hover`     | `backgroundColor.hover`      | Background color hover state         |
| `--mjo-background-color-xlow`      | `backgroundColor.xlow`       | Background color extra low contrast  |
| `--mjo-background-color-low`       | `backgroundColor.low`        | Background color low contrast        |
| `--mjo-background-color-high`      | `backgroundColor.high`       | Background color high contrast       |
| `--mjo-background-color-xhigh`     | `backgroundColor.xhigh`      | Background color extra high contrast |
| `--mjo-background-color-card`      | `backgroundColorCard`        | Card background color                |
| `--mjo-foreground-color`           | `foregroundColor`            | Foreground/text color                |
| `--mjo-foreground-color-xlow`      | `foregroundColor.xlow`       | Text color extra low contrast        |
| `--mjo-foreground-color-low`       | `foregroundColor.low`        | Text color low contrast              |
| `--mjo-foreground-color-high`      | `foregroundColor.high`       | Text color high contrast             |
| `--mjo-foreground-color-xhigh`     | `foregroundColor.xhigh`      | Text color extra high contrast       |
| `--mjo-box-shadow`                 | `boxShadow`                  | Default box shadow                   |
| `--mjo-box-shadow-1`               | `boxShadow.1`                | Box shadow level 1                   |
| `--mjo-box-shadow-2`               | `boxShadow.2`                | Box shadow level 2                   |
| `--mjo-box-shadow-3`               | `boxShadow.3`                | Box shadow level 3                   |
| `--mjo-box-shadow-4`               | `boxShadow.4`                | Box shadow level 4                   |
| `--mjo-box-shadow-5`               | `boxShadow.5`                | Box shadow level 5                   |
| `--mjo-disabled-color`             | `disabledColor`              | Disabled color                       |
| `--mjo-disabled-foreground-color`  | `disabledForegroundColor`    | Disabled foreground color            |

### Component-Specific Variables

Each component has its own set of CSS variables following the pattern `--mjo-{component}-{property}`. For example:

| Variable                           | Source Property                           | Description                |
| ---------------------------------- | ----------------------------------------- | -------------------------- |
| `--mjo-button-font-family`         | `components.mjoButton.fontFamily`         | Button font family         |
| `--mjo-button-font-size`           | `components.mjoButton.fontSize`           | Button font size           |
| `--mjo-button-font-weight`         | `components.mjoButton.fontWeight`         | Button font weight         |
| `--mjo-button-padding`             | `components.mjoButton.padding`            | Button padding             |
| `--mjo-button-border-radius`       | `components.mjoButton.borderRadius`       | Button border radius       |
| `--mjo-calendar-font-family`       | `components.mjoCalendar.fontFamily`       | Calendar font family       |
| `--mjo-calendar-background`        | `components.mjoCalendar.background`       | Calendar background        |
| `--mjo-calendar-border`            | `components.mjoCalendar.border`           | Calendar border            |
| `--mjo-calendar-border-radius`     | `components.mjoCalendar.borderRadius`     | Calendar border radius     |
| `--mjo-calendar-shadow`            | `components.mjoCalendar.shadow`           | Calendar box shadow        |
| `--mjo-calendar-padding`           | `components.mjoCalendar.padding`          | Calendar padding           |
| `--mjo-card-background-color`      | `components.mjoCard.backgroundColor`      | Card background color      |
| `--mjo-card-radius-small`          | `components.mjoCard.radiusSmall`          | Card small border radius   |
| `--mjo-card-radius-medium`         | `components.mjoCard.radiusMedium`         | Card medium border radius  |
| `--mjo-card-radius-large`          | `components.mjoCard.radiusLarge`          | Card large border radius   |
| `--mjo-card-padding`               | `components.mjoCard.padding`              | Card padding               |
| `--mjo-card-box-shadow`            | `components.mjoCard.boxShadow`            | Card box shadow            |
| `--mjo-textfield-background-color` | `components.mjoTextfield.backgroundColor` | Textfield background color |
| `--mjo-textfield-border-color`     | `components.mjoTextfield.borderColor`     | Textfield border color     |
| `--mjo-textfield-font-family`      | `components.mjoTextfield.fontFamily`      | Textfield font family      |
| `--mjo-textfield-font-size`        | `components.mjoTextfield.fontSize`        | Textfield font size        |
| `--mjo-textfield-radius`           | `components.mjoTextfield.radius`          | Textfield border radius    |

### Variable Naming Convention

All CSS variables follow the kebab-case naming convention:

-   **Basic properties**: `camelCase` → `--mjo-kebab-case` (e.g., `fontSizeSmall` → `--mjo-font-size-small`)
-   **Colors**: `colors.property` → `--mjo-color-kebab-case` (e.g., `colors.primaryBlue` → `--mjo-color-primary-blue`)
-   **Theme modes**: `light/dark.property` → `--mjo-kebab-case` (e.g., `light.primaryColor` → `--mjo-primary-color`)
-   **Components**: `components.mjoComponent.property` → `--mjo-component-kebab-case` (e.g., `components.mjoButton.fontSize` → `--mjo-button-font-size`)

## Theme Configuration Interface

The `MjoThemeConfig` interface provides comprehensive theme customization:

```ts
interface MjoThemeConfig {
    // Basic properties (--mjo-*)
    radiusSmall?: string; // --mjo-radius-small
    radiusMedium?: string; // --mjo-radius-medium
    radiusLarge?: string; // --mjo-radius-large
    fontSizeSmall?: string; // --mjo-font-size-small
    fontSizeXsmall?: string; // --mjo-font-size-xsmall
    fontSizeXxsmall?: string; // --mjo-font-size-xxsmall
    fontSizeMedium?: string; // --mjo-font-size
    fontSizeLarge?: string; // --mjo-font-size-large
    fontSizeXlarge?: string; // --mjo-font-size-xlarge
    fontSizeXxlarge?: string; // --mjo-font-size-xxlarge
    fontWeightLight?: string; // --mjo-font-weight-light
    fontWeightRegular?: string; // --mjo-font-weight-regular
    fontWeightMedium?: string; // --mjo-font-weight-medium
    fontWeightBold?: string; // --mjo-font-weight-bold
    spaceXxsmall?: string; // --mjo-space-xxsmall
    spaceXsmall?: string; // --mjo-space-xsmall
    spaceSmall?: string; // --mjo-space-small
    spaceMedium?: string; // --mjo-space
    spaceLarge?: string; // --mjo-space-large
    spaceXlarge?: string; // --mjo-space-xlarge
    spaceXxlarge?: string; // --mjo-space-xxlarge

    // Color system (--mjo-color-*)
    colors?: {
        white?: string; // --mjo-color-white
        black?: string; // --mjo-color-black
        error: string; // --mjo-color-error
        success: string; // --mjo-color-success
        warning: string; // --mjo-color-warning
        info: string; // --mjo-color-info
        blue?: MjoThemeShadeStructure; // --mjo-color-blue, --mjo-color-blue-[50-900]
        red?: MjoThemeShadeStructure; // --mjo-color-red, --mjo-color-red-[50-900]
        green?: MjoThemeShadeStructure; // --mjo-color-green, --mjo-color-green-[50-900]
        yellow?: MjoThemeShadeStructure; // --mjo-color-yellow, --mjo-color-yellow-[50-900]
        purple?: MjoThemeShadeStructure; // --mjo-color-purple, --mjo-color-purple-[50-900]
        cyan?: MjoThemeShadeStructure; // --mjo-color-cyan, --mjo-color-cyan-[50-900]
        pink?: MjoThemeShadeStructure; // --mjo-color-pink, --mjo-color-pink-[50-900]
        gray?: MjoThemeShadeStructure; // --mjo-color-gray, --mjo-color-gray-[50-900]
    };

    // Theme modes
    light?: MjoThemeMode;
    dark?: MjoThemeMode;

    // Component themes (--mjo-{component}-*)
    components?: {
        mjoButton?: MjoButtonTheme;
        mjoCalendar?: MjoCalendarTheme;
        mjoCard?: MjoCardTheme;
        mjoTextfield?: MjoInputTheme;
        // ... other component themes
    };
}

interface MjoThemeMode {
    primaryColor?: (MjoThemeShadeStructure & { hover?: string }) | string; // --mjo-primary-color
    primaryForegroundColor?: MjoThemeColorSmall | string; // --mjo-primary-foreground-color
    secondaryColor?: (MjoThemeShadeStructure & { hover?: string }) | string; // --mjo-secondary-color
    secondaryForegroundColor?: MjoThemeColorSmall | string; // --mjo-secondary-foreground-color
    borderColor?: MjoThemeColorSmall | string; // --mjo-border-color
    backgroundColor?: ({ hover: string } & MjoThemeColorContrasts) | string; // --mjo-background-color
    backgroundColorCard?: MjoThemeColorContrasts | string; // --mjo-background-color-card
    foregroundColor?: MjoThemeColorContrasts | string; // --mjo-foreground-color
    boxShadow?: MjoThemeBoxShadow; // --mjo-box-shadow
    disabledColor?: string; // --mjo-disabled-color
    disabledForegroundColor?: string; // --mjo-disabled-foreground-color
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
