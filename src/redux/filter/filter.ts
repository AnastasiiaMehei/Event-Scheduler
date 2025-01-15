import { createSelector, createSlice } from "@reduxjs/toolkit";
import { selectAllEvents } from "../events/selectors";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
    date: "",
    category: ""
  },
  reducers: {
    changeEventsFilter: (state, action) => {
      state.name = action.payload;
    },
    changeDateFilter: (state, action) => {
      state.date = action.payload;
    },
    changeCategoryFilter: (state, action) => {
      state.category = action.payload;
    }
  },
});
export const { changeEventsFilter, changeDateFilter, changeCategoryFilter } = filtersSlice.actions;
export default filtersSlice.reducer;

export const selectEventsFilter = (state) => state.filters?.name ?? "";
export const selectDateFilter = (state) => state.filters?.date ?? "";
export const selectCategoryFilter = (state) => state.filters?.category ?? "";

export const selectFilteredEvents = createSelector(
  [selectAllEvents, selectEventsFilter, selectDateFilter, selectCategoryFilter],
  (events, nameFilter, dateFilter, categoryFilter) => {
    return events.filter(event => {
      const matchesName = !nameFilter || event.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesDate = !dateFilter || event.date === dateFilter;
      const matchesCategory = !categoryFilter || event.category === categoryFilter;
      return matchesName && matchesDate && matchesCategory;
    });
  }
);
