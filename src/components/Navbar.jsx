import { NavLink } from "react-router-dom";
import "../components/Navbar.css";

export const Navbar = () => {
  return (
    <nav>
      {/* Navigation Bar for the app Routes / -> Dashboard */}
      <NavLink to="/" className="nav-link">
        DashBoard
      </NavLink>

      {/* Navigation Bar for the app Routes /add -> AddTask */}
      <NavLink to="/add" className="nav-link">
        AddTask
      </NavLink>

      {/* Navigation Bar for the app Routes /about -> About */}
      <NavLink to="/about" className="nav-link">
        About
      </NavLink>
    </nav>
  );
};
