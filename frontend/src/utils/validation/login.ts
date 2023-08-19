import * as Yup from "yup";

export const loginValidationSchema = {
  password: Yup.string().required("Parola obligatorie."),
  email: Yup.string()
    .email("Email invalid")
    .required("Email obligatoriu")
    .label("Email"),
};
