# Theming in mjo-litui

This guide describes how the theming system works, which global CSS variables it exposes, and how to customize it both globally and per component.

## Key Components

-   `<mjo-theme>`: generates CSS variables (prefix `--mjo-`) at the global level (`:root`) or locally (the component's own Shadow DOM) by merging `defaultTheme` + user overrides.
-   `ThemeMixin`: enables per-component variable overrides via its `theme` property, without affecting the global theme.

## `<mjo-theme>` API

Properties:

-   `theme`: `'light' | 'dark'` (default: `light`). Selects which mode configuration branch is applied.
-   `scope`: `'global' | 'local'` (default: `local`). Determines if variables are inserted as `:root {}` (global) or `:host {}` (local to `<mjo-theme>`'s Shadow DOM).
-   `config`: partial object (`MjoThemeConfig`) that is recursively merged with `defaultTheme`.

Useful public method (if you need to force regeneration after mutating `config`):

-   `applyTheme()`: regenerates and injects the `<style id="mjo-theme">` block.

Note: The current code automatically reapplies the theme when the `theme` property changes, but NOT when you mutate internal properties of `config` without reassigning. To apply changes after `theme.config.something = ...`, do a reassignment `theme.config = { ...theme.config }` or call `theme.applyTheme()`.

## Basic Examples (with Lit components)

Below examples assume you are building your own Lit app components. All examples import the library once (tree‑shaking still works if you import only specific exports).

### Global light theme

Single global provider component placed high in your app:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";

@customElement("example-global-theme")
export class ExampleGlobalTheme extends LitElement {
    render() {
        return html`
            <mjo-theme scope="global"></mjo-theme>
            <mjo-button color="primary">Accept</mjo-button>
        `;
    }
}
```

### Switch to dark and override primary

Use property bindings for both mode and config. No imperative DOM queries needed:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

const darkPrimaryOverride: Partial<MjoThemeConfig> = {
    dark: { primaryColor: { default: "#0F62FE", hover: "#0353E9" } },
};

@customElement("example-toggle-theme")
export class ExampleToggleTheme extends LitElement {
    @state() private dark = true;

    private toggleMode = () => (this.dark = !this.dark);

    render() {
        return html`
            <mjo-theme scope="global" .theme=${this.dark ? "dark" : "light"} .config=${darkPrimaryOverride}></mjo-theme>
            <mjo-button variant="flat" @click=${this.toggleMode}> Toggle Theme (now ${this.dark ? "dark" : "light"}) </mjo-button>
        `;
    }
}
```

### Isolated local theme

Wrap a subsection with a local-scoped theme so only its descendants inherit it:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";

@customElement("example-local-island")
export class ExampleLocalIsland extends LitElement {
    render() {
        return html`
            <section>
                <h3>Default (global)</h3>
                <mjo-button color="primary">Global area</mjo-button>
            </section>
            <section>
                <h3>Local dark island</h3>
                <mjo-theme theme="dark" scope="local">
                    <mjo-card>
                        <mjo-button color="secondary">Dark only</mjo-button>
                    </mjo-card>
                </mjo-theme>
            </section>
        `;
    }
}
```

## Overriding colors and scales

The structure allows you to override:

-   Base palette (`colors`) for reusable colors (`--mjo-color-*`).
-   Mode (`light` / `dark`) for semantic colors (`--mjo-primary-*`, `--mjo-background-color-*`, etc.).
-   Global tokens for spacing, typography, and radii.

Combined example (tokens + palettes + semantic overrides):

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

const themeConfig: Partial<MjoThemeConfig> = {
    radiusSmall: "2px",
    spaceMedium: "18px",
    colors: {
        success: "#22c55e",
        error: "#dc2626",
        blue: { default: "#2563eb", 500: "#2563eb", 600: "#1d4ed8" },
    },
    light: {
        primaryColor: { default: "#2563eb", hover: "#1d4ed8" },
        backgroundColor: { default: "#f5f7fa", high: "#ffffff", xlow: "#d9dde2" },
    },
};

@customElement("example-themed")
export class ExampleThemed extends LitElement {
    render() {
        return html`
            <mjo-theme scope="global" theme="light" .config=${themeConfig}></mjo-theme>
            <mjo-button color="primary">Primary</mjo-button>
            <mjo-button color="success" variant="flat">Success</mjo-button>
        `;
    }
}
```

## Global CSS Variables (general)

These variables exist independently of any specific component and serve as the design foundation. They do not include component-specific variables (those are documented in each component's guide).

### 1. Radius tokens

-   `--mjo-radius-small`
-   `--mjo-radius-medium`
-   `--mjo-radius-large`

### 2. Typography (sizes and weights)

-   `--mjo-font-size-small`
-   `--mjo-font-size` (medium)
-   `--mjo-font-size-large`
-   `--mjo-font-weight-light`
-   `--mjo-font-weight-regular`
-   `--mjo-font-weight-medium`
-   `--mjo-font-weight-bold`

### 3. Spacing

-   `--mjo-space-x-small`
-   `--mjo-space-small`
-   `--mjo-space` (medium)
-   `--mjo-space-large`
-   `--mjo-space-x-large`
-   `--mjo-space-xx-large`

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
-   Contrasts: `--mjo-background-color-xlow`, `--mjo-background-color-low`, `--mjo-background-color-high`, `--mjo-background-color-xhigh`

Background for containers (cards, etc.):

-   `--mjo-background-color-card` (default)
-   `--mjo-background-color-card-xlow`, `-low`, `-high`, `-xhigh`

Foreground (text / icons):

-   `--mjo-foreground-color` (default)
-   `--mjo-foreground-color-xlow`, `-low`, `-high`, `-xhigh`

Shadows (boxShadow):

-   `--mjo-box-shadow`
-   `--mjo-box-shadow-1` ... `--mjo-box-shadow-5`

Disabled state:

-   `--mjo-disabled-color`
-   `--mjo-disabled-foreground-color`

### 6. Derived variable pattern

Components consume these base variables to build their own (`--mjo-button-*`, `--mjo-input-*`, etc.). Changing the globals affects all components that have not overridden values internally.

## Per-component overrides with `ThemeMixin`

Some components (e.g., `mjo-button`) extend `ThemeMixin`. You can pass a `theme` object with camelCase keys and the mixin will generate CSS variables in its Shadow DOM using the pattern `--mjo-<tag>-<kebab-case(property)>`.

Example with Lit:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-button";
import type { MjoButtonTheme } from "mjo-litui/types/mjo-theme";

const buttonTheme: Partial<MjoButtonTheme> = {
    primaryColor: "#10B981", // -> --mjo-button-primary-color
    primaryColorHover: "#059669",
    fontSize: "0.9rem", // -> --mjo-button-font-size
    padding: "0.4rem 0.9rem", // -> --mjo-button-padding
};

@customElement("example-button-themed")
export class ExampleButtonThemed extends LitElement {
    render() {
        return html`
            <mjo-button color="primary" .theme=${buttonTheme}>Save</mjo-button>
            <mjo-button color="secondary">Cancel</mjo-button>
        `;
    }
}
```

This does NOT modify the global theme, only that button.

### Relevant differences

| Case                         | Scope                        | Example                                            |
| ---------------------------- | ---------------------------- | -------------------------------------------------- |
| `<mjo-theme scope="global">` | Whole application            | Changing `--mjo-primary-color` impacts all buttons |
| `<mjo-theme scope="local">`  | Only descendants in its slot | Two zones with different schemes                   |
| `ThemeMixin` (`.theme` prop) | Only specific instance       | A special highlighted button                       |

## Best practices

1. Change global tokens first before adjusting component-specific variables (promotes consistency).
2. Use `scope="local"` for previews/embeds (e.g., inside Storybook) without affecting the rest.
3. For dynamic changes (toggle dark/light), modify the `theme` property of `<mjo-theme>` and, if you mutate `config`, reassign or call `applyTheme()`.
4. Avoid overusing `ThemeMixin` for global styles: it's meant for exceptions.

## Quick debugging

In DevTools, inspect a component and check the `:host` section to see the active variables. Modify a `--mjo-*` variable in real time to validate the effect before incorporating the change into `config`.

## Summary

1. Define a global `<mjo-theme>` with the base tokens.
2. Adjust palettes (`colors`) and semantics (`light`/`dark`).
3. Use `ThemeMixin` only for specific customizations.
4. Document specific variables in each component's guide (not here).

With this, you can establish a consistent and adaptable visual identity for your entire component library.
