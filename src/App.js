import { BrowserRouter as Router,Routes,Route }  from "react-router-dom";
import LoginAndSignup from "./pages/loginAndsignup";
import HomePage from "./pages/homepage";
import AddWorkoutForm from "./pages/workoutform";
import FitnessInsightForm from "./pages/fitnessInsightform";
import Navbar from "./components/Navbar";
import CalorieLogForm from "./pages/calorielogform";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAndSignup/>}></Route>
        <Route path="/home-page" element={<><Navbar/><HomePage/></>}></Route>
        <Route path="/workout-home" element={<><Navbar/><AddWorkoutForm/></>}></Route>
        <Route path="/fitness-insight" element={<><Navbar/><FitnessInsightForm/></>}></Route>
        <Route path="/calorie-log" element={<><Navbar/><CalorieLogForm/></>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
