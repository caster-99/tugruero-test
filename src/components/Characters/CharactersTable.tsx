import type { Character } from "../../types/character";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Characters.scss";
import { Suspense, useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import type { SortKey } from "../../utils/parsing";
import TableHeader from "./TableHeader";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";

interface Props {
  data: Character[];
  page: number;
  pageSize: number;
  sortOrder: "asc" | "desc";
  onDelete: (id: number) => void;
  onSort: (key: SortKey) => void;
}

export const CharactersTable = ({
  data,
  page,
  pageSize,
  onDelete,
  onSort,
}: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const start = (page - 1) * pageSize;
  const pageData = data.slice(start, start + pageSize);

  return (
    <div className="characters-table-wrapper">
      <table className="characters-table">
        <thead>
          <tr>
            <th>Acciones</th>
            <th>Imagen</th>
            <th onClick={() => onSort("name")}>Nombre</th>
            <th onClick={() => onSort("ki")}>KI</th>
            <th onClick={() => onSort("maxKi")}>Max KI</th>
            <th onClick={() => onSort("race")}>Raza</th>
            <th onClick={() => onSort("gender")}>Género</th>
            <th onClick={() => onSort("affiliation")}>Afiliación</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((char) => (
            <tr key={char.id}>
              <td className="actions">
                <IoEyeOutline
                  className="action"
                  title="Ver"
                  onClick={() => navigate(`/characters/${char.id}`)}
                />

                {user?.role === "admin" && (
                  <>
                    <MdOutlineEdit
                      className="action"
                      onClick={() => navigate(`/characters/edit/${char.id}`)}
                      title="Editar"
                    />
                    <MdOutlineDeleteOutline
                      className="action"
                      onClick={() => onDelete(char.id)}
                      title="Eliminar"
                    />
                  </>
                )}
              </td>

              <td>
                <Suspense fallback={<Spinner />}>
                  <img loading="lazy" src={char.image} alt={char.name} />
                </Suspense>
              </td>
              <td>{char.name}</td>
              <td>{char.ki}</td>
              <td>{char.maxKi}</td>
              <td>{char.race}</td>
              <td>{char.gender}</td>
              <td>{char.affiliation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
