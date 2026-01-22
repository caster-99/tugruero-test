import type { Character } from "../../types/character";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Characters.scss";
import { Suspense, useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import type { Column, SortKey } from "../../types/table";
import { DataTable } from "../Table/Table";

interface Props {
  data: Character[];
  page: number;
  pageSize: number;
  sortOrder: "asc" | "desc";
  onDelete: (id: number) => void;
  onSort: (key: SortKey) => void;
  search: string;
  onSetSearch?: (search: string) => void;
}

export const CharactersTable = ({
  data,
  page,
  pageSize,
  onDelete,
  onSort,
  search,
  onSetSearch,
}: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const start = (page - 1) * pageSize;
  const pageData = data.slice(start, start + pageSize);

  const columns: Column<Character>[] = [
    {
      key: "actions",
      label: "Acciones",
      render: (char) => (
        <div className="actions">
          <IoEyeOutline
            className="action"
            onClick={() => navigate(`/characters/${char.id}`)}
          />

          {user?.role === "admin" && (
            <>
              <MdOutlineEdit
                className="action"
                onClick={() => navigate(`/characters/edit/${char.id}`)}
              />
              <MdOutlineDeleteOutline
                className="action"
                onClick={() => onDelete(char.id)}
              />
            </>
          )}
        </div>
      ),
    },
    {
      key: "image",
      label: "Imagen",
      render: (char) => (
        <Suspense fallback={<Spinner />}>
          <img loading="lazy" src={char.image} alt={char.name} />
        </Suspense>
      ),
    },

    {
      key: "name",
      label: "Nombre",
      sortable: true,
      render: (char) => char.name,
      sortKey: "name",
    },

    {
      key: "ki",
      label: "KI",
      sortable: true,
      render: (char) => char.ki,
      sortKey: "ki",
    },

    {
      key: "maxKi",
      label: "Max KI",
      sortable: true,
      render: (char) => char.maxKi,
      sortKey: "maxKi",
    },
    {
      key: "race",
      label: "Raza",
      sortable: true,
      render: (char) => char.race,
      sortKey: "race",
    },
    {
      key: "gender",
      label: "Género",
      sortable: true,
      render: (char) => char.gender,
      sortKey: "gender",
    },
    {
      key: "affiliation",
      label: "Afiliación",
      sortable: true,
      render: (char) => char.affiliation,
      sortKey: "affiliation",
    },
  ];

  return (
    <div className="characters-table-wrapper">
      <DataTable
        data={pageData}
        allData={data}
        columns={columns}
        onSort={onSort}
        rowKey={(char) => char.id}
        sortOrder={sortOrder}
        search={search}
        onSetSearch={onSetSearch}
      />
    </div>
  );
};
