import * as React from "react";
import {
  AppShell,
  BulkActionBar,
  CheckboxField,
  ColumnVisibilityMenu,
  ConfirmDialog,
  ContentToolbar,
  DataTable,
  DetailPanel,
  DrawerPanel,
  EmptyState,
  ErrorCallout,
  FieldRow,
  FilterBar,
  FormSection,
  InfoCallout,
  InlineValidationMessage,
  LoadingState,
  MetricTile,
  MultiSelectField,
  PageHeader,
  PaginationControls,
  RadioGroupField,
  SearchCommandBar,
  SectionHeader,
  SelectField,
  SidebarNav,
  StatusBadge,
  StickyFormFooter,
  SuccessCallout,
  TableToolbar,
  TextArea,
  TextInput,
  ToastNotification,
  ToggleField,
  TopBar,
  WarningCallout,
  createTableColumnFactory,
  createTableColumns,
  useDensityPreference,
} from "../components/ui-system";
import {
  AdaptiveListPageTemplate,
  DataListPageTemplate,
  RecordCreateEditPageTemplate,
  RecordDetailWithPanelTemplate,
  RoleSpecificDashboardTemplate,
  SettingsPageTemplate,
} from "../templates";
import { ReferenceStylePreview } from "./ReferenceStylePreview";
import "./reference-theme.css";

type DemoRow = {
  id: number;
  account: string;
  owner: string;
  region: "NA" | "EU" | "APAC";
  status: "Active" | "Pending" | "Blocked";
};

const demoRows: DemoRow[] = [
  { id: 1, account: "Northwind Logistics", owner: "A. Patel", region: "NA", status: "Active" },
  { id: 2, account: "EuroRetail Group", owner: "L. Meyer", region: "EU", status: "Pending" },
  { id: 3, account: "Pacific Health", owner: "K. Sato", region: "APAC", status: "Blocked" },
  { id: 4, account: "Summit Energy", owner: "R. Diaz", region: "NA", status: "Active" },
];

const c = createTableColumnFactory<DemoRow>();
const demoColumns = createTableColumns(c, [
  { key: "account", header: "Account", sortable: true },
  { key: "owner", header: "Owner", sortable: true },
  { key: "region", header: "Region", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => (
      <StatusBadge
        label={row.status}
        tone={row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "error"}
      />
    ),
  },
]);

const sections = ["Workbench", "Forms", "Feedback", "Utilities", "Templates", "Reference"] as const;

