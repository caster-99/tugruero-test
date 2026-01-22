import { useMemo, useState } from "react";
import { useCharacters } from "../../hooks/useCharacters";
import { CharactersFilters } from "../../components/Characters/CharactersFilter";
import { CharactersTable } from "../../components/Characters/CharactersTable";
import "./Character.scss";
import Spinner from "../../components/Spinner/Spinner";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { parseKi, type SortKey, type SortOrder } from "../../utils/parsing";
import { exportToCSV } from "../../utils/exportToCSV";

const PAGE_SIZE = 5;

const CharacterList = () => {
  const { characters, loading, error } = useCharacters();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filtered = useMemo(() => {
    return characters.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [characters, search]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortOrder]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleDelete = (id: number) => {
    alert(`Simulando delete del personaje ${id}`);
  };

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="character-list">
      <h1>Personajes</h1>
      <button
        onClick={() => exportToCSV(sorted)}
        title="Exportar todos los personajes en formato CSV"
      >
        Exportar CSV
      </button>

      <CharactersFilters search={search} onSearchChange={setSearch} />

      <CharactersTable
        data={sorted}
        page={page}
        pageSize={PAGE_SIZE}
        onDelete={handleDelete}
        onSort={handleSort}
        sortOrder={sortOrder}
      />

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <IoIosArrowBack />
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
