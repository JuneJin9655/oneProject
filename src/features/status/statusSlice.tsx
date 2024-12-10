import { createSlice } from "@reduxjs/toolkit";
import { mockInvoices } from "../../mocks/mockData";

const statusSlice = createSlice({
  name: "status",
  initialState: mockInvoices,

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
console.log("Initial mockInvoices:", mockInvoices);

export const { updateStatus } = statusSlice.actions;
export default statusSlice.reducer;
