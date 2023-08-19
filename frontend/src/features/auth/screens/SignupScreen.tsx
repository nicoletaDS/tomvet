import React from "react";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../authSlice";
import { registerValidationSchema } from "../../../utils/validation/register";
import { AppDispatch, RootState } from "../../../store/store";
import AppForm from "../../../app/components/form/Form";
import { Field, Form, FormikProps, useFormikContext } from "formik";
import AppFormField from "../../../app/components/form/FormField";
import AppFormFieldPass from "../../../app/components/form/FormFieldPass";
import AppFormSubmitButton from "../../../app/components/form/FormSubmitButton";
import FormMsg from "../../../app/components/form/FormMsg";
import { MsgType } from "../../../app/components/form/FormMsg";
import AppFormImg from "../../../app/components/form/FormImg";
import AppFormRadio from "../../../app/components/form/FormRadio";
import { UserRegister } from "../authTypes";
import ConfirmEmail from "../components/ConfirmEmail";

const FormObserver: React.FC = () => {
  const { values } = useFormikContext();

  React.useEffect(() => {
    console.log("FormObserver::values", values);
  }, [values]);

  return null;
};

function SignUpScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const sessionState = useSelector((state: RootState) => state.auth);
  const [imgSrc, setImgSrc] = React.useState("/images/profile_img.jpg");
  const [selectedFile, setSelectedFile] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const submitRegister = async (values: UserRegister) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("first_name", values.firstName);
      formData.append("last_name", values.lastName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("re_password", values.rePassword);
      if (selectedFile) {
        formData.append("image_profile", selectedFile);
      }
      await dispatch(register(formData));
    } catch (err: any) {
      console.log("Eroare:", err);
    }
    setIsLoading(false);
  };

  if (sessionState.session?.id) {
    if (sessionState.session.profile?.active) {
      nav("/");
    } else {
      return <ConfirmEmail />;
    }
  }

  return (
    <div className="flex justify-center items-center h-screen  mb-20">
      <div className="bg-helllilac rounded-2xl p-5 w-1/2 max-w-7xl">
        <h1 className="flex flex-col flex-wrap font-bold text-xl text-center mt-6">
          Înregistrare
        </h1>

        <AppForm
          initialValues={{
            image: null,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            rePassword: "",
          }}
          validationSchema={Yup.object().shape({ ...registerValidationSchema })}
          onSubmit={submitRegister}
        >
          <Form className="flex flex-col justify-center items-center align-center w-full">
            <div className="w-1/2 flex flex-col justify-center">
              {sessionState.error && (
                <FormMsg info="s-a produs o eroare" type={MsgType.ERROR} />
              )}
              <div className="flex flex-row justify-center">
                <Field
                  name="image"
                  imgSrc={imgSrc}
                  setImgSrc={setImgSrc}
                  setSelectedFile={setSelectedFile}
                  component={AppFormImg}
                />
              </div>

              <Field
                label="Prenume"
                name="firstName"
                component={AppFormField}
              />
              <Field label="Nume" name="lastName" component={AppFormField} />
              <Field label="Email" name="email" component={AppFormField} />
              <Field label="Telefon" name="phone" component={AppFormField} />
              <Field
                label="Parola"
                name="password"
                component={AppFormFieldPass}
              />
              <Field
                label="Confirma Parola"
                name="rePassword"
                component={AppFormFieldPass}
              />

              <div className="flex flex-row justify-center">
                <AppFormSubmitButton isLoading={isLoading} title="Salveaza" />
              </div>
            </div>
          </Form>
        </AppForm>
      </div>
    </div>
  );
}

export default SignUpScreen;
