import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type CartItem = {
  product: number;
  title: string;
  image: string;
  price: number;
  category: string;
  count_in_stock: number;
  sell_by: string;
  description: string;
  qty: number;
};

type CartState = {
  cartItems: CartItem[];
  shippingAddress: Record<string, any>;
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data: { id: string; qty: number }, { getState }: any) => {
    const { data: productData } = await axios.get(`/api/products/${data.id}`);
    const newItem: CartItem = {
      product: productData.id,
      title: productData.title,
      image: productData.image,
      price: productData.price,
      category: productData.category,
      count_in_stock: productData.count_in_stock,
      sell_by: productData.sell_by,
      description: productData.description,
      qty: data.qty,
    };

    localStorage.setItem(
      "cartItems",
      JSON.stringify([...getState().cart.cartItems, newItem])
    );

    return newItem;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id: number, { getState }: any) => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        getState().cart.cartItems.filter((item: any) => item.product !== id)
      )
    );

    return id; // Return the id of the product to remove
  }
);

export const saveShippingAddress = createAsyncThunk(
  "cart/saveShippingAddress",
  async (data: Record<string, any>, { getState }: any) => {
    localStorage.setItem("shippingAddress", JSON.stringify(data));
    return data;
  }
);

const initialState: CartState = { cartItems: [], shippingAddress: {} };

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    cartClearItems: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action: any) => {
        const item = action.payload;
        const existItem = state.cartItems.find(
          (x) => x.product === item.product
        );
        if (existItem) {
          const index = state.cartItems.findIndex(
            (x) => x.product === item.product
          );
          state.cartItems[index].qty = item.qty;
        } else {
          state.cartItems.push(item);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action: any) => {
        const id = action.payload;
        const index = state.cartItems.findIndex((x) => x.product === id);
        if (index > -1) {
          state.cartItems.splice(index, 1);
        }
      })
      .addCase(saveShippingAddress.fulfilled, (state, action: any) => {
        state.shippingAddress = action.payload;
      });
  },
});
export const { cartClearItems } = cartSlice.actions;
export default cartSlice.reducer;
