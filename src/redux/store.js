import { configureStore } from "@reduxjs/toolkit";
import addAdsSlice from "./add-ads-slice";
import toggleReducer from "./sidebare-slice";

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    addAds: addAdsSlice,
  },
});
