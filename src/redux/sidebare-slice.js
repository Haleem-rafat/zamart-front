import { createSlice } from "@reduxjs/toolkit";

const NoteToggle = {
  enableDeleteButton: false,
};

const toggleReducer = createSlice({
  name: "toggleReducer",
  initialState: NoteToggle,
  reducers: {
    On: (state) => {
      const newToggle = { ...state, enableDeleteButton: true };
      return newToggle;
    },
    Off: (state) => {
      const newToggle = { ...state, enableDeleteButton: false };
      return newToggle;
    },
  },
});
export default toggleReducer.reducer;
export const { On, Off } = toggleReducer.actions;
