---
applyTo: "src/**/*.ts"
description: Code structure, imports format, and component conventions for mjo-litui library
---

# Component Structure & Code Conventions

Standards for creating and maintaining Lit components in mjo-litui library with TypeScript.

## Import Organization

### Order & Grouping

1. **Type imports from project** (alphabetically)
2. **Type imports from Lit** (alphabetically)
3. **Value imports from Lit**
4. **Value imports from external libraries** (icons, etc.)
5. **Project mixins** (type first, then value)
6. **Internal component imports** (relative paths with `.js`)

### Format Rules

```typescript
// ✅ ALWAYS: Type imports use `import type` keyword
import type { MjoButtonSize, MjoButtonColor } from "./types/mjo-button";
import type { PropertyValues } from "lit";

// ✅ ALWAYS: Value imports without type keyword
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// ✅ ALWAYS: .js extension for internal imports (even .ts files)
import { FormMixin, type IFormMixin } from "./mixins/form-mixin.js";
import "./mjo-icon.js";

// ✅ Mixed imports: type first, values after
import type { IThemeMixin } from "./mixins/theme-mixin.js";
import { ThemeMixin } from "./mixins/theme-mixin.js";

// ❌ NEVER: Import types without `type` keyword
import { MjoButtonSize } from "./types/mjo-button"; // Wrong!

// ❌ NEVER: Missing .js extension on internal imports
import { FormMixin } from "./mixins/form-mixin"; // Wrong!
```

## Component Structure

### File Organization

```typescript
// 1. Type imports (project types first, then Lit types)
import type { MjoButtonColor } from "./types/mjo-button";
import type { PropertyValues } from "lit";

// 2. Value imports (Lit, external, mixins)
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// 3. Mixins (type interfaces, then implementations)
import type { IFormMixin } from "./mixins/form-mixin.js";
import { FormMixin } from "./mixins/form-mixin.js";

// 4. Internal component imports
import "./mjo-icon.js";

// 5. JSDoc documentation block
/**
 * @summary Brief component description
 * 
 * @slot - Default slot description
 * 
 * @fires event-name - Event description
 * 
 * @csspart part-name - CSS part description
 * 
 * @cssprop --custom-property - CSS custom property description
 */
// 6. Decorator and class declaration
@customElement("mjo-component")
export class MjoComponent extends ThemeMixin(LitElement) implements IThemeMixin {
    // Properties in this order:
    // - @property (public reactive)
    // - @state (private reactive) 
    // - @query (DOM element references)
    // - Public non-reactive properties
    // - Private non-reactive properties (#prefix)
    
    // Methods in this order:
    // - render()
    // - Lifecycle methods (connectedCallback, disconnectedCallback, etc.)
    // - Public API methods
    // - Private methods (#prefix)
    // - static styles
}

// 7. Global type declarations
declare global {
    interface HTMLElementTagNameMap {
        "mjo-component": MjoComponent;
    }
    
    interface HTMLElementEventMap {
        "mjo-component:event": MjoComponentEvent;
    }
}
```

### Property Decorators

```typescript
// Public reactive properties - alphabetically ordered by type
@property({ type: Boolean }) disabled = false;
@property({ type: Boolean }) fullwidth = false;
@property({ type: Number }) maxlength?: number;
@property({ type: String }) color: MjoButtonColor = "primary";
@property({ type: String }) label?: string;
@property({ type: Array }) items: string[] = [];
@property({ type: Object }) theme?: Record<string, string>;

// State properties - private reactive state
@state() private isFocused = false;
@state() private valueLength = 0;

// Query properties - DOM element references
@query("input") $input$!: HTMLInputElement;
@query(".container") $container!: HTMLDivElement;
```

### Naming Conventions

```typescript
// ✅ Components: kebab-case with mjo- or mjoint- prefix
@customElement("mjo-button")        // Public API components
@customElement("mjoint-list-item")  // Internal/private components

// ✅ Properties: camelCase
@property() buttonLabel?: string;
@property() startIcon?: string;

// ✅ Private properties/methods: #prefix
#uniqueId = `button-${Math.random()}`;
#handleClick() { }

// ✅ Event names: kebab-case with mjo- prefix and colon separator
"mjo-button:click"
"mjo-textfield:change"
"mjo-dropdown:open"

// ✅ CSS parts: kebab-case
part="button-container"
part="start-icon"

// ✅ CSS custom properties: --mjo- prefix, kebab-case
--mjo-button-background-color
--mjo-input-border-radius
```

## JSDoc Documentation

### Complete Example

**ONLY** for public components, never use for internal/private components (mjoint- components).

