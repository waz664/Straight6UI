# UI_DESIGN_SPEC.md

## 1. Product UI Intent
Build a calm, high-clarity SaaS product interface that supports fast operational work across roles by combining a stable application shell, table-first data workflows, and structured form-based workflows where table interaction is not the primary mode. The experience should keep users oriented, reduce page churn, preserve context during edits (especially via on-demand drawers), and provide an efficient dashboard entry point without allowing dashboard visuals to overshadow actionable data surfaces.

## 2. Design Reference Summary
This design takes Stripe-like discipline in shell/layout hierarchy, Airtable-like table productivity and configurable data operations, and the provided HTML reference’s crisp typography, restrained palette, and strong navigation rhythm. It intentionally excludes marketing-style hero composition, decorative gradients/illustrations, excessive rounded-card stacking, GitHub-like high-density harshness, and role-specific layout systems. Dashboard capability is retained as an entry/navigation accelerator, but data workflows remain table/form driven.

## 3. App Shell
- **Sidebar behavior**
  - Desktop (≥1280): fixed left sidebar (expanded default, user-collapsible).
  - Tablet landscape (1024–1279): collapsed icon rail by default, expandable flyout labels.
  - Tablet portrait/mobile (<1024): hidden by default; opened as overlay drawer.
  - Sidebar item visibility is role-based; shell structure is unchanged across roles.
- **Top bar behavior**
  - Persistent on all breakpoints; contains workspace switcher, global search trigger, notifications, help, account menu.
  - On smaller breakpoints, secondary controls move to overflow menu.
- **Content container rules**
  - Max-width: fluid enterprise layout (no marketing center-column lock).
  - Standard page padding tokens by breakpoint; avoid floating card islands.
  - Primary content can be split horizontally for table + drawer context.
- **Page header rules**
  - Includes title, concise subtitle/metadata, primary action, optional secondary actions.
  - Header remains above toolbars; action density scales down at smaller breakpoints.
- **Right-side panel/drawer rules**
  - Direction B primary interaction: selecting a row establishes selection state; edit/detail opens in right drawer **on demand**.
  - Drawer supports tabbed sections (Overview, Edit, Activity) where needed.
  - Drawer width: desktop large, tablet medium, mobile full-height sheet.
- **Breadcrumbs or section labels**
  - Use concise section labels globally; breadcrumbs only for deep IA depth (3+ levels) or settings subtrees.

## 4. Layout Rules
- **List/table pages**
  - Required for data-heavy entities.
  - Structure: PageHeader → TableToolbar/FilterBar → DataTable → Pagination/BulkAction surfaces.
  - Row selection is persistent; row action may open edit drawer on demand.
  - Forbidden: replacing table with dashboard tiles/cards on data-heavy routes.
- **Detail/edit pages**
  - Default pattern: table + on-demand drawer (Direction B).
  - Full-page edit is allowed when workflows exceed drawer complexity (multi-section, legal attestations, long forms).
  - Selection of row should not hard-navigate unless explicitly requested.
- **Settings pages**
  - Section-based vertical layout with titled groups and short descriptions.
  - Use structured form sections and sticky save/cancel footer for long pages.
  - Forbidden: disconnected stacks of decorative cards.
- **Dashboards**
  - Allowed as role-aware landing pages and “monitor then act” hubs.
  - Must include clear pathways into primary operational lists/tables.
  - Metric tiles remain compact; dashboard cannot displace table workflows on operational pages.
- **Empty states**
  - Table empty states appear within table frame and preserve toolbar/filter controls.
  - Form empty/sub-collection states provide explicit “add first item” affordance.
- **Modal or drawer usage**
  - Drawer: preferred for contextual detail/edit linked to current table/form context.
  - Modal: confirmation and short focused tasks only (destructive confirm, single-purpose picker).
  - Forbidden: multi-step form wizards in modals.

## 5. Responsive Rules
- **Desktop (≥1280)**
  - Sidebar expanded/collapsible.
  - Full toolbar visible; advanced filters may appear inline.
  - Tables show full configured columns; horizontal scroll for dense grids.
  - Edit/detail in right drawer; can coexist with visible table.
- **Tablet landscape (1024–1279)**
  - Sidebar as compact rail/flyout.
  - Preserve horizontal composition: table remains primary, drawer remains side-oriented when space permits.
  - Toolbar compacts but remains two-row max before overflow.
  - Filters partially inline + optional filter drawer.
- **Tablet portrait (768–1023)**
  - Sidebar collapses to overlay drawer.
  - Toolbar simplifies: key actions visible, secondary actions in overflow.
  - Filters move to slide-over drawer.
  - Table remains table (not card stack) with prioritized columns; horizontal scroll allowed.
  - Edit/detail uses overlay drawer.
