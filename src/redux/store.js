import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./sidebare-slice";

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
  },
});
