import "./Characters.scss";
import type { GenderTypes } from "../../types/character";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  // Character specific
  gender?: string;
  onGenderChange?: (value: string) => void;
  race?: string;
  onRaceChange?: (value: string) => void;
  affiliation?: string;
  onAffiliationChange?: (value: string) => void;
  // Planet specific
  isDestroyed?: string;
  onIsDestroyedChange?: (value: string) => void;
}

export const CharactersFilters = ({ 
  search, 
  onSearchChange,
  gender,
  onGenderChange,
  race,
  onRaceChange,
  affiliation,
  onAffiliationChange,
  isDestroyed,
  onIsDestroyedChange
}: Props) => {
  const genderOptions: GenderTypes[] = ["Male", "Female", "Other", "Unknown"];
  const raceOptions = [
    "Saiyan", 
    "Namekian", 
    "Human", 
    "Majin", 
    "Frieza Race", 
    "Android", 
    "Jiren Race", 
    "God", 
    "Angel", 
    "Evil", 
    "Unknown"
  ];
  const affiliationOptions = [
    "Z Fighter", 
    "Red Ribbon Army", 
    "Frieza Force", 
    "Pride Troopers", 
    "Assistant of Beerus", 
    "Galactic Patrol", 
    "Freelancer",
    "Army of Frieza",
    "Other"
  ];

  return (
    <div className="filters">
      <input
        placeholder="Nombre"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      {onGenderChange && (
        <select value={gender} onChange={(e) => onGenderChange(e.target.value)}>
          <option value="">Género: Todos</option>
          {genderOptions.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      )}

      {onRaceChange && (
        <select value={race} onChange={(e) => onRaceChange(e.target.value)}>
          <option value="">Raza: Todas</option>
          {raceOptions.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      )}

      {onAffiliationChange && (
        <select value={affiliation} onChange={(e) => onAffiliationChange(e.target.value)}>
          <option value="">Afiliación: Todas</option>
          {affiliationOptions.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      )}

      {onIsDestroyedChange && (
        <select value={isDestroyed} onChange={(e) => onIsDestroyedChange(e.target.value)}>
          <option value="all">Estado: Todos</option>
          <option value="destroyed">Destruidos</option>
          <option value="intact">Intactos</option>
        </select>
      )}
    </div>
  );
};



