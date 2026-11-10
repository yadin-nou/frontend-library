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
    updateBookInCollection: (state, action) => {
      const { _id, changes } = action.payload;
      const index = state.bookCollection.findIndex((b) => b._id === _id);

      if (index !== -1) {
        state.bookCollection[index] = {
          ...state.bookCollection[index],
          ...changes,
        };
      }
    },
  },
});
const { reducer, actions } = bookSlice;
export const { setBookCollection, setBookEmpty, updateBookInCollection } =
  actions;
export default reducer;
