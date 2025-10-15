# mjo-theme

Theme management component that applies consistent design tokens across the application and manages light/dark mode switching.

## Table of Contents

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [CSS Variables](#css-variables)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Apply global or local theme configuration with design tokens
- Switch between light and dark modes
- Persist user theme preference across sessions
- Customize color palettes, typography, spacing, and component-specific styles
- Server-side rendering (SSR) theme support
- Override default theme with custom configuration

## Import

```typescript
import "mjo-litui/mjo-theme";
```

## Properties

| Property | Type                  | Description                                                                     | Default   | Required |
| -------- | --------------------- | ------------------------------------------------------------------------------- | --------- | -------- |
| `theme`  | `MjoThemeModes`       | Current theme mode. Options: `"light"`, `"dark"`                                | `"light"` | No       |
| `scope`  | `"global" \| "local"` | Theme application scope. `"global"` applies to document, `"local"` to component | `"local"` | No       |
| `config` | `MjoThemeConfig`      | Custom theme configuration object to override default theme values              | `{}`      | No       |

## Methods

| Method        | Parameters             | Description                                    | Return Value    |
| ------------- | ---------------------- | ---------------------------------------------- | --------------- |
| `setTheme`    | `theme: MjoThemeModes` | Sets the current theme mode                    | `void`          |
| `toggleTheme` | None                   | Toggles between light and dark modes           | `MjoThemeModes` |
| `applyTheme`  | None                   | Applies the current theme configuration to CSS | `void`          |

## Events

| Event              | Description                        | Type                  | Detail                     |
| ------------------ | ---------------------------------- | --------------------- | -------------------------- |
| `mjo-theme:change` | Dispatched when theme mode changes | `MjoThemeChangeEvent` | `{ theme: MjoThemeModes }` |

## CSS Variables

The `mjo-theme` component generates CSS variables dynamically based on the theme configuration. All variables follow the `--mjo-*` naming pattern. Below are the main categories:

### Border Radius

| Variable              | Description          | Default |
| --------------------- | -------------------- | ------- |
| `--mjo-radius-small`  | Small border radius  | `3px`   |
| `--mjo-radius-medium` | Medium border radius | `5px`   |
| `--mjo-radius-large`  | Large border radius  | `10px`  |

### Typography

| Variable                    | Description           | Default    |
| --------------------------- | --------------------- | ---------- |
| `--mjo-font-family`         | Base font family      | `inherit`  |
| `--mjo-font-size-xxsmall`   | XX-Small font size    | `0.625rem` |
| `--mjo-font-size-xsmall`    | X-Small font size     | `0.75rem`  |
| `--mjo-font-size-small`     | Small font size       | `0.875rem` |
| `--mjo-font-size`           | Medium/base font size | `1rem`     |
| `--mjo-font-size-large`     | Large font size       | `1.125rem` |
| `--mjo-font-size-xlarge`    | X-Large font size     | `1.25rem`  |
| `--mjo-font-size-xxlarge`   | XX-Large font size    | `1.375rem` |
| `--mjo-font-size-title1`    | Title 1 font size     | `3rem`     |
| `--mjo-font-size-title2`    | Title 2 font size     | `2rem`     |
| `--mjo-font-size-title3`    | Title 3 font size     | `1.5rem`   |
| `--mjo-font-weight-light`   | Light font weight     | `300`      |
| `--mjo-font-weight-regular` | Regular font weight   | `400`      |
| `--mjo-font-weight-medium`  | Medium font weight    | `500`      |
| `--mjo-font-weight-bold`    | Bold font weight      | `700`      |

### Spacing

| Variable              | Description         | Default |
| --------------------- | ------------------- | ------- |
| `--mjo-space-xxsmall` | XX-Small spacing    | `3px`   |
| `--mjo-space-xsmall`  | X-Small spacing     | `6px`   |
| `--mjo-space-small`   | Small spacing       | `8px`   |
| `--mjo-space`         | Medium/base spacing | `16px`  |
| `--mjo-space-large`   | Large spacing       | `24px`  |
| `--mjo-space-xlarge`  | X-Large spacing     | `32px`  |
| `--mjo-space-xxlarge` | XX-Large spacing    | `40px`  |

### Brand Colors

#### Primary Color

| Variable                         | Description              | Default   |
| -------------------------------- | ------------------------ | --------- |
| `--mjo-primary-color`            | Primary brand color      | `#1aa8ed` |
| `--mjo-primary-color-hover`      | Primary color on hover   | `#008ccd` |
| `--mjo-primary-foreground-color` | Primary foreground color | `#f2f2f2` |

**Primary Color Palette (Shades 50-950):**

- `--mjo-primary-color-50` to `--mjo-primary-color-950`: Complete shade palette from lightest to darkest
- `--mjo-primary-color-alpha0` to `--mjo-primary-color-alpha9`: Alpha transparency variants (0% to 90% opacity)

#### Secondary Color

| Variable                           | Description                | Default   |
| ---------------------------------- | -------------------------- | --------- |
| `--mjo-secondary-color`            | Secondary brand color      | `#7dc717` |
| `--mjo-secondary-color-hover`      | Secondary color on hover   | `#63a900` |
| `--mjo-secondary-foreground-color` | Secondary foreground color | `#f2f2f2` |

**Secondary Color Palette (Shades 50-950):**

- `--mjo-secondary-color-50` to `--mjo-secondary-color-950`: Complete shade palette from lightest to darkest
- `--mjo-secondary-color-alpha0` to `--mjo-secondary-color-alpha9`: Alpha transparency variants (0% to 90% opacity)

### Semantic Colors

| Variable                         | Description              | Default   |
| -------------------------------- | ------------------------ | --------- |
| `--mjo-color-white`              | White color              | `#ffffff` |
| `--mjo-color-black`              | Black color              | `#000000` |
| `--mjo-color-error`              | Error state color        | `#f44336` |
| `--mjo-color-error-foreground`   | Error foreground color   | `#ffffff` |
| `--mjo-color-success`            | Success state color      | `#4caf50` |
| `--mjo-color-success-foreground` | Success foreground color | `#ffffff` |
| `--mjo-color-warning`            | Warning state color      | `#ff9800` |
| `--mjo-color-warning-foreground` | Warning foreground color | `#ffffff` |
| `--mjo-color-info`               | Info state color         | `#128ada` |
| `--mjo-color-info-foreground`    | Info foreground color    | `#ffffff` |
| `--mjo-color-default`            | Default state color      | `#777777` |
| `--mjo-color-default-foreground` | Default foreground color | `#ffffff` |

### Gradient Colors

| Variable                | Description        | Default                          |
| ----------------------- | ------------------ | -------------------------------- |
| `--mjo-color-gradient`  | Default gradient   | Linear gradient with blue tones  |
| `--mjo-color-gradient1` | Gradient variant 1 | Linear gradient with green tones |
| `--mjo-color-gradient2` | Gradient variant 2 | Blue to green gradient           |
| `--mjo-color-gradient3` | Gradient variant 3 | Green to blue gradient           |

### Theme Mode Colors

These colors automatically adapt based on the selected theme mode (light/dark):

| Variable                           | Description                    | Light Mode     | Dark Mode      |
| ---------------------------------- | ------------------------------ | -------------- | -------------- |
| `--mjo-background-color`           | Base background color          | `#efefef`      | `#151515`      |
| `--mjo-background-color-low`       | Low contrast background        | `#f8f8f8`      | `#101010`      |
| `--mjo-background-color-high`      | High contrast background       | `#dadada`      | `#252525`      |
| `--mjo-background-color-hover`     | Background color on hover      | `#eeeeee`      | `#666666`      |
| `--mjo-background-color-card`      | Card background color          | `#fafafa`      | `#333333`      |
| `--mjo-background-color-card-low`  | Card low contrast background   | `#ffffff`      | `#222222`      |
| `--mjo-background-color-card-high` | Card high contrast background  | `#e6e6e6`      | `#555555`      |
| `--mjo-foreground-color`           | Base foreground/text color     | `#333333`      | `#f0f0f0`      |
| `--mjo-foreground-color-low`       | Low contrast foreground        | `#666666`      | `#cccccc`      |
| `--mjo-foreground-color-high`      | High contrast foreground       | `#151515`      | `#ffffff`      |
| `--mjo-border-color`               | Base border color              | `#dddddd`      | `#555555`      |
| `--mjo-border-color-low`           | Low contrast border            | `#fcfcfc`      | `#333333`      |
| `--mjo-border-color-high`          | High contrast border           | `#cccccc`      | `#666666`      |
| `--mjo-muted-color`                | Muted/disabled color           | Varies by mode | Varies by mode |
| `--mjo-muted-color-low`            | Low contrast muted color       | Varies by mode | Varies by mode |
| `--mjo-muted-color-high`           | High contrast muted color      | Varies by mode | Varies by mode |
| `--mjo-muted-foreground`           | Muted foreground color         | Varies by mode | Varies by mode |
| `--mjo-muted-foreground-low`       | Low contrast muted foreground  | Varies by mode | Varies by mode |
| `--mjo-muted-foreground-high`      | High contrast muted foreground | Varies by mode | Varies by mode |
| `--mjo-disabled-color`             | Disabled state color           | Varies by mode | Varies by mode |
| `--mjo-disabled-foreground-color`  | Disabled foreground color      | Varies by mode | Varies by mode |

### Shadows

| Variable             | Description     | Default (Light Mode)               |
| -------------------- | --------------- | ---------------------------------- |
| `--mjo-box-shadow`   | Base box shadow | `0 0 5px rgba(0, 0, 0, 0.2)`       |
| `--mjo-box-shadow-1` | Shadow level 1  | `0 0 2px rgba(0, 0, 0, 0.3)`       |
| `--mjo-box-shadow-2` | Shadow level 2  | `0 0 8px rgba(0, 0, 0, 0.25)`      |
| `--mjo-box-shadow-3` | Shadow level 3  | `0 0 14px rgba(0, 0, 0, 0.25)`     |
| `--mjo-box-shadow-4` | Shadow level 4  | `4px 4px 8px rgba(0, 0, 0, 0.3)`   |
| `--mjo-box-shadow-5` | Shadow level 5  | `4px 4px 14px rgba(0, 0, 0, 0.25)` |

### Color Palettes

The theme provides comprehensive color palettes with shades from 50-950 and alpha variants (alpha0-alpha9) for the following colors:

- **Blue**: `--mjo-color-blue`, `--mjo-color-blue-50` to `--mjo-color-blue-950`, `--mjo-color-blue-alpha0` to `--mjo-color-blue-alpha9`
- **Red**: `--mjo-color-red`, `--mjo-color-red-50` to `--mjo-color-red-950`, `--mjo-color-red-alpha0` to `--mjo-color-red-alpha9`
- **Green**: `--mjo-color-green`, `--mjo-color-green-50` to `--mjo-color-green-950`, `--mjo-color-green-alpha0` to `--mjo-color-green-alpha9`
- **Yellow**: `--mjo-color-yellow`, `--mjo-color-yellow-50` to `--mjo-color-yellow-950`, `--mjo-color-yellow-alpha0` to `--mjo-color-yellow-alpha9`
- **Purple**: `--mjo-color-purple`, `--mjo-color-purple-50` to `--mjo-color-purple-950`, `--mjo-color-purple-alpha0` to `--mjo-color-purple-alpha9`
- **Cyan**: `--mjo-color-cyan`, `--mjo-color-cyan-50` to `--mjo-color-cyan-950`, `--mjo-color-cyan-alpha0` to `--mjo-color-cyan-alpha9`
- **Pink**: `--mjo-color-pink`, `--mjo-color-pink-50` to `--mjo-color-pink-950`, `--mjo-color-pink-alpha0` to `--mjo-color-pink-alpha9`
- **Gray**: `--mjo-color-gray`, `--mjo-color-gray-50` to `--mjo-color-gray-950`, `--mjo-color-gray-alpha0` to `--mjo-color-gray-alpha9`

Each color palette includes:

- **Base color**: The default shade (e.g., `--mjo-color-blue`)
- **Shades 50-950**: 11 progressive shades from lightest (50) to darkest (950)
- **Alpha variants**: 10 transparency levels from alpha0 (0% opacity) to alpha9 (90% opacity)

### Component-Specific Variables

The theme also generates component-specific CSS variables following the pattern `--mjo-[component]-[property]`. See individual component documentation for their specific variables.

## Accessibility

### Best Practices

- Ensure sufficient color contrast between text and backgrounds in both light and dark modes
- Test theme switching with screen readers to ensure consistent experience
- Provide visual indication of current theme mode
- Maintain accessible focus indicators across theme modes
- Avoid using color alone to convey information

### Theme Persistence

The component automatically stores the user's theme preference in a cookie (`mjo-theme`) for 365 days, ensuring consistent experience across sessions.

### Global Theme Application

When `scope="global"`, the theme applies a class (`light` or `dark`) to the `<html>` element, allowing global CSS rules to respond to the theme mode.

## Usage Examples

### Global Theme Configuration

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";

@customElement("app-root")
export class AppRoot extends LitElement {
    render() {
        return html`
            <mjo-theme
                scope="global"
                theme="dark"
                .config=${{
                    primaryColor: "#ff6b6b",
                    primaryForegroundColor: "#ffffff",
                    radiusMedium: "8px",
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div class="app-content">
                    <!-- Your application content -->
                </div>
            </mjo-theme>
        `;
    }
}
```

### Theme Toggle with Event Handling

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoTheme } from "mjo-litui/mjo-theme";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";

@customElement("theme-switcher")
export class ThemeSwitcher extends LitElement {
    @query("mjo-theme") themeComponent!: MjoTheme;

    render() {
        return html`
            <mjo-theme scope="global" @mjo-theme:change=${this.handleThemeChange}>
                <mjo-button @click=${this.toggleTheme}> Toggle Theme </mjo-button>
            </mjo-theme>
        `;
    }

    private toggleTheme() {
        const newTheme = this.themeComponent.toggleTheme();
        console.log("Theme changed to:", newTheme);
    }

    private handleThemeChange(event: CustomEvent) {
        console.log("Theme change event:", event.detail.theme);
    }
}
```

### Local Scoped Theme

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";

@customElement("card-container")
export class CardContainer extends LitElement {
    static styles = css`
        .card {
            background: var(--mjo-background-color);
            color: var(--mjo-foreground-color);
            border: 1px solid var(--mjo-border-color);
            border-radius: var(--mjo-radius-medium);
            padding: var(--mjo-space);
        }
    `;

    render() {
        return html`
            <mjo-theme
                scope="local"
                theme="dark"
                .config=${{
                    dark: {
                        backgroundColor: { default: "#1a1a1a" },
                        foregroundColor: { default: "#e0e0e0" },
                    },
                }}
            >
                <div class="card">
                    <h2>Dark Themed Card</h2>
                    <p>This card has its own theme scope</p>
                </div>
            </mjo-theme>
        `;
    }
}
```

### Custom Color Palette

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";

@customElement("custom-palette-app")
export class CustomPaletteApp extends LitElement {
    render() {
        return html`
            <mjo-theme
                scope="global"
                .config=${{
                    colors: {
                        blue: {
                            default: "#007bff",
                            "500": "#007bff",
                            "600": "#0056b3",
                            "700": "#003d82",
                        },
                    },
                    primaryColor: {
                        default: "#007bff",
                        hover: "#0056b3",
                        "500": "#007bff",
                        "600": "#0056b3",
                    },
                }}
            >
                <!-- Your content -->
            </mjo-theme>
        `;
    }
}
```

### Component-Specific Theme Overrides

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";

@customElement("themed-buttons")
export class ThemedButtons extends LitElement {
    render() {
        return html`
            <mjo-theme
                scope="global"
                .config=${{
                    components: {
                        mjoButton: {
                            backgroundColor: "#4caf50",
                            color: "#ffffff",
                            borderRadius: "20px",
                            padding: "12px 24px",
                        },
                    },
                }}
            >
                <mjo-button>Custom Styled Button</mjo-button>
            </mjo-theme>
        `;
    }
}
```

### Programmatic Theme Management

```typescript
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoTheme } from "mjo-litui/mjo-theme";
import "mjo-litui/mjo-theme";

