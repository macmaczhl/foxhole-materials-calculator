import { configureStore } from "@reduxjs/toolkit";
import desiredReducer from "@/lib/features/desiredSlice";
import existingReducer from "@/lib/features/existingSlice";

const store = configureStore({
  reducer: {
    desired: desiredReducer,
    existing: existingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
