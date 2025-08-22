# Build Process

This document describes the build process for the mjo-litui library, including the new JavaScript minification step.

## Build Scripts

### `npm run build` (Default - Minified)

Compiles TypeScript and minifies all JavaScript files:

```bash
npm run build
```

This runs:

1. `tsc -p tsconfig.build.json` - TypeScript compilation
2. File copying (types, package.json, .npmignore, README.md)
3. `npm run build:minify` - JavaScript minification with Terser

### `npm run build:unminified` (Development)

Compiles without minification for debugging:

```bash
npm run build:unminified
```

### `npm run build:minify` (Minification Only)

Runs only the minification step on existing dist files:

```bash
npm run build:minify
```

Add `--verbose` or `-v` flag for detailed minification logs:

```bash
npm run build:minify -- --verbose
```

## Minification Configuration

The minification process uses **Terser** with the following optimized settings for web components:

### Key Features:

-   ✅ **ES Module support** (`module: true`)
-   ✅ **Preserves class names** (essential for custom elements)
-   ✅ **Keeps console.log statements** (for debugging)
-   ✅ **Minifies private properties** (starting with `_`)
-   ✅ **Reserved identifiers** for web component APIs
-   ✅ **Two optimization passes** for better compression

### Reserved Identifiers:

-   `customElements`
-   `HTMLElement`
-   `LitElement`
-   `CSSResult`

### Configuration Details:

```javascript
{
  module: true,
  compress: {
    drop_console: false,    // Keep console statements
    drop_debugger: false,   // Keep debugger statements
    passes: 2,              // Two passes for better optimization
  },
  mangle: {
    keep_classnames: true,  // Essential for web components
    keep_fnames: false,     // Minify private function names
    properties: {
      regex: /^_/           // Minify private properties
    }
  }
}
```

## File Structure

The build process maintains the exact same directory structure in `dist/`:

```
dist/
├── *.js (minified)           # Main component files
├── *.d.ts                    # TypeScript definitions
├── *.d.ts.map               # Source maps for definitions
├── components/              # Component subdirectories
├── controllers/             # Controller files
├── mixins/                  # Mixin files
├── theme/                   # Theme files
├── types/                   # Type definitions
├── utils/                   # Utility files
└── ...
```

## Performance Impact

### File Size Reduction

-   **Typical reduction: 40-60%** of original file size
-   **84 files processed** in ~2.3 seconds on standard hardware
-   **No runtime performance impact** - only reduces download size

### Before vs After Example

```javascript
// Before (readable)
export class MjoAccordion extends ThemeMixin(LitElement) {
    constructor() {
        super(...arguments);
        this.variant = "light";
        // ... more code
    }
}

// After (minified)
let m = class extends l(LitElement) {
    constructor() {
        super(...arguments), (this.variant = "light"); /*...*/
    }
};
```

## Development Workflow

### For Library Development:

```bash
npm run build:unminified  # Better for debugging
npm run test              # Run tests on unminified code
```

### For Production/Publishing:

```bash
npm run build            # Full minified build
npm run build:publish    # Build + publish to npm
```

## Troubleshooting

### If minification fails:

1. Check that `terser` is installed: `npm list terser`
2. Run with verbose flag: `npm run build:minify -- --verbose`
3. Check for syntax errors in source files
4. Ensure all private methods use `#` prefix or `_` naming

### If web components break after minification:

-   Check that class names are preserved
-   Verify custom element registration names
-   Ensure event names and properties are not mangled

## Technical Details

The minification script (`scripts/minify-dist.js`):

-   **Recursively processes** all `.js` files in `dist/`
-   **Preserves directory structure**
-   **Handles ES modules** correctly
-   **Error handling** with detailed reporting
-   **Progress tracking** and performance metrics
