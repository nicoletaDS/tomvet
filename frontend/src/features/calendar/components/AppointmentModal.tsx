import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import AppForm from "../../../app/components/form/Form";
import { Field, Form, FormikProps, useFormikContext } from "formik";
import FormMsg, { MsgType } from "../../../app/components/form/FormMsg";
import AppFormField from "../../../app/components/form/FormField";
import AppFormSubmitButton from "../../../app/components/form/FormSubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { services } from "../../../utils/constants/ServicesApp";
import { doctors } from "../../../utils/constants/Doctors";
import { timeSlots } from "../../../utils/constants/Time";
import {
  addAppointment,
  fetchAppointments,
} from "../../appointment/appointmentSlice";
import { fetchCabinet } from "../../appointment/cabinetSlice";

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
  const { doctors, services } = useSelector(
    (state: RootState) => state.cabinet.cabinet
  );
  const { modalIsOpen, closeModal } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, error } = useSelector(
    (state: RootState) => state.pets
  );

  const addNewAppointment = async (values: any) => {
    try {
      setIsLoading(true);
      const data: Appointment = {
        service: values.service,
        doctor: values.doctor,
        date: values.date,
        time: values.time,
        pet: values.pet,
        details: values.details,
      };

      console.log("VALUES", values);
      await dispatch(addAppointment(data));
      closeModal();
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
        <p className="text-[20px]">Adauga programare</p>

        <AppForm
          initialValues={{
            service: "",
            doctor: "",
            date: "",
            time: "",
            pet: "",
            details: "",
          }}
          // validation Schema={Yup.object().shape({ ...registerValidationSchema })}
          onSubmit={addNewAppointment}
        >
          <Form className="flex flex-col justify-center items-center align-center max-w-[350px] my-8">
            {/* {sessionState.error && (
            <FormMsg info="s-a produs o eroare" type={MsgType.ERROR} />
          )} */}
            <p className="font-bold text-[14px] flex justify-start w-full">
              Serviciu:
            </p>

            <Field
              as="select"
              name="service"
              className="w-full p-2 rounded mb-4"
            >
              {services.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.title} - aprox. {item.time} min
                </option>
              ))}
            </Field>

            <p className="font-bold text-[14px] flex justify-start w-full">
              Medic:
            </p>

            <Field
              as="select"
              name="doctor"
              className="w-full p-2 rounded mb-4"
            >
              {doctors.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Field>

            <div className="w-full flex flex-row justify-between">
              <div className="mr-2">
                <Field
                  label="Data:"
                  name="date"
                  component={AppFormField}
                  placeholder="AAAA-LL-ZZ"
                />
              </div>
              <div>
                <p className="font-bold text-[14px] flex justify-start w-full">
                  Ora:
                </p>

                <Field
                  as="select"
                  name="time"
                  className="w-full p-1 rounded mb-4"
                >
                  {timeSlots.map((item, index) => (
                    <option key={index} value={item.time}>
                      {item.time}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            <p className="font-bold text-[14px] flex justify-start w-full">
              Animal:
            </p>

            <Field as="select" name="pet" className="w-full p-2 rounded mb-4">
              {pets.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Field>

            <Field label="Detalii:" name="details" component={AppFormField} />

            <AppFormSubmitButton isLoading={isLoading} title="Salveaza" />
          </Form>
        </AppForm>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
