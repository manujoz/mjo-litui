---
title: Update ESLint to version 9 and migrate to flat config
version: 1.0
date_created: 2025-11-01
last_updated: 2025-11-01
jira_issue: MJOLIT-131
---

# Implement Plan: Update ESLint to version 9 and migrate to flat config

This plan covers the migration from ESLint v8.56.0 with legacy `.eslintrc.json` configuration to ESLint v9.x with the new flat config format (`eslint.config.js`). The migration ensures improved performance, better tooling integration, and prepares the project for future updates as ESLint 8.x is no longer actively maintained.

## Architecture and design

### Current State

- **ESLint version**: 8.56.0
- **Configuration format**: Legacy `.eslintrc.json`
- **Parser**: @typescript-eslint/parser v6.19.0
- **Key plugins**:
    - @typescript-eslint/eslint-plugin v6.19.0
    - eslint-plugin-lit v1.11.0
    - eslint-plugin-wc v2.0.4
    - eslint-plugin-prettier v5.1.3
    - eslint-plugin-lit-a11y v4.1.1
    - eslint-plugin-storybook v0.8.0
- **Shared configs**:
    - eslint-config-standard v17.1.0 (NOT compatible with ESLint 9)
    - eslint-config-prettier v9.1.0

### Target State

- **ESLint version**: 9.x (latest stable)
- **Configuration format**: Flat config (`eslint.config.js`)
- **Parser**: @typescript-eslint/parser v8.x
- **Updated plugins**: All plugins updated to ESLint 9 compatible versions
- **Shared configs**: Replace eslint-config-standard with @eslint/js recommended rules

### Design Principles

1. **Preserve existing rules**: All current linting rules must remain functional
2. **Incremental migration**: Update packages in stages to isolate issues
3. **Backward compatibility**: Ensure no breaking changes to the codebase
4. **Testing-first**: Validate each migration step with `npm run lint`

### Flat Config Structure

The new `eslint.config.js` will use ES modules syntax with the following structure:

- Global configuration object with `languageOptions`, `plugins`, and `rules`
- Separate configuration objects for file-specific overrides (test files, CLI scripts)
- Explicit file patterns using `files` and `ignores` properties
- Direct plugin imports instead of string-based references

## Technologies and tools

### Core Dependencies

- **ESLint**: 9.x (upgrade from 8.56.0)
- **@typescript-eslint/parser**: 8.x (upgrade from 6.19.0)
- **@typescript-eslint/eslint-plugin**: 8.x (upgrade from 6.19.0)

### Plugins to Update

- **eslint-plugin-lit**: Check for v2.x or latest compatible version
- **eslint-plugin-wc**: Check for v3.x or latest compatible version
- **eslint-plugin-prettier**: Likely compatible, verify latest version
- **eslint-plugin-lit-a11y**: Check for latest compatible version
- **eslint-plugin-storybook**: Check for latest compatible version

### Config Packages

- **@eslint/js**: NEW - provides recommended rules to replace eslint-config-standard
- **eslint-config-prettier**: Update to latest version compatible with ESLint 9
- **Remove**: eslint-config-standard (not compatible with ESLint 9)

### Supporting Tools

- **Node.js**: >=18.0.0 (already required)
- **npm**: >=8.0.0 (already required)
- **TypeScript**: 5.2.2 (no change required)

## Relevant Routes and files

### Files to Modify

- `.eslintrc.json` - Will be DELETED after migration
- `package.json` - Update all ESLint-related dependencies
- `README.md` - Update any references to ESLint configuration (if present)
- `docs/` - Update documentation about linting setup (if present)

### Files to Create

- `eslint.config.js` - NEW flat config file in project root

### Files to Review

- `src/**/*.ts` - All TypeScript source files (for linting validation)
- `src/**/*.js` - All JavaScript source files (for linting validation)
- `test/**/*.ts` - Test files with special rule overrides
- `cli/**/*.js` - CLI scripts with special rule overrides
- `.prettierrc.json` - Ensure Prettier integration still works
- `commitlint.config.cjs` - Verify no conflicts with ESLint updates

