import React from "react";
import Modal from "react-modal";
import AppForm from "../../../app/components/form/Form";
import { Field, Form } from "formik";
import AppFormField from "../../../app/components/form/FormField";
import AppFormSubmitButton from "../../../app/components/form/FormSubmitButton";
import AppFormImg from "../../../app/components/form/FormImg";
import { addPet } from "../slices/petsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

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

const PetModal = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { modalIsOpen, closeModal } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState("/images/paw.png");
  const [selectedFile, setSelectedFile] = React.useState("");

  const addPetHandler = async (values: any) => {
    console.log("in handler", values);
    try {
      setIsLoading(true);

      const hasPassport = values.passport === "da" ? "true" : "false";

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("birthday", values.birthday);
      formData.append("cipNr", values.cipNr);
      formData.append("passport", hasPassport);
      formData.append("owner", values.owner);
      formData.append("weight", values.weight);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      console.log("formData", formData);
      console.log("getall", formData.keys());

      await dispatch(addPet(formData));
      //closeModal();
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
        <p className="text-[20px]">Adauga animal</p>

        <AppForm
          initialValues={{
            image: null,
            name: "",
            birthday: "",
            cipNr: "",
            passport: "",
            owner: "",
            weight: "",
          }}
          onSubmit={addPetHandler}
        >
          <Form className="flex flex-col justify-center items-center align-center max-w-[350px] my-8">
            <Field
              name="image"
              imgSrc={imgSrc}
              setImgSrc={setImgSrc}
              setSelectedFile={setSelectedFile}
              component={AppFormImg}
            />

            <Field label="Nume:" name="name" component={AppFormField} />

            <div className="flex flex-row">
              <div className="mr-2">
                <Field
                  label="Data nasterii:"
                  name="birthday"
                  component={AppFormField}
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="ml-2">
                <Field
                  label="Greutate:"
                  name="weight"
                  component={AppFormField}
                />
              </div>
            </div>
            <div className="flex flex-row">
              <div className="mr-2">
                <Field label="Cip nr.:" name="cipNr" component={AppFormField} />
              </div>
              <div className="ml-2">
                <Field
                  label="Pasaport:"
                  name="passport"
                  component={AppFormField}
                />
              </div>
            </div>
            <Field label="Stapan:" name="owner" component={AppFormField} />

            <AppFormSubmitButton isLoading={isLoading} title="Salveaza" />
          </Form>
        </AppForm>
      </div>
    </Modal>
  );
};

export default PetModal;
