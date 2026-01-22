import type { Planet } from "./planet";
import type { Column } from "./table";
import type { Transformation } from "./transformation";

export interface Character {
  id: number;
  name: string;
  ki: number;
  maxKi: number;
  race: string;
  gender: string;
  affiliation: string;
  image: string;
  description: string;
  originPlanet?: Planet;
  transformations?: Transformation[];
}
