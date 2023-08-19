import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/slices/cartSlice";
import petsReducer from "../features/pets/slices/petsSlice";
import tasksReducer from "../features/pets/slices/tasksSlice";
import appointmentsReducer from "../features/appointment/appointmentSlice";
import cabinetReducer from "../features/appointment/cabinetSlice";
import ordersReducer from "../features/orders/ordersSlice";
import orderPayReducer from "../features/cart/slices/paySlice";

const reducer = {
  auth: authReducer,
  cart: cartReducer,
  pets: petsReducer,
  tasks: tasksReducer,
  appointments: appointmentsReducer,
  cabinet: cabinetReducer,
  orders: ordersReducer,
  orderPay: orderPayReducer,
};

const getUser = () => {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : null;
};

const getCart = () => {
  const cart = { cartItems: [], shippingAddress: {} };
  const cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    try {
      cart.cartItems = JSON.parse(cartItems);
    } catch (error) {
      console.error("Error parsing cart items:", error);
    }
  }

  const shippingAddress = localStorage.getItem("shippingAddress");
  if (shippingAddress) {
    try {
      cart.shippingAddress = JSON.parse(shippingAddress);
    } catch (error) {
      console.error("Error parsing shipping address:", error);
    }
  }

  return cart;
};

const getPets = () => {
  const petsState = { pets: [], loading: false, error: null };
  const myPets = localStorage.getItem("pets");
  if (myPets) {
    try {
      petsState.pets = JSON.parse(myPets);
    } catch (error) {
      console.error("Error parsing pets items:", error);
    }
  }
  return petsState;
};

const getTasks = () => {
  const tasksState = { tasks: [], loading: false, error: null };
  const myTasks = localStorage.getItem("tasks");
  if (myTasks) {
    try {
      tasksState.tasks = JSON.parse(myTasks);
    } catch (error) {
      console.error("Error parsing tasks items:", error);
    }
  }
  return tasksState;
};

const getAppointments = () => {
  const appointmentsState = { appointments: [], loading: false, error: null };
  const myAppointments = localStorage.getItem("appointments");
  if (myAppointments) {
    try {
      appointmentsState.appointments = JSON.parse(myAppointments);
    } catch (error) {
      console.error("Error parsing appointments items:", error);
    }
  }
  return appointmentsState;
};

const getCabinet = () => {
  const cabinetState = {
    cabinet: { doctors: [], services: [] },
    loading: false,
    error: null,
  };
  const cabinet = localStorage.getItem("cabinet");
  if (cabinet) {
    try {
      cabinetState.cabinet = JSON.parse(cabinet);
    } catch (error) {
      console.error("Error parsing cabinet items:", error);
    }
  }
  return cabinetState;
};

const getOrders = () => {
  const ordersState = { orders: [], loading: false, error: null };
  const myOrders = localStorage.getItem("orders");
  if (myOrders) {
    try {
      ordersState.orders = JSON.parse(myOrders);
    } catch (error) {
      console.error("Error parsing orders items:", error);
    }
  }
  return ordersState;
};

const preloadedState = {
  auth: {
    session: getUser(),
    appLoading: false,
    loading: false,
    error: null,
    success: false,
  },
  cart: getCart(),
  pets: getPets(),
  tasks: getTasks(),
  appointments: getAppointments(),
  cabinet: getCabinet(),
  orders: getOrders(),
};

const store = configureStore({
  reducer,
  preloadedState,
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
