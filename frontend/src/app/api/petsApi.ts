import axios from "axios";
import { authorizedApi } from "./authorizedApi";

const backendURL = "http://127.0.0.1:8000";

export const getMyPets = async () => {
  const pets = await authorizedApi.get(`/api/pets/`);
  console.log("RSP DATA", pets.data);
  return pets.data;
};

export const addPetApi = async (
  nameOrData: string | FormData,
  birthday?: string,
  cipNr?: string,
  passport?: boolean,
  weight?: number,
  image?: File | null | undefined,
  owner?: string
): Promise<Pet> => {
  const user = localStorage.getItem("auth");
  const access = user ? JSON.parse(user).access : "";

  const config = {
    headers: {
      Authorization: `JWT ${access}`,
      "Content-Type": "multipart/form-data",
    },
  };

  let data: FormData;

  if (nameOrData instanceof FormData) {
    data = nameOrData;
  } else {
    data = new FormData();
    data.append("name", nameOrData);
    data.append("birthday", birthday || "");
    data.append("cipNr", cipNr || "");
    data.append("passport", passport ? "true" : "false");
    data.append("weight", weight?.toString() || "");
    if (image !== undefined && image !== null) {
      data.append("image", image);
    }
    data.append("owner", owner || "");
  }

  const pet = await axios.post(`${backendURL}/api/pets/add/`, data, config);
  console.log("RSP DATA", pet.data);
  return pet.data;
};

export const getPet = async (id: number) => {
  const pet = await authorizedApi.get(`/api/pets/${id}/`);
  console.log("RSP DATA", pet.data);
  return pet.data;
};

export const getMyTasks = async () => {
  const tasks = await authorizedApi.get(`/api/pets/tasks/`);
  console.log("RSP DATA", tasks.data);
  return tasks.data;
};

export const getTask = async (id: number) => {
  const task = await authorizedApi.get(`/api/pets/tasks/${id}/`);
  console.log("RSP DATA", task.data);
  return task.data;
};

export const addTaskApi = async (taskData: Task): Promise<Task> => {
  const task = await authorizedApi.post(`/api/pets/tasks/add/`, {
    pet: taskData.pet,
    title: taskData.title,
    details: taskData.details,
    startDate: taskData.startDate,
    endDate: taskData.endDate,
    repeat: taskData.repeat,
    isTreatment: taskData.isTreatment,
  });
  console.log("RSP DATA", task.data);
  return task.data;
};

export const setTaskDone = async (id: number, done: boolean) => {
  const task = await authorizedApi.patch(`/api/pets/tasks/${id}/`, {
    done,
  });
  console.log("RSP DATA", task.data);
  return task.data;
};
