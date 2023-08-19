import React from "react";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../authSlice";
import { registerValidationSchema } from "../../../utils/validation/register";
import { AppDispatch, RootState } from "../../../store/store";
import AppForm from "../../../app/components/form/Form";
import { Field, Form, FormikProps, useFormikContext } from "formik";
import AppFormField from "../../../app/components/form/FormField";
import AppFormFieldPass from "../../../app/components/form/FormFieldPass";
import AppFormSubmitButton from "../../../app/components/form/FormSubmitButton";
import FormMsg from "../../../app/components/form/FormMsg";
import { MsgType } from "../../../app/components/form/FormMsg";
import { UserRegister } from "../authTypes";
import { loginValidationSchema } from "../../../utils/validation/login";
import ConfirmEmail from "../components/ConfirmEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const FormObserver: React.FC = () => {
  const { values } = useFormikContext();

  React.useEffect(() => {
    console.log("FormObserver::values", values);
  }, [values]);

  return null;
};

const LoginScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const sessionState = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (sessionState.session?.id) {
      if (sessionState.session.profile?.active) {
        nav("/");
      }
    }
  }, [nav, sessionState.session?.id, sessionState.session.profile?.active]);

  const submitRegister = async (values: UserRegister) => {
    try {
      setIsLoading(true);
      await dispatch(
        login({
          email: values.email,
          password: values.password,
        })
      );
    } catch (err: any) {
      console.log("Eroare:", err);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-helllilac rounded-2xl py-10 w-1/2 max-w-7xl">
        <section className="flex flex-row justify-center items-center">
          <FontAwesomeIcon
            icon={faPaw}
            style={{
              color: "#fed762",
              height: "30px",
            }}
          />
          <Link
            to="/"
            className="text-2xl text-[34px] pb-4 mt-4 ml-2 w-32 hover:text-[36px]"
          >
            Tom Vet
          </Link>
        </section>
        <h1 className="flex flex-col flex-wrap font-bold text-xl text-center mb-8">
          Conectare
        </h1>

        <AppForm
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({ ...loginValidationSchema })}
          onSubmit={submitRegister}
        >
          <Form className="flex flex-col justify-center items-center align-center w-full">
            <div className="w-1/2 flex flex-col justify-center">
              {sessionState.error && (
                <FormMsg
                  info="Eroare: verificati daca emailul si parola sunt corecte si daca emailul a fost confirmat."
                  type={MsgType.ERROR}
                />
              )}

              <Field label="Email" name="email" component={AppFormField} />

              <Field
                label="Parola"
                name="password"
                component={AppFormFieldPass}
              />
              <div className="mb-4" />

              <div className="flex flex-row justify-center">
                <AppFormSubmitButton isLoading={isLoading} title="Conectare" />
              </div>
            </div>
          </Form>
        </AppForm>
      </div>
    </div>
  );
};

export default LoginScreen;
