
import { RootState } from "../store";
export const selectLoading = (state) => state.events.loading;

export const selectFilter = (state) => state.events.filter;

export const selectAllEvents = (state: RootState) => state.events.events;