- **Mobile (<768)**
  - Compact top bar and contextual page header.
  - Table remains condensed table where reasonable; minimal key columns + horizontal scroll.
  - Filters/details via drawers or bottom sheets.
  - Bulk actions appear in sticky contextual bar when rows selected.
- **Global responsive constraints**
  - Tablet landscape must not collapse into long mobile-style vertical stack.
  - Table views should remain tables whenever feasible.
  - Horizontal scrolling is acceptable for dense datasets.

## 6. Visual System
- **Color tokens**
  - Neutral foundation: `bg/base`, `bg/subtle`, `border/default`, `text/primary`, `text/muted`.
  - One primary accent: `brand/primary` (+hover/+active).
  - Semantic: `success`, `warning`, `error`, `info` (muted fills + strong text/icon).
- **Typography scale**
  - Page title: 28/34 semibold.
  - Section heading: 20/28 semibold.
  - Subsection heading: 16/24 medium.
  - Body: 14/20 regular.
  - Metadata/caption: 12/16 regular/medium.
- **Spacing scale**
  - 4, 8, 12, 16, 20, 24, 32, 40.
  - Layout rhythm anchored to 8px grid.
- **Radius scale**
  - `r-2` (small controls), `r-3` (panels), `r-4` (rare emphasis only).
  - No large pill/soft-rounded card language as default.
- **Border styles**
  - Default 1px neutral border.
  - Section dividers for hierarchy; avoid heavy boxed nesting.
- **Shadow styles**
  - Subtle depth only: low-elevation panel/drawer shadows.
  - Avoid layered/glowy effect stacks.
- **Icon usage rules**
  - 16/18px system icons for actions/status.
  - Icons support labels; icon-only actions require tooltip/aria-label.
- **Status colors**
  - Status badges/callouts use semantic palette with consistent contrast and non-color cues (icon/text).

## 7. Content Density
- **Compact mode**
  - Table row height: 32px.
  - Inputs: 32px control height.
  - Toolbar spacing reduced by one step.
  - Intended for power users on large datasets.
  - Availability: app-global user preference (not role-enforced default).
- **Default mode**
  - Table row height: 40px.
  - Inputs: 36–40px control height.
  - Standard spacing for mixed experience levels.
- **Form spacing**
  - Field vertical gap: 12–16px; section gap: 24–32px.
- **Toolbar spacing**
  - Primary controls grouped with 8px gaps; group-to-group 16px.

## 8. Interaction Rules
- **Hover/focus/active/disabled**
  - Hover: subtle bg/border shift.
  - Focus: visible high-contrast ring; keyboard focus always apparent.
  - Active: stronger border/text emphasis.
  - Disabled: reduced contrast + blocked interaction + tooltip where reason helpful.
- **Inline edit rules**
  - Inline edit is enabled globally across eligible table entities.
  - Allow inline edit only for low-risk fields (status, tags, assignee, date).
  - Complex or multi-field edits must open drawer/form.
  - Inline edits require explicit commit behavior (enter/check) and undo affordance when feasible.
- **Selection rules**
  - Row click sets selection.
  - Selection state remains while toolbar/filter changes unless data context invalidates.
  - Clear distinction between selected and merely hovered rows.
- **Bulk action rules**
  - BulkActionBar appears only when 1+ rows selected.
  - Actions are role-permission gated.
  - Destructive bulk actions require confirm dialog.
- **Save/cancel behavior**
  - Drawer/form edits use explicit Save/Cancel.
  - Warn on unsaved changes when dismissing drawer/navigating away.
- **Sticky action footer behavior for forms/settings**
  - Long forms/settings must use sticky footer with Save/Cancel and validation summary anchor.
- **Error and validation patterns**
  - Inline field-level messages are required.
  - Page-level summary used only for multi-error forms.
  - Server errors use concise callout with retry guidance.

## 9. Role-Based Rules
- **Navigation visibility**
  - Admin: full nav.
  - Manager: operational + team scopes.
  - Contributor: assigned-work and constrained config.
  - Viewer: read-only nav subset.
- **Action permissions**
  - Actions shown/hidden or disabled based on role and record state.
  - Avoid showing non-functional actions without explanatory state.
- **Data scope**
  - Admin global; Manager scoped by organization/team; Contributor scoped by ownership/assignment; Viewer read-only scoped visibility.
- **Field editability**
  - Same forms/tables across roles; per-field editability toggles read-only vs editable.
  - No role-specific visual redesign of pages.

## 10. Anti-Patterns
- Nested rounded cards as default page structure.
- Dashboard tiles replacing tables on data-heavy operational pages.
- Blind mobile-first stacking on tablet landscape.
- Decorative gradients/illustrations/marketing sections in app screens.
- Random accent color usage without semantic meaning.
- Excessive modal-driven workflows.
- Form/settings pages split into disconnected decorative containers.
- Separate layout systems per role.
- Drawer overuse for multi-step complex wizard flows better suited to full-page forms.
