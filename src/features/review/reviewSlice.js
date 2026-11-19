import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setAllReview: (state, action) => {
      state.reviews = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});
const { reducer, actions } = reviewSlice;
export const { setAllReview } = actions;
export default reducer;
