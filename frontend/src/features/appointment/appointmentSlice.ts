import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addAppointmentApi,
  getMyAppointments,
} from "../../app/api/appointment";

export const fetchAppointments = createAsyncThunk<Appointment[]>(
  "appointments/fetch",
  async () => {
    const appointments = await getMyAppointments();
    localStorage.setItem("appointments", JSON.stringify(appointments));
    return appointments;
  }
);

export const addAppointment = createAsyncThunk<Appointment, Appointment>(
  "appointments/add",
  async (appointmentData: Appointment, { rejectWithValue }) => {
    try {
      const appointment = await addAppointmentApi(appointmentData);

      // Save the updated tasks data to localStorage
      const existingAppointmentData = localStorage.getItem("appointments");
      let appointments = [];
      if (existingAppointmentData) {
        appointments = JSON.parse(existingAppointmentData);
      }
      appointments.push(appointment);
      localStorage.setItem("appointments", JSON.stringify(appointments));

      return appointment;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface AppointmentsState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentsState = {
  appointments: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAppointments.fulfilled,
        (state, action: PayloadAction<Appointment[]>) => {
          state.loading = false;
          state.appointments = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(addAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addAppointment.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.loading = false;
          state.appointments.push(action.payload);
          state.error = null;
        }
      )
      .addCase(addAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      });
  },
});

export default tasksSlice.reducer;
