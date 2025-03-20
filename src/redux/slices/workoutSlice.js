// src/redux/slices/workoutSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async action to add a workout
export const addWorkout = createAsyncThunk(
  "workout/addWorkout",
  async (workoutData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get JWT token from localStorage
      const response = await axios.post(
        "http://localhost:5164/api/Workout", // Correct API endpoint
        workoutData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return workout details from API
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          return rejectWithValue("User's fitness data not found.");
        } else if (error.response.status === 400) {
          return rejectWithValue("Invalid workout data.");
        }
      }
      return rejectWithValue(
        error.response?.data || "Failed to add workout."
      );
    }
  }
);

// ✅ Async action to get user workouts
export const getUserWorkouts = createAsyncThunk(
  "workout/getUserWorkouts",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5164/api/Workout/${userId}`, // Get user's workouts by userId
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return list of workouts
    } catch (error) {
      if (error.response && error.response.status === 403) {
        return rejectWithValue("You are not authorized to view these workouts.");
      }
      return rejectWithValue(
        error.response?.data || "Failed to fetch workouts."
      );
    }
  }
);

// ✅ Async action to delete a workout
export const deleteWorkout = createAsyncThunk(
  "workout/deleteWorkout",
  async (workoutId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5164/api/Workout/${workoutId}`, // Delete workout by ID
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return workoutId; // Return deleted workout ID
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("Workout not found or unauthorized.");
      }
      return rejectWithValue(
        error.response?.data || "Failed to delete workout."
      );
    }
  }
);

// ✅ Initial state with addedWorkout
const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [], // Store workouts for display
    addedWorkout: null, // ✅ Store the latest added workout
    loading: false,
    error: null,
    success: false,
  },
  reducers: {}, // No synchronous reducers needed yet
  extraReducers: (builder) => {
    builder
      // Add Workout
      .addCase(addWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addedWorkout = action.payload; // ✅ Store added workout
        state.workouts.push(action.payload); // ✅ Add new workout to list
      })
      .addCase(addWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error adding workout.";
      })

      // Get User Workouts
      .addCase(getUserWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload; // ✅ Load workouts into state
      })
      .addCase(getUserWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching workouts.";
      })

      // Delete Workout
      .addCase(deleteWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.workouts = state.workouts.filter(
          (workout) => workout.id !== action.payload // ✅ Remove deleted workout
        );
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error deleting workout.";
      });
  },
});

// ✅ Only export the reducer
export default workoutSlice.reducer;
