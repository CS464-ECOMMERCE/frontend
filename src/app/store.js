import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/store/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
