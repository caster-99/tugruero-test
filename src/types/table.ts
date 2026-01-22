export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  sortKey?: SortKey;
  render: (row: T) => React.ReactNode;
}

export type SortKey =
  | "ki"
  | "race"
  | "affiliation"
  | "name"
  | "maxKi"
  | "gender"
  | "isDestroyed"
  | "description";

export type SortOrder = "asc" | "desc";
