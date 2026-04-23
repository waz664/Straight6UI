# SCREEN_TEMPLATES.md

Phase 4 templates implemented using approved components from `src/components/ui-system` and constrained by `UI_DESIGN_SPEC.md` + `COMPONENT_LIBRARY.md`.

## Implemented templates
1. **Data list page** → `DataListPageTemplate`
2. **Record detail page with right-side panel/drawer** → `RecordDetailWithPanelTemplate`
3. **Record create/edit page** → `RecordCreateEditPageTemplate`
4. **Settings page** → `SettingsPageTemplate`
5. **Role-specific dashboard** → `RoleSpecificDashboardTemplate`
6. **Mobile/tablet-adapted list page** → `AdaptiveListPageTemplate`

All templates are located in: `src/templates/screen-templates.tsx`.

## Compliance notes
- No new layout structures introduced outside approved app shell/table/form/drawer patterns.
- Templates compose only approved library components.
- Direction B behavior preserved: row selection first, edit drawer opened on demand.
- Dashboard retained as entry/navigation accelerator without replacing operational tables.
- Persisted density preference utility integrated via `useDensityPreference`.
- Typed data table row/column models provided via `data-table-types.ts`.
