import React, { useState } from "react";
import axios from "axios";

const CalorieLogForm = () => {
  const [formData, setFormData] = useState({
    foodItem: "Rice",
    mealType: "",
    quantity: "",
  });
  const [calories, setCalories] = useState(null);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token"); // ✅ Get token
  
    if (!token) {
      setError("You are not authenticated. Please log in.");
      return;
    }
  
    const payload = {
      userId: 1, // Set dynamically if needed
      foodItem: formData.foodItem,
      mealType: formData.mealType,
      quantity: parseFloat(formData.quantity),
      date: new Date().toISOString(),
    };
  
    try {
      const response = await axios.post(
        "http://localhost:5164/api/CalorieLog/AddCalorieLog",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
  
      if (response.data.Calories !== undefined) {
        setCalories(parseFloat(response.data.Calories).toFixed(2));
        setError(null);
      } else {
        setError("Calorie data is missing from the response.");
      }
    } catch (error) {
      console.error("Error adding calorie log:", error);
      setError("Failed to calculate calories. Please try again.");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Log Your Calorie Intake</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        {/* FoodItem Dropdown */}
        <div className="mb-3">
          <label htmlFor="foodItem" className="form-label">
            Food Item
          </label>
          <select
            id="foodItem"
            name="foodItem"
            className="form-select"
            value={formData.foodItem}
            onChange={handleChange}
          >
            <option value="Rice">Rice</option>
            <option value="Chicken">Chicken</option>
            <option value="Egg">Egg</option>
            <option value="Apple">Apple</option>
            <option value="Bread">Bread</option>
            <option value="Milk">Milk</option>
            <option value="Banana">Banana</option>
          </select>
        </div>

        {/* MealType Input */}
        <div className="mb-3">
          <label htmlFor="mealType" className="form-label">
            Meal Type
          </label>
          <input
            type="text"
            id="mealType"
            name="mealType"
            className="form-control"
            placeholder="e.g., Breakfast, Lunch, Dinner, Snack"
            value={formData.mealType}
            onChange={handleChange}
            required
          />
        </div>

        {/* Quantity Input */}
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity (in grams/serving size)
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="form-control"
            placeholder="Enter quantity in grams"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Calculate Calories
        </button>
      </form>

      {/* Display Result */}
      {calories !== null && (
        <div className="alert alert-success mt-4">
          ✅ Total Calories: <strong>{calories} kcal</strong>
        </div>
      )}

      {/* Display Error */}
      {error && (
        <div className="alert alert-danger mt-4">
          ❌ {error}
        </div>
      )}
    </div>
  );
};

export default CalorieLogForm;
