import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = ({ logoutUser }) => {
  const navigate = useNavigate();
  const initialUserData = JSON.parse(localStorage.getItem("user")) || {};

  const [userData, setUserData] = useState({
    first_name: initialUserData.first_name || "",
    last_name: initialUserData.last_name || "",
    username: initialUserData.username || "",
    password: initialUserData.password || "",
    registrationDate: initialUserData.registrationDate || ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    const { registrationDate, ...dataToUpdate } = userData; // Exclude registrationDate
    try {
      const response = await fetch(`http://localhost:4000/api/users/update/${userData.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToUpdate) // Send only the fields to be updated
      });
  
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
  
      localStorage.setItem("user", JSON.stringify({ ...userData, ...dataToUpdate }));
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };
  const handleCancel = () => {
    setUserData({
      first_name: initialUserData.first_name || "",
      last_name: initialUserData.last_name || "",
      username: initialUserData.username || "",
      password: initialUserData.password || "",
      registrationDate: initialUserData.registrationDate || ""
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/delete/${userData.username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      
      localStorage.removeItem("user");
      setIsDeleted(true);
      alert("Profile deleted successfully!");
      logoutUser();
      navigate("/");
    } catch (error) {
      alert("Error deleting profile: " + error.message);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  if (isDeleted) {
    return <h2>Your profile has been deleted.</h2>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      <p>First Name: {userData.first_name}</p>
      <p>Last Name: {userData.last_name}</p>
      <p>Email: {userData.username}</p>
      <p>Password: {userData.password}</p>
      <p>Registration Date: {userData.registrationDate}</p>
      {!isEditing ? (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
