import * as React from "react";
import {
  AppShell,
  BulkActionBar,
  ContentToolbar,
  DataTable,
  DrawerPanel,
  FieldRow,
  FilterBar,
  FormSection,
  MetricTile,
  PageHeader,
  PaginationControls,
  SearchCommandBar,
  SectionHeader,
  SidebarNav,
  StatusBadge,
  StickyFormFooter,
  TableToolbar,
  TextInput,
  TopBar,
  createTableColumnFactory,
  createTableColumns,
  useDensityPreference,
} from "../components/ui-system";

type Role = "Admin" | "Manager" | "Contributor" | "Viewer";

type RecordRow = {
  id: number;
  name: string;
  owner: string;
  status: "Active" | "Pending" | "Blocked";
  updatedAt: string;
};

const sampleRows: RecordRow[] = [
  { id: 101, name: "Acme Renewal", owner: "Maya", status: "Active", updatedAt: "2026-04-20" },
  { id: 102, name: "Q2 Budget", owner: "Alex", status: "Pending", updatedAt: "2026-04-18" },
  { id: 103, name: "Vendor Review", owner: "Jules", status: "Blocked", updatedAt: "2026-04-15" },
];

const recordColumn = createTableColumnFactory<RecordRow>();
const columns = createTableColumns(recordColumn, [
  { key: "name", header: "Name", sortable: true },
  { key: "owner", header: "Owner", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => <StatusBadge label={row.status} tone={row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "error"} />,
  },
  { key: "updatedAt", header: "Updated", sortable: true },
]);

function ShellFrame({ children, role = "Manager" }: React.PropsWithChildren<{ role?: Role }>) {
  return (
    <AppShell>
      <div className="flex min-h-screen">
        <SidebarNav>
          <div className="p-3 text-sm font-semibold">Straight6UI</div>
          <nav className="space-y-1 p-2 text-sm">
            <div className="rounded bg-slate-100 px-2 py-1">Dashboard</div>
            <div className="px-2 py-1">Records</div>
            <div className="px-2 py-1">Settings</div>
            {role === "Admin" ? <div className="px-2 py-1">Admin</div> : null}
          </nav>
        </SidebarNav>
        <main className="min-w-0 flex-1">
          <TopBar>
            <div className="flex h-full items-center justify-between">
              <SearchCommandBar value="" onChange={() => undefined} placeholder="Search records" />
              <div className="text-sm text-slate-600">Role: {role}</div>
            </div>
          </TopBar>
          {children}
        </main>
      </div>
    </AppShell>
  );
}

// 1) Data list page
export function DataListPageTemplate() {
  const [selected, setSelected] = React.useState<Array<number>>([]);
  const [sortBy, setSortBy] = React.useState<keyof RecordRow>("updatedAt");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc");
  const { density } = useDensityPreference();

  return (
    <ShellFrame>
      <PageHeader title="Records" description="Operational list with sorting, filtering, and bulk actions." />
      <ContentToolbar>
        <FilterBar>
          <TextInput placeholder="Filter by name" />
          <button className="rounded border border-slate-300 px-3 py-1.5 text-sm">Status</button>
        </FilterBar>
      </ContentToolbar>
      <TableToolbar>
        <button className="rounded border border-slate-300 px-3 py-1.5 text-sm">Export</button>
      </TableToolbar>
      <DataTable
        rows={sampleRows}
        columns={columns}
        selectedRowIds={selected}
        sortBy={sortBy}
        sortDirection={sortDirection}
        rowDensity={density}
        onSortChange={(column, direction) => {
          setSortBy(column);
          setSortDirection(direction);
        }}
        onRowClick={(row) => {
          setSelected((prev) => (prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]));
        }}
      />
      <PaginationControls page={1} totalPages={12} onPrev={() => undefined} onNext={() => undefined} />
      {selected.length > 0 ? <BulkActionBar>{selected.length} selected · Bulk actions</BulkActionBar> : null}
    </ShellFrame>
  );
}

// 2) Record detail page with right-side panel/drawer behavior
export function RecordDetailWithPanelTemplate() {
  const [selectedRow, setSelectedRow] = React.useState<RecordRow | null>(sampleRows[0]);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { density } = useDensityPreference();

  return (
    <ShellFrame>
      <PageHeader title="Records" description="Select a row, then open edit drawer on demand." />
      <DataTable rows={sampleRows} columns={columns} rowDensity={density} selectedRowIds={selectedRow ? [selectedRow.id] : []} onRowClick={setSelectedRow} />
      <div className="border-x border-b border-slate-200 bg-white px-4 py-3">
        <button className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white" onClick={() => setOpenDrawer(true)} disabled={!selectedRow}>
          Edit Selected Record
        </button>
      </div>
      <DrawerPanel open={openDrawer} onClose={() => setOpenDrawer(false)} title={selectedRow ? `Edit: ${selectedRow.name}` : "Edit"}>
        <FormSection title="Record Details" description="Contextual edit in drawer.">
          <FieldRow label="Name">
            <TextInput defaultValue={selectedRow?.name} />
          </FieldRow>
          <FieldRow label="Owner">
            <TextInput defaultValue={selectedRow?.owner} />
          </FieldRow>
        </FormSection>
        <StickyFormFooter>
          <div className="flex justify-end gap-2">
            <button className="rounded border border-slate-300 px-3 py-1.5 text-sm" onClick={() => setOpenDrawer(false)}>
              Cancel
            </button>
            <button className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white">Save</button>
          </div>
        </StickyFormFooter>
      </DrawerPanel>
    </ShellFrame>
  );
}

