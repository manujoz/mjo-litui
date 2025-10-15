---
description: "Concise guide for Jira MCP usage - all specs, minimal examples"
---

# Jira MCP Usage Guide

**ALWAYS** write tickets in **English**. Translate Spanish user input before inserting into Jira.

**PROJECT INFO:**
- Key: `MJOLIT` | ID: `10033`
- Labels: 
  - `COMPONENTS`: When a task is related with one or more components 
- Users: 
    - Manu Overa: `633580a3140ba0bf651c1f68` - `manu.overa@gmail.com`

**MCP LIMITATIONS:**
- User mentions ONLY work with: `[~accountid:ID]` (email/username formats fail)

---

## Core Workflow -> 🚫 CRITICAL STEPS - NEVER SKIP THESE

### 1. Create Issue
Use `mcp_jira_jira_create_issue` with: `project_key: "MJOLIT"`, `summary`, `issue_type` (Task/Story/Bug/Epic/Feature/Subtask), `assignee: user_email`, `description` (Markdown)

### 2. Create Subtask
**CRITICAL**: `issue_type: "Subtask"` (capital S), `additional_fields: { parent: "MJOLIT-XX" }` as STRING not object

### 3. Update Fields
Use `mcp_jira_jira_update_issue`:
- Standard: `fields: { labels: ["COMPONENTS"], priority: { name: "High" } }`
- Priorities: Lowest/Low/Medium/High/Highest
- Custom: `additional_fields: { customfield_10015: "YYYY-MM-DD", duedate: "YYYY-MM-DD" }`
- Time: `fields: { timetracking: { originalEstimate: "2d" } }` (NOT in additional_fields)
- Impediment: `additional_fields: { customfield_10021: [{ value: "Impediment" }] }`

### 4. Relationships
- Epic link: `mcp_jira_jira_link_to_epic({ issue_key, epic_key })`
- Issue links: `mcp_jira_jira_create_issue_link({ link_type, inward_issue_key, outward_issue_key })`
  - Types: Blocks/Relates/Duplicate/Cloners
- Remove: `mcp_jira_jira_remove_issue_link({ link_id })` (get ID from `issuelinks` field)

---

## Jira Formatting -> 🚫 CRITICAL RULES - NEVER BREAK THESE

MCP converts Markdown to Jira Wiki Markup automatically.

### ✅ Works
- **Headers**: `#` → `h1.`, `##` → `h2.`, `###` → `h3.`
- **Text**: `**bold**` → `*bold*`, `*italic*` → `_italic_`, `` `code` `` → `{{code}}`
- **Lists**: Flat only (`- item` or `1. item`). **NEVER nest** - renders incorrectly
- **Tables**: Standard markdown tables convert correctly
- **Code blocks**: `` ```lang `` → `{code:lang}` (js/ts/python/java/css/json/sql work, html doesn't)
- **Links**: `[text](url)` → `[text|url]`, issue keys auto-link

### ✅ Wiki Markup Extensions
Mix these directly in descriptions:
- **Colors**: `{color:red}text{color}` (red/blue/green/orange/purple)
- **Icons**: `(!)` warning, `(i)` info, `(y)` yes, `(n)` no, `(?)` question, `(/)` check, `(x)` cross, `(*)` star
- **Panels**: `{panel:title=Text|borderColor=#HEX|bgColor=#HEX}content{panel}`
  - Info: `#0052CC|#DEEBFF`, Warning: `#FF8B00|#FFFAE6`, Error: `#DE350B|#FFEBE6`, Success: `#00875A|#E3FCEF`
- **Quote**: `{quote}text{quote}`
- **Blockquotes**: `bq.` in wiki markup, `> ` in markdown doesn't work
- **Preformatted**: `{noformat}text{noformat}`
- **User mentions**: `[~accountid:ID]` ONLY (email/username fail)

### ❌ Doesn't Work
- Combined bold+italic `***text***` (use `*_text_*`)
- Nested lists (any depth) - renders with wrong markers
- Checklists `- [ ]` - syntax preserved but not interactive
- HTML syntax highlighting in code blocks (use xml)
- Horizontal rules `---` (converts to h2)
- User mentions via `@email` or `@username`
- Components field (use labels only)
- Bold text at start of list item (renders incorrectly)
- Italic text with asterisks at start of list item (renders incorrectly)

### Quick Reference

| Markdown | Wiki | Works | Notes |
|----------|------|-------|-------|
| `# Title` | `h1.` | ✅ | |
| `**bold**` | `*bold*` | ✅ | |
| `- item` | `* item` | ✅ | Flat only |
| `  - nested` | - | ❌ | Never nest |
| `1. item` | `# item` | ✅ | Flat only |
| `- [ ] task` | - | ❌ | Not interactive |
| `` ```js `` | `{code:js}` | ✅ | |
| `` ```html `` | - | ❌ | Use xml |
| `- **bold at start list item**` | - | ❌ | Never put bold at start at list item |
| `- *italic with asterisks at start list item*` | - | ❌ | Never put italic with asterisks at start at list item |
| `[~accountid:ID]` | Same | ✅ | Only format that works |
| `{color:red}t{color}` | Same | ✅ | |
| `(!) (i) (/)` | Same | ✅ | Icons |
| `{panel}` | Same | ✅ | |

---

## Custom Fields

| Field | ID | Format | Location |
|-------|-----|--------|----------|
| Start date | `customfield_10015` | `YYYY-MM-DD` | `additional_fields` |
| Due date | `duedate` | `YYYY-MM-DD` | `additional_fields` |
| Time estimate | `timetracking.originalEstimate` | `1w/3d/5h/30m` | `fields` |
| Story Points | `customfield_10016` | Integer | `additional_fields` |
| Sprint | `customfield_10020` | Sprint objects | `additional_fields` |

Use `mcp_jira_jira_search_fields` to discover more.

---

## Common Errors

1. **timeoriginalestimate**: Use `fields: { timetracking: { originalEstimate: "2d" } }` NOT `additional_fields`
2. **ADF format**: MCP accepts Markdown NOT JSON
3. **Parent assignment**: Use `mcp_jira_jira_link_to_epic` NOT `additional_fields`
4. **Components**: This project uses `labels: ["WEB"]` NOT components
5. **Incompatible fields**: Update incrementally if errors occur

---

## Best Practices

1. **Incremental updates**: Create basic issue, then update fields separately
2. **Flat lists only**: Never nest lists - use headers + flat lists for hierarchy
3. **Issue references**: Type `MJOLIT-XXX` naturally - auto-links in Jira description
4. **Relationships**: Use dedicated methods (`link_to_epic`, `create_issue_link`)
5. **Test first**: Validate workflow on test issues

---

## Debug Logging

Enable in `/.settings/mcp-atlassian.env`:
```
MCP_VERBOSE=true
MCP_VERY_VERBOSE=true
MCP_LOGGING_STDOUT=true
```
View in VS Code: **View → Output** → MCP server channel