```typescript
/**
 * @summary One-line component description (required)
 * 
 * @description Optional detailed multi-line description explaining
 * component behavior, features, and usage patterns.
 * 
 * @slot - Default slot for main content
 * @slot start - Named slot for start content
 * 
 * @fires mjo-component:change - Fired when value changes
 * @fires mjo-component:focus - Fired when component gains focus
 * 
 * @csspart container - The main component container
 * @csspart input - The native input element
 * 
 * @cssprop --mjo-component-color - Text color
 * @cssprop --mjo-component-background - Background color
 */
```

### Required Elements

- **@summary**: Brief one-line description
- **@slot**: Document all slots (use `-` for default)
- **@fires**: All custom events with consistent naming
- **@csspart**: All exposed shadow parts
- **@cssprop**: All CSS custom properties with descriptions

## Event Handling

### Custom Events Pattern

```typescript
// ✅ Typed event interface in types file
export interface MjoButtonClickEvent extends CustomEvent {
    detail: {
        element: MjoButton;
        toggle?: boolean;
        originalEvent: MouseEvent;
    };
}

// ✅ Event dispatch with full typing
#dispatchClickEvent(originalEvent: MouseEvent) {
    const clickEvent: MjoButtonClickEvent = new CustomEvent("mjo-button:click", {
        detail: {
            element: this,
            toggle: this.toggle,
            originalEvent,
        },
        bubbles: true,
        composed: true,
    });
    this.dispatchEvent(clickEvent);
}

// ✅ Always include:
// - element: reference to the component
// - originalEvent: for DOM events
// - bubbles: true, composed: true
```

## CSS Styles

### Structure

