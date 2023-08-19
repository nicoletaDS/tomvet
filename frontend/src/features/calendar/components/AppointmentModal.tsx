import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import AppForm from "../../../app/components/form/Form";
import { Field, Form, FormikProps, useFormikContext } from "formik";
import FormMsg, { MsgType } from "../../../app/components/form/FormMsg";
import AppFormField from "../../../app/components/form/FormField";
import AppFormSubmitButton from "../../../app/components/form/FormSubmitButton";

const customStyles = {
  overlay: {},
  content: {
    width: "700px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",

    borderRadius: "20px",
    backgroundColor: "#efeaeb",
  },
};

const AppointmentModal = (props: any) => {
  const { modalIsOpen, closeModal } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  const addAppointment = async (values: any) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("service", values.service);
      formData.append("date", values.date);
      formData.append("time", values.time);
      formData.append("pet", values.pet);
      formData.append("details", values.details);
      // await dispatch(register(formData));
    } catch (err: any) {
      console.log("Eroare:", err);
    }
    setIsLoading(false);
  };

  //   if (sessionState.session?.id) {
  //     if (sessionState.session.profile?.active) {
  //       nav("/");
  //     } else {
  //       return <Login />;
  //     }
  //   }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex flex-col items-center">
        <button
          className="absolute right-6 top-2 text-[24px] font-light hover:font-bold"
          onClick={closeModal}
        >
          x
        </button>
        <p className="text-[20px]">Adauga programare</p>

        <AppForm
          initialValues={{
            title: "",
            date: "",
            time: "",
            pet: "",
            details: "",
          }}
          // validationSchema={Yup.object().shape({ ...registerValidationSchema })}
          onSubmit={addAppointment}
        >
          <Form className="flex flex-col justify-center items-center align-center max-w-[350px] my-8">
            {/* {sessionState.error && (
            <FormMsg info="s-a produs o eroare" type={MsgType.ERROR} />
          )} */}

            <Field label="Serviciu:" name="title" component={AppFormField} />

            <div className="flex flex-row">
              <div className="mr-2">
                <Field label="Data:" name="date" component={AppFormField} />
              </div>
              <div className="ml-2">
                <Field label="Ora:" name="time" component={AppFormField} />
              </div>
            </div>
            <Field
              label="Animal de companie:"
              name="pet"
              component={AppFormField}
            />
            <Field label="Detalii:" name="details" component={AppFormField} />

            <AppFormSubmitButton isLoading={isLoading} title="Salveaza" />
          </Form>
        </AppForm>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
