import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { AuthState } from "./authTypes";
import { fetchPets } from "../pets/slices/petsSlice";
import { fetchTasks } from "../pets/slices/tasksSlice";
import { fetchAppointments } from "../appointment/appointmentSlice";
import { fetchOrders } from "../profile/ordersSlice";

const backendURL = "http://127.0.0.1:8000";

export const register = createAsyncThunk(
  "auth/register",
  async (userData: FormData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${backendURL}/api/users/`,
        userData,
        config
      );

      const result = {
        id: data.id,
        access: null,
        refresh: null,
        profile: {
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          active: false,
          image: data.image_profile,
          phone: data.phone,
        },
      };

      localStorage.setItem("auth", JSON.stringify(result));
      return result;
    } catch (error: any) {
      console.log("ERROR:", error);
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendURL}/api/users/login/`,
        { email: userData.email, password: userData.password },
        config
      );

      const result = {
        id: data.id,
        access: data.access,
        refresh: data.refresh,
        profile: {
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          active: data.is_active,
          image: data.image_profile,
          phone: data.phone,
        },
      };

      localStorage.setItem("auth", JSON.stringify(result));

      // fetch all data related to user and saved it into store
      fetchPets();
      fetchTasks();
      fetchAppointments();
      fetchOrders();

      return result;
    } catch (error: any) {
      console.log("ERROR:", error);
      return rejectWithValue(error);
    }
  }
);

const initialState: AuthState = {
  session: {
    id: null,
    access: null,
    refresh: null,
    profile: null,
  },
  appLoading: false,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.session.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.session = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.session = {
        id: null,
        access: null,
        refresh: null,
        profile: null,
      };
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("auth login", action.payload);
      state.session = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.session = {
        id: null,
        access: null,
        refresh: null,
        profile: null,
      };
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
