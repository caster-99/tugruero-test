import { useState } from "react";
import { useCharacters } from "../../hooks/useCharacters";
import { CharactersFilters } from "../../components/Characters/CharactersFilter";
import { CharactersTable } from "../../components/Characters/CharactersTable";
import "./Character.scss";
import Spinner from "../../components/Spinner/Spinner";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PAGE_SIZE = 5;

const CharacterList = () => {
  const { characters, loading, error } = useCharacters();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleDelete = (id: number) => {
    alert(`Simulando delete del personaje ${id}`);
  };

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="character-list">
      <h1>Personajes</h1>

      <CharactersFilters search={search} onSearchChange={setSearch} />

      <CharactersTable
        data={filtered}
        page={page}
        pageSize={PAGE_SIZE}
        onDelete={handleDelete}
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