@customElement("theme-manager")
export class ThemeManager extends LitElement {
    @query("mjo-theme") themeComponent!: MjoTheme;
    @state() currentTheme: "light" | "dark" = "light";

    render() {
        return html`
            <mjo-theme scope="global" .theme=${this.currentTheme} @mjo-theme:change=${this.handleThemeChange}>
                <button @click=${this.setLightTheme}>Light</button>
                <button @click=${this.setDarkTheme}>Dark</button>
                <button @click=${this.toggleTheme}>Toggle</button>
                <p>Current theme: ${this.currentTheme}</p>
            </mjo-theme>
        `;
    }

    private setLightTheme() {
        this.themeComponent.setTheme("light");
    }

    private setDarkTheme() {
        this.themeComponent.setTheme("dark");
    }

    private toggleTheme() {
        this.themeComponent.toggleTheme();
    }

    private handleThemeChange(event: CustomEvent) {
        this.currentTheme = event.detail.theme;
    }
}
```

### SSR Theme Application

```typescript
import { MjoThemeSSRGenerator } from "mjo-litui/lib/theme";

// Server-side usage
const themeStyles = MjoThemeSSRGenerator({
    userConfig: {
        primaryColor: "#ff6b6b",
        fontFamily: "'Inter', sans-serif",
    },
    themeMode: "dark",
});

