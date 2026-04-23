# CODEX_UI_RULES.md

These are hard constraints for all future UI code generation in this repository.

## 1) Mandatory components to use
- Use components from `src/components/ui-system` for all application screens.
- Required shell primitives:
  - `AppShell`, `SidebarNav`, `TopBar`, `PageHeader`, `ContentToolbar`, `DetailPanel`, `DrawerPanel`.
- Required data primitives:
  - `DataTable`, `TableToolbar`, `FilterBar`, `ColumnVisibilityMenu`, `BulkActionBar`, `PaginationControls`, `EmptyState`, `LoadingState`.
- Required form primitives:
  - `FormSection`, `FieldRow`, `TextInput`, `TextArea`, `SelectField`, `MultiSelectField`, `ToggleField`, `RadioGroupField`, `CheckboxField`, `InlineValidationMessage`, `StickyFormFooter`.
- Required feedback primitives:
  - `InfoCallout`, `WarningCallout`, `ErrorCallout`, `SuccessCallout`, `ConfirmDialog`, `ToastNotification`.
- Required utility primitives:
  - `StatusBadge`, `SectionHeader`, `MetricTile`, `SearchCommandBar`.
- Typed table definitions must use:
  - `DataColumnDef`, `DataTableProps`, `createTableColumnFactory`, `createTableColumns`.

## 2) Prohibited patterns
- Nested rounded cards as default page structure.
- Dashboard tiles replacing table/grid on data-heavy pages.
- Random non-semantic accent colors.
- Decorative gradients/illustrations/marketing sections inside product screens.
- Excessive modal workflows where drawer or inline context is suitable.
- Separate visual systems per role.
- Blind mobile-stack collapse applied to tablet landscape.
- Form/settings screens composed as disconnected decorative cards.

## 3) Responsive rules (mandatory)
- **Desktop (>=1280)**: fixed/collapsible left sidebar + top bar + page header + content toolbar + primary content + optional right detail panel.
- **Tablet landscape (1024-1279)**: collapsed rail/compact nav; preserve horizontal composition; keep table + drawer split where practical.
- **Tablet portrait (768-1023)**: sidebar as overlay; keep strong header/toolbar hierarchy; use drawers for filters/details.
- **Mobile (<768)**: simplified shell; keep condensed tables where reasonable; allow horizontal table scrolling; use drawers/sheets for filters/details.

## 4) Spacing and typography rules
- Use the restrained scale defined in `UI_DESIGN_SPEC.md`.
- Preserve hierarchy:
  - strong page title,
  - clear section heading,
  - restrained body text,
  - muted metadata.
- Keep shadows subtle and borders explicit for structure.
- Use radius sparingly and consistently.

## 5) Role and permission rules
- Supported roles: `Admin`, `Manager`, `Contributor`, `Viewer`.
- Role differences are limited to:
  - nav visibility,
  - visible actions,
  - editable vs read-only fields,
  - data scope.
- Layout structure must remain consistent across roles.

## 6) Table rules (mandatory)
- Data-heavy screens must use a real `DataTable`/grid as primary interaction surface.
- Tables must support sorting, filtering, selection, and pagination/virtualization.
- Horizontal scrolling is allowed for dense tables.
- Row click behavior must be consistent by entity.
- Bulk actions appear only when rows are selected.
- Detail/edit inspection should prefer right panel/drawer over page churn where practical.

## 7) Settings page rules
- Settings pages must be section-based, using `FormSection` + `FieldRow`.
- Related options grouped under titled sections with brief descriptions.
- Save/Cancel actions must use `StickyFormFooter` on long pages.
- Validation must be inline and specific.
- Advanced options should use progressive disclosure.

## 8) Drawer usage rules
- Drawers are allowed for:
  - row-contextual detail/edit,
  - tablet/mobile filters,
  - short contextual forms.
- Direction B behavior is mandatory:
  - row selection first,
  - edit drawer opens on demand.
- Drawers are not allowed for long multi-step wizard workflows.

## 9) Modal usage rules
- Modals are allowed only for:
  - confirmation,
  - destructive actions,
  - short focused tasks.
- Long/complex forms must not be built in modals.

## 10) Density preference rule
- Density preference is app-global and user-controlled.
- Use `useDensityPreference` for all table density toggles.
- Persist to shared storage key; do not implement per-page conflicting density state.

## 11) Change-control rule
- New components, new layout patterns, or deviations from these rules require explicit approval.
- If a new feature needs a new pattern, submit as a spec change request before implementation.
