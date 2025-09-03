# Theming in mjo-litui

This guide describes how the theming system works, which global CSS variables it exposes, and how to customize it both globally and per component.

## Key Components

-   `<mjo-theme>`: generates CSS variables (prefix `--mjo-`) at the global level (`:root`) or locally (the component's own Shadow DOM) by merging `defaultTheme` + user overrides.
-   `MjoThemeSSRGenerator`: server-side utility for generating theme styles during SSR (Server-Side Rendering), eliminating FOUC (Flash of Unstyled Content).
-   `ThemeMixin`: enables per-component variable overrides via its `theme` property, without affecting the global theme.
-   **CLI Theme Generator**: `npx mjo-litui create-theme` command that creates complete CSS theme files with interactive prompts and automatic color scale generation.

## `<mjo-theme>` API

Properties:

-   `theme`: `'light' | 'dark'` (default: `light`). Selects which mode configuration branch is applied.
-   `scope`: `'global' | 'local'` (default: `local`). Determines if variables are inserted as `:root {}` (global) or `:host {}` (local to `<mjo-theme>`'s Shadow DOM).
-   `config`: partial object (`MjoThemeConfig`) that is recursively merged with `defaultTheme`.

Useful public method (if you need to force regeneration after mutating `config`):

-   `applyTheme()`: regenerates and injects the `<style id="mjo-theme">` block.

Note: The current code automatically reapplies the theme when the `theme` property changes, but NOT when you mutate internal properties of `config` without reassigning. To apply changes after `theme.config.something = ...`, do a reassignment `theme.config = { ...theme.config }` or call `theme.applyTheme()`.

## Server-Side Rendering (SSR)

For server-side applications, use `MjoThemeSSRGenerator` to pre-generate theme styles and avoid FOUC (Flash of Unstyled Content).

### API

```ts
import { MjoThemeSSRGenerator } from 'mjo-litui/lib/theme';

const styleTag = MjoThemeSSRGenerator({
  themeMode: 'light' | 'dark',
  userConfig?: Partial<MjoThemeConfig>
});
```

Parameters:

-   `themeMode`: `'light' | 'dark'` (default: `'light'`). Theme mode to apply.
-   `userConfig`: partial object (`MjoThemeConfig`) merged with `defaultTheme`.

Returns: HTML `<style>` tag string with generated CSS variables.

### Express.js Example

```ts
import express from "express";
import { MjoThemeSSRGenerator } from "mjo-litui/lib/theme";

const app = express();

app.get("*", (req, res) => {
    // Detect theme from cookie, header, or user preferences
    const themeMode = req.cookies["mjo-theme"] || "light";

    // Generate theme styles
    const themeStyles = MjoThemeSSRGenerator({
        themeMode,
        userConfig: {
            light: {
                primaryColor: { default: "#0066cc", hover: "#0052a3" },
            },
        },
    });

    // Inject into HTML head
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My App</title>
        ${themeStyles}
      </head>
      <body>
        <mjo-button color="primary">Click me</mjo-button>
      </body>
    </html>
  `;

    res.send(html);
});
```

### Next.js App Router Example

```tsx
import { MjoThemeSSRGenerator } from "mjo-litui/lib/theme";
import { cookies } from "next/headers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const theme = cookieStore.get("mjo-theme")?.value || "light";

    const themeStyles = MjoThemeSSRGenerator({
        themeMode: theme as "light" | "dark",
    });

    return (
        <html>
            <head dangerouslySetInnerHTML={{ __html: themeStyles }} />
            <body>{children}</body>
        </html>
    );
}
```

## CLI Theme Generation

For developers who prefer a guided approach, mjo-litui provides a CLI tool that generates complete theme CSS files through interactive prompts.

### Command

```bash
npx mjo-litui create-theme
```

### Features

-   **Interactive Configuration**: Step-by-step prompts for all theme colors
-   **Automatic Color Scales**: Generates complete color palettes (50-950) from base colors using OKLCH color science
-   **Contrast Calculation**: Automatically calculates optimal foreground colors for accessibility
-   **Custom Output Location**: Choose where to save your theme file
-   **Minification Option**: Optional CSS minification for production use

### Usage Example

```bash
$ npx mjo-litui create-theme
🎨 Welcome to mjo-litui theme creator!

