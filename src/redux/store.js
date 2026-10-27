import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/book/bookSlice";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";
import borrowReucer from "../features/borrow/borrowSlice";
import reviewReducer from "../features/review/reviewSlice";
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const rootReducer = combineReducers({
  bookInfo: bookReducer,
  userInfo: userReducer,
  borrowInfo: borrowReucer,
  reviewInfo: reviewReducer,
  cartInfo: persistReducer(cartPersistConfig, cartReducer),
});

// export default configureStore({
//   reducer: {
//     bookInfo: bookReducer,
//     userInfo: userReducer,
//     cartInfo: cartReducer,
//   },
// });
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export default store;
