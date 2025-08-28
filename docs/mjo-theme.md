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
-   **Automatic Theme Persistence**: Theme preferences are automatically saved in cookies and restored on page load

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

utils/my-theme.ts

```ts
export const fullTheme: MjoThemeConfig = {
    light: {
        colors: {
            primary: "#2563eb",
            secondary: "#64748b",
            success: "#059669",
            warning: "#d97706",
            error: "#dc2626",
            surface: "#ffffff",
            background: "#f8fafc",
            onPrimary: "#ffffff",
            onSecondary: "#ffffff",
            onSurface: "#1e293b",
            onBackground: "#1e293b",
        },
        typography: {
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
            },
        },
        spacing: {
            xs: "0.25rem",
            sm: "0.5rem",
            md: "1rem",
            lg: "1.5rem",
            xl: "2rem",
        },
    },
    dark: {
        colors: {
            primary: "#3b82f6",
            secondary: "#94a3b8",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
            surface: "#1e293b",
            background: "#0f172a",
            onPrimary: "#ffffff",
            onSecondary: "#ffffff",
            onSurface: "#f1f5f9",
            onBackground: "#f1f5f9",
        },
        typography: {
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
            },
        },
        spacing: {
            xs: "0.25rem",
            sm: "0.5rem",
            md: "1rem",
            lg: "1.5rem",
            xl: "2rem",
        },
    },
    components: {
        button: {
            borderRadius: "0.5rem",
            fontWeight: "600",
        },
        textfield: {
            borderRadius: "0.375rem",
        },
        card: {
            borderRadius: "0.75rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        },
    },
};
```

```ts
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

// Your custom theme config
import { fullTheme } from "utils/my-theme";

import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-card";

@customElement("example-complete-theme")
export class ExampleCompleteTheme extends LitElement {
    render() {
        return html`
            <mjo-theme .config=${fullTheme} scope="global" theme="light"></mjo-theme>
            <div style="padding: 2rem;">
                <mjo-card>
                    <h2>Complete Theme Example</h2>
                    <p>This example shows a complete theme configuration with custom colors, typography, and component styles.</p>

                    <mjo-button variant="primary">Primary Button</mjo-button>
                    <mjo-button variant="secondary">Secondary Button</mjo-button>

                    <mjo-textfield label="Custom styled input" placeholder="Type something..."></mjo-textfield>
                </mjo-card>
            </div>
        `;
    }
}
```

### Server-Side Rendering (SSR)

The `mjo-theme` component works seamlessly with server-side rendering. You can use the `createMjoStyleThemeElement` function to generate theme styles on the server and inject them into your HTML before sending it to the client.

