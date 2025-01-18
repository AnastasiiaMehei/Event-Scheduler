import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "./operations";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  category: string;
  description: string;
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
     .addCase(fetchEvents.fulfilled, (state, action) => {
  state.loading = false;
  state.events = action.payload;
})
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        console.log('State events before push:', state.events)
        if (!Array.isArray(state.events)) {
          state.events = Array.from(state.events); // Convert Proxy to array if needed
        }
        state.events.push(action.payload);
        console.log('State events after push:', state.events);
      })
      
      .addCase(updateEvent.fulfilled, (state, action) => {
        console.log('State events before update:', state.events);
        if (!Array.isArray(state.events)) {
          state.events = Array.from(state.events); // Convert Proxy to array if needed
        }
        const index = state.events.findIndex(event => event._id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload; // Update the event with the new data
        }
        console.log('State events after update:', state.events);
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        console.log('State events before filter:', state.events);
        if (!Array.isArray(state.events)) {
          state.events = Array.from(state.events); // Convert Proxy to array if needed
        }
        state.events = state.events.filter(event => event._id !== action.payload);
        console.log('State events after filter:', state.events);
      });
  },
});

export default eventsSlice.reducer;