import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFitnessInsight,
  fetchLatestFitnessInsight,
  selectLatestInsight, // Import the selector
} from "../redux/slices/fitnessInsightSlice";

const FitnessInsightForm = () => {
  const dispatch = useDispatch();

  // Get latest insight from Redux store
  const latestInsight = useSelector(selectLatestInsight);

  // Form states
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [progressNote, setProgressNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch latest insight after component mounts
  useEffect(() => {
    dispatch(fetchLatestFitnessInsight());
  }, [dispatch]);


  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!weight || !height) {
      setError("Weight and Height are required.");
      return;
    }

    if (height <= 0 || weight <= 0) {
      setError("Height and Weight must be greater than zero.");
      return;
    }

    // Create data object
    const newFitnessInsight = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      progressNote,
    };

    // Dispatch action to add fitness insight
    const resultAction = await dispatch(addFitnessInsight(newFitnessInsight));

    if (addFitnessInsight.fulfilled.match(resultAction)) {
      // Show success message and fetch the latest insight
      setSuccess(true);
      dispatch(fetchLatestFitnessInsight());
    } else {
      setError(resultAction.payload || "Error adding fitness insight.");
    }

    // Reset form and clear errors
    setWeight("");
    setHeight("");
    setProgressNote("");
    setError("");
  };

  return (
    <div className="card p-4 shadow-lg">
      <h3 className="text-center mb-4">Add Fitness Insight</h3>

      {/* Success Message */}
      {success && (
        <div className="alert alert-success" role="alert">
          Fitness Insight added successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Weight Field */}
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        {/* Height Field */}
        <div className="mb-3">
          <label htmlFor="height" className="form-label">
            Height (m)
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>

        {/* Progress Note Field */}
        <div className="mb-3">
          <label htmlFor="progressNote" className="form-label">
            Progress Note
          </label>
          <textarea
            className="form-control"
            id="progressNote"
            rows="3"
            value={progressNote}
            onChange={(e) => setProgressNote(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Add Insight
        </button>
      </form>

      {/* Show Latest Insight after Submission */}
      {latestInsight && (
        <div className="mt-4 alert alert-info">
          <h5>Latest Fitness Insight</h5>
          <p>
            <strong>Weight:</strong> {latestInsight?.Weight?.toFixed(2)} kg
          </p>
          <p>
            <strong>Height:</strong> {latestInsight?.Height?.toFixed(2)} m
          </p>
          <p>
            <strong>BMI:</strong> {latestInsight?.BMI?.toFixed(2)}
          </p>
          {/* {latestInsight?.progressNote && ( */}
            <p>
              <strong>Progress Note:</strong> {latestInsight.ProgressNote}
            </p>
        
        </div>
      )}
    </div>
  );
};

export default FitnessInsightForm;
