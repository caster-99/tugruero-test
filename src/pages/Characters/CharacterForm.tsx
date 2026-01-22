import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type {
  Character,
  CharacterFormData,
  GenderTypes,
} from "../../types/character";
import { characterSchema } from "../../utils/yupSchema";
import { useCharacter } from "../../hooks/useCharacter";
import { usePlanets } from "../../hooks/usePlanets";

interface Props {
  defaultValues?: CharacterFormData;
  characterId?: string;
}

const CharacterForm = ({ defaultValues, characterId }: Props) => {
  const isEdit = Boolean(characterId);
  const { createCharacter, updateCharacter } = useCharacter(characterId);
  const { planets } = usePlanets();
  const genderOptions: GenderTypes[] = ["Male", "Female", "Other", "Unknown"];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CharacterFormData>({
    resolver: yupResolver(characterSchema) as any,
    defaultValues,
  });
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
      originPlanet: data.originPlanet,
      affiliation: data.affiliation,
      image: "https://placehold.co/300x300",
    };
  };

  const onSubmit: SubmitHandler<CharacterFormData> = async (data) => {
    console.log("Form data:", data);
    if (isEdit && characterId) {
      await updateCharacter(Number(characterId), mapFormToCharacter(data));
    } else {
      await createCharacter(mapFormToCharacter(data));
    }
  };

  return (
    <form className="character-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>{isEdit ? "Editar personaje" : "Crear personaje"}</h2>

      <input placeholder="Nombre" {...register("name")} />
      <p>{errors.name?.message}</p>

      <input type="number" {...register("ki", { valueAsNumber: true })} />
      <p>{errors.ki?.message}</p>

      <input type="number" {...register("maxKi", { valueAsNumber: true })} />

      <p>{errors.maxKi?.message}</p>

      <input placeholder="Raza" {...register("race")} />
      <p>{errors.race?.message}</p>

      <select multiple {...register("gender")}>
        {genderOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>{errors.gender?.message}</p>

      <input placeholder="Afiliación" {...register("affiliation")} />
      <p>{errors.affiliation?.message}</p>

      <textarea placeholder="Descripción" {...register("description")} />
      <p>{errors.description?.message}</p>

      <select {...register("originPlanet")}>
        <option value="">Seleccionar planeta</option>

        {planets.map((planet) => (
          <option key={planet.id} value={planet.name}>
            {planet.name}
          </option>
        ))}
      </select>
      <p>{errors.originPlanet?.message}</p>

      <button disabled={isSubmitting}>
        {isEdit ? "Guardar cambios" : "Crear"}
      </button>
    </form>
  );
};

export default CharacterForm;
