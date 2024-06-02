// Footer.js

import React from "react";

// Footer component to display at the bottom of the page
export default function Footer() {
  return (
    // Footer element with Bootstrap classes for styling
    <footer className="mt-auto py-3 bg-dark text-white">
      {/* Container div to hold the footer content */}
      <div className="container">
        {/* Footer text */}
        Register, Login, Logout and Post Example &copy; 2022
      </div>
    </footer>
  );
}
