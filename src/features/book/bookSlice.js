import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookCollection: [],
  cart: [],
};
const bookSlice = createSlice({
  name: "bookCollection",
  initialState,
  reducers: {
    setBookCollection: (state, action) => {
      state.bookCollection = action.payload;
    },
    setCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
  },
});
const { reducer, actions } = bookSlice;
export const { setBookCollection, setCart, removeCart } = actions;
export default reducer;
