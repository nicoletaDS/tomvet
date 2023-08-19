import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addOrderApi, getMyOrders } from "../../app/api/orderApis";

export const fetchOrders = createAsyncThunk<Order[]>(
  "orders/fetch",
  async () => {
    const orders = await getMyOrders();
    localStorage.setItem("orders", JSON.stringify(orders));
    return orders;
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
      });
  },
});

export default ordersSlice.reducer;
