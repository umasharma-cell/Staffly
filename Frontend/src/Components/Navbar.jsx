import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="Nav">
      <nav className="navbar">
        <div className="logo">WorkSpace</div>
        <div className="nav-links">
          <button onClick={() => navigate("/signup")} >
            Signup
          </button>
          <button onClick={() => navigate("/login")} >
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