### Ignored Paths (to preserve)

- `dist/`
- `node_modules/`
- `dev/`
- `test/`
- `server/`
- `.eslintrc.json` (during migration)
- `commitlint.config.js`

## Tasks

### Phase 1: Research and Preparation

- [ ] **Task 1.1**: Research ESLint v9 migration guide and breaking changes
    - Read official ESLint v9 migration guide
    - Document all breaking changes that affect this project
    - Identify deprecated features currently in use

- [ ] **Task 1.2**: Verify plugin compatibility with ESLint v9
    - Check eslint-plugin-lit release notes for ESLint 9 support
    - Check eslint-plugin-wc release notes for ESLint 9 support
    - Check eslint-plugin-prettier compatibility
    - Check eslint-plugin-lit-a11y compatibility
    - Check eslint-plugin-storybook compatibility
    - Document required version updates for each plugin

- [ ] **Task 1.3**: Research eslint-config-standard alternative
    - Research @eslint/js recommended configuration
    - Identify which standard rules need to be manually configured
    - Document the mapping from eslint-config-standard to new setup

### Phase 2: Package Updates

- [ ] **Task 2.1**: Update ESLint core package
    - Update `eslint` from 8.56.0 to 9.x in package.json
    - Run `npm install` to install new version
    - Verify installation successful

- [ ] **Task 2.2**: Update TypeScript ESLint packages
    - Update `@typescript-eslint/parser` from v6.19.0 to v8.x
    - Update `@typescript-eslint/eslint-plugin` from v6.19.0 to v8.x
    - Run `npm install`
    - Verify no installation conflicts

- [ ] **Task 2.3**: Update all ESLint plugins
    - Update `eslint-plugin-lit` to latest compatible version
    - Update `eslint-plugin-wc` to latest compatible version
    - Update `eslint-plugin-prettier` to latest compatible version
    - Update `eslint-plugin-lit-a11y` to latest compatible version
    - Update `eslint-plugin-storybook` to latest compatible version
    - Run `npm install`

- [ ] **Task 2.4**: Update config packages
    - Add `@eslint/js` package (new dependency)
    - Update `eslint-config-prettier` to latest version
    - Remove `eslint-config-standard` from package.json
    - Run `npm install`

### Phase 3: Configuration Migration

- [ ] **Task 3.1**: Create initial eslint.config.js file
    - Create new `eslint.config.js` in project root
    - Add ES module imports for all plugins
    - Import @typescript-eslint/parser
    - Import @eslint/js for recommended rules

- [ ] **Task 3.2**: Configure global settings
    - Set up `languageOptions` with parser and parser options
    - Configure `languageOptions.ecmaVersion` and `languageOptions.sourceType`
    - Set up `languageOptions.globals` for browser, node, es2020
    - Configure `languageOptions.parserOptions` for TypeScript

- [ ] **Task 3.3**: Configure plugins
    - Add all plugins to the configuration object
    - Use direct imports instead of string references
    - Ensure proper plugin naming in flat config format
    - Configure plugin-specific settings if needed

- [ ] **Task 3.4**: Migrate core rules
    - Copy all rules from .eslintrc.json to eslint.config.js
    - Ensure rules use correct plugin prefixes in flat config
    - Preserve all custom rule configurations
    - Include prettier rules integration

- [ ] **Task 3.5**: Migrate Lit-specific rules
    - Copy all `lit/*` rules from .eslintrc.json
    - Ensure correct plugin reference in flat config
    - Preserve error levels and options for each rule

- [ ] **Task 3.6**: Migrate Web Components rules
    - Copy all `wc/*` rules from .eslintrc.json
    - Ensure correct plugin reference in flat config
    - Preserve file-name-matches-element rule with kebab transform

- [ ] **Task 3.7**: Configure file patterns and ignores
    - Set `files: ["src/**/*.ts", "src/**/*.js"]` for main config
    - Add `ignores` array with: dist, node_modules, dev, test, server, .eslintrc.json, commitlint.config.js
    - Verify ignore patterns match legacy configuration

