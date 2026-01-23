import { Suspense } from "react";
import Spinner from "../Spinner/Spinner";
import type { Column, SortKey } from "../../types/table";
import { DataTable } from "../Table/Table";
import type { Planet } from "../../types/planet";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


interface Props {
  data: Planet[];
  fetchAllUnfiltered: () => Promise<Planet[]>;
  page: number;
  pageSize: number;
  sortOrder: "asc" | "desc";
  onSort: (key: SortKey) => void;
  search: string;
  onSetSearch?: (search: string) => void;
  isDestroyed: string;
  onIsDestroyedChange: (value: string) => void;
}

export const PlanetsTable = ({
  data,
  fetchAllUnfiltered,
  page,
  pageSize,
  onSort,
  sortOrder,
  search,

  onSetSearch,
  isDestroyed,
  onIsDestroyedChange,
}: Props) => {

  const navigate = useNavigate();

  const start = (page - 1) * pageSize;

  const pageData = data.slice(start, start + pageSize);

  const columns: Column<Planet>[] = [
    {
      key: "actions",
      label: "Acciones",
      render: (char) => (
        <div className="actions">
          <IoEyeOutline
            className="action"
            onClick={() => navigate(`/planets/${char.id}`)}
          />
        </div>
      ),
    },
    {
      key: "image",
      label: "Imagen",
      render: (planet) => (
        <Suspense fallback={<Spinner />}>
          <img loading="lazy" src={planet.image} alt={planet.name} />
        </Suspense>
      ),
    },

    {
      key: "name",
      label: "Nombre",
      sortable: true,
      render: (planet) => planet.name,
      sortKey: "name",
    },

    {
      key: "description",
      label: "Descripción",
      render: (planet) => planet.description,
    },

    {
      key: "status",
      label: "Estado",
      sortable: true,
      render: (planet) => (planet.isDestroyed ? "Destruido" : "Intacto"),
      sortKey: "isDestroyed",
    },
  ];

  return (
    <div className="planets-table-wrapper">
      <DataTable
        data={data}
        pageData={pageData}
        fetchAllUnfiltered={fetchAllUnfiltered}
        columns={columns}
        onSort={onSort}
        rowKey={(planet) => planet.id}
        sortOrder={sortOrder}
        search={search}


        onSetSearch={onSetSearch}
        isDestroyed={isDestroyed}
        onIsDestroyedChange={onIsDestroyedChange}
      />
    </div>
  );
};


