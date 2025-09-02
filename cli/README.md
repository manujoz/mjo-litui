# mjo-litui CLI Tools

Command line interface for mjo-litui components library.

## Installation

The CLI tools are automatically available when you install mjo-litui:

```bash
npm install mjo-litui
```

## Commands

### `create-theme`

Create a custom theme CSS file with personalized colors and automatic color scale generation.

```bash
npx mjo-litui create-theme
```

#### Features

-   **Interactive Prompts**: Guides you through selecting your theme colors
-   **OKLCH Color Science**: Uses modern OKLCH color space for better color perception
-   **Automatic Color Scales**: Generates complete color palettes (50-950) from base colors
-   **Contrast Calculation**: Automatically calculates optimal foreground colors for accessibility
-   **Custom Output Path**: Choose where to save your theme file

#### Usage

1. Run the command:

    ```bash
    npx mjo-litui create-theme
    ```

2. Follow the interactive prompts:

    - **Primary Color**: Your main brand color (hex format, e.g., `#3b82f6`)
    - **Secondary Color**: Your accent color (hex format, e.g., `#8b5cf6`)
    - **Success Color**: Color for success states (default: `#10b981`)
    - **Error Color**: Color for error states (default: `#ef4444`)
    - **Warning Color**: Color for warning states (default: `#f59e0b`)
    - **Info Color**: Color for info states (default: `#3b82f6`)
    - **Output Path**: Where to save the theme file (default: `./mjo-theme.css`)

3. The CLI will generate:
    - Complete color scales for primary and secondary colors
    - Alpha transparency variants
    - Proper foreground colors for accessibility
    - Both light and dark theme variables

#### Example Output

```css
:root {
    --mjo-primary-color: #3b82f6;
    --mjo-primary-foreground-color: #ffffff;
    --mjo-primary-color-50: #eff6ff;
    --mjo-primary-color-100: #dbeafe;
    /* ... complete color scale ... */

    --mjo-secondary-color: #8b5cf6;
    --mjo-secondary-foreground-color: #ffffff;
    /* ... complete secondary palette ... */
}

.dark {
    /* Dark theme variants */
}
```

#### Integration

Import and use your generated theme:

```html
<!-- Import the generated theme -->
<link rel="stylesheet" href="./mjo-theme.css" />

<!-- Wrap your app with mjo-theme -->
<mjo-theme>
    <your-app></your-app>
</mjo-theme>
```

Or use with a specific theme configuration:

```html
<mjo-theme theme="custom">
    <your-app></your-app>
</mjo-theme>
```

#### Color Science

The CLI uses the OKLCH color space for color generation, which provides:

-   **Perceptual uniformity**: Colors that look equally spaced to human eyes
-   **Better interpolation**: Smoother gradients and scales
-   **Accessibility**: Better contrast ratios and color accessibility

#### Dependencies

-   `culori`: For OKLCH color space calculations and color scale generation
-   `inquirer`: For interactive CLI prompts
-   `commander`: For CLI command structure

## Development

The CLI source code is located in the `cli/` directory:

```
cli/
├── bin/
│   └── mjo-litui.js          # Main executable entry point
├── commands/
│   └── create-theme.js       # Theme creation command
├── utils/
│   ├── color-generator.js    # OKLCH color utilities
│   └── prompts.js           # Interactive prompt definitions
├── templates/
│   └── theme.css.template   # CSS template with placeholders
└── .eslintrc.js            # CLI-specific ESLint config
```

The CLI tools are built and distributed alongside the main library components.

## Contributing

When contributing to CLI tools:

1. Follow the existing code style and patterns
2. CLI files allow `console.log` statements (configured in `cli/.eslintrc.js`)
3. Use OKLCH color science for any color-related utilities
4. Maintain compatibility with the main library theming system
5. Test CLI commands manually and ensure proper error handling