- [ ] **Task 3.8**: Create override configuration for test files
    - Create separate config object for `**/*.test.ts`, `**/*.spec.ts`, `test/**/*.ts`
    - Disable `lit/no-complex-attribute-binding` for test files
    - Ensure proper extends of base config rules

- [ ] **Task 3.9**: Create override configuration for CLI files
    - Create separate config object for `cli/**/*.js`
    - Disable `no-console`, `quotes`, and `semi` rules for CLI scripts
    - Ensure proper extends of base config rules

### Phase 4: Testing and Validation

- [ ] **Task 4.1**: Initial linting test
    - Run `npm run lint` with new configuration
    - Document any errors or warnings
    - Verify errors are genuine issues, not configuration problems

- [ ] **Task 4.2**: Fix configuration issues
    - Address any plugin loading errors
    - Fix any rule configuration errors
    - Ensure proper file pattern matching
    - Verify ignore patterns work correctly

- [ ] **Task 4.3**: Validate against src/ directory
    - Run linting specifically on `src/**/*.ts`
    - Ensure all TypeScript files are checked
    - Verify no new violations introduced
    - Confirm existing issues still detected

- [ ] **Task 4.4**: Validate test file overrides
    - Run linting on test files
    - Verify `lit/no-complex-attribute-binding` is disabled for tests
    - Ensure other rules still apply to test files

- [ ] **Task 4.5**: Validate CLI overrides
    - Run linting on CLI files
    - Verify console.log statements are allowed
    - Verify quote and semicolon rules are disabled
    - Ensure other rules still apply to CLI files

- [ ] **Task 4.6**: Test auto-fix functionality
    - Run `npm run lint:fix`
    - Verify auto-fixable issues are corrected
    - Ensure no incorrect fixes applied
    - Check that code style remains consistent

- [ ] **Task 4.7**: Validate specific rule categories
    - Test max-len rule (160 character limit)
    - Test lit-specific rules (binding-positions, no-invalid-html, etc.)
    - Test wc-specific rules (tag-name-matches-class, file-name-matches-element)
    - Test prettier integration rules

- [ ] **Task 4.8**: Cross-check against existing violations
    - Identify known linting issues in current codebase
    - Verify those same issues are still detected with new config
    - Ensure no false positives introduced
    - Confirm no genuine issues are missed

### Phase 5: Cleanup and Documentation

- [ ] **Task 5.1**: Remove legacy configuration
    - Delete `.eslintrc.json` file
    - Verify linting still works without legacy file
    - Ensure no tooling dependencies on old config

- [ ] **Task 5.2**: Update package.json scripts (if needed)
    - Verify `npm run lint` works with new config
    - Verify `npm run lint:fix` works with new config
    - Update script commands if necessary for ESLint 9

- [ ] **Task 5.3**: Update documentation
    - Update README.md with ESLint v9 information
    - Document new flat config approach
    - Add migration notes for future reference
    - Update any developer setup guides

- [ ] **Task 5.4**: Final validation
    - Run full linting test on entire codebase
    - Run `npm run build` to ensure no build issues
    - Run `npm run test` to ensure tests still pass
    - Verify CI/CD pipeline compatibility (if applicable)

- [ ] **Task 5.5**: Git commit
    - Stage all changes (package.json, package-lock.json, eslint.config.js, deleted .eslintrc.json)
    - Create commit with message: `build(MJOLIT-131): update eslint to v9 and migrate to flat config`
    - Push changes to fix/MJOLIT-131 branch

## Risk Management and Mitigation

### Risk 1: Plugin Incompatibility

**Description**: One or more plugins may not have ESLint v9 support yet.
**Likelihood**: Medium
**Impact**: High - Could block entire migration
**Mitigation Strategy**:

- Research all plugins BEFORE starting package updates (Task 1.2)
- Check official plugin repositories for ESLint 9 support announcements
- Identify alternative plugins if necessary
- Consider temporarily removing non-essential plugins if no compatible version exists
- Document any plugin removed with justification for future re-addition

### Risk 2: Breaking Changes in Plugin Rules

