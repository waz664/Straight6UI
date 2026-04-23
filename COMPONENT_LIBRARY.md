# COMPONENT_LIBRARY.md

This library implements approved Phase 3 reusable primitives for a Direction B system (table-first, global inline edit, drawer-on-demand), while preserving dashboard and form-based workflows.

## Global conventions
- **Allowed sizes:** `sm`, `md`, `lg` where meaningful; default `md`.
- **States baseline:** default, hover, focus-visible, active, disabled, loading, error where relevant.
- **Accessibility baseline:** keyboard reachable, visible focus, semantic labels/roles, color not sole status indicator.
- **Usage baseline:** components are reusable building blocks only; avoid page-specific styling overrides.

---

## A. App Shell Components

### AppShell
- **Purpose:** top-level application frame container.
- **Allowed variants/sizes:** default only.
- **States:** default.
- **Accessibility:** landmark structure via child layout regions.
- **Use:** all authenticated app routes.
- **Do not use:** marketing/public landing pages.
- **Composition example:** `AppShell + SidebarNav + TopBar + PageHeader + ContentToolbar`.

### SidebarNav
- **Purpose:** role-aware primary navigation.
- **Allowed variants:** expanded, collapsed rail, overlay.
- **Sizes:** rail (compact), full.
- **States:** active item, hover item, collapsed, hidden.
- **Accessibility:** `aria-label`, keyboard navigation, active item semantics.
- **Use:** desktop/tablet landscape/overlay in small screens.
- **Do not use:** local in-page tab replacement.
- **Composition example:** `AppShell > SidebarNav + main content`.

### TopBar
- **Purpose:** global utilities (search/account/notifications).
- **Allowed variants:** standard, compact.
- **Sizes:** md, sm.
- **States:** default, sticky.
- **Accessibility:** controls labeled and keyboard reachable.
- **Use:** all authenticated screens.
- **Do not use:** per-widget local toolbar.

### PageHeader
- **Purpose:** page identity and top-level actions.
- **Allowed variants:** with/without description, with action group.
- **Sizes:** default.
- **States:** default.
- **Accessibility:** one `h1` per page.
- **Use:** all primary pages.
- **Do not use:** nested inside cards/panels repeatedly.

### ContentToolbar
- **Purpose:** page-scoped operations (filter/export/view controls).
- **Allowed variants:** single-row, wrapped multi-row.
- **Sizes:** compact/default.
- **States:** with selection context.
- **Accessibility:** grouped controls with labels.
- **Use:** table and dense form pages.
- **Do not use:** global nav replacement.

### DetailPanel
- **Purpose:** persistent side detail on wide viewports.
- **Allowed variants:** read-only detail, mixed detail/action.
- **Sizes:** md, lg width.
- **States:** open/closed/loading.
- **Accessibility:** labeled complementary region.
- **Use:** desktop inspection context.
- **Do not use:** mobile primary detail container.

### DrawerPanel
- **Purpose:** on-demand contextual detail/edit surface.
- **Allowed variants:** right drawer, full-height mobile sheet.
- **Sizes:** md/lg desktop, full mobile.
- **States:** open/closed, dirty, saving.
- **Accessibility:** modal semantics, focus management, escape close.
- **Use:** Direction B row-selected edit, filter drawers, contextual forms.
- **Do not use:** long multi-step wizard flows.

---

## B. Data Components

### DataTable
- **Purpose:** primary data interaction surface.
- **Allowed variants:** standard, compact density.
- **Sizes:** full width; horizontally scrollable dense mode.
- **States:** loading, empty, selected rows, sortable columns.
- **Accessibility:** semantic table markup and header associations.
- **Use:** all data-heavy list pages.
- **Do not use:** replace with card grids for dense datasets.
- **Composition example:** `TableToolbar + DataTable + PaginationControls + BulkActionBar`.

### TableToolbar
- **Purpose:** table command and view controls.
- **Allowed variants:** basic, advanced filter mode.
- **Sizes:** compact/default.
- **States:** normal, filtered, loading.
- **Accessibility:** control labels and grouping.
- **Use:** above DataTable.
- **Do not use:** dashboard metric strip.

### FilterBar
- **Purpose:** filter chips/inputs/toggles.
- **Allowed variants:** inline or drawer-hosted.
- **Sizes:** compact/default.
- **States:** active/inactive filter states.
- **Accessibility:** clear labels + removable filter controls.
- **Use:** table and searchable collections.
- **Do not use:** as page header substitute.

### ColumnVisibilityMenu
- **Purpose:** per-table visible-column management.
- **Allowed variants:** checkbox list with reset.
- **Sizes:** default.
- **States:** open/closed.
- **Accessibility:** menu semantics and keyboard support.
- **Use:** data tables with optional columns.
- **Do not use:** permissions management UI.

### BulkActionBar
- **Purpose:** selected-row actions.
- **Allowed variants:** sticky bottom/context bar.
- **Sizes:** default.
- **States:** hidden when no rows selected.
- **Accessibility:** announce selection count.
- **Use:** only when selection count > 0.
- **Do not use:** always-visible action area.

### PaginationControls
- **Purpose:** page navigation for lists.
- **Allowed variants:** simple prev/next, numbered.
- **Sizes:** compact/default.
- **States:** first/last-page disabled, loading.
- **Accessibility:** button labels and page announcement.
- **Use:** paginated tables/lists.
- **Do not use:** virtualized infinite list without pagination mode.

### EmptyState
- **Purpose:** clear no-data and first-run guidance.
- **Allowed variants:** no results, no records yet.
- **Sizes:** standard block.
- **States:** static/actionable.
- **Accessibility:** descriptive heading and optional action.
- **Use:** inside table/form contexts.
- **Do not use:** decorative filler.

