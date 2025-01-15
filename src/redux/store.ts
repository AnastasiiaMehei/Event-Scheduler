import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./events/slice";
import filtersReducer from "./filter/filter";
export const store = configureStore({
  reducer: { events: eventsReducer, filters: filtersReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
