import "./Characters.scss";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export const CharactersFilters = ({ search, onSearchChange }: Props) => {
  return (
    <div className="filters">
      <input
        placeholder="Buscar por nombre"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
