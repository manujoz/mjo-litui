---
applyTo: "**/copilot-instructions.md, **/*.instructions.md, **/*.chatmode.md, **/*.prompt.md"
---

# Instruction File Creation & Optimization Guide

## Core Optimization Principles

1. **Context Efficiency**: Aim for 30%+ reduction in token usage through consolidation and high information density, never more of 3 pages for instruction files
2. **Markdown Structure**: Use markdown headings correctly for improved AI parsing.
3. **Role Definition**: Always define clear roles (only in chat modes or prompts) to boost accuracy by up to 30% 
4. **Progressive Workflows**: Define sequential numbered steps to prevent overwhelming output
5. **Information Density**: Consolidate similar patterns, eliminate redundant examples, maintain completeness
6. **Self-Demonstration**: Instruction files must embody the principles they teach

## Context Engineering Best Practices

- **Info-First, Queries-Last**: Place contextual information before questions/tasks (30% better performance)
- **Consolidation**: Merge similar examples into unified code blocks (reduced 10 naming examples → 4)
- **Eliminate Redundancy**: Remove obvious comments and duplicate patterns
- **Concise Code Blocks**: Show only essential code without verbose explanations
- **Sequential Steps**: Number steps explicitly (1, 2, 3...) for clear execution order
- **Coherence**: Maintain coherent flow between instructions, prompts and chat modes when used together, avoid contradictions, redundancy and misalignment

## File Structure Standards

### For Instruction Files (`.instructions.md`)

```markdown
---
applyTo: "glob/pattern/**/*.ext"  # Precise targeting if applicable
description: Brief description shown in prompt UI (1-2 sentences)
---

# Description

Important context about the instruction file's for AI agents.

## Required instructions (If applicable)
[related instructions](./related-file.instructions.md)

## Workflow
1. First step with clear action
2. Second step building on first
3. Sequential progression to goal

## Constraints
- ❌ NEVER do X (explicit prohibitions)
- ✅ ALWAYS do Y (mandatory actions)

## Patterns
Concise code examples demonstrating key patterns

[Other sections as needed ...]
```

### For Prompt Files (`.prompt.md`)

```markdown
---
mode: "SR General"  # Chat mode name if applicable
model: "Claude Sonnet 4.5"  # Preferred model if applicable
tools: ['edit', 'search', 'fetch', 'think']  # Available tools if applicable
description: Brief description shown in prompt UI (1-2 sentences)
---

# Role (If applicable and not in chat mode)

You are a [role definition], specialized in [core responsibilities].

## Required instructions (If applicable)

[related instructions](./related-file.instructions.md)

## Workflow

1. First step with clear action
2. Second step building on first
3. Sequential progression to goal

## Constraints

- ❌ NEVER do X (explicit prohibitions)
- ✅ ALWAYS do Y (mandatory actions)

## Patterns

Concise code examples demonstrating key patterns

[Other sections as needed...]
```

### For Chat Mode Files (`.chatmode.md`)

```markdown
---
description: Brief description shown in chat UI (1-2 sentences)
tools: ['edit', 'search', 'fetch', 'think']  # Available tools
model: Claude Sonnet 4.5  # Preferred model
---

# Mode Name

# Role

Role definition and core responsibilities.

## Operating Principles

Reference instruction files when applicable.

## Workflow (If applicable)
Sequential steps for this mode's operation.

## Patterns (If applicable)
Define patterns when relevant, not write code examples.

## Constraints
Critical rules and boundaries.

[Other sections as needed...]

## Communication
Communication guidelines with users.
```

## Optimization Strategies

### Before Optimization (Verbose)
```typescript
// Example 1: User login
it('should log in user', () => { /* test */ });

// Example 2: User authentication
it('should authenticate user', () => { /* test */ });

// Example 3: User session
it('should create session', () => { /* test */ });
```

### After Optimization (Consolidated)
```typescript
// Authentication patterns: login, session, token validation
it('should authenticate user and create session', () => { /* test */ });
it('should validate token and refresh session', () => { /* test */ });
```

**Result**: 3 examples → 2 unified patterns, maintaining completeness while reducing tokens by 33%.

### Naming Consolidation

**Before** (10 examples):
```
should_do_something
shouldDoSomething
should do something
must_validate_x
mustValidateX
verifies_that_y
```

**After** (4 essential patterns):
```typescript
// camelCase for actions, PascalCase for entities
shouldAuthenticateUser()
validateToken()
```

### Format Selection: Tables vs Lists

Choose the appropriate format based on content type and AI processing characteristics.

#### Use Tables For:

