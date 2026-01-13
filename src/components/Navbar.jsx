import React from "react";
import { NavLink } from "react-router-dom";
import "../components/Navbar.css";

export const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink to="/" className="nav-link">
          DashBoard
        </NavLink>
        <NavLink to="/add" className="nav-link">
          AddTask
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </nav>
    </div>
  );
};
