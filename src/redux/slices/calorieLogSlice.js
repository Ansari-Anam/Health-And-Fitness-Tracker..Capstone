import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for CalorieLogs API
const API_BASE_URL = "http://localhost:5164/api/CalorieLog";

// Initial state
const initialState = {
  loading: false,
  calorieLogs: [],
  error: null,
  totalCalories: 0,
};

// ➡️ Add Calorie Log (POST)
export const addCalorieLog = createAsyncThunk(
  "calorieLog/addCalorieLog",
  async (logData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await axios.post(`${API_BASE_URL}/AddCalorieLog`, logData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding calorie log.");
    }
  }
);

// ➡️ Fetch Calorie Logs by User (GET)
export const fetchCalorieLogsByUser = createAsyncThunk(
  "calorieLog/fetchCalorieLogsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/GetLogsByUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching calorie logs.");
    }
  }
);

// Calorie Log Slice
const calorieLogSlice = createSlice({
  name: "calorieLog",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.calorieLogs = [];
      state.error = null;
      state.totalCalories = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // ➡️ Add Calorie Log
      .addCase(addCalorieLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCalorieLog.fulfilled, (state, action) => {
        state.loading = false;
        state.calorieLogs.push(action.payload);
        state.totalCalories += action.payload.calories;
      })
      .addCase(addCalorieLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add calorie log.";
      })

      // ➡️ Fetch Calorie Logs
      .addCase(fetchCalorieLogsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalorieLogsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.calorieLogs = action.payload;
        state.totalCalories = action.payload.reduce((acc, log) => acc + log.calories, 0);
      })
      .addCase(fetchCalorieLogsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch calorie logs.";
      });
  },
});

// ➡️ Export actions
export const { resetState } = calorieLogSlice.actions;

// ➡️ Selector to get calorie logs
export const selectCalorieLogs = (state) => state.calorieLog.calorieLogs;

// ➡️ Selector to get total calories
export const selectTotalCalories = createSelector(
  (state) => state.calorieLog,
  (calorieLog) => calorieLog.totalCalories
);

// ➡️ Export reducer
export default calorieLogSlice.reducer;
