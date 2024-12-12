import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice } from "../types";
import { mockInvoices } from "../../../mocks/mockData";

const initialState: Invoice[] = JSON.parse(JSON.stringify(mockInvoices)); // 深拷贝，确保初始状态独立

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    updateStatus: (
      state,
      action: PayloadAction<{ id: string; status: Invoice["status"] }>
    ) => {
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
