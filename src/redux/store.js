// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import workoutReducer from "./slices/workoutSlice";
import fitnessInsightReducer from "./slices/fitnessInsightSlice";
import calorieLogReducer from "./slices/calorieLogSlice";

const store = configureStore({          // building block->redux
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
    fitnessInsight: fitnessInsightReducer,
    calorieLog: calorieLogReducer,
    
  },
  devTools: process.env.NODE_ENV !== "production", //  Enable Redux DevTools in dev
});

export default store;

