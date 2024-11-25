import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./api/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
