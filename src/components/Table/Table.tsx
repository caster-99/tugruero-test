import type { Column, SortKey } from "../../types/table";
import { CharactersFilters } from "../Characters/CharactersFilter";
import { ExportCSVButton } from "./ExportCSVButton";
import "./Table.scss";
import { HiArrowsUpDown } from "react-icons/hi2";


interface DataTableProps<T> {
  data: T[]; // Filtered data
  pageData: T[]; // Paged data
  columns: Column<T>[];
  onSort?: (key: SortKey) => void;
  rowKey: (row: T) => string | number;
  sortKey?: SortKey;
  sortOrder?: "asc" | "desc";
  search: string;
  onSetSearch?: (search: string) => void;
  fetchAllUnfiltered: () => Promise<T[]>;
  // Character specific filters
  gender?: string;

  onGenderChange?: (value: string) => void;
  race?: string;
  onRaceChange?: (value: string) => void;
  affiliation?: string;
  onAffiliationChange?: (value: string) => void;
  isDestroyed?: string;
  onIsDestroyedChange?: (value: string) => void;
}

const SortArrow = ({
  activeSortKey,
  columnKey,
}: {
  activeSortKey: SortKey | null;
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
  pageData,
  columns,
  onSort,
  rowKey,
  fetchAllUnfiltered, 
  search,
  onSetSearch,
  gender,
  onGenderChange,
  race,
  onRaceChange,
  affiliation,
  onAffiliationChange,
  isDestroyed,
  onIsDestroyedChange,
}: DataTableProps<T>) {
  return (
    <div>
      <div className="table-toolbar">
        {onSetSearch && (
          <CharactersFilters
            search={search}
            onSearchChange={onSetSearch}
            gender={gender || ""}
            onGenderChange={onGenderChange}
            race={race || ""}
            onRaceChange={onRaceChange}
            affiliation={affiliation || ""}
            onAffiliationChange={onAffiliationChange}
            isDestroyed={isDestroyed || ""}
            onIsDestroyedChange={onIsDestroyedChange}
          />
        )}

        <ExportCSVButton
          data={data}
          fetchAllUnfiltered={fetchAllUnfiltered}
          columns={columns.map(col => ({ key: col.key, label: col.label }))}
        />
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
                      columnKey={col.sortKey as SortKey}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pageData.map((row) => (
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

