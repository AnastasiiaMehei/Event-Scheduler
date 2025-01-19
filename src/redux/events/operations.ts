import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  category: string;
  description: string;
}

const api = axios.create({
  baseURL: "https://event-scheduler-server.onrender.com/",
});

export const fetchEvents = createAsyncThunk<Event[], void, { rejectValue: string }>(
  "events/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/events");

   return response.data;
  } 
  catch (error) {
      console.error("Fetch events error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch events");
    }
  }
);

export const createEvent = createAsyncThunk<Event, Omit<Event, 'id'>, { rejectValue: string }>(
  "events/create",
  async (newEvent, thunkAPI) => {
    try {
      const response = await api.post("/events", newEvent);
      return response.data; 
    } catch (error) {
      console.error("Create event error:", error);
      return thunkAPI.rejectWithValue("Failed to create event");
    }
  }
);
export const updateEvent = createAsyncThunk<Event, { id: number; updatedEvent: Partial<Event> }, { rejectValue: string }>(
  "events/update",
  async ({ id, updatedEvent }, thunkAPI) => {
    try {
      const response = await api.put(`/events/${id}`, updatedEvent);
      return response.data;
    } catch (error) {
      console.error("Update event error:", error);
      return thunkAPI.rejectWithValue("Failed to update event");
    }
  }
);

export const deleteEvent = createAsyncThunk<number, number, { rejectValue: string }>(
  "events/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/events/${id}`);
      return id;
    } catch (error) {
      console.error("Delete event error:", error);
      return thunkAPI.rejectWithValue("Failed to delete event");
    }
  }
);
