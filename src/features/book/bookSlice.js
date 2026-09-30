import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookCollection: [],
};
const bookSlice = createSlice({
  name: "bookCollection",
  initialState,
  reducers: {
    setBookCollection: (state, action) => {
      state.bookCollection = action.payload;
    },
  },
});
const { reducer, actions } = bookSlice;
export const { setBookCollection } = actions;
export default reducer;
