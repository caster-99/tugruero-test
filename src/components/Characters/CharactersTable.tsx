import type { Character } from "../../types/character";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Characters.scss";
import { Suspense } from "react";
import Spinner from "../Spinner/Spinner";

interface Props {
  data: Character[];
  page: number;
  pageSize: number;
  onDelete: (id: number) => void;
}

export const CharactersTable = ({ data, page, pageSize, onDelete }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const start = (page - 1) * pageSize;
  const pageData = data.slice(start, start + pageSize);

  return (
    <div className="characters-table-wrapper">
      <table className="characters-table">
        <thead>
          <tr>
            <th>Acciones</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>KI</th>
            <th>Max KI</th>
            <th>Raza</th>
            <th>Género</th>
            <th>Afiliación</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((char) => (
            <tr key={char.id}>
              <td className="actions">
                <button onClick={() => navigate(`/characters/${char.id}`)}>
                  Ver
                </button>

                {user?.role === "admin" && (
                  <>
                    <button
                      onClick={() => navigate(`/characters/edit/${char.id}`)}
                    >
                      Editar
                    </button>
                    <button onClick={() => onDelete(char.id)}>Eliminar</button>
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
