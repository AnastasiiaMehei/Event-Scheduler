import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  id: string;
  date: string;
  time: string;
  category: string;
  description: string;
}

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<Event>) {
      state.events.push(action.payload);
    },
    editEvent(state, action: PayloadAction<Event>) {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
});

export const { addEvent, editEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
