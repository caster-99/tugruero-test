import { useMemo, useState } from "react";
import "./Planets.scss";
import Spinner from "../../components/Spinner/Spinner";
import type { SortKey, SortOrder } from "../../types/table";
import { usePlanets } from "../../hooks/usePlanets";
import { PlanetsTable } from "../../components/Planets/PlanetsTable";
import type { Planet } from "../../types/planet";

const PAGE_SIZE = 5;

const PlanetList = () => {
  const { planets, loading, error } = usePlanets();
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

  const filteredPlanets = useMemo(() => {
    return planets.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [planets, search]);

  const sortedPlanets = useMemo(() => {
    if (!sortKey) return filteredPlanets;

    return [...filteredPlanets].sort((a, b) => {
      const aVal = a[sortKey as keyof typeof a];
      const bVal = b[sortKey as keyof typeof b];

      if (aVal === undefined && bVal === undefined) return 0;
      if (aVal === undefined) return sortOrder === "asc" ? 1 : -1;
      if (bVal === undefined) return sortOrder === "asc" ? -1 : 1;

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredPlanets, sortKey, sortOrder]);

  const totalPages = Math.ceil(filteredPlanets.length / PAGE_SIZE);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="planet-list">
      <h1>Planetas</h1>

      {sortedPlanets.length === 0 && <p>No se encontraron planetas.</p>}
      <PlanetsTable
        data={sortedPlanets}
        onSort={handleSort}
        page={currentPage}
        pageSize={PAGE_SIZE}
        sortOrder={sortOrder}
        search={search}
        onSetSearch={setSearch}
        onDelete={() => {}}
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

export default PlanetList;
