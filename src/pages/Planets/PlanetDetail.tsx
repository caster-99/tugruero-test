import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import "./Planets.scss";
import { IoIosArrowBack } from "react-icons/io";
import { usePlanet } from "../../hooks/usePlanet";

const PlanetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { planet, loading, error } = usePlanet(id);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!planet) return null;

  return (
    <div className="planet-detail">
      <button className="back" onClick={() => navigate(-1)}>
        <IoIosArrowBack /> Volver
      </button>

      <div className="planet-header">
        <img src={planet.image} alt={planet.name} loading="lazy" />
        <div>
          <h1>{planet.name}</h1>
          <p className="description">{planet.description}</p>
        </div>
      </div>

      <h2>Personajes del planeta</h2>
      {planet.characters.length === 0 ? (
        <p>No hay personajes asociados a este planeta.</p>
      ) : (
        <div className="characters-section">
          {planet.characters.map((char) => (
            <div key={char.id} className="character-card">
              <img src={char.image} alt={char.name} loading="lazy" />
              <div className="char-info">
                <h3>{char.name}</h3>
                <p className="description">{char.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanetDetail;
