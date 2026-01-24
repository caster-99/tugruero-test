import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type {
  Character,
  CharacterFormData,
  GenderTypes,
} from "../../types/character";
import { characterSchema } from "../../utils/yupSchema";
import { useCharacter } from "../../hooks/useCharacter";
import { usePlanets } from "../../hooks/usePlanets";
import Spinner from "../../components/Spinner/Spinner";
import "./Character.scss";


import { parseKi } from "../../utils/parsing";

const CharacterForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { character, loading, createCharacter, updateCharacter } =
    useCharacter(id);
  const { planets } = usePlanets();
  const genderOptions: GenderTypes[] = ["Male", "Female", "Other", "Unknown"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CharacterFormData>({
    resolver: yupResolver(characterSchema) as any,
  });

  useEffect(() => {
    if (isEdit) {
      if (character) {
        reset({
          name: character.name,
          ki: parseKi(String(character.ki)),
          maxKi: parseKi(String(character.maxKi)),
          race: character.race,
          gender: [character.gender] as GenderTypes[],
          description: character.description,
          originPlanet: character.originPlanet?.name || "",
          affiliation: character.affiliation,
        });
      }
    } else {
      reset({
        name: "",
        ki: 0,
        maxKi: 0,
        race: "",
        gender: [],
        description: "",
        originPlanet: "",
        affiliation: "",
      });
    }
  }, [character, isEdit, reset]);



  const mapFormToCharacter = (
    data: CharacterFormData,
  ): Omit<Character, "id"> => {
    return {
      name: data.name,
      ki: data.ki,
      maxKi: data.maxKi,
      race: data.race,
      gender: data.gender[0]!,
      description: data.description,
      originPlanet: planets.find((p) => p.name === data.originPlanet),
      affiliation: data.affiliation,
      image: character?.image || "https://placehold.co/300x300",
    };
  };

  const onSubmit: SubmitHandler<CharacterFormData> = async (data) => {
    try {
      let success = false;
      if (isEdit && id) {
        success = await updateCharacter(Number(id), mapFormToCharacter(data)) || false;
      } else {
        success = await createCharacter(mapFormToCharacter(data)) || false;
      }
      
      if (success) {
        navigate("/");
      }
    } catch (err) {
      console.error("Error in form submission:", err);
    }
  };



  if (loading && isEdit && !character) {
    return <Spinner />;
  }

  return (
    <div className="form-container">
      <form className="character-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>{isEdit ? "Editar personaje" : "Crear personaje"}</h2>

        <div className="field">
          <label>Nombre</label>
          <input placeholder="Nombre" {...register("name")} />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="field">
          <label>Ki</label>
          <input type="number" {...register("ki", { valueAsNumber: true })} />
          <p className="error">{errors.ki?.message}</p>
        </div>

        <div className="field">
          <label>Max Ki</label>
          <input
            type="number"
            {...register("maxKi", { valueAsNumber: true })}
          />
          <p className="error">{errors.maxKi?.message}</p>
        </div>

        <div className="field">
          <label>Raza</label>
          <select {...register("race")}>
            <option value="">Seleccionar raza</option>
            <option value="Saiyan">Saiyan</option>
            <option value="Namekian">Namekian</option>
            <option value="Human">Human</option>
            <option value="Majin">Majin</option>
            <option value="Frieza Race">Frieza Race</option>
            <option value="Android">Android</option>
            <option value="Jiren Race">Jiren Race</option>
            <option value="God">God</option>
            <option value="Angel">Angel</option>
            <option value="Evil">Evil</option>
            <option value="Unknown">Unknown</option>
          </select>
          <p className="error">{errors.race?.message}</p>
        </div>

        <div className="field">
          <label>Género</label>
          <select multiple {...register("gender")}>
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className="error">{errors.gender?.message}</p>
        </div>

        <div className="field">
          <label>Afiliación</label>
          <select { ...register("affiliation") }>
            <option value="">Seleccionar afiliación</option>
            <option value="Z Fighter">Z Fighter</option>
            <option value="Red Ribbon Army">Red Ribbon Army</option>
            <option value="Frieza Force">Frieza Force</option>
            <option value="Pride Troopers">Pride Troopers</option>
            <option value="Assistant of Beerus">Assistant of Beerus</option>
            <option value="Galactic Patrol">Galactic Patrol</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Army of Frieza">Army of Frieza</option>
            <option value="Other">Other</option>
          </select>
          <p className="error">{errors.affiliation?.message}</p>
        </div>


        <div className="field">
          <label>Descripción</label>
          <textarea placeholder="Descripción" {...register("description")} />
          <p className="error">{errors.description?.message}</p>
        </div>

        <div className="field">
          <label>Planeta de Origen</label>
          <select {...register("originPlanet")}>
            <option value="">Seleccionar planeta</option>
            {planets.map((planet) => (
              <option key={planet.id} value={planet.name}>
                {planet.name}
              </option>
            ))}
          </select>
          <p className="error">{errors.originPlanet?.message}</p>
        </div>

        <div className="actions">
          <button type="button" onClick={() => navigate("/")} className="cancel-btn">
            Cancelar
          </button>
          <button disabled={isSubmitting} className="submit-btn">
            {isEdit ? "Guardar cambios" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterForm;

