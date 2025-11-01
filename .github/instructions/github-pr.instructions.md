---
description: Concise guide for creating high-quality pull requests following GitHub best practices
---

# Pull Request Best Practices

Guidelines for creating effective PRs that facilitate review, maintain project quality, and link properly with Jira issues.

# PR Structure

## Title Format

Follow project commit convention: `type(MJOLIT-XXX): action description`

**Pattern**: `^(build|docs|feat|fix|perf|refactor|revert|style|test)\((MJOLIT-[0-9]+)\)!?:\s(add|fix|resolve|update|test|change|remove|panic|close)\s(.*)$`

**Examples**:
- `feat(MJOLIT-123): add OAuth2 authentication support`
- `fix(MJOLIT-456): resolve calendar date picker rendering issue`
- `refactor(MJOLIT-789): update button component styling system`

## Description Sections

Structure PR description with these sections:

```markdown
## Summary
Brief overview (2-3 sentences) of what changed and why.

## Changes
- Bullet list of key modifications
- Group related changes together
- Focus on **what** changed, not implementation details

## Related Issue
Link Jira issue: `Closes MJOLIT-XXX` or `Fixes MJOLIT-XXX`

## Testing
How changes were verified (high-level, 3-5 points max)

## Screenshots (if applicable)
Visual evidence for UI changes
```

# Workflow

1. **Verify branch**: Ensure you're on correct feature branch (`feature/MJOLIT-XXX`)
2. **Analyze changes**: Review all modified files and commits
3. **Extract context**: Get issue details from Jira if available
4. **Compose PR**:
   - Title following commit convention
   - Description with all required sections
   - Link to Jira issue
5. **Set metadata**:
   - Base branch (usually `master` or `main`)
   - Reviewers (if can assign to Copilot do it)
   - Labels (if applicable)
6. **Confirm with user** before creating

# Constraints

## Mandatory Rules

- **NEVER** create PR without linking Jira issue in description
- **NEVER** use vague titles ("fix bug", "update code", "improvements")
- **NEVER** include implementation details in Summary (keep high-level)
- **NEVER** create PR without user confirmation
- **ALWAYS** follow commit convention pattern in title
- **ALWAYS** include all required description sections
- **ALWAYS** verify branch name matches Jira issue
- **ALWAYS** review changed files before composing description

## Quality Checks

Before submitting PR for user review:
1. Title matches regex pattern
2. Jira issue linked with `Closes` or `Fixes` keyword
3. Summary explains **what** and **why** (not how)
4. Changes list is concise and grouped logically
5. Testing section provides verification guidance
6. Branch name aligns with Jira issue (e.g., `feature/MJOLIT-XXX`)

# Description Guidelines

## Summary

- **What**: State the change in 1-2 sentences
- **Why**: Explain business value or problem solved
- Avoid technical implementation details
- Examples:
  - ✅ "Adds OAuth2 authentication to enable third-party integrations"
  - ❌ "Implements passport-oauth2 library with JWT token handling"

## Changes

- Group related modifications
- Use action verbs (add, update, remove, refactor)
- Focus on component/file level, not line-by-line
- Max 7-10 bullet points; if more, consider breaking PR
- Examples:
  - "Add `mjo-auth` component with OAuth2 flow"
  - "Update authentication middleware in `src/middleware/auth.ts`"
  - "Remove deprecated session storage logic"

## Testing

- High-level verification steps (not exhaustive test cases)
- Focus on **how** to verify functionality works
- Max 5-7 steps
- Examples:
  - ✅ "Navigate to login page, click OAuth button, verify redirect to provider"
  - ❌ "Test with Chrome 120, Firefox 119, Safari 17, Edge 120..." (too detailed)

# Common Mistakes

- Missing Jira issue link
- Title doesn't match commit convention
- Description is too technical (implementation focus)
- Changes list is too granular (every line of code)
- Testing section lists exhaustive edge cases
- Creating PR without reviewing changed files
- Vague or generic descriptions