export function ExampleWebApp() {
  const [activeSection, setActiveSection] = React.useState<(typeof sections)[number]>("Workbench");
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [sortBy, setSortBy] = React.useState<keyof DemoRow>("account");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const { density, toggleDensity } = useDensityPreference();

  const filteredRows = demoRows.filter((r) => r.account.toLowerCase().includes(query.toLowerCase()));

  return (
    <AppShell>
      <div className="flex min-h-screen">
        <SidebarNav>
          <div className="border-b border-slate-200 p-3 text-sm font-semibold">Synthetic Demo App</div>
          <div className="space-y-1 p-2">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`block w-full rounded px-2 py-1 text-left text-sm ${activeSection === s ? "bg-slate-100" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </SidebarNav>

        <main className="min-w-0 flex-1">
          <TopBar>
            <div className="flex h-full items-center justify-between">
              <SearchCommandBar value={query} onChange={setQuery} placeholder="Search synthetic accounts" />
              <div className="text-sm text-slate-600">Density: {density}</div>
            </div>
          </TopBar>

          <PageHeader
            title="Straight6 UI Example Webapp"
            description="Non-functional synthetic-data app demonstrating all approved components, layouts, and control patterns."
            actions={
              <>
                <button className="rounded border border-slate-300 px-3 py-1.5 text-sm" onClick={toggleDensity}>
                  Toggle Density
                </button>
                <button className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white" onClick={() => setOpenDrawer(true)}>
                  Open Drawer
                </button>
              </>
            }
          />

          {activeSection === "Workbench" ? (
            <>
              <ContentToolbar>
                <FilterBar>
                  <SelectField defaultValue="all">
                    <option value="all">All Regions</option>
                    <option value="na">NA</option>
                    <option value="eu">EU</option>
                    <option value="apac">APAC</option>
                  </SelectField>
                  <ColumnVisibilityMenu trigger={<button className="rounded border border-slate-300 px-3 py-1.5 text-sm">Columns</button>}>
                    <label className="block text-sm"><input type="checkbox" defaultChecked /> Account</label>
                    <label className="block text-sm"><input type="checkbox" defaultChecked /> Owner</label>
                    <label className="block text-sm"><input type="checkbox" defaultChecked /> Region</label>
                    <label className="block text-sm"><input type="checkbox" defaultChecked /> Status</label>
                  </ColumnVisibilityMenu>
                </FilterBar>
              </ContentToolbar>

              <TableToolbar>
                <button className="rounded border border-slate-300 px-3 py-1.5 text-sm" onClick={() => setOpenConfirm(true)}>
                  Archive Selected
                </button>
              </TableToolbar>

              <DataTable
                rows={filteredRows}
                columns={demoColumns}
                rowDensity={density}
                sortBy={sortBy}
                sortDirection={sortDirection}
                selectedRowIds={selectedRows}
                onSortChange={(column, direction) => {
                  setSortBy(column);
                  setSortDirection(direction);
                }}
                onRowClick={(row) => {
                  setSelectedRows((prev) => (prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]));
                }}
                emptyState={<EmptyState title="No matching data" description="Try a different synthetic query." />}
              />

              <div className="flex">
                <div className="min-w-0 flex-1" />
                <DetailPanel open={selectedRows.length > 0}>
                  <div className="p-4 text-sm">
                    <p className="font-semibold">Detail Panel</p>
                    <p className="mt-1 text-slate-600">Selected row ids: {selectedRows.join(", ")}</p>
                  </div>
                </DetailPanel>
              </div>

              <PaginationControls page={1} totalPages={4} onPrev={() => undefined} onNext={() => undefined} />
              {selectedRows.length > 0 ? <BulkActionBar>{selectedRows.length} rows selected</BulkActionBar> : null}
            </>
          ) : null}

          {activeSection === "Forms" ? (
            <div className="bg-white px-6">
              <FormSection title="Example Form Controls" description="All form primitives with synthetic inputs.">
                <FieldRow label="Text Input" hint="Single-line value">
                  <TextInput defaultValue="Synthetic Project" />
                </FieldRow>
                <FieldRow label="Text Area" hint="Multi-line value">
                  <TextArea defaultValue="This is demo-only form content." />
                </FieldRow>
                <FieldRow label="Select Field">
                  <SelectField defaultValue="manager">
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="contributor">Contributor</option>
                    <option value="viewer">Viewer</option>
                  </SelectField>
                </FieldRow>
                <FieldRow label="Multi Select">
                  <MultiSelectField defaultValue={["alerts", "daily"]}>
                    <option value="alerts">Alerts</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Summary</option>
                  </MultiSelectField>
                </FieldRow>
                <FieldRow label="Toggle">
                  <ToggleField checked onChange={() => undefined} label="Enable SLA notifications" />
                </FieldRow>
                <FieldRow label="Radio Group">
                  <RadioGroupField
                    value="strict"
                    onChange={() => undefined}
                    options={[
                      { label: "Strict", value: "strict" },
                      { label: "Moderate", value: "moderate" },
                      { label: "Relaxed", value: "relaxed" },
                    ]}
                  />
                </FieldRow>
                <FieldRow label="Checkbox">
                  <CheckboxField checked onChange={() => undefined} label="Require approval before publish" />
                </FieldRow>
                <FieldRow label="Validation Example">
                  <TextInput defaultValue="" aria-invalid />
                  <InlineValidationMessage message="This synthetic field is required." />
                </FieldRow>
              </FormSection>
              <StickyFormFooter>
                <div className="flex justify-end gap-2">
                  <button className="rounded border border-slate-300 px-3 py-1.5 text-sm">Cancel</button>
                  <button className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white" onClick={() => setShowToast(true)}>
                    Save (Demo)
                  </button>
                </div>
              </StickyFormFooter>
            </div>
          ) : null}

          {activeSection === "Feedback" ? (
            <div className="space-y-3 p-6">
              <InfoCallout title="Info">This is informational synthetic guidance.</InfoCallout>
              <WarningCallout title="Warning">Synthetic warning for configuration mismatch.</WarningCallout>
              <ErrorCallout title="Error">Synthetic error for demo behavior.</ErrorCallout>
              <SuccessCallout title="Success">Synthetic save completed.</SuccessCallout>
              <LoadingState label="Loading synthetic records..." />
            </div>
          ) : null}

          {activeSection === "Utilities" ? (
            <div className="space-y-6 p-6">
              <SectionHeader title="Utility Components" description="Status and metrics using synthetic values." />
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge label="Active" tone="success" />
                <StatusBadge label="Pending" tone="warning" />
                <StatusBadge label="Blocked" tone="error" />
                <StatusBadge label="Info" tone="info" />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <MetricTile label="Open Records" value="142" delta="+8" />
                <MetricTile label="Pending Reviews" value="27" delta="-3" />
                <MetricTile label="SLA Breaches" value="4" delta="+1" />
              </div>
            </div>
          ) : null}

          {activeSection === "Templates" ? (
            <div className="space-y-8 p-6">
              <SectionHeader title="Template Showcase" description="Phase 4 templates rendered with synthetic data." />
              <div className="border border-slate-200"><RoleSpecificDashboardTemplate role="Manager" /></div>
              <div className="border border-slate-200"><DataListPageTemplate /></div>
              <div className="border border-slate-200"><RecordDetailWithPanelTemplate /></div>
              <div className="border border-slate-200"><RecordCreateEditPageTemplate /></div>
              <div className="border border-slate-200"><SettingsPageTemplate /></div>
              <div className="border border-slate-200"><AdaptiveListPageTemplate /></div>
            </div>
          ) : null}

          {activeSection === "Reference" ? (
            <div className="space-y-6 p-6">
              <SectionHeader
                title="Reference HTML Style Preview"
                description="Optional palette + styling example derived from your reference HTML. Baseline system remains unchanged."
              />
              <ReferenceStylePreview />
            </div>
          ) : null}
        </main>
      </div>

      <DrawerPanel open={openDrawer} onClose={() => setOpenDrawer(false)} title="Demo Drawer">
        <p className="text-sm text-slate-700">This drawer demonstrates contextual side-panel behavior using synthetic content.</p>
      </DrawerPanel>

      <ConfirmDialog
        open={openConfirm}
        title="Archive selected rows?"
        description="This action is non-functional and used for demonstration only."
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => {
          setOpenConfirm(false);
          setShowToast(true);
        }}
      />

      {showToast ? <ToastNotification message="Demo action completed." /> : null}
    </AppShell>
  );
}
