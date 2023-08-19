import { authorizedApi, publicApi } from "./authorizedApi";

export const getMyAppointments = async () => {
  const appointments = await authorizedApi.get(`/api/appointment/`);
  console.log("RSP DATA", appointments.data);
  return appointments.data;
};

export const getAppointment = async (id: number) => {
  const appointment = await authorizedApi.get(`/api/appointment/${id}/`);
  console.log("RSP DATA", appointment.data);
  return appointment.data;
};

export const addAppointmentApi = async (appointmentData: Appointment) => {
  const appointment = await authorizedApi.post(`/api/appointment/add/`, {
    pet: appointmentData.pet,
    date: appointmentData.date,
    time: appointmentData.time,
    service: appointmentData.service ? appointmentData.service : null,
    doctor: appointmentData.doctor ? appointmentData.doctor : null,
    details: appointmentData.details ? appointmentData.details : null,
  });
  console.log("RSP DATA", appointment.data);
  return appointment.data;
};

export const getDoctors = async () => {
  const doctors = await publicApi.get(`/api/appointment/doctors/`);
  console.log("RSP DATA", doctors.data);
  return doctors.data;
};

export const getServices = async () => {
  const services = await publicApi.get(`/api/appointment/services/`);
  console.log("RSP DATA", services.data);
  return services.data;
};
