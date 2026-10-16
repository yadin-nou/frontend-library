import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
});
const { reducer, actions } = cartSlice;
export const { setCart, removeCart, emptyCart } = actions;
export default reducer;
