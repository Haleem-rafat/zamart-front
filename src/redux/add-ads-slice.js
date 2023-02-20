import { createSlice } from "@reduxjs/toolkit";

export const addAdsSlice = createSlice({
  name: "addAds",
  initialState: {
    addAds: {},
  },
  reducers: {
    addAds: (state, action) => {
      state.addAds = action.payload;
    },
  },
});

export const { addAds } = addAdsSlice.actions;
export default addAdsSlice.reducer;
