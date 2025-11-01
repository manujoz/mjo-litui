---
title: Fix inconsistent dropdown container and hover behaviour
version: 1.0
date_created: 2025-10-16
last_updated: 2025-10-16
jira_issue: MJOLIT-130
---

# Fix Dropdown Container Styling and Interaction Issues

Fix three critical issues in the dropdown component system: forced host-level styling that breaks downstream layouts, non-functional scroll lock, and unreliable hover-triggered dropdown reopening behavior.

## Architecture and Design

### Current Issues

1. **Host-Level Styling Constraint**
    - `mjo-dropdown-container` applies `box-shadow` and `border-radius` directly to `:host`
    - These styles cannot be overridden by consuming components like `mjo-select` and `mjo-date-picker`
    - Breaks design alignment when components need different visual treatments

2. **Scroll Lock Malfunction**
    - `ScrollLock` class in `src/lib/scroll.ts` has two modes: CSS-based and event-based
    - Neither mode effectively prevents body scroll when dropdown is open
    - CSS mode: only sets `overflow: hidden` on body but doesn't handle all scrollable ancestors
    - Event-based mode: attempts to restore scroll position but users can still scroll

3. **Hover Behaviour State Management**
    - When a hover dropdown closes via `mouseleave`, the `isOpen` flag updates correctly
    - However, event listeners are not properly cleaned up or recreated
    - Subsequent `mouseenter` events don't trigger reopening until an unrelated click occurs
    - Root cause: `#handleClose` removes listeners but hover behaviour expects continuous listening

### Design Solution

#### 1. Move Host Styles to Content Container

- Remove all visual styling (shadow, radius, background) from `:host` in `mjo-dropdown-container.ts`
- Keep only positioning/layout properties in `:host` (display, position, z-index, max-width, overflow)
- Apply all visual styles to `.container` div instead
- This allows consumers to style the container via `::part(dropdown-container)` without fighting host styles

#### 2. Fix Hover Listener Management

- Separate listener lifecycle from open/close state changes
- Keep hover listeners attached at all times when `behaviour === "hover"`
- Remove `#removeListeners()` call from hover behaviour flow
- Only add/remove listeners when `behaviour` property actually changes
- Add guard in `#handleOpen` to prevent opening if already open

## Technologies and Tools

- **Lit 3.x** - Web component framework
- **TypeScript** - Type safety
- **CSS Custom Properties** - Theming system
- **Shadow DOM** - Encapsulation

## Relevant Routes and Files

### Core Files to Modify

- `src/components/dropdown/mjo-dropdown-container.ts` - Main styling changes
- `src/mjo-dropdown.ts` - Hover behaviour event listener fixes
- `src/lib/scroll.ts` - Scroll lock improvements

### Dependent Components to Verify

- `src/mjo-select.ts` - Uses `scrollLocked`, verify it works after changes
- `src/mjo-date-picker.ts` - Uses `scrollLocked`, verify it works after changes
- `server/src/controllers/dropdown-controller.ts` - SSR demos, verify no visual regressions
- `server/client/dropdown-interactions.ts` - Client-side demos

### Test Files

- Create or update: `tests/components/mjo-dropdown.test.ts`
- Test scroll lock functionality
- Test hover behaviour
- Test styling independence

### Documentation

- `docs/mjo-dropdown.md` - Update examples if needed

## Tasks

### Phase 1: Fix Host-Level Styling (mjo-dropdown-container.ts)

- [ ] **Remove visual styles from `:host` selector**
    - Remove `box-shadow` property from `:host`
    - Remove `border-radius` property from `:host`
    - Keep only: `display`, `position`, `transition`, `opacity`, `transform-origin`, `max-width`, `overflow-x`, `overflow-y`, `z-index`
- [ ] **Move visual styles to `.container` selector**
    - Add `box-shadow` to `.container` (keep existing CSS custom property pattern)
    - Add `border-radius` to `.container` (keep existing CSS custom property pattern)
    - Ensure `.container` already has `background-color` and `color` (verify, should be there)
    - Verify `.container` has `overflow: hidden` to respect border-radius

- [ ] **Verify CSS custom properties still work**
    - Ensure `--mjo-dropdown-box-shadow` applies correctly to `.container`
    - Ensure `--mjo-dropdown-border-radius` applies correctly to `.container`
    - Ensure `--mjo-dropdown-background-color` and `--mjo-dropdown-foreground-color` work on `.container`

### Phase 2: Fix Hover Behaviour Listeners (mjo-dropdown.ts)

- [ ] **Refactor listener lifecycle in `#setListeners()`**
    - For hover behaviour: attach `mouseenter` to host AND `mouseleave` to both host and container
    - For hover behaviour: do NOT attach document click listener (it interferes)
    - For click behaviour: keep existing implementation (click on host, click on document)

- [ ] **Remove listener cleanup from close flow**
    - In `#close()` method: do NOT call `#removeListeners()` for hover behaviour
    - Only remove document keydown listener in `#close()`
    - Keep hover listeners active at all times when behaviour is hover

- [ ] **Add guards in `#handleOpen()`**
    - Check `if (this.isOpen) return;` at the start to prevent duplicate open calls
    - This prevents issues if mouseenter fires multiple times

- [ ] **Update `#removeListeners()`**
    - Only call this when `behaviour` property changes or component disconnects
    - Not during open/close cycles

- [ ] **Verify behaviour property changes**
    - In `updated()` lifecycle: ensure listeners are properly cleaned and recreated when behaviour changes
    - Test switching from hover to click and vice versa

### Phase 3: Verify Dependent Components

