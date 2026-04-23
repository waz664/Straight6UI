import * as React from "react";
import { cn } from "./utils";
import { DataColumnDef, DataTableProps, SortDirection } from "./data-table-types";

function sortRows<T>(rows: T[], sortBy?: keyof T, sortDirection?: SortDirection): T[] {
  if (!sortBy || !sortDirection) return rows;

  const sorted = [...rows].sort((a, b) => {
    const av = a[sortBy];
    const bv = b[sortBy];
    if (av === bv) return 0;
    if (av === null || av === undefined) return -1;
    if (bv === null || bv === undefined) return 1;
    return String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: "base" });
  });

  return sortDirection === "asc" ? sorted : sorted.reverse();
}

function headerButtonClass(sortable: boolean) {
  return sortable ? "cursor-pointer select-none" : "";
}

export function DataTable<T extends { id: string | number }>({
  rows,
  columns,
  className,
  onRowClick,
  selectedRowIds = [],
  onSortChange,
  sortBy,
  sortDirection,
  rowDensity = "default",
  emptyState,
}: DataTableProps<T>) {
  const visibleColumns = columns.filter((c) => !c.hidden);
  const renderedRows = sortRows(rows, sortBy, sortDirection);
  const rowClass = rowDensity === "compact" ? "h-8" : "h-10";

  return (
    <div className={cn("overflow-auto border border-slate-200 bg-white", className)}>
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            {visibleColumns.map((column) => (
              <th
                key={column.key}
                className={cn("whitespace-nowrap border-b border-slate-200 px-3 py-2 font-medium text-slate-700", headerButtonClass(!!column.sortable))}
                onClick={() => {
                  if (!column.sortable || !onSortChange) return;
                  const nextDirection: SortDirection =
                    sortBy === column.key && sortDirection === "asc" ? "desc" : "asc";
                  onSortChange(column.key, nextDirection);
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderedRows.length === 0 ? (
            <tr>
              <td className="px-3 py-6 text-center text-slate-500" colSpan={Math.max(1, visibleColumns.length)}>
                {emptyState ?? "No records found."}
              </td>
            </tr>
          ) : (
            renderedRows.map((row) => {
              const selected = selectedRowIds.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className={cn(
                    rowClass,
                    "border-b border-slate-200",
                    selected ? "bg-blue-50" : "bg-white hover:bg-slate-50",
                    onRowClick ? "cursor-pointer" : "",
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {visibleColumns.map((column) => (
                    <td key={`${row.id}-${column.key}`} className="whitespace-nowrap px-3 py-2 text-slate-800">
                      {column.render ? column.render(row) : String(row[column.key] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export function TableToolbar({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("flex flex-wrap items-center gap-2 border border-slate-200 border-b-0 bg-white px-4 py-2", className)}>{children}</div>;
}

export function FilterBar({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("flex flex-wrap items-center gap-2", className)}>{children}</div>;
}

export function ColumnVisibilityMenu({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) {
  return (
    <details className="relative">
      <summary className="cursor-pointer list-none">{trigger}</summary>
      <div className="absolute right-0 z-10 mt-2 min-w-48 border border-slate-200 bg-white p-2 shadow-sm">{children}</div>
    </details>
  );
}

export function BulkActionBar({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("sticky bottom-0 flex items-center gap-2 border-t border-slate-200 bg-slate-900 px-4 py-2 text-white", className)}>{children}</div>;
}

export function PaginationControls({
  page,
  totalPages,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-2 border border-slate-200 border-t-0 bg-white px-4 py-2 text-sm">
      <span>
        Page {page} of {totalPages}
      </span>
      <button onClick={onPrev} className="rounded border border-slate-300 px-2 py-1">
        Prev
      </button>
      <button onClick={onNext} className="rounded border border-slate-300 px-2 py-1">
        Next
      </button>
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-2 border border-dashed border-slate-300 bg-white p-8 text-center">
      <h3 className="text-base font-semibold">{title}</h3>
      {description ? <p className="max-w-md text-sm text-slate-600">{description}</p> : null}
      {action}
    </div>
  );
}

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return <div className="animate-pulse border border-slate-200 bg-white p-6 text-sm text-slate-600">{label}</div>;
}

export type { DataColumnDef };
