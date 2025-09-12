import { configureStore } from "@reduxjs/toolkit";
import desiredReducer from "@/lib/features/desiredSlice";

const store = configureStore({
  reducer: {
    desired: desiredReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
