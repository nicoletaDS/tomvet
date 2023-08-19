import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDoctors, getServices } from "../../app/api/appointment";

export const fetchCabinet = createAsyncThunk<Cabinet>(
  "cabinet/fetch",
  async () => {
    const doctors = await getDoctors();
    const services = await getServices();
    const cabinet = {
      doctors: doctors,
      services: services,
    };

    localStorage.setItem("cabinet", JSON.stringify(cabinet));
    return cabinet;
  }
);

interface CabinetState {
  cabinet: Cabinet;
  loading: boolean;
  error: string | null;
}

const initialState: CabinetState = {
  cabinet: { doctors: [], services: [] },
  loading: false,
  error: null,
};

const cabinetSlice = createSlice({
  name: "cabinet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCabinet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCabinet.fulfilled,
        (state, action: PayloadAction<Cabinet>) => {
          state.loading = false;
          state.cabinet = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchCabinet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      });
  },
});

export default cabinetSlice.reducer;
