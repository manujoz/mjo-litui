# mjo-litui Documentation

Welcome to the extended documentation. Here you will find conceptual guides, theming reference, and per-component documentation.

## 📚 Index

1. **[Getting Started](getting-started.md)** – Installation, first use, and development scripts.
2. **[Theming](theming.md)** – Theme system, global variables, and targeted overrides.
3. **Components** – Each `mjo-<name>.md` file documents a component.

## 🧩 Available Components

### Core Components

- **[mjo-theme](mjo-theme.md)** - Theme configuration and CSS variables
- **[mjo-typography](mjo-typography.md)** - Semantic text styling
- **[mjo-icon](mjo-icon.md)** - Icon display from mjo-icons
- **[mjo-ripple](mjo-ripple.md)** - Material Design ripple effects

### Layout & Structure

- **[mjo-card](mjo-card.md)** - Content containers with elevation
- **[mjo-grid](mjo-grid.md)** - Responsive grid layout system
- **[mjo-accordion](mjo-accordion.md)** - Flexible accordion with multiple variants and selection modes

### Navigation

- **[mjo-breadcrumbs](mjo-breadcrumbs.md)** - Navigation breadcrumbs component with horizontal scroll shadow support
- **[mjo-pagination](mjo-pagination.md)** - Comprehensive pagination component with animated page indicator and full accessibility support

### Form Components

- **[mjo-form](mjo-form.md)** - Form container with validation
- **[mjo-textfield](mjo-textfield.md)** - Single-line text inputs
- **[mjo-textarea](mjo-textarea.md)** - Multi-line text inputs
- **[mjo-select](mjo-select.md)** - Comprehensive dropdown select component with search functionality, rich options support, and full form integration
- **[mjo-option](mjo-option.md)** - Select option items
- **[mjo-checkbox](mjo-checkbox.md)** - Customizable checkbox with form integration, validation, and indeterminate state (includes mjo-checkbox-group)
- **[mjo-radio](mjo-radio.md)** - Customizable radio button with form integration, validation support, and enhanced accessibility (includes mjo-radio-group)
- **[mjo-switch](mjo-switch.md)** - Toggle switch controls
- **[mjo-slider](mjo-slider.md)** - Range slider inputs
- **[mjo-color-picker](mjo-color-picker.md)** - Advanced color picker with multiple formats, accessibility features, and form integration
- **[mjo-date-picker](mjo-date-picker.md)** - Interactive date picker with comprehensive features for single date and date range selection
- **[mjo-calendar](mjo-calendar.md)** - Standalone calendar (used by date picker)

### Interactive Components

- **[mjo-button](mjo-button.md)** - Fully accessible button component with multiple variants, interactive states, and comprehensive ARIA support
- **[mjo-dropdown](mjo-dropdown.md)** - Accessible dropdown component that displays floating content relative to its trigger element
- **[mjo-link](mjo-link.md)** - Accessible link component with multiple variants, color options, and comprehensive keyboard navigation support
- **[mjo-listbox](mjo-listbox.md)** - Interactive listbox component for displaying selectable lists with sections, icons, and full accessibility support
- **[mjo-menu-button](mjo-menu-button.md)** - Animated hamburger menu button with multiple effects and semantic colors

### Media & Display

- **[mjo-image](mjo-image.md)** - Responsive image component with error handling, loading states, and accessibility features
- **[mjo-avatar](mjo-avatar.md)** - Configurable avatar component for user images, initials, or fallback icons
- **[mjo-badge](mjo-badge.md)** - Positioned notification badge component with comprehensive accessibility support
- **[mjo-table](mjo-table.md)** - Data tables with sorting and filtering
- **[mjo-text-nowrap](mjo-text-nowrap.md)** - Text overflow handling

### Feedback & Messaging

- **[mjo-alert](mjo-alert.md)** - Alert component for displaying contextual feedback messages with multiple types, sizes, and dismissal functionality
- **[mjo-message](mjo-message.md)** - Global message controller component that displays temporary toast-like notifications with comprehensive accessibility support
- **[mjo-notification](mjo-notification.md)** - Notification system for displaying positioned toast notifications with controller architecture and comprehensive accessibility support

### Overlays

- **[mjo-modal](mjo-modal.md)** - Modal dialogs and overlays
- **[mjo-drawer](mjo-drawer.md)** - Slide-out navigation panels

### Utility Components

- **[mjo-chip](mjo-chip.md)** - Flexible chip component for displaying compact information with multiple variants, colors, and interactive capabilities
- **[mjo-progress](mjo-progress.md)** - Accessible progress indicators supporting bar and circular variants with determinate and indeterminate states
- **[mjo-scrollshadow](mjo-scrollshadow.md)** - Container component that adds visual scroll shadows to indicate scrollable content with automatic background color detection

4. **Coming Soon** (suggested): accessibility, form patterns, contribution guides.

## 🧱 File Structure

- `getting-started.md`: quick onboarding.
- `theming.md`: complete list of global `--mjo-*` variables and patterns.
- `mjo-*.md`: individual component documentation.

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

- File name: `mjo-<name>.md` (e.g., `mjo-select.md`).
- Use functional and minimal examples.
- Do not include CSS variables from unrelated components (stay focused).
- If a component depends on another (e.g., `mjo-select` and `mjo-option`), cross-reference them.
- Avoid repeating the global variables list (already in `theming.md`).

## 🧪 Example Verification

Before adding a snippet:

1. Test it in the Vite sandbox (`npm run dev`).
2. Make sure it does not depend on strange imports: just `import 'mjo-litui';` or the specific import is enough.
3. If it requires assets/icons, mention the dependency (`mjo-icons`).

## 🤝 Contributing

When adding a new component:

1. Implement the file `src/mjo-<name>.ts`.
2. Export it in `src/index.ts`.
3. Write `docs/mjo-<name>.md` using the template.
4. Update the component list in the main README if necessary.

## 🗺️ Documentation Status

All components have comprehensive documentation with:

- Usage examples and TypeScript integration
- Complete property and event documentation
- Theme customization guides
- Accessibility best practices
- Integration examples with other components

## 🔍 Useful Internal References

- Default theme: `src/theme/default-theme.ts`
- Theme mixin: `src/mixins/theme-mixin.ts`
- Theme types: `src/types/mjo-theme.d.ts`
