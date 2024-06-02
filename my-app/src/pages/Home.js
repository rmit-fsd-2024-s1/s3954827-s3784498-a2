// Home.js
import React from "react";
import logo from "../logo.svg"; // Importing logo image

// Home component to display the home page
export default function Home(props) {
  return (
    <div className="text-center">
      <h1 className="display-4">Home</h1>
      {/* Display user's name if logged in */}
      {props.user !== null && (
        <h4>
          <strong>
            Hello {props.user.first_name} {props.user.last_name}!
          </strong>
        </h4>
      )}
      {/* Display logo image */}
      <p>
        This page will display information regarding organic foods and
        nutritional advice
      </p>
    </div>
  );
}