📁 Install location: ./my-custom-theme.css
🔵 Primary color: #3b82f6
🟢 Secondary color: #8b5cf6
✅ Success color: #10b981
ℹ️  Info color: #3b82f6
⚠️  Warning color: #f59e0b
❌ Error color: #ef4444
🗜️  Minify CSS output? Yes

✅ Theme created successfully!
📁 File saved to: /path/to/my-custom-theme.css
```

### Generated Output

The CLI creates a complete CSS file with:

```css
:root {
    /* Base tokens */
    --mjo-radius-small: 3px;
    --mjo-font-size: 1em;
    --mjo-space-medium: 16px;

    /* Generated color palettes */
    --mjo-primary-color: #3b82f6;
    --mjo-primary-color-hover: #2563eb;
    --mjo-primary-foreground-color: #ffffff;
    --mjo-primary-color-50: #eff6ff;
    --mjo-primary-color-100: #dbeafe;
    /* ... complete scale through 950 ... */

    /* Alpha transparency variants */
    --mjo-primary-color-alpha0: #3b82f600;
    --mjo-primary-color-alpha1: #3b82f611;
    /* ... through alpha9 ... */

    /* All semantic colors and contrasts */
    --mjo-background-color: #ffffff;
    --mjo-foreground-color: #333333;
    --mjo-border-color: #dddddd;
}

.dark {
    /* Dark theme variants automatically included */
    --mjo-background-color: #151515;
    --mjo-foreground-color: #f0f0f0;
}
```

### Integration

Use the generated theme file in your project:

```html
<!-- Link the generated CSS -->
<link rel="stylesheet" href="./my-custom-theme.css" />
```

### Color Science Benefits

The CLI uses OKLCH color space for superior color generation:

-   **Perceptual uniformity**: Colors appear equally spaced to human vision
-   **Better accessibility**: More accurate contrast ratios
-   **Smoother gradients**: Natural color transitions
-   **Consistent lightness**: Maintains visual weight across the palette

## Client-Side Usage

## Client-Side Usage

Below examples assume you are building your own Lit app components using `<mjo-theme>` for dynamic theming.

### Global Theme Setup

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";

@customElement("app-root")
export class AppRoot extends LitElement {
    @state() private darkMode = false;

    private toggleTheme = () => (this.darkMode = !this.darkMode);

    render() {
        return html`
            <mjo-theme scope="global" .theme=${this.darkMode ? "dark" : "light"}></mjo-theme>
            <mjo-button @click=${this.toggleTheme}> Switch to ${this.darkMode ? "light" : "dark"} mode </mjo-button>
        `;
    }
}
```

### Custom Theme Configuration

```ts
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

const customTheme: Partial<MjoThemeConfig> = {
    radiusSmall: "4px",
    colors: {
        blue: { default: "#2563eb", hover: "#1d4ed8" },
    },
    light: {
        primaryColor: { default: "#2563eb", hover: "#1d4ed8" },
    },
    dark: {
        primaryColor: { default: "#3b82f6", hover: "#2563eb" },
    },
};

@customElement("themed-app")
export class ThemedApp extends LitElement {
    render() {
        return html`
            <mjo-theme scope="global" theme="light" .config=${customTheme}></mjo-theme>
            <mjo-button color="primary">Themed Button</mjo-button>
        `;
    }
}
```

### Local Theme Islands

```ts
@customElement("theme-islands")
export class ThemeIslands extends LitElement {
    render() {
        return html`
            <section>
                <h3>Default Theme</h3>
                <mjo-button color="primary">Global Button</mjo-button>
            </section>

            <mjo-theme theme="dark" scope="local">
                <section>
                    <h3>Dark Theme Island</h3>
                    <mjo-button color="primary">Dark Button</mjo-button>
                </section>
            </mjo-theme>
        `;
    }
}
```