// Inject into HTML head
const html = `
<!DOCTYPE html>
<html class="dark">
<head>
    ${themeStyles}
</head>
<body>
    <!-- Your content -->
</body>
</html>
`;
```

## Additional Notes

### Theme Configuration Structure

The `MjoThemeConfig` interface supports deep customization:

- **Global tokens**: radius, font sizes, spacing, colors
- **Mode-specific values**: different values for light/dark modes
- **Component overrides**: customize individual component styles
- **Color palettes**: full shade structures with alpha variants

### Theme Merging

Custom configurations are deeply merged with the default theme. Only specified values are overridden, preserving all defaults for unspecified properties.

### Cookie Persistence

The component uses a simple cookie implementation to store theme preferences:

- Cookie name: `mjo-theme`
- Expiration: 365 days
- Path: `/`
- Values: `"light"` or `"dark"`

### Global vs Local Scope

- **Global**: Creates a `<style id="mjo-theme">` element in `document.head`, applies class to `<html>`, and dispatches events on `document`
- **Local**: Creates a `<style id="mjo-theme">` element in the component's shadow root, applies variables to `:host`, and dispatches events on the component

### CSS Variable Generation

The component automatically converts camelCase configuration keys to kebab-case CSS variables:

- `primaryColor` → `--mjo-primary-color`
- `fontSizeXlarge` → `--mjo-font-size-xlarge`
- `components.mjoButton.backgroundColor` → `--mjo-button-background-color`

### Performance Considerations

Theme application is optimized to only update when the `theme` property or `config` changes. The component uses `structuredClone` for deep configuration merging to avoid mutation of the default theme.

### Integration with Other Components

All components in the mjo-litui library automatically consume theme CSS variables. Custom components can also use these variables by referencing them in their styles.
