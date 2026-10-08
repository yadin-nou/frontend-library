import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/book/bookSlice";
import userReducer from "../features/user/userSlice";
export default configureStore({
  reducer: {
    bookInfo: bookReducer,
    userInfo: userReducer,
  },
});
