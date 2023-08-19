import * as Yup from "yup";

import { loginValidationSchema } from "./login";

export const registerValidationSchema = {
  ...loginValidationSchema,
  password: Yup.string()
    .required("Parola obligatorie.")
    .min(8, "minim 8 caractere")
    .matches(
      /.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?].*/,
      "parola trebuie sa contina un caracter special"
    ),
  firstName: Yup.string().required("prenume obligatoriu").label("first name"),
  lastName: Yup.string().required("nume obligatoriu").label("last name"),
  rePassword: Yup.string()
    .required("reintroduceti parola.")
    .oneOf([Yup.ref("password")], "parolele introduse nu se potrivesc."),

  phone: Yup.string().required("nr de telefon obligatoriu").min(10).max(12),
};
