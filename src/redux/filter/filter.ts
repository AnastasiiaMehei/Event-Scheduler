import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../store';
import { selectAllEvents } from '../events/selectors';

interface FiltersState {
  name: string;
  date: string;
  category: string;
}

const initialState: FiltersState = {
  name: '',
  date: '',
  category: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeEventsFilter: (state, action) => {
      state.name = action.payload;
    },
    changeDateFilter: (state, action) => {
      state.date = action.payload;
    },
    changeCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { changeEventsFilter, changeDateFilter, changeCategoryFilter } = filtersSlice.actions;
export default filtersSlice.reducer;

export const selectEventsFilter = (state: RootState) => state.filters?.name ?? '';
export const selectDateFilter = (state: RootState) => state.filters?.date ?? '';
export const selectCategoryFilter = (state: RootState) => state.filters?.category ?? '';

export const selectFilteredEvents = createSelector(
  [selectAllEvents, selectEventsFilter, selectDateFilter, selectCategoryFilter],
  (events, nameFilter, dateFilter, categoryFilter) => {
    if (!Array.isArray(events)) return []; // Ensure events is an array
    return events.filter((event) => {
      const matchesName = !nameFilter || (event.name && event.name.toLowerCase().includes(nameFilter.toLowerCase()));
      const matchesDate = !dateFilter || event.date === dateFilter;
      const matchesCategory = !categoryFilter || event.category === categoryFilter;
      return matchesName && matchesDate && matchesCategory;
    });
  }
);

