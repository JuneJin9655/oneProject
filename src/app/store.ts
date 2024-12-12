import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/store/themeSlice";
import statusReducer from "../features/invoices/store/statusSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    status: statusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
