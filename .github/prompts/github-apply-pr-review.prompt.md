---
mode: Github Worker
model: Claude Sonnet 4.5 (copilot)
description: Apply PR review corrections by analyzing reviewer comments and implementing requested changes
---

#file:../instructions/github-pr.instructions.md

# Apply Pull Request Review Corrections

Your mission is to analyze reviewer comments on a pull request and apply the requested corrections using the `github` MCP tools, following project conventions.

## Workflow

1. **Identify the PR**
   - Get PR number from user or detect from current branch
   - Fetch PR details using `github` tool
   - Verify PR is open and has review comments

2. **Analyze review comments**
   - Fetch all review comments (inline and general)
   - Group comments by file and concern type
   - Identify blocking vs. optional changes
   - Extract actionable items from each comment

3. **Categorize feedback**
   - **Code changes**: Logic, syntax, refactoring
   - **Style/formatting**: Linting, conventions, naming
   - **Documentation**: Comments, README, type definitions
   - **Tests**: Missing coverage, test improvements
   - **Architecture**: Design patterns, structure concerns

4. **Plan corrections**
   - List all required changes
   - Estimate scope (small/medium/large)
   - Identify dependencies between changes
   - Show plan to user for confirmation

5. **Apply changes systematically**
   - Work through each comment in order
   - Make precise edits using appropriate tools
   - Test changes locally if applicable
   - Commit with descriptive messages following convention

6. **Verify completion**
   - Check all review threads addressed
   - Run lint/tests if applicable
   - Push changes to PR branch
   - Report status to user

## Comment Analysis

**Extract from each review comment:**
- **File/line**: Where the issue is
- **Type**: What kind of change (code/style/docs/test)
- **Priority**: Blocking (must fix) vs. optional (nice-to-have)
- **Action**: Specific change requested
- **Reason**: Why the change is needed (if provided)

**Group related comments:**
- Same file → batch edits
- Same concern across files → systematic fix
- Related refactoring → coordinated changes

## Commit Strategy

**Follow project commit convention:**
```
type(MJOLIT-XXX): action description from review

- Address reviewer comment: [brief description]
- [Additional context if needed]
```

**Types by change category:**
- Code logic → `fix` or `refactor`
- Style/formatting → `style`
- Documentation → `docs`
- Tests → `test`
- Build/config → `build`

**Examples:**
- `fix(MJOLIT-123): resolve null check in authentication handler`
- `style(MJOLIT-123): apply consistent naming to button variants`
- `docs(MJOLIT-123): update API documentation per review feedback`

## User Confirmation Points

**Before starting** (show summary):
```
📋 PR Review Corrections Plan

PR: #123 - [Title]
Reviewers: [Names]
Total comments: X

Changes required:
- Code: X comments (files: [list])
- Style: X comments (files: [list])
- Docs: X comments (files: [list])
- Tests: X comments (files: [list])

Estimated scope: [Small/Medium/Large]

Proceed with corrections? (yes/no)
```

**After each significant change** (if scope is Large):
- Show what was changed
- Ask if user wants to continue or review

## Change Application

**For code changes:**
1. Read the file context around the comment location
2. Understand the current implementation
3. Apply the specific fix requested
4. Verify syntax and logic are correct
5. Check for side effects in related code

**For style changes:**
1. Identify the pattern to fix
2. Apply consistently across all instances
3. Run formatter/linter if available
4. Verify no functional changes occurred

**For documentation changes:**
1. Update relevant docs (comments, README, types)
2. Ensure clarity and completeness
3. Maintain consistent tone and format
4. Verify examples are accurate

**For test changes:**
1. Add missing test cases
2. Update existing tests as requested
3. Verify tests pass locally if possible
4. Ensure adequate coverage

## Handling Comment Threads

**If comment is unclear:**
- Reply in GitHub requesting clarification
- Wait for reviewer response
- Do not guess intent

**If change conflicts with another:**
- Document the conflict
- Ask user for prioritization
- Suggest alternative approach if applicable

**If change requires architectural decision:**
- Summarize the concern
- Present options with trade-offs
- Request user or team decision
- Document chosen approach

## After Corrections

**Report to user:**
```
✅ Review Corrections Applied

PR: #123 - [Title]
Link: [PR URL]

Changes applied:
✅ Code: [X corrections in Y files]
✅ Style: [X corrections in Y files]
✅ Docs: [X updates]
✅ Tests: [X additions/updates]

Commits pushed: X
Branch: [branch-name]

Remaining comments: [X unresolved - reasons listed below]

Next steps:
- Review changes on GitHub
- Request re-review from reviewers
- [Additional context if needed]
```

**For each unresolved comment:**
- Explain why it wasn't addressed
- Suggest next steps (needs clarification, architectural decision, etc.)

## Constraints

- **NEVER** apply changes without analyzing the comment context
- **NEVER** make changes that alter functionality unless explicitly requested
- **NEVER** resolve comment threads in GitHub (reviewers should do this)
- **NEVER** push changes without committing with proper message
- **ALWAYS** follow project commit convention for correction commits
- **ALWAYS** verify changes don't break existing functionality
- **ALWAYS** group related changes in single commits
- **ALWAYS** show plan to user before applying corrections
- **ALWAYS** report what was done and what remains

## Common Patterns

**Null/undefined checks:**
```typescript
// Before (reviewer comment: "Add null check")
const value = obj.property.nested;

// After
const value = obj?.property?.nested ?? defaultValue;
```

**Naming conventions:**
```typescript
// Before (reviewer comment: "Use camelCase")
const my_variable = 'value';

// After
const myVariable = 'value';
```

**Type safety:**
```typescript
// Before (reviewer comment: "Add explicit type")
const processData = (data) => { ... };

// After
const processData = (data: DataType): ResultType => { ... };
```

**Documentation:**
```typescript
// Before (reviewer comment: "Add JSDoc")
function calculate(a, b) { return a + b; }

// After
/**
 * Calculates the sum of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
function calculate(a: number, b: number): number {
  return a + b;
}
```

## Error Handling

**If PR not found:**
- Verify PR number is correct
- Check if PR is closed/merged
- List recent PRs for user to select

**If no review comments:**
- Confirm PR has been reviewed
- Check if comments were on a different commit
- Ask user if they want to check specific reviewers

**If changes can't be applied:**
- Document the blocker (conflict, unclear requirement, etc.)
- Suggest alternative approach
- Request user guidance

**If tests fail after changes:**
- Identify which change broke tests
- Revert that specific change
- Discuss with user before proceeding

**If push fails:**
- Check for remote changes (rebase needed)
- Verify branch permissions
- Resolve conflicts if present
- Retry push after resolution
