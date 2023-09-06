import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addOrderApi,
  getMyOrders,
  setPaidOrder,
} from "../../app/api/orderApis";

export const fetchOrders = createAsyncThunk<Order[]>(
  "orders/fetch",
  async () => {
    const orders = await getMyOrders();
    localStorage.setItem("orders", JSON.stringify(orders));
    return orders;
  }
);

export const payOrder = createAsyncThunk<any, any>(
  "orders/pay",
  async (id: number) => {
    const order = await setPaidOrder(id);

    const existingOrdersJSON = localStorage.getItem("orders");
    const existingOrders = existingOrdersJSON
      ? JSON.parse(existingOrdersJSON)
      : [];
    const updatedOrderIndex = existingOrders.findIndex(
      (item: any) => item.id === order.id
    );
    if (updatedOrderIndex !== -1) {
      existingOrders[updatedOrderIndex] = order;
      // Update local storage with the modified order
      localStorage.setItem("orders", JSON.stringify(existingOrders));
    }

    return order;
  }
);

export const addOrder = createAsyncThunk(
  "orders/add",
  async (orderData: any, { rejectWithValue }) => {
    try {
      const order: Order = await addOrderApi(orderData);

      // Save the updated tasks data to localStorage
      const existingOrderData = localStorage.getItem("orders");
      let orders = [];
      if (existingOrderData) {
        orders = JSON.parse(existingOrderData);
      }
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      return order;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Find the index of the updated order in state.orders
        const updatedOrderIndex = state.orders.findIndex(
          (item: Order) => item.id === action.payload.id
        );
        if (updatedOrderIndex !== -1) {
          state.orders[updatedOrderIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "An error occurred";
      });
  },
});

export default ordersSlice.reducer;
