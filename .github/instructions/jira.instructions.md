---
description: "Concise guide for Jira MCP usage - all specs, minimal examples"
---

# Jira MCP Usage Guide

**ALWAYS** write tickets in **English**. Translate Spanish user input before inserting into Jira.

## Project Setup - CRITICAL CONFIG - NEVER IGNORE THESE

**ALLOWED PROJECTS**:
- MjoLitUI
  - Key: `MJOLIT`
  - ID: `10033`
  - Default: `true`

**ALLOWED LABELS**:
- `COMPONENTS`: When a task is related with one or more components 

**ALLOWED USERS**:
- Manu Overa
  - AccountID: `633580a3140ba0bf651c1f68`
  - Email: `manu.overa@gmail.com`

**ALLOWED ISSUE TYPES**:
- Task
- Story
- Bug
- Epic
- Feature
- Subtask

**ALLOWED PRIORITIES**:
- Lowest
- Low
- Medium
- High
- Highest

**FIELDS**:
- Due date:
  - ID: `duedate`
  - Format: `YYYY-MM-DD`

**CUSTOM FIELDS**:
- Impediment:
  - ID: `customfield_10021`
  - Format: `[{ value: "Impediment" }]`
- Start date:
  - ID: `customfield_10015`
  - Format: `YYYY-MM-DD`
- Story Points:
  - ID: `customfield_10016`
  - Format: Integer
- Sprint:
  - ID: `customfield_10020`
  - Format: Sprint objects

Use `mcp_jira_jira_search_fields` to discover more.

**MCP LIMITATIONS**:
- User mentions ONLY work with: `[~accountid:ID]` (email/username formats fail)

---

## Core Workflow -> CRITICAL STEPS - NEVER SKIP THESE

### 1. Create Issue
Use `mcp_jira_jira_create_issue` with: 
```javascript
mcp_jira_jira_create_issue({
  project_key: `XXXX`,
  summary: `Descriptive summary`,
  issue_type: `XXXX`,
  assignee: `xxx@xxx.xx`,
  description: `Detailed description following formatting rules`,
  additional_fields: {
    labels: ["XXX", "YYY"],
    priority: { name: "XXX" },
    timetracking: { originalEstimate: "XX" },
  },
});
```

### 2. Create Subtask
```javascript
mcp_jira_jira_create_issue({
  project_key: `XXXX`,
  summary: `Descriptive summary`,
  issue_type: `Subtask`,
  assignee: `xxx@xxx.xx`,
  description: `Detailed description following formatting rules`,
  additional_fields: {
    labels: ["XXX", "YYY"],
    priority: { name: "XXX" },
    timetracking: { originalEstimate: "XX" },
    parent: "XXXXX-XX",
  },
});
```

### 3. Update Fields
```javascript
mcp_jira_jira_update_issue({
  issue_key: `XXXXX-XX`,
  fields: {
    // Your fields here
  },
});
```

### 4. Relationships
- Epic link: `mcp_jira_jira_link_to_epic({ issue_key, epic_key })`
- Issue links: `mcp_jira_jira_create_issue_link({ link_type, inward_issue_key, outward_issue_key })`
  - Types: Blocks/Relates/Duplicate/Cloners
- Remove: `mcp_jira_jira_remove_issue_link({ link_id })` (get ID from `issuelinks` field)

---

## Jira Formatting -> CRITICAL RULES - NEVER BREAK THESE

MCP converts Markdown to Jira Wiki Markup automatically.

### Works
- **Headers**: Markdown `# H1`, `## H2`, `### H3`
- **Bold**: `**bold**`
- **Italic**: `*italic*`
- **Code**: `` `code` ``
- **Lists**: Flat only (`- item` or `1. item`). **NEVER nest**
- **Tables**: Standard markdown tables convert correctly
- **Code blocks**: `` ```lang ``
- **Links**: Standard markdown links

### Wiki Markup Extensions
Mix these directly in descriptions:
- **Colors**: `{color:red}text{color}` (red/blue/green/orange/purple)
- **Icons**: `(!)` warning, `(i)` info, `(y)` yes, `(n)` no, `(?)` question, `(/)` check, `(x)` cross, `(*)` star
- **Panels**: `{panel:title=Text|borderColor=#HEX|bgColor=#HEX}content{panel}`
  - Info: `#0052CC|#DEEBFF`, Warning: `#FF8B00|#FFFAE6`, Error: `#DE350B|#FFEBE6`, Success: `#00875A|#E3FCEF`
- **Quote**: `{quote}text{quote}`
- **Blockquotes**: `bq.` in wiki markup, `> ` in markdown doesn't work
- **Preformatted**: `{noformat}text{noformat}`
- **User mentions**: `[~accountid:ID]` **NEVER email/username**

### Doesn't Work - CRITICAL - NEVER USE
- Combined bold+italic `***text***` **NEVER use**
- Nested lists (any depth) - renders with wrong markers
- Checklists `- [ ]` - syntax preserved but not interactive
- HTML syntax highlighting in code blocks (use xml)
- Horizontal rules `---` (converts to h2)
- User mentions via `@email` or `@username`
- Components field (use labels only)
- Asterisk text at start of list item:
  - Bold text with asterisks at start of list item (renders incorrectly)
  - Italic text with asterisks at start of list item (renders incorrectly)

### Quick Reference

| Markdown | Wiki | Works | Notes |
|----------|------|-------|-------|
| `# Title` | `h1.` | true | |
| `**bold**` | `*bold*` | true | |
| `- item` | `* item` | true | Flat only |
| `  - nested` | - | false | Never nest |
| `1. item` | `# item` | true | Flat only |
| `- [ ] task` | - | false | Not interactive |
| `` ```js `` | `{code:js}` | true | |
| `` ```html `` | - | false | Use xml |
| `- **bold at start list item**` | - | false | Never put bold at start at list item |
| `- *italic with asterisks at start list item*` | - | false | Never put italic with asterisks at start at list item |
| `[~accountid:ID]` | Same | true | Only format that works |
| `{color:red}t{color}` | Same | true | |
| `(!) (i) (/)` | Same | true | Icons |
| `{panel}` | Same | true | |

## Common Errors

2. **ADF format**: MCP accepts Markdown NOT JSON
3. **Parent assignment**: Use `mcp_jira_jira_link_to_epic` NOT `additional_fields`
4. **Components**: This project uses `labels: ["XXX"]` NOT components
5. **Incompatible fields**: Update incrementally if errors occur

## Best Practices

1. **Incremental updates**: Create basic issue, then update fields separately
2. **Flat lists only**: Never nest lists - use h3 header + flat lists for hierarchy
4. **Relationships**: Use dedicated methods (`link_to_epic`, `create_issue_link`)

## Constraints

1. **NEVER** use projects, issue types, priorities, users, or labels that are not listed in the "Project Setup" section
2. **ALWAYS** follow formatting rules to ensure correct rendering
