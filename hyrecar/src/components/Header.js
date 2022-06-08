import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Base.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <button className="headerButton" onClick={() => navigate("/")}>
        Hyrecar
      </button>
    </header>
  );
};

export default Header;
