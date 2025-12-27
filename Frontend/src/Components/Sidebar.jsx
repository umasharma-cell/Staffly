import React, { useState } from "react";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import AddEmployee from "./AddEmployee";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar initially open

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        {isOpen ? "❌" : "☰"} {/* Close (❌) or Open (☰) */}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="logo">WorkSpace</div>

        <div className="profile">
          <div className="profile-info">
            <p className="name">Welcome User</p>
            <p className="role">Workspace Member</p>
          </div>
        </div>

        <div className="menu">
          <p className="menu-title"></p>
          <ul>
            <Link to="/AddEmployee">
              <li>📂 Add Employee</li>
            </Link>
          </ul>

          <p className="menu-title">Your Company</p>
          <ul>
            <Link to="/EmployeesDetails">
              <li>👥 Employees</li>
            </Link>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className={`main-content ${isOpen ? "with-sidebar" : "full-width"}`}>
        <h1>Welcome to WorkSpace</h1>
        <p>Select an option from the sidebar to get started.</p>
        <AddEmployee/>
      </div>
    </>
  );
};

export default Sidebar;
