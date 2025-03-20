import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/slices/auth";
import "../pages/loginandsignup.css";
import { useNavigate } from "react-router-dom";

const LoginAndSignup = () => {
  const navigate = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(true);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [loginData, setLoginData] = useState({ Email: "", UserPassword: "" });
  const [signupData, setSignupData] = useState({ FullName: "", Email: "", UserPassword: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginData)).unwrap();
      alert("✅ Login Successful!");
      navigate("/home-page");
    } catch (err) {
      alert("❌ Invalid Credentials. Please Try Again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(signupData)).unwrap();
      alert("✅ SignUp Successful!");
      setIsLoginActive(true);
      setSignupData({ FullName: "", Email: "", UserPassword: "" });
    } catch (err) {
      alert("❌ SignUp Failed. Please Try Again.");
    }
  };

  return (
    <div className="form-body">
      <section className="forms-section">
      <h1 className="section-title">🌱 Start Your Fitness Journey Today 💪</h1>        
      <div className="forms">
          {/* LOGIN FORM */}
          <div className={`form-wrapper ${isLoginActive ? "is-active" : ""}`}>
            <button type="button" className="switcher switcher-login" onClick={() => setIsLoginActive(true)}>
              Login
              <span className="underline"></span>
            </button>
            <form className="form form-login" onSubmit={handleLogin}>
              <fieldset>
                <legend>Please enter your email and password for login.</legend>
                <div className="input-block">
                  <label htmlFor="login-email">E-mail</label>
                  <input
                    id="login-email"
                    type="email"
                    value={loginData.Email}
                    onChange={(e) => setLoginData({ ...loginData, Email: e.target.value })}
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    value={loginData.UserPassword}
                    onChange={(e) => setLoginData({ ...loginData, UserPassword: e.target.value })}
                    required
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>

          {/* SIGNUP FORM */}
          <div className={`form-wrapper ${!isLoginActive ? "is-active" : ""}`}>
            <button type="button" className="switcher switcher-signup" onClick={() => setIsLoginActive(false)}>
              Sign Up
              <span className="underline"></span>
            </button>
            <form className="form form-signup" onSubmit={handleSignup}>
              <fieldset>
                <legend>Please enter your full name, email, and password for sign up.</legend>
                <div className="input-block">
                  <label htmlFor="signup-username">Full Name</label>
                  <input
                    id="signup-username"
                    type="text"
                    value={signupData.FullName}
                    onChange={(e) => setSignupData({ ...signupData, FullName: e.target.value })}
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-email">E-mail</label>
                  <input
                    id="signup-email"
                    type="email"
                    value={signupData.Email}
                    onChange={(e) => setSignupData({ ...signupData, Email: e.target.value })}
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    value={signupData.UserPassword}
                    onChange={(e) => setSignupData({ ...signupData, UserPassword: e.target.value })}
                    required
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn-signup" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginAndSignup;
