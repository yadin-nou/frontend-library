import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookCollection: [],
  // cart: [],
};
const bookSlice = createSlice({
  name: "bookCollection",
  initialState,
  reducers: {
    setBookCollection: (state, action) => {
      state.bookCollection = action.payload;
    },
    setBookEmpty: (state, action) => {
      state.bookCollection = [];
    },
  },
});
const { reducer, actions } = bookSlice;
export const { setBookCollection, setBookEmpty } = actions;
export default reducer;
