import * as yup from "yup";
import type { GenderTypes } from "../types/character";

const capitalized = /^[A-ZÁÉÍÓÚÑ]/;

export const characterSchema = yup.object({
  name: yup
    .string()
    .required("Nombre obligatorio")
    .min(3)
    .max(50)
    .matches(capitalized, "Debe iniciar con mayúscula"),

  ki: yup
    .number()
    .typeError("KI debe ser numérico")
    .required()
    .min(1)
    .test("ki-max", "KI no puede ser mayor que Max KI", function (value) {
      return value <= this.parent.maxKi;
    }),

  maxKi: yup.number().typeError("Max KI debe ser numérico").required().min(1),

  race: yup.string().required("Raza obligatoria"),

  gender: yup
    .array()
    .of(
      yup
        .mixed<GenderTypes>()
        .oneOf(["Male", "Female", "Other", "Unknown"])
        .required(),
    )
    .min(1, "Selecciona al menos uno")
    .required(),

  description: yup.string().required().min(1).max(1000),

  originPlanet: yup
    .string()
    .required()
    .min(3)
    .max(50)
    .matches(capitalized, "Debe iniciar con mayúscula"),
});
