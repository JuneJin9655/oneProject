import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data.json";

const statusSlice = createSlice({
  name: "status",
  initialState: data,
  reducers: {
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const invoice = state.find((invoice) => invoice.id === id);
      if (invoice) {
        invoice.status = status;
      }
    },
  },
});

export const { updateStatus } = statusSlice.actions;
export default statusSlice.reducer;
