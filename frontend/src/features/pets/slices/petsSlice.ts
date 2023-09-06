import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMyPets, addPetApi } from "../../../app/api/petsApi";

export const fetchPets = createAsyncThunk<Pet[]>("pets/fetch", async () => {
  const pets = await getMyPets();

  localStorage.setItem("pets", JSON.stringify(pets));
  return pets;
});

export const addPet = createAsyncThunk<Pet, FormData>(
  "pets/add",
  async (petData: FormData, { rejectWithValue }) => {
    console.log("inainte de tryyy");
    try {
      console.log("in addPet", petData);
      const pet = await addPetApi(petData);
      console.log("after call:", pet);

      // Save the updated pets data to localStorage
      const existingPetsData = localStorage.getItem("pets");
      let pets = [];
      if (existingPetsData) {
        pets = JSON.parse(existingPetsData);
      }
      pets.push(pet);
      localStorage.setItem("pets", JSON.stringify(pets));

      return pet;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface PetsState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
}

const initialState: PetsState = {
  pets: [],
  loading: false,
  error: null,
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action: PayloadAction<Pet[]>) => {
        state.loading = false;
        state.pets = action.payload;
        state.error = null;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(addPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action: PayloadAction<Pet>) => {
        state.loading = false;
        state.pets.push(action.payload);
        state.error = null;
      })
      .addCase(addPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      });
  },
});

export default petsSlice.reducer;
