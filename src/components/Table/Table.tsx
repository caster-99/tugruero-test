import type { Column, SortKey } from "../../types/table";
import "./Table.scss";
import { HiArrowsUpDown } from "react-icons/hi2";

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: SortKey) => void;
  rowKey: (row: T) => string | number;
  sortKey?: SortKey;
  sortOrder?: "asc" | "desc";
}
const SortArrow = ({
  activeSortKey,
  sortOrder,
  columnKey,
}: {
  activeSortKey: SortKey | null;
  sortOrder: "asc" | "desc";
  columnKey: SortKey;
}) => {
  if (activeSortKey !== columnKey) return null;

  return (
    <span className="sort-arrow">
      <HiArrowsUpDown />
    </span>
  );
};

export function DataTable<T>({
  data,
  columns,
  onSort,
  rowKey,
  sortOrder,
}: DataTableProps<T>) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => {
                  if (!col.sortable) return;
                  onSort && onSort(col.sortKey as SortKey);
                }}
              >
                {col.label}
                {col.sortable && (
                  <SortArrow
                    activeSortKey={col.sortKey as SortKey}
                    sortOrder={sortOrder as "asc" | "desc"}
                    columnKey={col.sortKey as SortKey}
                  />
                )}
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
