// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../data/repository";

import graphicSVG from "../images/signin.svg";

// Login component to handle user login
export default function Login(props) {
  const navigate = useNavigate(); // Navigation hook from react-router-dom
  const [fields, setFields] = useState({ username: "", password: "" }); // State for form fields
  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  // Generic change handler to update form fields
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call API to verify user credentials
    const user = await verifyUser(fields.username, fields.password);

    // If user is null, login failed
    if (user === null) {
      // Reset password field to blank and set error message
      setFields({ ...fields, password: "" });
      setErrorMessage("Username and / or password invalid, please try again.");
      return;
    }

    // Set user state to indicate successful login
    props.loginUser(user);

    // Navigate to the home page
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-7">
          <br />
          <h2 className="slogan">
            Cultivating a healthier tomorrow, one login at a time.
          </h2>
          <div className="left-bottom-section">
            <img src={graphicSVG} alt="Graphic" className="img-fluid" />
          </div>
        </div>

        <div className="col-md-5">
          <h1 className="slogan-2">Login for more content!</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label">
                Username
              </label>
              <input
                name="username"
                id="username"
                className="form-control"
                value={fields.username}
                onChange={handleInputChange}
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={fields.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            {/* Display error message if login failed */}
            {errorMessage !== null && (
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