```ts
import type { MjoThemeModes } from "mjo-litui/types/mjo-theme";

import express from "express";
import { createMjoStyleThemeElement } from "mjo-litui/lib/theme";

// Your custom theme config
import { fullTheme } from "utils/my-theme";

const app = express();

app.get("*", (req, res) => {
    // Extract theme from cookies
    const cookies = req.headers.cookie || "";
    const theme =
        (cookies
            .split("; ")
            .find((row) => row.startsWith("mjo-theme="))
            ?.split("=")[1] as MjoThemeModes) || "light";

    // Generate theme styles for server-side rendering
    const styleTag = createMjoStyleThemeElement({ userConfig: fullTheme, themeMode: theme });

    // Your HTML template
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>My App</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
            <mjo-theme scope="global" theme="${theme}"></mjo-theme>
            <main>
                <mjo-button>Server-rendered themed button</mjo-button>
            </main>
            
        </body>
        </html>
    `;

    // Inject theme styles into the head
    html = html.replace("</head>", `${styleTag}\n</head>`);

    res.send(html);
});
```

**Benefits of SSR with mjo-theme:**

-   **No Flash of Unstyled Content (FOUC)**: Styles are applied immediately on page load
-   **Cookie Integration**: Automatically respects user's theme preference stored in cookies
-   **Performance**: Critical theme CSS is inlined, reducing render-blocking requests
-   **SEO**: Proper styling is available for server-side rendered content

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

| Name               | Type                                  | Target                                | Description                  |
| ------------------ | ------------------------------------- | ------------------------------------- | ---------------------------- |
| `mjo-theme:change` | `CustomEvent<{theme: MjoThemeModes}>` | If global `document`, if local `this` | Fired when the theme changes |

## Cookie Management

The `mjo-theme` component automatically handles theme persistence using cookies:

-   **Cookie Name**: `mjo-theme`
-   **Storage Duration**: 365 days
-   **Behavior**:
    -   On first load, saves the current theme to the cookie
    -   On subsequent loads, restores the theme from the cookie
    -   Automatically updates the cookie when the theme changes
    -   The cookie value will be either `"light"` or `"dark"`

This means theme preferences persist across browser sessions without any additional configuration.

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

| Variable                         | Source Property            | Description                 |
| -------------------------------- | -------------------------- | --------------------------- |
| `--mjo-color-white`              | `colors.white`             | White color                 |
| `--mjo-color-black`              | `colors.black`             | Black color                 |
| `--mjo-color-error`              | `colors.error`             | Error color                 |
| `--mjo-color-error-foreground`   | `colors.errorForeground`   | Error color foreground      |
| `--mjo-color-success`            | `colors.success`           | Success color               |
| `--mjo-color-success-foreground` | `colors.successForeground` | Success color foreground    |
| `--mjo-color-warning`            | `colors.warning`           | Warning color               |
| `--mjo-color-warning-foreground` | `colors.warningForeground` | Warning color foreground    |
| `--mjo-color-info`               | `colors.info`              | Info color                  |
| `--mjo-color-info-foreground`    | `colors.infoForeground`    | Info color foreground       |
| `--mjo-color-default`            | `colors.default`           | Default color               |
| `--mjo-color-default-foreground` | `colors.defaultForeground` | Default color foreground    |
| `--mjo-color-gradient`           | `colors.gradient`          | Gradient color              |
| `--mjo-color-gradient1`          | `colors.gradient1`         | Gradient 1 color            |
| `--mjo-color-gradient2`          | `colors.gradient2`         | Gradient 2 color            |
| `--mjo-color-gradient3`          | `colors.gradient3`         | Gradient 3 color            |
| `--mjo-color-blue`               | `colors.blue.default`      | Blue color                  |
| `--mjo-color-blue-50`            | `colors.blue.50`           | Blue color shade 50         |
| `--mjo-color-blue-100`           | `colors.blue.100`          | Blue color shade 100        |
| `--mjo-color-blue-200`           | `colors.blue.200`          | Blue color shade 200        |
| `--mjo-color-blue-300`           | `colors.blue.300`          | Blue color shade 300        |
| `--mjo-color-blue-400`           | `colors.blue.400`          | Blue color shade 400        |
| `--mjo-color-blue-500`           | `colors.blue.500`          | Blue color shade 500        |
| `--mjo-color-blue-600`           | `colors.blue.600`          | Blue color shade 600        |
| `--mjo-color-blue-700`           | `colors.blue.700`          | Blue color shade 700        |
| `--mjo-color-blue-800`           | `colors.blue.800`          | Blue color shade 800        |
| `--mjo-color-blue-900`           | `colors.blue.900`          | Blue color shade 900        |
| `--mjo-color-blue-alpha0`        | `colors.blue.alpha0`       | Blue color alpha 0          |
| `--mjo-color-blue-alpha1`        | `colors.blue.alpha1`       | Blue color alpha 1          |
| `--mjo-color-blue-alpha2`        | `colors.blue.alpha2`       | Blue color alpha 2          |
| `--mjo-color-blue-alpha3`        | `colors.blue.alpha3`       | Blue color alpha 3          |
| `--mjo-color-blue-alpha4`        | `colors.blue.alpha4`       | Blue color alpha 4          |
| `--mjo-color-blue-alpha5`        | `colors.blue.alpha5`       | Blue color alpha 5          |
| `--mjo-color-blue-alpha6`        | `colors.blue.alpha6`       | Blue color alpha 6          |
| `--mjo-color-blue-alpha7`        | `colors.blue.alpha7`       | Blue color alpha 7          |
| `--mjo-color-blue-alpha8`        | `colors.blue.alpha8`       | Blue color alpha 8          |
| `--mjo-color-blue-alpha9`        | `colors.blue.alpha9`       | Blue color alpha 9          |
| `--mjo-color-cyan`               | `colors.cyan.default`      | Cyan color                  |
| `--mjo-color-cyan-[50-900]`      | `colors.cyan.*`            | Cyan color shades           |
| `--mjo-color-cyan-alpha[0-9]`    | `colors.cyan.*`            | Cyan color alpha variants   |
| `--mjo-color-green`              | `colors.green.default`     | Green color                 |
| `--mjo-color-green-[50-900]`     | `colors.green.*`           | Green color shades          |
| `--mjo-color-green-alpha[0-9]`   | `colors.green.*`           | Green color alpha variants  |
| `--mjo-color-purple`             | `colors.purple.default`    | Purple color                |
| `--mjo-color-purple-[50-900]`    | `colors.purple.*`          | Purple color shades         |
| `--mjo-color-purple-alpha[0-9]`  | `colors.purple.*`          | Purple color alpha variants |
| `--mjo-color-red`                | `colors.red.default`       | Red color                   |
| `--mjo-color-red-[50-900]`       | `colors.red.*`             | Red color shades            |
| `--mjo-color-red-alpha[0-9]`     | `colors.red.*`             | Red color alpha variants    |
| `--mjo-color-yellow`             | `colors.yellow.default`    | Yellow color                |
| `--mjo-color-yellow-[50-900]`    | `colors.yellow.*`          | Yellow color shades         |
| `--mjo-color-yellow-alpha[0-9]`  | `colors.yellow.*`          | Yellow color alpha variants |
| `--mjo-color-pink`               | `colors.pink.default`      | Pink color                  |
| `--mjo-color-pink-[50-900]`      | `colors.pink.*`            | Pink color shades           |
| `--mjo-color-pink-alpha[0-9]`    | `colors.pink.*`            | Pink color alpha variants   |
| `--mjo-color-gray`               | `colors.gray.default`      | Gray color                  |
| `--mjo-color-gray-[50-900]`      | `colors.gray.*`            | Gray color shades           |
| `--mjo-color-gray-alpha[0-9]`    | `colors.gray.*`            | Gray color alpha variants   |

### Theme Mode Variables

| Variable                                 | Source Property (light/dark)       | Description                      |
| ---------------------------------------- | ---------------------------------- | -------------------------------- |
| `--mjo-primary-color`                    | `primaryColor.default`             | Primary color                    |
| `--mjo-primary-color-hover`              | `primaryColor.hover`               | Primary color hover state        |
| `--mjo-primary-color-50`                 | `primaryColor.50`                  | Primary color shade 50           |
| `--mjo-primary-color-100`                | `primaryColor.100`                 | Primary color shade 100          |
| `--mjo-primary-color-200`                | `primaryColor.200`                 | Primary color shade 200          |
| `--mjo-primary-color-300`                | `primaryColor.300`                 | Primary color shade 300          |
| `--mjo-primary-color-400`                | `primaryColor.400`                 | Primary color shade 400          |
| `--mjo-primary-color-500`                | `primaryColor.500`                 | Primary color shade 500          |
| `--mjo-primary-color-600`                | `primaryColor.600`                 | Primary color shade 600          |
| `--mjo-primary-color-700`                | `primaryColor.700`                 | Primary color shade 700          |
| `--mjo-primary-color-800`                | `primaryColor.800`                 | Primary color shade 800          |
| `--mjo-primary-color-900`                | `primaryColor.900`                 | Primary color shade 900          |
| `--mjo-primary-color-alpha0`             | `primaryColor.alpha0`              | Primary color alpha 0            |
| `--mjo-primary-color-alpha1`             | `primaryColor.alpha1`              | Primary color alpha 1            |
| `--mjo-primary-color-alpha2`             | `primaryColor.alpha2`              | Primary color alpha 2            |
| `--mjo-primary-color-alpha3`             | `primaryColor.alpha3`              | Primary color alpha 3            |
| `--mjo-primary-color-alpha4`             | `primaryColor.alpha4`              | Primary color alpha 4            |
| `--mjo-primary-color-alpha5`             | `primaryColor.alpha5`              | Primary color alpha 5            |
| `--mjo-primary-color-alpha6`             | `primaryColor.alpha6`              | Primary color alpha 6            |
| `--mjo-primary-color-alpha7`             | `primaryColor.alpha7`              | Primary color alpha 7            |
| `--mjo-primary-color-alpha8`             | `primaryColor.alpha8`              | Primary color alpha 8            |
| `--mjo-primary-color-alpha9`             | `primaryColor.alpha9`              | Primary color alpha 9            |
| `--mjo-primary-foreground-color`         | `primaryForegroundColor.default`   | Primary foreground color         |
| `--mjo-primary-foreground-color-light`   | `primaryForegroundColor.light`     | Light primary foreground color   |
| `--mjo-primary-foreground-color-dark`    | `primaryForegroundColor.dark`      | Dark primary foreground color    |
| `--mjo-secondary-color`                  | `secondaryColor.default`           | Secondary color                  |
| `--mjo-secondary-color-hover`            | `secondaryColor.hover`             | Secondary color hover state      |
| `--mjo-secondary-color-50`               | `secondaryColor.50`                | Secondary color shade 50         |
| `--mjo-secondary-color-100`              | `secondaryColor.100`               | Secondary color shade 100        |
| `--mjo-secondary-color-200`              | `secondaryColor.200`               | Secondary color shade 200        |
| `--mjo-secondary-color-300`              | `secondaryColor.300`               | Secondary color shade 300        |
| `--mjo-secondary-color-400`              | `secondaryColor.400`               | Secondary color shade 400        |
| `--mjo-secondary-color-500`              | `secondaryColor.500`               | Secondary color shade 500        |
| `--mjo-secondary-color-600`              | `secondaryColor.600`               | Secondary color shade 600        |
| `--mjo-secondary-color-700`              | `secondaryColor.700`               | Secondary color shade 700        |
| `--mjo-secondary-color-800`              | `secondaryColor.800`               | Secondary color shade 800        |
| `--mjo-secondary-color-900`              | `secondaryColor.900`               | Secondary color shade 900        |
| `--mjo-secondary-color-alpha0`           | `secondaryColor.alpha0`            | Secondary color alpha 0          |
| `--mjo-secondary-color-alpha1`           | `secondaryColor.alpha1`            | Secondary color alpha 1          |
| `--mjo-secondary-color-alpha2`           | `secondaryColor.alpha2`            | Secondary color alpha 2          |
| `--mjo-secondary-color-alpha3`           | `secondaryColor.alpha3`            | Secondary color alpha 3          |
| `--mjo-secondary-color-alpha4`           | `secondaryColor.alpha4`            | Secondary color alpha 4          |
| `--mjo-secondary-color-alpha5`           | `secondaryColor.alpha5`            | Secondary color alpha 5          |
| `--mjo-secondary-color-alpha6`           | `secondaryColor.alpha6`            | Secondary color alpha 6          |
| `--mjo-secondary-color-alpha7`           | `secondaryColor.alpha7`            | Secondary color alpha 7          |
| `--mjo-secondary-color-alpha8`           | `secondaryColor.alpha8`            | Secondary color alpha 8          |
| `--mjo-secondary-color-alpha9`           | `secondaryColor.alpha9`            | Secondary color alpha 9          |
| `--mjo-secondary-foreground-color`       | `secondaryForegroundColor.default` | Secondary foreground color       |
| `--mjo-secondary-foreground-color-light` | `secondaryForegroundColor.light`   | Light secondary foreground color |
| `--mjo-secondary-foreground-color-dark`  | `secondaryForegroundColor.dark`    | Dark secondary foreground color  |
| `--mjo-border-color`                     | `borderColor.default`              | Border color                     |
| `--mjo-border-color-low`                 | `borderColor.low`                  | Low border color                 |
| `--mjo-border-color-high`                | `borderColor.high`                 | High border color                |
| `--mjo-background-color`                 | `backgroundColor.default`          | Background color                 |
| `--mjo-background-color-hover`           | `backgroundColor.hover`            | Background color hover state     |
| `--mjo-background-color-low`             | `backgroundColor.low`              | Background color low contrast    |
| `--mjo-background-color-high`            | `backgroundColor.high`             | Background color high contrast   |
| `--mjo-background-color-card`            | `backgroundColorCard.default`      | Card background color            |
| `--mjo-background-color-card-low`        | `backgroundColorCard.low`          | Card background color low        |
| `--mjo-background-color-card-high`       | `backgroundColorCard.high`         | Card background color high       |
| `--mjo-foreground-color`                 | `foregroundColor.default`          | Foreground/text color            |
| `--mjo-foreground-color-low`             | `foregroundColor.low`              | Text color low contrast          |
| `--mjo-foreground-color-high`            | `foregroundColor.high`             | Text color high contrast         |
| `--mjo-box-shadow`                       | `boxShadow.default`                | Default box shadow               |
| `--mjo-box-shadow-1`                     | `boxShadow.1`                      | Box shadow level 1               |
| `--mjo-box-shadow-2`                     | `boxShadow.2`                      | Box shadow level 2               |
| `--mjo-box-shadow-3`                     | `boxShadow.3`                      | Box shadow level 3               |
| `--mjo-box-shadow-4`                     | `boxShadow.4`                      | Box shadow level 4               |
| `--mjo-box-shadow-5`                     | `boxShadow.5`                      | Box shadow level 5               |
| `--mjo-disabled-color`                   | `disabledColor`                    | Disabled color                   |
| `--mjo-disabled-foreground-color`        | `disabledForegroundColor`          | Disabled foreground color        |

### Variable Naming Convention

All CSS variables follow the kebab-case naming convention:

-   **Basic properties**: `camelCase` → `--mjo-kebab-case` (e.g., `fontSizeSmall` → `--mjo-font-size-small`)
-   **Colors**: `colors.property` → `--mjo-color-kebab-case` (e.g., `colors.blue` → `--mjo-color-blue`)
-   **Color shades**: `colors.color.shade` → `--mjo-color-kebab-shade` (e.g., `colors.blue.500` → `--mjo-color-blue-500`)
-   **Theme modes**: `light/dark.property` → `--mjo-kebab-case` (e.g., `light.primaryColor` → `--mjo-primary-color`)
-   **Components**: `components.mjoComponent.property` → `--mjo-component-kebab-case` (e.g., `components.mjoButton.fontSize` → `--mjo-button-font-size`)

> **Note**: Component-specific CSS variables are documented in each individual component's documentation.

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
    borderColor?: MjoThemeColorContrasts | string; // --mjo-border-color
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
