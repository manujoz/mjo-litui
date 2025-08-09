# mjo-litui

A collection of Web Components built with Lit 3 to create reusable, themeable interfaces with no framework dependencies.

Status: alpha (0.0.1-alpha.49). The API may change.

## Features

-   Web Components with Shadow DOM and encapsulated styles
-   Powerful theming system via `<mjo-theme>` (light/dark + overrides by variables and components)
-   Overlays (modal, drawer, notifications) with reactive controllers
-   TypeScript types included and Vite support
-   Consistent `mjo-` prefix for all elements

## Extended Documentation

See the full guide, theming, and per-component documentation at:

-   [docs/README.md](docs/README.md)

## Installation

Use npm (or your favorite package manager):

```bash
npm i mjo-litui
```

Requirements: Node.js >= 18 (Vite 5).

## Quick Usage

Recommended: import only the components you use so bundlers can tree-shake easily.

### Lit example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";

@customElement("example-quick")
export class ExampleQuick extends LitElement {
    render() {
        return html`
            <mjo-theme scope="global" theme="light"></mjo-theme>
            <mjo-button color="primary" variant="default">Accept</mjo-button>
        `;
    }
}
```

Optional full import (registers every component):

```ts
import "mjo-litui";
```

## Themes (`mjo-theme`)

The `<mjo-theme>` component applies CSS variables globally or locally and allows overrides for `light`/`dark` modes and palettes.

### Minimal global theme

```ts
import 'mjo-litui/mjo-theme';
<mjo-theme scope="global" theme="light"></mjo-theme>
```

### Override colors (Lit component)

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

const themeOverrides: Partial<MjoThemeConfig> = {
    light: {
        primaryColor: { default: "#7C3AED", hover: "#6D28D9" },
        secondaryColor: { default: "#CC3D74", hover: "#B83768" },
        borderColor: { default: "#E5E7EB" },
    },
    colors: {
        success: "#4caf50",
        error: "#f44336",
    },
};

@customElement("example-theme-override")
export class ExampleThemeOverride extends LitElement {
    render() {
        return html`
            <mjo-theme scope="global" theme="light" .config=${themeOverrides}></mjo-theme>
            <mjo-button color="primary">Primary</mjo-button>
            <mjo-button color="secondary" variant="ghost">Secondary</mjo-button>
        `;
    }
}
```

Notes:

-   `scope="global"` injects a `<style id="mjo-theme">` in `<head>` as `:root { ... }`.
-   `scope="local"` limits variables to the Shadow DOM of the parent `<mjo-theme>`.
-   Generated variables follow the pattern `--mjo-*` (e.g. `--mjo-primary-color`, `--mjo-background-color-high`).

## Overlays and Controllers

Some components expose reactive controllers that manage dynamic containers in `<body>`.

### Modal example (Lit)

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-demo")
export class ExampleModalDemo extends LitElement {
    private openModal = () => {
        const modal = this.renderRoot.querySelector("mjo-modal")!;
        modal.controller.show({
            title: "Title",
            width: "520px",
            blocked: false,
            animationDuration: 250,
            content: "Content inside the modal",
            onClose: () => console.log("closed"),
        });
    };

    render() {
        return html`
            <mjo-modal></mjo-modal>
            <mjo-button @click=${this.openModal}>Open modal</mjo-button>
        `;
    }
}
```

Patterns for drawer and notifications are analogous (use their respective controllers).

## Component List

-   **[mjo-accordion](docs/mjo-accordion.md)** (+ `mjo-accordion-item`) - Collapsible content panels
-   **[mjo-alert](docs/mjo-alert.md)** - Contextual feedback messages
-   **[mjo-avatar](docs/mjo-avatar.md)** - User profile images and placeholders
-   **[mjo-button](docs/mjo-button.md)** - Interactive buttons with variants and states
-   **[mjo-card](docs/mjo-card.md)** - Content containers with elevation
-   **[mjo-checkbox](docs/mjo-checkbox.md)** - Form checkboxes with validation
-   **[mjo-chip](docs/mjo-chip.md)** - Compact elements for tags and filters
-   **[mjo-color-picker](docs/mjo-color-picker.md)** - Color selection interface
-   **[mjo-drawer](docs/mjo-drawer.md)** - Slide-out navigation panels
-   **[mjo-dropdown](docs/mjo-dropdown.md)** - Contextual dropdown menus
-   **[mjo-form](docs/mjo-form.md)** - Form container with validation
-   **[mjo-grid](docs/mjo-grid.md)** - Responsive grid layout system
-   **[mjo-icon](docs/mjo-icon.md)** - Icon display from mjo-icons
-   **[mjo-image](docs/mjo-image.md)** - Enhanced image component with loading states
-   **[mjo-ionic](docs/mjo-ionic.md)** - Ionic framework integration
-   **[mjo-message](docs/mjo-message.md)** - Toast-style messages
-   **[mjo-modal](docs/mjo-modal.md)** - Modal dialogs and overlays
-   **[mjo-notification](docs/mjo-notification.md)** - System notifications
-   **[mjo-option](docs/mjo-option.md)** - Select option items
-   **[mjo-radio](docs/mjo-radio.md)** - Radio button inputs
-   **[mjo-ripple](docs/mjo-ripple.md)** - Material Design ripple effects
-   **[mjo-select](docs/mjo-select.md)** - Dropdown select inputs
-   **[mjo-slider](docs/mjo-slider.md)** - Range slider inputs
-   **[mjo-switch](docs/mjo-switch.md)** - Toggle switch controls
-   **[mjo-table](docs/mjo-table.md)** - Data tables with sorting and filtering
-   **[mjo-text-nowrap](docs/mjo-text-nowrap.md)** - Text overflow handling
-   **[mjo-textarea](docs/mjo-textarea.md)** - Multi-line text inputs
-   **[mjo-textfield](docs/mjo-textfield.md)** - Single-line text inputs
-   **[mjo-theme](docs/mjo-theme.md)** - Theme configuration and CSS variables
-   **[mjo-typography](docs/mjo-typography.md)** - Semantic text styling

See individual component documentation for detailed examples and properties.

## Local Development

Main scripts:

-   `npm run dev`: starts Vite in development mode
-   `npm run preview`: serves the Vite build for local testing
-   `npm run build`: compiles TypeScript and publishes from `dist/` (caution: runs `npm publish` in `dist`)

Getting started with contributions:

1. Clone the repo and run `npm install`
2. `npm run dev` for local playground

## Project Structure (summary)

-   `src/mjo-*.ts`: main components (each file registers its custom element with `@customElement`)
-   `src/controllers/`: controllers for overlays (modal, drawer, notification)
-   `src/helpers|mixins|utils/`: utilities, validation, and theme/form mixins
-   `src/theme/default-theme.ts`: base theme configuration (light/dark + palettes)
-   `docs/`: comprehensive component documentation

## Best Practices and Conventions

-   Mandatory `mjo-` prefix
-   Properties and states in the recommended order (props, states, non-reactive, render, Lit hooks, public, private `#`, styles)
-   Avoid external dependencies except for `lit`, `@lit/context`, and `mjo-icons`

## Compatibility

Modern browsers with support for Web Components (Shadow DOM, Custom Elements). For older browsers, polyfills may be required.

## License

MIT © Manu Overa
