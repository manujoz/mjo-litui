---
mode: Github Worker
model: GPT-5 mini (copilot)
description: Merge pull request with squash method after validating all review comments are resolved
---

#file:../instructions/github-pr.instructions.md

# Merge Pull Request with Review Validation

Your mission is to merge a pull request using **squash merge** after validating that **all reviewer comments are resolved**. This is a mandatory requirement - PRs with unresolved comments **MUST NOT** be merged.

## Critical Rules

- **NEVER** merge a PR with unresolved review comments
- **ALWAYS** use squash merge method
- **ALWAYS** validate comment resolution before proceeding
- **ALWAYS** confirm with user before merging

## Workflow

### 1. Identify and fetch PR details

- Get PR number from user or detect from current branch
- Fetch PR details using `github` tool
- Verify PR state is **open** (not already merged/closed)
- Extract PR metadata:
  - Title
  - Description
  - Base branch
  - Head branch
  - Mergeable state
  - Number of commits
  - Files changed

### 2. Validate mergeability (CRITICAL)

Check PR merge status:

- **State**: Must be `open`
- **Mergeable**: Must be `true` (no conflicts)
- **Mergeable state**: Should be `clean` or `unstable` (not `blocked` or `dirty`)

**If not mergeable:**
- Report specific blocker to user
- Suggest resolution steps
- **STOP** - do not proceed

### 3. Check review comments (MANDATORY)

**This is the most critical step - CANNOT be skipped.**

Fetch all review comments using `github` tool:
- **Review comments** (inline code comments)
- **General comments** (PR-level comments)
- **Review states** (approved, changes requested, commented)

**Analyze each comment thread:**
- Is the thread **resolved**? (GitHub marks resolved threads)
- Has the reviewer **approved** after comment?
- Is there a **reply** from the PR author addressing the concern?
- Is there **code change** corresponding to the comment?

**Calculate resolution status:**
```
Total review comments: X
Resolved threads: Y
Unresolved threads: Z (X - Y)
```

### 4. Validate all comments are resolved (BLOCKING)

**CRITICAL CHECKPOINT**: All reviewer comments **MUST** be resolved.

**If ANY comment thread is unresolved:**

```
❌ Cannot Merge - Unresolved Review Comments

PR: #XX - [Title]
Link: [PR URL]

Review Status:
❌ Total comments: X
❌ Unresolved threads: Y

Unresolved comments by reviewer:
- [Reviewer 1]: X unresolved comments (files: [list])
- [Reviewer 2]: X unresolved comments (files: [list])

❌ BLOCKED: All review comments must be resolved before merging.

Next steps:
1. Apply corrections: Use apply-pr-review.prompt.md
2. Request re-review from reviewers
3. Ensure all threads are marked as resolved
4. Return here to merge once resolved
```

**STOP** - Do not proceed with merge. Exit workflow.

### 5. Check review approvals (RECOMMENDED)

Check if PR has been approved by reviewers:

**If NO approvals:**
```
⚠️ Warning: No Review Approvals

PR: #XX - [Title]

Review status:
✅ All comments resolved
⚠️ No approvals from reviewers

Do you want to proceed with merge without approval? (yes/no)
```

Wait for user response.

**If user says no:**
- Suggest requesting reviews
- Exit workflow

**If user says yes:**
- Document in merge commit message
- Proceed to step 6

### 6. Verify CI/checks (if applicable)

Check status checks on PR:

- **Required checks**: All must pass
- **Optional checks**: Review but don't block

**If required checks failing:**
```
❌ Cannot Merge - Failing Required Checks

PR: #XX - [Title]

Status checks:
❌ [Check name 1]: failed
❌ [Check name 2]: failed
✅ [Check name 3]: passed

Next steps:
1. Fix failing checks
2. Push corrections
3. Wait for checks to pass
4. Return here to merge
```

**STOP** - Do not proceed.

### 7. Prepare squash merge

**Compose squash commit title:**
- Use PR title as-is (already follows convention)
- Format: `type(MJOLIT-XXX): action description`

**Compose squash commit message:**
```
[PR title]

[PR description summary - first 3-4 lines]

Closes MJOLIT-XXX

Co-authored-by: [Contributor names if applicable]
```

**Extract from PR description:**
- Summary section (2-3 sentences)
- Related issue link
- Keep concise - avoid full Changes/Testing sections

### 8. Show merge plan to user (MANDATORY)

**Before merging, show complete summary:**

```
📋 Ready to Merge PR

PR: #XX - [Title]
Link: [PR URL]
Status: ✅ All validations passed

Validation Results:
✅ PR is mergeable (no conflicts)
✅ All review comments resolved (X/X threads)
✅ [Required checks passed / No required checks / User confirmed no approvals]
✅ Base branch: master

Merge Details:
Method: Squash and merge
Commits to squash: X commits
Final commit title: [Full title following convention]
Final commit message: [Show first 2-3 lines]

After merge:
- Branch [branch-name] can be deleted
- Jira issue MJOLIT-XXX will be auto-closed

Proceed with merge? (yes/no)
```

**Wait for user confirmation.**

### 9. Execute squash merge

**Only after user confirms "yes":**

