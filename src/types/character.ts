import type { Planet } from "./planet";
import type { Transformation } from "./transformation";


export type GenderTypes = "Male" | "Female" | "Other" | "Unknown";
export interface Character {
  id: number;
  name: string;
  ki: number;
  maxKi: number;
  race: string;
  gender: GenderTypes;
  affiliation: string;
  image: string;
  description: string;
  originPlanet?: Planet;
  transformations?: Transformation[];
}

export interface CharacterFormData {
  name: string;
  ki: number;
  maxKi: number;
  race: string;
  affiliation: string;
  gender: (GenderTypes | undefined)[];
  description: string;
  originPlanet: string;
}

