import { useParams, useNavigate } from "react-router-dom";
import { useCharacter } from "../../hooks/useCharacter";
import Spinner from "../../components/Spinner/Spinner";
import "./Character.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

type TabKey = "info" | "transformations" | "planet";

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { character, loading, error } = useCharacter(id);
  const [activeTab, setActiveTab] = useState<TabKey>("info");

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!character) return null;

  return (
    <div className="character-detail">
      <button className="back" onClick={() => navigate(-1)}>
        <IoIosArrowBack /> Volver
      </button>

      <div className="character-header">
        <img src={character.image} alt={character.name} loading="lazy" />
        <div>
          <h1>{character.name}</h1>
          <p className="race">
            {character.race} · {character.gender}
          </p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          Información
        </button>
        <button
          className={activeTab === "transformations" ? "active" : ""}
          onClick={() => setActiveTab("transformations")}
        >
          Transformaciones
        </button>
        <button
          className={activeTab === "planet" ? "active" : ""}
          onClick={() => setActiveTab("planet")}
        >
          Planeta
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "info" && (
          <>
            <div className="stats">
              <div>
                <span>Género</span>
                <strong>{character.gender}</strong>
              </div>
              <div>
                <span>KI</span>
                <strong>{character.ki}</strong>
              </div>
              <div>
                <span>Max KI</span>
                <strong>{character.maxKi}</strong>
              </div>
              <div>
                <span>Afiliación</span>
                <strong>{character.affiliation}</strong>
              </div>
            </div>

            <p className="description">{character.description}</p>
          </>
        )}

        {/* {activeTab === "transformations" && (
          <div className="transformations">
            {loadingTransformations && <Spinner />}

            {transformationsError && <p>{transformationsError}</p>}

            {!loadingTransformations &&
              !transformationsError &&
              (transformations.length === 0 ? (
                <p>No tiene transformaciones</p>
              ) : (
                // transformations.map((t) => (
                //   <div key={t.id} className="transformation-card">
                //     <img src={t.image} alt={t.name} />
                //     <h4>{t.name}</h4>
                //     <span>KI: {t.ki}</span>
                //   </div>
                // ))
                Array.isArray(transformations) &&
                transformations.map((t) => (
                  <div key={t.id} className="transformation-card">
                    <img src={t.image} alt={t.name} />
                    <h4>{t.name}</h4>
                    <span>KI: {t.ki}</span>
                  </div>
                ))
              ))}
          </div>
        )} */}

        {activeTab === "transformations" && (
          <div className="transformations">
            {character.transformations &&
            character.transformations.length > 0 ? (
              character.transformations.map((t) => (
                <div key={t.id} className="transformation-card">
                  <img src={t.image} alt={t.name} loading="lazy" />
                  <h4>{t.name}</h4>
                  <span>KI: {t.ki}</span>
                </div>
              ))
            ) : (
              <p>No tiene transformaciones</p>
            )}
          </div>
        )}
        {activeTab === "planet" && (
          <div className="planet">
            {character.originPlanet ? (
              <>
                <img
                  src={character.originPlanet.image}
                  alt={character.originPlanet.name}
                  loading="lazy"
                />
                <h3>{character.originPlanet.name}</h3>
                <p className="description">
                  {character.originPlanet.description}
                </p>
                {character.originPlanet.isDestroyed && (
                  <span className="destroyed">Planeta destruido</span>
                )}
              </>
            ) : (
              <p>No tiene planeta de origen</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;