## Theme Configuration

The theme system supports comprehensive customization through:

-   **Base palette** (`colors`) for reusable colors (`--mjo-color-*`)
-   **Mode-specific colors** (`light`/`dark`) for semantic tokens (`--mjo-primary-*`, `--mjo-background-color-*`)
-   **Global tokens** for spacing, typography, and radii

## Global CSS Variables (general)

These variables exist independently of any specific component and serve as the design foundation. They do not include component-specific variables (those are documented in each component's guide).

### 1. Radius tokens

-   `--mjo-radius-small`
-   `--mjo-radius-medium`
-   `--mjo-radius-large`

### 2. Typography (sizes and weights)

-   `--mjo-font-size-xxsmall`
-   `--mjo-font-size-xsmall`
-   `--mjo-font-size-small`
-   `--mjo-font-size` (medium)
-   `--mjo-font-size-large`
-   `--mjo-font-size-xlarge`
-   `--mjo-font-size-xxlarge`
-   `--mjo-font-weight-light`
-   `--mjo-font-weight-regular`
-   `--mjo-font-weight-medium`
-   `--mjo-font-weight-bold`

### 3. Spacing

-   `--mjo-space-xxsmall`
-   `--mjo-space-xsmall`
-   `--mjo-space-small`
-   `--mjo-space` (medium)
-   `--mjo-space-large`
-   `--mjo-space-xlarge`
-   `--mjo-space-xxlarge`

### 4. Base palette (`colors`)

For each simple key: `--mjo-color-<name>`.

Simple colors:

-   `--mjo-color-white`
-   `--mjo-color-black`
-   `--mjo-color-error`
-   `--mjo-color-success`
-   `--mjo-color-warning`
-   `--mjo-color-info`

Palettes with scales (if defined): `--mjo-color-<palette>` and:
`--mjo-color-<palette>-alpha0..alpha9`, `--mjo-color-<palette>-50`, `--mjo-color-<palette>-100` ... `--mjo-color-<palette>-900`.

Default supported palettes:

-   blue
-   red
-   green
-   yellow
-   purple
-   cyan
-   pink
-   gray

Example variable: `--mjo-color-blue-500`.

### 5. Semantic mode colors (`light` / `dark`)

Primary:

-   `--mjo-primary-color` (+ `-hover`)
-   Optional scales: `--mjo-primary-color-50..900` and `--mjo-primary-color-alpha0..alpha9`
-   Foreground: `--mjo-primary-foreground-color`, `--mjo-primary-foreground-color-light`, `--mjo-primary-foreground-color-dark`

Secondary:

-   `--mjo-secondary-color` (+ `-hover`)
-   Optional scales: `--mjo-secondary-color-50..900` and `--mjo-secondary-color-alpha0..alpha9`
-   Foreground: `--mjo-secondary-foreground-color`, `--mjo-secondary-foreground-color-light`, `--mjo-secondary-foreground-color-dark`

Border:

-   `--mjo-border-color`
-   `--mjo-border-color-light`
-   `--mjo-border-color-dark`

Generic background:

-   `--mjo-background-color` (default)
-   `--mjo-background-color-hover`
-   Contrasts: `--mjo-background-color-low`, `--mjo-background-color-high`

Background for containers (cards, etc.):

-   `--mjo-background-color-card` (default)
-   `--mjo-background-color-card-low`, `-high`

Foreground (text / icons):

-   `--mjo-foreground-color` (default)
-   `--mjo-foreground-color-low`, `-high`

Shadows (boxShadow):

-   `--mjo-box-shadow`
-   `--mjo-box-shadow-1` ... `--mjo-box-shadow-5`

Disabled state:

-   `--mjo-disabled-color`
-   `--mjo-disabled-foreground-color`

### 6. Derived variable pattern

Components consume these base variables to build their own (`--mjo-button-*`, `--mjo-textfield-*`, etc.). Changing the globals affects all components that have not overridden values internally.

## Per-component overrides with `ThemeMixin`

Some components extend `ThemeMixin`, allowing granular customization via their `theme` property. The mixin generates CSS variables in the component's Shadow DOM using the pattern `--mjo-<tag>-<kebab-case(property)>`.

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-button";
import type { MjoButtonTheme } from "mjo-litui/types/mjo-theme";

const buttonTheme: Partial<MjoButtonTheme> = {
    primaryColor: "#10B981",
    primaryColorHover: "#059669",
    fontSize: "0.9rem",
    padding: "0.5rem 1rem",
};

@customElement("example-themed-button")
export class ExampleThemedButton extends LitElement {
    render() {
        return html`
            <mjo-button color="primary" .theme=${buttonTheme}>Custom Button</mjo-button>
            <mjo-button color="secondary">Default Button</mjo-button>
        `;
    }
}
```

This approach affects only the specific component instance, not the global theme.

## Theming Approaches Comparison

| Approach                     | Scope                      | Use Case                                | Example                              |
| ---------------------------- | -------------------------- | --------------------------------------- | ------------------------------------ |
| `npx mjo-litui create-theme` | Static CSS file generation | Design systems, complete theme creation | Brand theme with full color palettes |
| `MjoThemeSSRGenerator`       | Server-side pre-render     | SSR applications, eliminate FOUC        | Express.js, Next.js apps             |
| `<mjo-theme scope="global">` | Application-wide           | Global theme changes                    | App-wide dark/light mode             |
| `<mjo-theme scope="local">`  | Component descendants only | Theme islands, previews                 | Dark sidebar in light app            |
| `ThemeMixin` (`.theme` prop) | Single component instance  | Special styling                         | Highlighted action buttons           |

## Best Practices

### Development Workflow

1. **Start with CLI for complete themes**: Use `npx mjo-litui create-theme` to generate comprehensive design systems with proper color scales and accessibility.
2. **Define global tokens**: Establish spacing, typography, and color foundations before component-specific customizations.
3. **Use SSR for production**: Implement `MjoThemeSSRGenerator` to eliminate FOUC and improve perceived performance.
4. **Scope themes appropriately**: Use `scope="global"` for app-wide changes, `scope="local"` for isolated sections.
5. **Component theming sparingly**: Reserve `ThemeMixin` for truly exceptional cases, not global patterns.

### Dynamic Theme Changes

-   For client-side theme switching, modify the `theme` property of `<mjo-theme>`.
-   If mutating `config` object properties, reassign the entire object or call `applyTheme()` to trigger updates.
-   In SSR contexts, detect theme preferences from cookies, headers, or user settings.

### Performance Considerations

-   **CLI-generated themes**: Static CSS files are optimally cached by browsers and provide the best performance for consistent themes.
-   **SSR-generated styles**: Cached by browsers and eliminate render-blocking theme generation.
-   **Local theme scopes**: Only affect their descendants, minimizing CSS recalculation.
-   **Component-level theming**: Creates additional CSS variables but provides precise control.

## Quick debugging

In DevTools, inspect a component and check the `:host` section to see the active variables. Modify a `--mjo-*` variable in real time to validate the effect before incorporating the change into `config`.

## Summary

The mjo-litui theming system provides flexible styling options for different deployment scenarios:

1. **CLI Theme Generation**: Use `npx mjo-litui create-theme` for complete design systems with automatic color scales and accessibility optimization.
2. **Server-Side Rendering**: Use `MjoThemeSSRGenerator` for optimal performance and FOUC prevention.
3. **Global Theming**: Define application-wide styles with `<mjo-theme scope="global">`.
4. **Scoped Theming**: Create isolated theme areas with `<mjo-theme scope="local">`.
5. **Component Theming**: Fine-tune individual components with `ThemeMixin`.

This multi-layered approach ensures consistent visual identity while maintaining performance and flexibility across different application architectures.

## Complete API Reference

For detailed information about all available CSS variables, theme configuration interfaces, and complete examples, see [mjo-theme.md](./mjo-theme.md).
