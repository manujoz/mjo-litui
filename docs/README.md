# mjo-litui Documentation

Welcome to the extended documentation. Here you will find conceptual guides, theming reference, and per-component documentation.

## 📚 Index

1. **[Getting Started](getting-started.md)** – Installation, first use, and development scripts.
2. **[Theming](theming.md)** – Theme system, global variables, and targeted overrides.
3. **Components** – Each `mjo-<name>.md` file documents a component.
    - Available now: [mjo-button](mjo-button.md)
4. **Coming Soon** (suggested): accessibility, form patterns, contribution guides.

## 🧱 File Structure

-   `getting-started.md`: quick onboarding.
-   `theming.md`: complete list of global `--mjo-*` variables and patterns.
-   `mjo-*.md`: individual component documentation.

## 🧩 Documenting a Component

Create a file `mjo-<component>.md` with this suggested skeleton:

````markdown
# mjo-<component>

Brief description of its purpose.

## Usage

```html
<mjo-<component> ...>...</mjo-<component>>
```
````

```

## Attributes / Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|

## Slots
| Name | Description |

## Events
| Event | Detail | When it is emitted |

## CSS Parts (if applicable)
| Part | Description |

## Relevant CSS Variables
List of `--mjo-<component>-*` and relation to global variables.

## Examples
Use cases (basic, advanced, form integration if applicable).
```

## ✨ Conventions

-   File name: `mjo-<name>.md` (e.g., `mjo-select.md`).
-   Use functional and minimal examples.
-   Do not include CSS variables from unrelated components (stay focused).
-   If a component depends on another (e.g., `mjo-select` and `mjo-option`), cross-reference them.
-   Avoid repeating the global variables list (already in `theming.md`).

## 🧪 Example Verification

Before adding a snippet:

1. Test it in Storybook or the Vite sandbox (`npm run dev`).
2. Make sure it does not depend on strange imports: just `import 'mjo-litui';` or the specific import is enough.
3. If it requires assets/icons, mention the dependency (`mjo-icons`).

## 🤝 Contributing

When adding a new component:

1. Implement the file `src/mjo-<name>.ts`.
2. Export it in `src/index.ts`.
3. Create a story in `stories/mjo-<name>.stories.ts`.
4. Write `docs/mjo-<name>.md` using the template.
5. Update the component list in the main README if necessary.

## 🗺️ Suggested Documentation Roadmap

-   mjo-modal (overlays + controller)
-   mjo-drawer / mjo-notification (controller pattern)
-   mjo-form / validation and mixins
-   mjo-select / options and accessibility
-   mjo-table / empty state and alternate styles

## 🔍 Useful Internal References

-   Default theme: `src/theme/default-theme.ts`
-   Theme mixin: `src/mixins/theme-mixin.ts`
-   Theme types: `src/types/mjo-theme.d.ts`
