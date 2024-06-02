import React from "react";
import logo from "../../src/images/soilLogo3.png"; // Adjusted import path

// Functional component for the header
function Header() {
  return (
    <header>
      <div className="header-content d-flex align-items-center">
        <div className="company-name mr-4"></div>
        <img
          src={logo}
          alt="Company Logo"
          className="img-fluid"
          style={{ maxWidth: "150px" }}
        />
      </div>
    </header>
  );
}

export default Header;