1. **Reference Data** (field mappings, allowed values)
   - AI can scan tables efficiently for lookup operations
   - Example: Custom field IDs → format specifications
   - Token efficiency: ~40% reduction vs descriptive lists

2. **Side-by-Side Comparisons** (format conversions, before/after)
   - Visual alignment helps AI identify patterns and differences
   - Example: Markdown syntax → Wiki Markup conversions
   - Maintains 1:1 correspondence clearly

3. **Compact Structured Data** (<15 rows)
   - High information density without overwhelming context
   - Quick reference without scrolling
   - Each row = discrete, independent fact

**Example:**
```markdown
| Field Type | Format | Example |
|------------|--------|---------|
| Date | "YYYY-MM-DD" | "2025-10-20" |
| Priority | {"name": "X"} | {"name": "High"} |
```

#### Use Lists For:

1. **Procedural Workflows** (sequential steps)
   - AI processes linear sequences better in numbered lists
   - Example: Phase 1 → Phase 2 → Phase 3
   - Reason: Sequential tokenization matches execution order

2. **Critical Constraints** (NEVER/ALWAYS rules)
   - Example: "**NEVER** use nested lists"
   - Reason: Visual saliency drives attention and compliance

3. **Validation Checklists** (pre-flight checks)
   - Checkbox format `[ ]` signals actionable items
   - Better for step-by-step verification
   - Reason: Mimics human checklist mental model

4. **Code Examples with Context**
   - Tables break code formatting and syntax highlighting
   - Better as fenced code blocks with explanatory text
   - Reason: Preserves readability and copy-paste functionality

**Example:**
```markdown
**NEVER** create nested lists in JIRA descriptions
**ALWAYS** validate field values before MCP calls
**ALWAYS** use flat lists only
```

#### Token Efficiency Analysis

| Format | 10 Items | Efficiency | Best For |
|--------|----------|------------|----------|
| **Table** | ~200 tokens | High (if <15 rows) | Reference, comparisons |
| **Descriptive List** | ~350 tokens | Medium | Workflows, explanations |
| **Bullet List** | ~180 tokens | Highest | Constraints, checklists |

**Optimization Rule**: Use tables for data, lists for instructions.

## Workflow

1. **Research Phase**
   - Fetch external documentation (`fetch_webpage`)
   - Search existing patterns in codebase (`search`, `semantic_search`, `grep_search`)
   - Analyze similar instruction files as references
   - Use `think` tool for deep analysis

2. **Define Scope**
   - Identify target files with precise glob patterns
   - Define clear role and responsibilities
   - Determine required tools and preferred model (for chatmodes)

3. **Structure Content**
   - Use markdown headings for key sections
   - Write role definition first (boosts accuracy)
   - Define workflow as numbered sequential steps
   - Add constraints with explicit **NEVER** / **ALWAYS** bold text

4. **Optimize Ruthlessly**
   - Consolidate similar examples into unified patterns
   - Remove redundant comments and obvious explanations
   - Ensure each code block demonstrates 2-3 related concepts
   - Verify 30%+ token reduction without information loss

5. **Validate Quality**
   - Check self-demonstration (file follows its own rules)
   - Verify glob patterns match intended targets
   - Ensure no critical information lost
   - Confirm high information density


# Constraints

## Mandatory Rules

- **NEVER** create verbose instructions with redundant examples
- **NEVER** generate complete instruction files without progressive review
- **NEVER** skip research phase for specialized domains
- **NEVER** use vague role definitions
- **ALWAYS** use markdown headings for structure
- **ALWAYS** consolidate similar patterns (aim for 30%+ reduction)
- **ALWAYS** define roles explicitly at file start
- **ALWAYS** number workflow steps sequentially
- **ALWAYS** include validation criteria
- **ALWAYS** use precise glob patterns in `applyTo`

## Quality Checkpoints

Before finalizing any instruction file, verify:
1. Workflow uses numbered sequential steps
2. Constraints use **NEVER** / **ALWAYS** text bolding
3. Examples are consolidated (3+ similar → 1-2 unified)
4. No redundant comments or obvious explanations
5. File demonstrates its own optimization principles
6. Token count reduced by 30%+ vs naive approach
7. All critical information preserved



# Research rules

## Key Resources Consulted

1. **Anthropic Prompt Engineering**: Long-context optimization (info-first = 30% better), role prompts boost accuracy (use in chat modes or prompts without chat mode linked)
2. **GitHub Copilot Customization**: Custom instructions, path-specific targeting, chatmode structure (frontmatter + body)
3. **VS Code Chat Modes**: YAML frontmatter (description, tools, model), Markdown body, tool/mode priority
4. **Context Window Optimization**: Consolidation techniques, information density, progressive workflows

