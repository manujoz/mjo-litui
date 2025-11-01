---
mode: Github Worker
model: GPT-5 (copilot)
description: Create GitHub pull requests following project conventions and best practices
---

#file:../instructions/github-pr.instructions.md

# Create Pull Request

Your mission is to create a high-quality pull request using the `github` tool, following project conventions and best practices.

## Workflow

1. **Analyze current branch and changes**
   - Verify you're on a feature branch (e.g., `feature/MJOLIT-XXX`, `fix/MJOLIT-XXX`) search branch name for Jira issue ID
   - Review all modified files using `changes` tool
   - Extract Jira issue ID from branch name

2. **Gather context**
   - If Jira issue available, fetch details for context
   - Understand what changed and why
   - Identify key modifications across files

3. **Compose PR**
   - **Title**: Follow pattern `type(MJOLIT-XXX): action description`
   - **Description**: Include all required sections (Summary, Changes, Related Issue, Testing, Screenshots if applicable)
   - **Link issue**: Use `Closes MJOLIT-XXX` or `Fixes MJOLIT-XXX` in description

4. **Confirm with user**
   - Show PR title and description summary
   - Wait for approval before creating
   - Apply any user-requested changes

5. **Create PR**
   - Use `github` tool to create pull request
   - Set base branch (default: `master`)
   - Add reviewers if specified by user

6. **Report result**
   - Show PR URL
   - Confirm all metadata (title, base branch, linked issue)

## Title Format

**Pattern**: `^(build|docs|feat|fix|perf|refactor|revert|style|test)\((MJOLIT-[0-9]+)\)!?:\s(add|fix|resolve|update|test|change|remove|panic|close)\s(.*)$`

**Type values**: `build`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`

**Action verbs**: `add`, `fix`, `resolve`, `update`, `test`, `change`, `remove`, `panic`, `close`

**Examples**:
- `feat(MJOLIT-123): add OAuth2 authentication support`
- `fix(MJOLIT-456): resolve calendar rendering issue`

## Description Template

```markdown
## Summary
[2-3 sentences: what changed and why]

## Changes
- [Key modification 1]
- [Key modification 2]
- [Max 7-10 bullet points]

## Related Issue
Closes MJOLIT-XXX

## Testing
- [Verification step 1]
- [Max 5-7 high-level steps]

## Screenshots
[If applicable, for UI changes]
```

## Before Creating

**Show user a summary**:
- Title (full, following pattern)
- Base branch
- Description (condensed summary, not full text)
- Linked Jira issue
- Files changed count

**Ask for confirmation** before proceeding.

## After Creating

**Request Copilot review**:
- **ALWAYS** Use MCP for request Copilot review of created PR

**Report to user**:
- PR URL (e.g., `https://github.com/manujoz/mjo-litui/pull/123`)
- PR number
- Base branch
- Linked issue
- Brief confirmation message

## Common Issues

If title doesn't match pattern:
- ❌ `Fix bug in calendar` → Missing issue ID and action verb
- ✅ `fix(MJOLIT-456): resolve calendar rendering issue`

If description missing required sections:
- Must include: Summary, Changes, Related Issue, Testing
- Optional: Screenshots (for UI changes)

## Constraints

- **NEVER** create PR without user confirmation
- **NEVER** use vague or generic titles
- **NEVER** skip linking Jira issue in description
- **ALWAYS** verify title matches commit convention
- **ALWAYS** review changed files before composing
- **ALWAYS** keep Summary high-level (avoid implementation details)
- **ALWAYS** use action verbs in Changes list
- **ALWAYS** request Copilot review of created PR using MCP
