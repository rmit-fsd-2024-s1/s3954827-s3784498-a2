// Navbar.js

import React from "react";
import { Link } from "react-router-dom";

// Navbar component to display navigation links
export default function Navbar(props) {
  return (
    // Navbar with Bootstrap classes for styling
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Navbar brand */}
        <div className="navbar-brand" to="/"></div>
        {/* Navbar toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar collapse container */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navbar links */}
          <ul className="navbar-nav mr-auto">
            {/* Home link */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {/* Conditional rendering of profile and forum links if user is logged in */}
            {props.user !== null && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/MyProfile">
                    My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Social">
                    Social
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Review">
                    Reviews
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ShoppingCart" className="nav-link">
                    Shopping Cart
                  </Link>
                </li>
              </>
            )}
          </ul>
          {/* Authentication links */}
          <ul className="navbar-nav">
            {/* Conditional rendering of register and login links based on user login status */}
            {props.user === null ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Welcome message and logout link when user is logged in */}
                <li className="nav-item">
                  <span className="nav-link text-light">
                    Welcome, {props.user.username}
                  </span>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={props.logoutUser}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
