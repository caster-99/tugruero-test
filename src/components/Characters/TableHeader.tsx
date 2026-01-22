import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { SortKey } from "../../utils/parsing";

interface TableHeaderProps {
  label: string;
  columnKey: SortKey;
  activeSortKey: SortKey | null;
  sortOrder: "asc" | "desc";
  onSort: (key: SortKey) => void;
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
      {sortOrder === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </span>
  );
};

const TableHeader = ({
  label,
  columnKey,
  activeSortKey,
  sortOrder,
  onSort,
}: TableHeaderProps) => {
  return (
    <th onClick={() => onSort(columnKey)}>
      {label}
      {/* <SortArrow
        activeSortKey={activeSortKey}
        sortOrder={sortOrder}
        columnKey={columnKey}
      /> */}
    </th>
  );
};

export default TableHeader;
