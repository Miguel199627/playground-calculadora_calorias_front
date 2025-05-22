import { defineNuxtPlugin } from "#app";
import { setLocale } from "yup";

export default defineNuxtPlugin(() => {
  setLocale({
    mixed: {
      required: "Este campo es obligatorio",
      notType: "Formato no válido",
      oneOf: "Debe ser uno de los siguientes valores: ${values}",
      notOneOf: "No puede ser uno de los siguientes valores: ${values}",
      defined: "Este campo debe estar definido",
    },
    string: {
      email: "Debe ser un correo válido",
      min: "Debe tener al menos ${min} caracteres",
      max: "Debe tener como máximo ${max} caracteres",
      matches: "Debe coincidir con el formato requerido",
      url: "Debe ser una URL válida",
      trim: "No debe contener espacios al inicio o al final",
      lowercase: "Debe estar en minúsculas",
      uppercase: "Debe estar en mayúsculas",
    },
    number: {
      min: "Debe ser mayor o igual a ${min}",
      max: "Debe ser menor o igual a ${max}",
      lessThan: "Debe ser menor a ${less}",
      moreThan: "Debe ser mayor a ${more}",
      positive: "Debe ser un número positivo",
      negative: "Debe ser un número negativo",
      integer: "Debe ser un número entero",
    },
    date: {
      min: "Debe ser posterior a ${min}",
      max: "Debe ser anterior a ${max}",
    },
    array: {
      min: "Debe tener al menos ${min} elementos",
      max: "Debe tener como máximo ${max} elementos",
      length: "Debe tener exactamente ${length} elementos",
    },
    object: {
      noUnknown: "No puede tener claves no especificadas en el esquema",
    },
  });
});
