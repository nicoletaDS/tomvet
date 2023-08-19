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

const TreatmentModal = (props: any) => {
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
        <p className="text-[20px]">Adauga tratament</p>

        <AppForm
          initialValues={{
            title: "",
            date: "",
            details: "",
          }}
          onSubmit={addAppointment}
        >
          <Form className="flex flex-col justify-center items-center align-center max-w-[350px] my-8">
            <Field label="Tratament:" name="title" component={AppFormField} />

            <Field label="Data:" name="date" component={AppFormField} />

            <Field label="Detalii:" name="details" component={AppFormField} />

            <AppFormSubmitButton isLoading={isLoading} title="Salveaza" />
          </Form>
        </AppForm>
      </div>
    </Modal>
  );
};

export default TreatmentModal;
