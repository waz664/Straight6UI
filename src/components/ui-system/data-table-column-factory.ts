import { DataColumnDef, DataRowBase } from "./data-table-types";

type ColumnInput<T extends DataRowBase, K extends keyof T> = Omit<DataColumnDef<T>, "key"> & {
  key: K;
};

export function createTableColumnFactory<T extends DataRowBase>() {
  return function makeColumn<K extends keyof T>(input: ColumnInput<T, K>): DataColumnDef<T> {
    return input;
  };
}

export function createTableColumns<T extends DataRowBase>(
  factory: ReturnType<typeof createTableColumnFactory<T>>,
  inputs: Array<ColumnInput<T, keyof T>>,
): Array<DataColumnDef<T>> {
  return inputs.map((input) => factory(input));
}