### LoadingState
- **Purpose:** loading placeholder while data resolves.
- **Allowed variants:** table loading, section loading.
- **Sizes:** compact/default.
- **States:** active.
- **Accessibility:** announce loading status.
- **Use:** async content transitions.
- **Do not use:** long-term blocked state replacement for error UI.

---

## C. Form Components

### FormSection
- **Purpose:** titled grouped settings/data-entry section.
- **Allowed variants:** standard, advanced (collapsible wrapper by composition).
- **Sizes:** default.
- **States:** expanded/collapsed (if composed).
- **Accessibility:** heading hierarchy and descriptions.
- **Use:** settings and record forms.
- **Do not use:** card-stack mimicry.

### FieldRow
- **Purpose:** label/control/help/error alignment row.
- **Allowed variants:** single control, composed control block.
- **Sizes:** default.
- **States:** default/error/disabled.
- **Accessibility:** label association + error linkage.
- **Use:** structured forms.
- **Do not use:** free-form unaligned control placement.

### TextInput / TextArea / SelectField / MultiSelectField
- **Purpose:** atomic text and selection inputs.
- **Allowed variants:** default and disabled; select supports placeholder option.
- **Sizes:** compact/default.
- **States:** default/focus/error/disabled.
- **Accessibility:** associated labels and aria-invalid in error states.
- **Use:** standard form capture.
- **Do not use:** ad hoc styled inputs outside system tokens.

### ToggleField / RadioGroupField / CheckboxField
- **Purpose:** boolean or mutually exclusive selections.
- **Allowed variants:** inline and stacked label styles.
- **Sizes:** default.
- **States:** checked/unchecked/disabled.
- **Accessibility:** grouped labels and keyboard selection semantics.
- **Use:** settings/preferences and short forms.
- **Do not use:** dense tabular multi-edit without clear labels.

### InlineValidationMessage
- **Purpose:** specific field-level validation feedback.
- **Allowed variants:** error (required), warning (optional by tone extension).
- **Sizes:** compact text.
- **States:** visible/hidden.
- **Accessibility:** linked to invalid fields.
- **Use:** directly beneath field controls.
- **Do not use:** as only page-level error summary.

### StickyFormFooter
- **Purpose:** persistent save/cancel area on long forms/settings.
- **Allowed variants:** primary/secondary action sets.
- **Sizes:** default.
- **States:** pristine/dirty/saving/disabled.
- **Accessibility:** consistent tab order and button labeling.
- **Use:** long form and settings pages.
- **Do not use:** short dialogs.

---

## D. Feedback Components

### InfoCallout / WarningCallout / ErrorCallout / SuccessCallout
- **Purpose:** semantic status messaging used sparingly.
- **Allowed variants:** info/warning/error/success tones.
- **Sizes:** default.
- **States:** visible/hidden.
- **Accessibility:** role/status semantics and clear text.
- **Use:** meaningful system/user feedback.
- **Do not use:** decorative emphasis or repetitive banner clutter.

### ConfirmDialog
- **Purpose:** destructive/high-impact action confirmation.
- **Allowed variants:** confirm/cancel.
- **Sizes:** sm/md.
- **States:** open/closed/loading confirm.
- **Accessibility:** dialog semantics, focus trap, escape close.
- **Use:** deletes, irreversible bulk actions.
- **Do not use:** long data-entry workflows.

### ToastNotification
- **Purpose:** transient operation result feedback.
- **Allowed variants:** success/info/error (tone composition).
- **Sizes:** compact.
- **States:** enter/visible/exit.
- **Accessibility:** polite live-region behavior.
- **Use:** post-save/post-action confirmation.
- **Do not use:** critical blocking errors requiring immediate action.

---

## E. Utility Components

### StatusBadge
- **Purpose:** compact status representation in rows/headers.
- **Allowed variants:** neutral/success/warning/error/info.
- **Sizes:** compact.
- **States:** static.
- **Accessibility:** include textual status label.
- **Use:** tables, detail headers, forms.
- **Do not use:** standalone key metric replacement.

### SectionHeader
- **Purpose:** subsection heading with optional local actions.
- **Allowed variants:** title-only, title+description, actions.
- **Sizes:** default.
- **States:** default.
- **Accessibility:** heading semantics.
- **Use:** dashboard blocks, form subsections, detail sections.
- **Do not use:** replace page-level `PageHeader`.

### MetricTile
- **Purpose:** compact dashboard metric summary.
- **Allowed variants:** value-only, value+delta.
- **Sizes:** compact/default.
- **States:** normal/loading (by composition).
- **Accessibility:** meaningful labels and value context.
- **Use:** dashboard and role landing pages.
- **Do not use:** replacing table/list primary surfaces on data-heavy pages.

### SearchCommandBar
- **Purpose:** command/search entry point.
- **Allowed variants:** inline toolbar, top-bar embed.
- **Sizes:** default.
- **States:** idle/focused.
- **Accessibility:** labeled input with keyboard access.
- **Use:** global/page search affordance.
- **Do not use:** sole filtering method where explicit filters are required.

---

## Composition guidance
- **Data list (Direction B):** `PageHeader -> ContentToolbar -> TableToolbar/FilterBar -> DataTable -> PaginationControls`; row selection + optional `BulkActionBar`; open `DrawerPanel` on demand.
- **Form-style view:** `PageHeader -> FormSection + FieldRow + input components`; multi-record fields can embed `DataTable` for repeatable collections (e.g., addresses/phones).
- **Dashboard-to-workflow:** `PageHeader -> MetricTile/SectionHeader summary -> linked operational DataTable views`.

## Enforcement notes
- Inline edit is globally enabled for low-risk fields; complex edits escalate to drawer/form.
- Compact density mode remains a user-level preference and should persist across sessions.
