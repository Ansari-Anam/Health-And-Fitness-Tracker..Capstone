// src/components/AddWorkoutForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWorkout } from "../redux/slices/workoutSlice";

const AddWorkoutForm = () => {
  const dispatch = useDispatch();
  const { addedWorkout, loading, success, error } = useSelector(
    (state) => state.workout
  );

  // Form state
  const [workoutData, setWorkoutData] = useState({
    exerciseName: "",
    duration: "",
    metValue: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({
      ...workoutData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addWorkout(workoutData)); // Dispatch addWorkout action
  };

  return (
    <div className="container mt-4">
      <h3>Add Workout</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exerciseName" className="form-label">
            Exercise Name
          </label>
          <input
            type="text"
            id="exerciseName"
            name="exerciseName"
            value={workoutData.exerciseName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={workoutData.duration}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>


        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding Workout..." : "Add Workout"}
        </button>
      </form>

      {/* ✅ Show workout added message after success */}
      {success && addedWorkout && (
        <div className="alert alert-success mt-3">
          ✅ Workout added successfully! <br />
          <strong>Exercise Name:</strong> {workoutData.exerciseName} <br />
          <strong>Duration:</strong> {workoutData.duration} minutes <br />
          <strong>Calories Burned:</strong> {addedWorkout.caloriesBurned.toFixed(2)} kcal
        </div>
      )}

      {/* ❌ Show error if workout addition fails */}
      {error && <div className="alert alert-danger mt-3">❌ {error}</div>}
    </div>
  );
};

export default AddWorkoutForm;
