import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_BASE_URL = "http://localhost:5164/api/FitnessInsights"; // Correct backend URL

const initialState = {
  loading: false,
  error: null,
  success: false,
  latestInsight: null,
};

// Add Fitness Insight (POST)
export const addFitnessInsight = createAsyncThunk(
  "fitnessInsight/addFitnessInsight",
  async (insight, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await axios.post(API_BASE_URL, insight, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const selectLatestInsight = createSelector(
  (state) => state.fitnessInsight, // <-- This is returning undefined
  (fitnessInsight) => fitnessInsight.latestInsight
);


// Fetch Latest Fitness Insight (GET)
export const fetchLatestFitnessInsight = createAsyncThunk(
  "fitnessInsight/fetchLatestFitnessInsight",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/latest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fitnessInsightSlice = createSlice({
  name: "fitnessInsight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFitnessInsight.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addFitnessInsight.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.latestInsight = action.payload; // Store latest insight with BMI
      })
      
      .addCase(addFitnessInsight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error adding fitness insight.";
      })
      .addCase(fetchLatestFitnessInsight.fulfilled, (state, action) => {
        state.latestInsight = action.payload;
      });
  },
});


export default fitnessInsightSlice.reducer;