- [ ] **Test mjo-select with scroll lock**
    - Open select dropdown in browser
    - Verify body scroll is completely disabled
    - Verify dropdown content can still scroll internally if needed
    - Close dropdown and verify scroll is restored to exact position

- [ ] **Test mjo-date-picker with scroll lock**
    - Open date picker calendar
    - Verify body scroll is completely disabled
    - Verify calendar can be interacted with normally
    - Close and verify scroll restoration

- [ ] **Check for style regressions in mjo-select**
    - Verify options list renders correctly after styling changes
    - Verify no unexpected shadows or borders appear
    - Test with different themes if applicable

- [ ] **Check for style regressions in mjo-date-picker**
    - Verify calendar dropdown renders correctly
    - Verify no visual artifacts from removed host styles
    - Test with different configurations

### Phase 4: Test Hover Dropdowns

- [ ] **Test basic hover dropdown**
    - Navigate to `server` demo page for dropdowns
    - Hover over trigger element
    - Verify dropdown opens immediately
    - Move mouse away
    - Verify dropdown closes
    - Hover again immediately
    - Verify dropdown opens without requiring a click

- [ ] **Test rapid hover on/off**
    - Quickly move mouse in and out of trigger area
    - Verify dropdown doesn't get stuck in open or closed state
    - Verify no console errors

- [ ] **Test hover with different positions**
    - Test hover dropdowns with `position="right-bottom"`, `center-top"`, etc.
    - Verify behaviour is consistent across all positions

### Phase 5: Testing and Documentation

- [ ] **Create/update unit tests**
    - Test file: `tests/components/mjo-dropdown.test.ts`
    - Test: Hover dropdown reopens after close without click
    - Test: ScrollLock prevents body scroll when active
    - Test: ScrollLock restores scroll position on unlock
    - Test: Host styles don't interfere with content styling
    - Test: CSS custom properties apply to content container

- [ ] **Manual regression testing**
    - Test all dropdown examples in dev server
    - Test all dropdown examples in server SSR pages
    - Test on different browsers (Chrome, Firefox, Safari, Edge)
    - Test on mobile viewports

- [ ] **Update documentation if needed**
    - Review `docs/mjo-dropdown.md`
    - Add notes about styling via `::part(dropdown-container)` if not already clear
    - Add examples of scroll lock usage if missing
    - Update migration notes if any breaking changes (should be none)

- [ ] **Test with real-world scenarios**
    - Form inside dropdown with scroll lock
    - Long content lists in dropdowns
    - Nested scrollable areas
    - Dropdown inside scrollable containers

## Risk Management and Mitigation

### Risk 1: Breaking Changes in Styling

**Description**: Moving styles from `:host` to `.container` might break existing customizations  
**Likelihood**: Medium  
**Impact**: Medium  
**Mitigation**:

- The CSS custom properties already target the container, so most customizations should work
- Test all demos and examples thoroughly before merging
- Document the change in commit message and update docs if needed
- The `::part(dropdown-container)` API should remain unchanged

### Risk 2: Scroll Lock Performance Issues

**Description**: Using `position: fixed` on body might cause layout shifts or performance issues  
**Likelihood**: Low  
**Impact**: Medium  
**Mitigation**:

- This is a well-established pattern used by many UI libraries (Bootstrap, Material-UI, etc.)
- Test thoroughly on different devices and browsers
- Ensure scroll position restoration is precise
- Keep implementation simple and performant

### Risk 3: Hover Behaviour Edge Cases

**Description**: Complex interaction patterns might still cause issues with hover dropdowns  
**Likelihood**: Low  
**Impact**: Low  
**Mitigation**:

- Add comprehensive event listener guards (`if (this.isOpen) return`)
- Test rapid interactions and edge cases
- Consider adding debounce if issues persist (but try without first)
- Ensure proper cleanup in disconnectedCallback

### Risk 4: Browser Compatibility

**Description**: CSS `position: fixed` scroll lock might behave differently across browsers  
**Likelihood**: Low  
**Impact**: Medium  
**Mitigation**:

- Test on all major browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile browsers (iOS Safari, Chrome Mobile)
- Have fallback logic if issues are discovered
- Document any known browser quirks

### Risk 5: Dropdown Inside Scrollable Containers

**Description**: Dropdowns inside scrollable containers might have positioning issues after changes  
**Likelihood**: Low  
**Impact**: Low  
**Mitigation**:

- The positioning logic in `utils/dropdown.ts` uses `getBoundingClientRect()` which accounts for scroll
- Test dropdowns in modals, drawers, and other scrollable containers
- Verify `updatePosition()` still works correctly on scroll

## Open Questions

1. **Should we completely remove event-based scroll lock?**
    - Currently `ScrollLock` has two modes: CSS and event-based
    - Event-based is unreliable and adds complexity
    - Recommendation: Keep it for now but mark as deprecated, default to CSS mode
    - Future: Remove in next major version

2. **Do we need transition delays for hover behaviour?**
    - Currently hover opens/closes immediately
    - Some UIs add small delays (200-300ms) to prevent accidental triggers
    - Recommendation: Start without delays, add if users report issues
    - Could be added as optional `hoverDelay` property later

3. **Should scroll lock be enabled by default for all dropdowns?**
    - Currently opt-in via `scrollLocked` property
    - For modal-like dropdowns it makes sense
    - For small tooltips/menus it might be overkill
    - Recommendation: Keep as opt-in, document when to use it

4. **Do we need to support nested dropdowns?**
    - Current code doesn't explicitly handle dropdown-within-dropdown
    - Scroll lock might conflict if multiple dropdowns open
    - Recommendation: Test if it works, add note to docs if not supported
    - Could be future enhancement with lock reference counting