```typescript
static styles = [
    css`
        /* 1. Host styles */
        :host {
            display: inline-block;
        }
        :host([fullwidth]) {
            width: 100%;
        }
        
        /* 2. Container styles */
        .container {
            /* Base styles using CSS custom properties */
            background: var(--mjo-component-background, #ffffff);
            color: var(--mjo-component-color, inherit);
        }
        
        /* 3. State variations with data attributes */
        .container[data-focused] {
            border-color: var(--mjo-primary-color);
        }
        .container[data-disabled] {
            opacity: 0.5;
        }
        
        /* 4. Size variations */
        .container[data-size="small"] {
            font-size: 0.8em;
        }
        
        /* 5. Accessibility features */
        @media (prefers-reduced-motion: reduce) {
            * {
                transition: none;
            }
        }
        @media (prefers-contrast: high) {
            .container {
                border-width: 2px;
            }
        }
    `,
];
```

### CSS Custom Properties

```typescript
// ✅ Provide fallback values
background: var(--mjo-button-background, var(--mjo-primary-color, #1aa8ed));

// ✅ Use semantic naming
--mjo-component-color           // Component-specific
--mjo-primary-color             // Global theme colors
--mjo-input-border-radius       // Input-specific tokens

// ✅ Group related properties
--mjo-button-background-color
--mjo-button-background-color-hover
--mjo-button-border-color
```

### Available Theme CSS Variables

```css
/* Design Tokens - Layout */
--mjo-radius-small, --mjo-radius-medium, --mjo-radius-large

/* Design Tokens - Typography */
--mjo-font-family
--mjo-font-size-xxsmall, --mjo-font-size-xsmall, --mjo-font-size-small, --mjo-font-size-medium, --mjo-font-size-large, --mjo-font-size-xlarge, --mjo-font-size-xxlarge
--mjo-font-size-title1, --mjo-font-size-title2, --mjo-font-size-title3
--mjo-font-weight-light, --mjo-font-weight-regular, --mjo-font-weight-medium, --mjo-font-weight-bold

/* Design Tokens - Spacing */
--mjo-space-xxsmall, --mjo-space-xsmall, --mjo-space-small, --mjo-space-medium, --mjo-space-large, --mjo-space-xlarge, --mjo-space-xxlarge

/* Theme Colors - Primary & Secondary */
--mjo-primary-color, --mjo-primary-color-hover
--mjo-primary-color-[50|100|200|300|400|500|600|700|800|900|950]
--mjo-primary-foreground-color

--mjo-secondary-color, --mjo-secondary-color-hover
--mjo-secondary-color-[50|100|200|300|400|500|600|700|800|900|950]
--mjo-secondary-foreground-color

/* Semantic Colors */
--mjo-color-white, --mjo-color-black
--mjo-color-error, --mjo-color-error-foreground
--mjo-color-success, --mjo-color-success-foreground
--mjo-color-warning, --mjo-color-warning-foreground
--mjo-color-info, --mjo-color-info-foreground
--mjo-color-default, --mjo-color-default-foreground
--mjo-color-gradient, --mjo-color-gradient1, --mjo-color-gradient2, --mjo-color-gradient3

/* Palette Colors - Each color supports shade scale [50-950] */
--mjo-color-{blue|red|green|yellow|purple|cyan|pink|gray}
--mjo-color-{color}-[50|100|200|300|400|500|600|700|800|900|950]

/* Theme Mode Variables (light/dark adaptive) */
--mjo-muted-color, --mjo-muted-color-[low|high]
--mjo-muted-foreground, --mjo-muted-foreground-[low|high]
--mjo-border-color, --mjo-border-color-[low|high]
--mjo-background-color, --mjo-background-color-hover, --mjo-background-color-[low|high]
--mjo-background-color-card, --mjo-background-color-card-[low|high]
--mjo-foreground-color, --mjo-foreground-color-[low|high]
--mjo-box-shadow-[1|2|3|4|5]
--mjo-disabled-color, --mjo-disabled-foreground-color
```

## Accessibility

### ARIA Attributes

```typescript
render() {
    return html`
        <button
            role="button"
            tabindex=${this.disabled ? -1 : 0}
            aria-label=${ifDefined(this.buttonLabel)}
            aria-describedby=${ifDefined(this.describedBy)}
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-pressed=${ifDefined(this.toggleable ? (this.pressed ? "true" : "false") : undefined)}
        >
            <slot></slot>
        </button>
    `;
}
```

### Focus Management

**ONLY** when applicable and necessary for accessible components or interactive elements that require programmatic focus control.

```typescript
// ✅ Provide focus() and blur() methods
focus(options?: FocusOptions) {
    this.shadowRoot?.querySelector("button")?.focus(options);
}

blur() {
    this.shadowRoot?.querySelector("button")?.blur();
}

// ✅ Handle keyboard navigation
#handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.#handleClick();
    }
}
```

## Lifecycle Methods

```typescript
connectedCallback(): void {
    super.connectedCallback();
    // Setup: event listeners, initial state
}

disconnectedCallback(): void {
    super.disconnectedCallback();
    // Cleanup: remove event listeners
}

protected firstUpdated(_changedProperties: PropertyValues<this>): void {
    super.firstUpdated(_changedProperties);
    // After first render: DOM queries, initial setup
}

protected updated(_changedProperties: PropertyValues<this>): void {
    super.updated(_changedProperties);
    
    // React to property changes
    if (_changedProperties.has("color")) {
        // ... do something when color changes
    }
}
```

## Mixin Usage

### ThemeMixin Pattern

```typescript
// ✅ Import interface and implementation
import { ThemeMixin, type IThemeMixin } from "./mixins/theme-mixin.js";

// ✅ Apply mixin and implement interface
export class MjoComponent extends ThemeMixin(LitElement) implements IThemeMixin {
    render() {
        return html`
            ${this.applyThemeSsr()}
            <!-- Component template -->
        `;
    }
}
```

### FormMixin Pattern

```typescript
// ✅ Chain mixins: ThemeMixin(FormMixin(LitElement))
export class MjoTextfield 
    extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) 
    implements IThemeMixin, IInputErrorMixin, IFormMixin 
{
    connectedCallback(): void {
        super.connectedCallback();
        this.updateFormData({ name: this.name || "", value: this.value });
    }
}
```

## Template Patterns

### Conditional Rendering

```typescript
// ✅ Use nothing for no output
import { nothing } from "lit";

${this.label ? html`<label>${this.label}</label>` : nothing}

// ✅ Use boolean attributes with ?
<button ?disabled=${this.disabled}>Click</button>
```

### Directives

```typescript
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from "lit/directives/class-map.js";

// ifDefined: only set attribute if value exists
<input aria-label=${ifDefined(this.ariaLabel)}>

// live: two-way binding for input values
<input .value=${live(this.value)}>

// repeat: efficient list rendering with keys
${repeat(this.items, (item) => item.id, (item) => html`...`)}

// classMap: conditional classes
<div class=${classMap({ active: this.isActive })}>
```

## Type Definitions

### Component Types File

```typescript
// types/mjo-component.d.ts
import type { MjoComponent } from "../mjo-component";

// Enums as union types
export type MjoComponentSize = "small" | "medium" | "large";
export type MjoComponentColor = "primary" | "secondary";

// Event interfaces
export interface MjoComponentChangeEvent extends CustomEvent {
    detail: {
        element: MjoComponent;
        value: string;
        previousValue: string;
    };
}
```

## Constraints

- **NEVER** use `import` without `type` keyword for type-only imports
- **NEVER** omit `.js` extension on internal project imports in `src` when not importing types
- **ALWAYS** prefix private properties/methods with `#`
- **ALWAYS** use kebab-case for custom events with `mjo-` prefix
- **ALWAYS** include `bubbles: true, composed: true` for custom events when applicable
- **ALWAYS** provide `focus()` and `blur()` methods for interactive components when applicable
- **ALWAYS** include accessibility features (@media prefers-reduced-motion, prefers-contrast)
- **ALWAYS** document all public APIs with JSDoc
- **ALWAYS** call `super` in lifecycle methods before custom logic
