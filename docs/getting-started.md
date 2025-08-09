# Getting Started

## Installation

```bash
npm i mjo-litui
```

## Minimal usage (per-component imports)

Using specific component modules helps tree-shaking:

```ts
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";

// index.ts entry in a Lit / vanilla app
document.body.innerHTML = `
    <mjo-theme scope="global" theme="light"></mjo-theme>
    <mjo-button color="primary">Hello</mjo-button>
`;
```

## Lit example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-button";

@customElement("example-app")
export class ExampleApp extends LitElement {
    render() {
        return html`
            <mjo-theme scope="global" theme="light"></mjo-theme>
            <mjo-button color="primary">Hello</mjo-button>
        `;
    }
}
```

## Optional full import

If you prefer registering everything at once:

```ts
import "mjo-litui"; // registers all custom elements
```

## Development scripts

| Script            | Purpose                                                   |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Start Vite dev server                                     |
| `npm run preview` | Preview built bundle                                      |
| `npm run build`   | Compile & publish from `dist/` (beware: runs npm publish) |

## Theming quick hint

Add one global `<mjo-theme>` (scope="global") near the root; use local scoped islands for dark sections. See `theming.md` for full reference.