Use `github` tool to merge PR:
- Method: `squash`
- Commit title: PR title (following convention)
- Commit message: Prepared message from step 7
- Delete branch: Ask user preference

**Execute merge operation.**

### 10. Report merge result

**If successful:**

```
✅ Pull Request Merged Successfully

PR: #XX - [Title]
Link: [PR URL]

Merge details:
✅ Method: Squash and merge
✅ Commits squashed: X → 1
✅ Merged to: master
✅ Merge commit: [SHA]

Branch status:
[✅ Deleted / ⚠️ Not deleted - delete manually if needed]

Jira status:
✅ Issue MJOLIT-XXX auto-closed (via commit message)

Next steps:
[If local branch: "Switch to master and pull latest changes"]
[If needed: "Update related PRs that depend on this"]
```

**If merge fails:**

```
❌ Merge Failed

PR: #XX - [Title]

Error: [Error message from GitHub]

Common causes:
- Remote changes made since last check (rebase needed)
- Merge conflicts appeared
- Branch protection rules blocking merge
- Insufficient permissions

Next steps:
1. [Specific resolution based on error]
2. Retry merge after resolution
```

## Validation Checklist

Before proceeding to merge, verify:

- [ ] PR is open and not already merged
- [ ] PR is mergeable (no conflicts)
- [ ] **ALL review comment threads are resolved** (CRITICAL)
- [ ] Required CI checks passed (if any)
- [ ] PR has approvals OR user confirmed to proceed without
- [ ] Base branch is correct (usually `master`)
- [ ] Squash commit title follows project convention
- [ ] Squash commit message includes issue closure
- [ ] User confirmed merge operation

**If ANY item fails, STOP and report blocker to user.**

## Error Handling

### Unresolved comments detected

**Action**: BLOCK merge immediately
**Response**: Show detailed list of unresolved threads with reviewers
**Next steps**: Direct user to apply-pr-review.prompt.md

### Merge conflicts

**Action**: BLOCK merge
**Response**: Report conflict files
**Next steps**: 
1. Rebase PR branch on base branch
2. Resolve conflicts
3. Push resolution
4. Retry merge

### Branch protection rules

**Action**: Check specific rule blocking merge
**Response**: Report which rule is failing
**Next steps**:
- If reviews required: Get approvals
- If checks required: Fix failing checks
- If permissions: Contact repo admin

### Already merged

**Action**: STOP workflow
**Response**: Inform user PR was already merged
**Show**: Merge commit details and who merged

### Squash not allowed

**Action**: Check repository merge settings
**Response**: Report that squash merge is disabled
**Next steps**: 
- Ask user if should use `merge` or `rebase` instead
- Document in project that squash is not available
- Suggest enabling squash in repo settings

## Repository Settings Check

**Before first merge, verify repo allows squash:**

If squash merge returns 405 error:
- Repository settings may disallow squash merge
- Fall back to `merge` method with user confirmation
- Document this for future merges

## Best Practices

1. **Comment resolution is non-negotiable** - Never skip this validation
2. **Show full plan before merging** - User should see exactly what will happen
3. **Use PR title as-is for squash** - It already follows commit convention
4. **Include issue closure in message** - Ensures Jira auto-linking works
5. **Verify checks before merge** - Prevents breaking master branch
6. **Report detailed results** - User should know exactly what occurred
7. **Handle errors gracefully** - Provide clear next steps for resolution

## Common Scenarios

### Scenario 1: Perfect merge
- All comments resolved ✅
- All checks passed ✅
- Has approvals ✅
→ Proceed directly to merge after user confirmation

### Scenario 2: No approvals but comments resolved
- All comments resolved ✅
- No formal approval ⚠️
→ Ask user if should proceed, then merge if confirmed

### Scenario 3: Unresolved comments
- Some threads unresolved ❌
→ BLOCK merge, direct to apply-pr-review.prompt.md

### Scenario 4: Failing checks
- CI checks failing ❌
→ BLOCK merge, wait for fixes

### Scenario 5: Merge conflicts
- Branch behind base ❌
→ BLOCK merge, request rebase

## Merge Commit Message Format

```
type(MJOLIT-XXX): action description

Brief summary from PR description explaining what changed and why.
Additional context if needed from description.

Closes MJOLIT-XXX

Co-authored-by: [If multiple contributors]
```

**Keep concise** - Only essential context from PR description, not full Changes list.

## After Merge

**Update local repository (if applicable):**
```bash
git checkout master
git pull origin master
git branch -d feature/MJOLIT-XXX  # Delete local branch
```

**Verify Jira issue:**
- Check if issue transitioned to Done/Resolved
- Verify issue has link to PR in comments
- If not auto-closed, manually update Jira

## Constraints Summary

### NEVER
- Merge with unresolved review comments
- Merge with failing required checks
- Merge with merge conflicts
- Skip user confirmation
- Use merge method other than squash (unless repo doesn't support it)

### ALWAYS
- Validate ALL review comments are resolved
- Check mergeable state before proceeding
- Show complete merge plan to user
- Follow project commit convention for squash title
- Include issue closure in squash message
- Report detailed results after merge
- Handle errors with clear next steps
