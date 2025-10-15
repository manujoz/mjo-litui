# Copilot Instructions for mjo-litui

## Project Overview

Web component library based on Lit and TypeScript for use in modern web projects. It provides a collection of reusable and customizable components for building attractive and functional user interfaces.

## 🚫 CRITICAL RULES - NEVER BREAK THESE

### Languages
- Always talk to me in spanish
- All content, code, comments, file names, git commits MUST be in English
- No Spanish text anywhere in the codebase  

## File Structure

```
dev/                        # Development client side rendered with Vite
└── components/             # Reusable components for dev server site and library components examples
    ├── examples/           # Examples of library components
    │   ├── button/         # mjo-button component examples
    │   ├── radio/          # mjo-radio component examples
    │   └── ...             # Other component examples
    ├── control-group.ts    # Reusable component to group form controls
    ├── playground-grid.ts  # Playground grid layout component
    └── ...                 # Other reusable components
docs/                       # Library components documentation
├── README.md               # Documentation homepage
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE.md              # License information
├── build-process.md        # Build process documentation
├── getting-started.md      # Getting started documentation
├── mjo-accordion.md        # mjo-accordion component documentation
├── mjo-button.md           # mjo-button component documentation
└── ...                     # Other component documentation files
scripts/                    # Scripts for building and publishing the library
├── minify-css.js           # Script to minify CSS files
└── minify-dist.js          # Script to minify distribution files
server/                     # Development server side rendered with node/express and nodemon
├── client/                 # Scripts and modules for the server client
├── public/                 # Public assets for the server client
│   ├── css/                # CSS files
│   └── js/                 # JavaScript files built from server/client
├── src/                    # Source files for the server
│   ├── controllers/        # Controllers for rendering pages
│   ├── lib/                # Business logic
│   ├── pages/              # Static pages
│   ├── services/           # Services for ssr and components discovery
│   ├── utils/              # Utility functions and routes
│   ├── app.ts              # Express app setup
│   ├── cache-manager.ts    # Cache management for server-side rendering
│   └── ...                 # Other source files
├── templates/              # EJS templates for server-side rendering
└── tsconfig.json           # TypeScript configuration file for the server side site
src/
├── components/             # Dependent components for library components
│   ├── accordion/          # mjo-accordion dependent components
│   ├── calendar/           # mjo-calendar dependent components
│   ├── drawer/             # mjo-drawer dependent components
│   └── ...                 # Other library dependent components
├── controllers/            # Lit controllers for reusable logic in components
├── lib/                    # Bussines logic functions
├── locales/                # Localization files
├── mixins/                 # Mixins for reusable styles and logic
├── styles/                 # Global styles and design tokens for cli
├── theme/                  # Theme helper functions as default-theme
├── types/                  # Types and interface for each component
├── utils/                  # Utility functions and helpers
├── index.ts                # Library entry point with exports
├── mjo-accordion.ts        # mjo-accordion component
├── mjo-calendar.ts         # mjo-calendar component
├── mjo-drawer.ts           # mjo-drawer component
└── ...                     # Other library components
tests/
├── components/             # Tests for library components  
│   ├── mjo-avatar.test.ts  # Tests for mjo-avatar component
│   ├── mjo-button.test.ts  # Tests for mjo-button component
│   └── ...                 # Other component tests
├── fixtures/               # Test fixtures
├── helpers/                # Test helpers
├── unit/                   # Unit tests for business logic
├── utils/                  # Tests for utility functions
└── README.md               # Testing instructions
```

## Key Commands

### Development

```bash
npm run dev                 # Start the client-side rendered development server with Vite
npm run server:dev          # Start the server-side rendered development server with nodemon
npm run server:dev:debug    # Start the server-side rendered development server with nodemon in debug mode
```

### Build

```bash
npm run build               # Build the library and the dev server site
npm run build:minify        # Minify the built library files
npm run build:minify-css    # Minify only the CSS files in the built library
npm run build:unminified    # Build the library without minification
npm run server:build:client # Build only the client-side rendered dev server site
```

### Linting and Formatting

```bash
npm run lint                # Run ESLint to lint the codebase
npm run lint:fix            # Run ESLint to lint and fix issues in the codebase
```

### Testing

```bash
npm run test                # Build and run the test suite
npm run test:file           # Run the test for a specific file
npm run test:file:nobuild   # Run the test for a specific file without building the project first
npm run test:coverage       # Generate test coverage report
npm run test:watch          # Run the test suite in watch mode
```