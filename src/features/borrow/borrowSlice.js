import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBorrows: [], // admin to see
  myBorrows: [], // only client to see
};
const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    setAllBorrow: (state, action) => {
      state.allBorrows = action.payload;
    },
    setMyBorrow: (state, action) => {
      state.myBorrows = action.payload;
    },
  },
});
const { reducer, actions } = borrowSlice;
export const { setAllBorrow, setMyBorrow } = actions;
export default reducer;
