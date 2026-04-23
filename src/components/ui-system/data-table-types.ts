import * as React from "react";

export type SortDirection = "asc" | "desc";

export interface DataRowBase {
  id: string | number;
}

export interface DataColumnDef<T extends DataRowBase> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  hidden?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T extends DataRowBase> {
  rows: T[];
  columns: Array<DataColumnDef<T>>;
  onRowClick?: (row: T) => void;
  selectedRowIds?: Array<T["id"]>;
  onSortChange?: (column: keyof T, direction: SortDirection) => void;
  sortBy?: keyof T;
  sortDirection?: SortDirection;
  rowDensity?: "default" | "compact";
  emptyState?: React.ReactNode;
  className?: string;
}
