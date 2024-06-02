import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing Router components from react-router-dom
import Navbar from "./fragments/Navbar"; // Importing Navbar component
import Footer from "./fragments/Footer"; // Importing Footer component
import Home from "./pages/Home"; // Importing Home component
import Login from "./pages/Login"; // Importing Login component
import Register from "./pages/Register"; // Importing Register component
import MyProfile from "./pages/MyProfile"; // Importing MyProfile component
import Forum from "./pages/Reviews.js";
import Social from "./pages/Social.js";
import { getUser, removeUser } from "./data/repository"; // Importing getUser and removeUser functions from repository
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import Header from "./fragments/Header.js";
import ShoppingCart from "./pages/ShoppingCart";

export default function App() {
  // State variable to store the user object
  const [user, setUser] = useState(getUser());

  // Function to log in a user by setting the user state
  const loginUser = (user) => {
    setUser(user);
  };

  // Function to log out a user by removing user data from the session
  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  // JSX structure for the main App component
  return (
    <div className="App">
      <Router>
        <Header />
        <Navbar user={user} logoutUser={logoutUser} />
        <div className="container-fluid bg-custom">
          {/* Apply custom background color */}
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/Register"
              element={<Register loginUser={loginUser} />}
            />
            <Route path="/Login" element={<Login loginUser={loginUser} />} />
            <Route path="/Social"
              element={<Social user={user} />} 
            />
            <Route path="/MyProfile"
              element={<MyProfile user={user} 
              logoutUser={logoutUser}/>} 
            />
            <Route path="/ShoppingCart" element={<ShoppingCart />} />
            <Route path="/Review" element={<Forum user={user}/>} />{" "}
            {/* Route for Forum component */}

          </Routes>
        </div>
      </Router>
    </div>
  );
}
