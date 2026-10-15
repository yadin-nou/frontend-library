import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/book/bookSlice";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";
export default configureStore({
  reducer: {
    bookInfo: bookReducer,
    userInfo: userReducer,
    cartInfo: cartReducer,
  },
});
