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
  },
});
const { reducer, actions } = bookSlice;
export const { setBookCollection, setCart } = actions;
export default reducer;
