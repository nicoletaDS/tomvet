import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMyTasks, addTaskApi } from "../../../app/api/petsApi";

export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetch", async () => {
  const tasks = await getMyTasks();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return tasks;
});

export const addTask = createAsyncThunk<Task, Task>(
  "tasks/add",
  async (taskData: Task, { rejectWithValue }) => {
    try {
      const task = await addTaskApi(taskData);

      // Save the updated tasks data to localStorage
      const existingTasksData = localStorage.getItem("tasks");
      let tasks = [];
      if (existingTasksData) {
        tasks = JSON.parse(existingTasksData);
      }
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      return task;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      });
  },
});

export default tasksSlice.reducer;
