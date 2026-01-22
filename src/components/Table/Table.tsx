import { useMemo } from "react";
import type { Column, SortKey } from "../../types/table";
import { exportToCSV } from "../../utils/exportToCSV";
import { Button } from "../Button/Button";
import { CharactersFilters } from "../Characters/CharactersFilter";
import "./Table.scss";
import { HiArrowsUpDown } from "react-icons/hi2";

interface DataTableProps<T> {
  data: T[];
  allData?: T[];
  columns: Column<T>[];
  onSort?: (key: SortKey) => void;
  rowKey: (row: T) => string | number;
  sortKey?: SortKey;
  sortOrder?: "asc" | "desc";
  search: string;
  onSetSearch?: (search: string) => void;
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
  allData,
  sortOrder,
  search,
  onSetSearch,
}: DataTableProps<T>) {
  const filtered = useMemo(() => {
    return data.filter((row) =>
      columns.some((col) => {
        const value = col.render(row);
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
        );
      }),
    );
  }, [data, search, columns]);

  return (
    <div>
      <div className="table-toolbar">
        <CharactersFilters
          search={search}
          onSearchChange={onSetSearch || (() => {})}
        />
        <Button
          onClick={() =>
            exportToCSV(
              allData ? (allData as any[]) : (data as any[]),
              columns.map((col) => col.key),
            )
          }
          title="Exportar toda la informacion en formato CSV"
        >
          Exportar CSV
        </Button>
      </div>
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
            {filtered.map((row) => (
              <tr key={rowKey(row)}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render(row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
