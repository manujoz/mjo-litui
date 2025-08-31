---
applyTo: "**"
---

# Agent Memory and Behavioral Rules for mjo-litui

## Critical Rules to ALWAYS Follow

### 🚫 NEVER CREATE TASKS AUTOMATICALLY

-   **NEVER** use `create_and_run_task` to add new tasks to `.vscode/tasks.json`
-   The user already has all necessary tasks configured
-   If you think a new task is needed, ASK the user first
-   Use existing tasks from the workspace or direct terminal commands only

### 🚫 NEVER RUN `tsc` COMMANDS

-   **NEVER** run `tsc --noEmit` or any TypeScript compiler checks
-   The project configuration causes TypeScript to give false errors
-   Instead of TypeScript checks: **ALWAYS use `npm run build`**
-   Building is the correct way to validate TypeScript in this project
-   If build passes, TypeScript is valid - don't second-guess it

### 🚫 NEVER IGNORE PREVIOUS INSTRUCTIONS

-   **ALWAYS** check for existing `.github/instructions/*.md` files before proceeding
-   **ALWAYS** read and follow the testing instructions in `tests.instructions.md`
-   **ALWAYS** respect user preferences stated in previous conversations
-   When losing context, **ASK** for clarification rather than assuming

### ✅ CORRECT VALIDATION WORKFLOW

1. **For TypeScript validation**: Use `npm run build` ONLY
2. **For testing**: Use existing tasks or direct `npx web-test-runner` commands
3. **For new functionality**: ASK before creating tasks or making assumptions
4. **When in doubt**: ASK the user for guidance

### ✅ EXISTING TASK USAGE

-   Use `run_task` with existing task IDs from the workspace
-   Common valid tasks: "Build Full Application", "Complete Test Suite Verification"
-   Check available tasks before creating new ones

## User Preferences

-   Prefers Spanish communication for discussions
-   Prefers English for all code, comments, and documentation
-   Values following established patterns over improvisation
-   Wants to be consulted before major changes or new task creation
-   NEVER write code without asking first.

## Project Context

-   Web Components library `mjo-litui` built with Lit 3, TypeScript, Vite
-   Uses web-test-runner for testing with Playwright browsers
-   Has specific build configuration that makes direct TypeScript checks unreliable
-   Build process is the source of truth for TypeScript validation

## Behavioral Patterns to Avoid

-   Creating tasks automatically without permission
-   Running TypeScript compiler directly instead of building
-   Ignoring established project patterns
-   Making assumptions when context is unclear
-   Adding complexity where simplicity exists
