import { useMemo, useState } from "react";
import { useCharacters } from "../../hooks/useCharacters";
import { CharactersTable } from "../../components/Characters/CharactersTable";
import "./Character.scss";
import Spinner from "../../components/Spinner/Spinner";
import type { SortKey, SortOrder } from "../../types/table";

const PAGE_SIZE = 5;

const CharacterList = () => {
  const { characters, loading, error, deleteCharacter } = useCharacters();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page + 1);
    setCurrentPage(page);
  };

  const filtered = useMemo(() => {
    return characters.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [characters, search]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey as keyof typeof a];
      const bVal = b[sortKey as keyof typeof b];

      if (aVal === undefined && bVal === undefined) return 0;
      if (aVal === undefined) return sortOrder === "asc" ? 1 : -1;
      if (bVal === undefined) return sortOrder === "asc" ? -1 : 1;

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortOrder]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleDelete = (id: number) => {
    if (confirm("Desea eliminar este personaje?")) {
      deleteCharacter(id);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="character-list">
      <h1>Personajes</h1>

      <CharactersTable
        data={sorted}
        page={currentPage}
        pageSize={PAGE_SIZE}
        onDelete={handleDelete}
        onSort={handleSort}
        sortOrder={sortOrder}
        search={search}
        onSetSearch={setSearch}
      />

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              className={page === currentPage ? "active" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterList;