**Description**: Updated plugins may have breaking changes in rule behavior or configuration.
**Likelihood**: Medium
**Impact**: Medium - May require code changes or rule adjustments
**Mitigation Strategy**:

- Read release notes and migration guides for each plugin update
- Test linting incrementally after each plugin update
- Document any rule behavior changes
- Adjust rule configurations as needed to match previous behavior
- Use git to track changes and enable easy rollback

### Risk 3: eslint-config-standard Replacement

**Description**: Replacing eslint-config-standard may miss important rules or introduce inconsistencies.
**Likelihood**: Low
**Impact**: Medium - Could change code style enforcement
**Mitigation Strategy**:

- Thoroughly research @eslint/js recommended rules (Task 1.3)
- Compare current violations with violations after migration
- Manually add any missing standard rules to flat config
- Run extensive linting tests on entire codebase
- Review git diff carefully before committing changes

### Risk 4: Flat Config Syntax Errors

**Description**: New flat config syntax is significantly different and prone to configuration errors.
**Likelihood**: High
**Impact**: Medium - Could prevent linting from running
**Mitigation Strategy**:

- Reference official ESLint flat config documentation extensively
- Test configuration incrementally (one section at a time)
- Use ESLint's config validation if available
- Keep legacy .eslintrc.json until new config fully validated
- Test with small file subsets before running on entire codebase

### Risk 5: CI/CD Pipeline Impact

**Description**: ESLint version change may break automated linting in CI/CD pipelines.
**Likelihood**: Low
**Impact**: Medium - Could block deployments
**Mitigation Strategy**:

- Verify package-lock.json is committed with exact versions
- Test locally in clean environment (simulate CI)
- Check CI/CD configuration for any ESLint version constraints
- Update CI/CD configuration if needed before merging
- Monitor first CI/CD run closely after merge

### Risk 6: Performance Degradation

**Description**: While ESLint 9 is generally faster, specific configurations may cause performance issues.
**Likelihood**: Low
**Impact**: Low - Slower linting times
**Mitigation Strategy**:

- Benchmark linting time before and after migration
- Monitor performance on large files
- Adjust file patterns or caching if performance issues arise
- Consider using ESLint's cache option if needed

### Risk 7: Prettier Integration Issues

**Description**: Prettier plugin may have conflicts with ESLint 9 or flat config format.
**Likelihood**: Low
**Impact**: Medium - Code formatting inconsistencies
**Mitigation Strategy**:

- Verify eslint-plugin-prettier has ESLint 9 support
- Test prettier rules specifically after migration
- Ensure eslint-config-prettier properly disables conflicting rules
- Run `npm run lint:fix` on test files to verify formatting
- Keep .prettierrc.json unchanged to maintain consistency

## Open Questions

1. **Plugin Compatibility Timeline**: Are there any plugins that don't yet have ESLint 9 support? If so, what are the alternatives or workarounds?

2. **eslint-config-standard Parity**: Does @eslint/js recommended configuration provide all the same rules as eslint-config-standard, or do we need to manually add specific standard rules?

3. **TypeScript Parser Options**: Are there any breaking changes in @typescript-eslint/parser v8.x that require parser option adjustments in the flat config?

4. **Test Framework Integration**: Does the test runner (@web/test-runner) have any specific ESLint version requirements or limitations?

5. **Storybook Plugin**: Is eslint-plugin-storybook actually being used in the codebase, or can it be safely removed during this migration?

6. **Lit-a11y Updates**: Does eslint-plugin-lit-a11y have any new recommended rules in its ESLint 9 compatible version that we should enable?

7. **CLI Specific Config**: Should the CLI scripts continue to use separate rule overrides, or should we consider a separate eslint.config.js in the cli/ directory?

8. **Commit Linting Impact**: Does the ESLint update affect commitlint or husky integration in any way?

9. **Editor Integration**: Will VS Code and other editors automatically detect and use the new eslint.config.js format, or do developers need to update their editor configurations?

10. **Migration Validation**: What is the best way to ensure 100% parity with the old configuration - should we lint the codebase before and after migration and compare outputs?
