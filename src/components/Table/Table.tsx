import type { Column, SortKey } from "../../types/table";
import "./Table.scss";

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: SortKey) => void;
  rowKey: (row: T) => string | number;
}

export function DataTable<T>({
  data,
  columns,
  onSort,
  rowKey,
}: DataTableProps<T>) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                // onClick={col.sortable ? () => onSort?.(col.key) : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col) => (
                <td key={col.key}>{col.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
