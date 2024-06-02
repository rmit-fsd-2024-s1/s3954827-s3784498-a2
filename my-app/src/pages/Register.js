import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { findUser, createUser } from "../data/repository";
import graphicSVG from "../images/graphicSVG.svg"; // Make sure the path to your SVG is correct

// Register component for user registration
export default function Register(props) {
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { trimmedFields, isValid } = await handleValidation();
    if (!isValid) return;

    const user = await createUser(trimmedFields);
    props.loginUser(user);
    navigate("/");
  };

  const handleValidation = async () => {
    const trimmedFields = trimFields();
    const currentErrors = {};

    let key = "username";
    let field = trimmedFields[key];
    if (field.length === 0) currentErrors[key] = "Username is required.";
    else if (field.length > 32)
      currentErrors[key] = "Username length cannot be greater than 32.";
    else if ((await findUser(trimmedFields.username)) !== null)
      currentErrors[key] = "Username is already registered.";

    key = "firstname";
    field = trimmedFields[key];
    if (field.length === 0) currentErrors[key] = "First name is required.";
    else if (field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "lastname";
    field = trimmedFields[key];
    if (field.length === 0) currentErrors[key] = "Last name is required.";
    else if (field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    key = "password";
    field = trimmedFields[key];
    if (field.length === 0) currentErrors[key] = "Password is required.";
    else if (field.length < 6)
      currentErrors[key] = "Password must contain at least 6 characters.";

    key = "confirmPassword";
    field = trimmedFields[key];
    if (field !== trimmedFields.password)
      currentErrors[key] = "Passwords do not match.";

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimFields = () => {
    const trimmedFields = {};
    Object.keys(fields).forEach((key) => {
      trimmedFields[key] = fields[key].trim();
    });
    setFields(trimmedFields);
    return trimmedFields;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <br />
          <h2 className="text-center mb-4">
            Nature's goodness, delivered to your doorstep.
          </h2>
          <img src={graphicSVG} alt="Graphic" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h1 className="text-center mb-4">Register with us!</h1>
          <form onSubmit={handleSubmit}>
            {/* Username field */}
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
              />
              {errors.username && (
                <div className="text-danger">{errors.username}</div>
              )}
            </div>
            {/* First name field */}
            <div className="form-group">
              <label htmlFor="firstname" className="control-label">
                First name
              </label>
              <input
                name="firstname"
                id="firstname"
                className="form-control"
                value={fields.firstname}
                onChange={handleInputChange}
              />
              {errors.firstname && (
                <div className="text-danger">{errors.firstname}</div>
              )}
            </div>
            {/* Last name field */}
            <div className="form-group">
              <label htmlFor="lastname" className="control-label">
                Last name
              </label>
              <input
                name="lastname"
                id="lastname"
                className="form-control"
                value={fields.lastname}
                onChange={handleInputChange}
              />
              {errors.lastname && (
                <div className="text-danger">{errors.lastname}</div>
              )}
            </div>
            {/* Password field */}
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password{" "}
                <small className="text-muted">
                  must be at least 6 characters
                </small>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={fields.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            {/* Confirm password field */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="control-label">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                value={fields.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
            </div>
            {/* Submit and cancel buttons */}
            <div className="form-group">
              <input
                type="submit"
                className="btn btn-primary btn-block"
                value="Register"
              />
              <Link className="btn btn-outline-dark btn-block" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