// 3) Record create/edit page
export function RecordCreateEditPageTemplate() {
  const contactColumn = createTableColumnFactory<{ id: number; type: string; value: string }>();
  return (
    <ShellFrame role="Contributor">
      <PageHeader title="Create Record" description="Structured form view for non-table workflow." />
      <div className="bg-white px-6">
        <FormSection title="Primary Information" description="Atomic fields and selections.">
          <FieldRow label="Record Name">
            <TextInput placeholder="Enter record name" />
          </FieldRow>
          <FieldRow label="Owner">
            <TextInput placeholder="Select owner" />
          </FieldRow>
        </FormSection>
        <FormSection title="Contact Methods" description="Multi-record data represented in table form.">
          <DataTable
            rows={[
              { id: 1, type: "Phone", value: "+1 555-0123" },
              { id: 2, type: "Address", value: "101 Main St" },
            ]}
            columns={createTableColumns(contactColumn, [
              { key: "type", header: "Type" },
              { key: "value", header: "Value" },
            ])}
          />
        </FormSection>
      </div>
      <StickyFormFooter>
        <div className="flex justify-end gap-2">
          <button className="rounded border border-slate-300 px-3 py-1.5 text-sm">Cancel</button>
          <button className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white">Save Record</button>
        </div>
      </StickyFormFooter>
    </ShellFrame>
  );
}

// 4) Settings page
export function SettingsPageTemplate() {
  return (
    <ShellFrame role="Admin">
      <PageHeader title="Settings" description="Section-based configuration with sticky save controls." />
      <div className="bg-white px-6">
        <FormSection title="Organization Defaults" description="Global defaults for records and approvals.">
          <FieldRow label="Approval SLA (hours)">
            <TextInput defaultValue="24" />
          </FieldRow>
        </FormSection>
        <FormSection title="Notification Policies" description="Control role-based email delivery settings.">
          <FieldRow label="Digest Schedule">
            <TextInput defaultValue="Daily" />
          </FieldRow>
        </FormSection>
      </div>
      <StickyFormFooter>
        <div className="flex justify-end gap-2">
          <button className="rounded border border-slate-300 px-3 py-1.5 text-sm">Cancel</button>
          <button className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white">Save Changes</button>
        </div>
      </StickyFormFooter>
    </ShellFrame>
  );
}

// 5) Role-specific dashboard
export function RoleSpecificDashboardTemplate({ role = "Manager" }: { role?: Role }) {
  return (
    <ShellFrame role={role}>
      <PageHeader title={`${role} Dashboard`} description="Summary first, then action into operational tables." />
      <div className="space-y-6 p-6">
        <section>
          <SectionHeader title="Today" description="Current workload snapshot" />
          <div className="grid gap-3 md:grid-cols-3">
            <MetricTile label="Open Records" value="142" delta="+8 today" />
            <MetricTile label="Pending Approval" value="19" delta="-2 today" />
            <MetricTile label="Blocked" value="6" delta="+1 today" />
          </div>
        </section>
        <section>
          <SectionHeader title="Needs Attention" description="Direct path into execution." />
          <DataTable rows={sampleRows} columns={columns} />
        </section>
      </div>
    </ShellFrame>
  );
}

// 6) Mobile/tablet-adapted list page
export function AdaptiveListPageTemplate() {
  const { density, toggleDensity } = useDensityPreference();
  const [selected, setSelected] = React.useState<Array<number>>([]);
  const [openFilters, setOpenFilters] = React.useState(false);

  return (
    <ShellFrame>
      <PageHeader title="Records" description="Responsive list keeping table semantics on smaller screens." />
      <ContentToolbar>
        <button className="rounded border border-slate-300 px-3 py-1.5 text-sm" onClick={() => setOpenFilters(true)}>
          Filters
        </button>
        <button className="rounded border border-slate-300 px-3 py-1.5 text-sm" onClick={toggleDensity}>
          Density: {density}
        </button>
      </ContentToolbar>
      <DataTable
        rows={sampleRows}
        columns={columns}
        selectedRowIds={selected}
        rowDensity={density}
        onRowClick={(row) => setSelected((prev) => (prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]))}
      />
      {selected.length > 0 ? <BulkActionBar>{selected.length} selected</BulkActionBar> : null}
      <DrawerPanel open={openFilters} onClose={() => setOpenFilters(false)} title="Filters">
        <FormSection title="Filter Records" description="Tablet/mobile filter drawer pattern.">
          <FieldRow label="Search">
            <TextInput placeholder="Type to filter" />
          </FieldRow>
        </FormSection>
      </DrawerPanel>
    </ShellFrame>
  );
}
