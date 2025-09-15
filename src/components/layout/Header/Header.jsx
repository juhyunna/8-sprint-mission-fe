import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/global/global.css";
import "./Header.css";

function Header() {
  const location = useLocation();

  return (
    <header className="nav">
      <div className="nav-container">
        <Link to="/" className="header-logo-link">
          <img
            className="pandaMarketLogo"
            src="./images/pandalogo-sm.svg"
            alt="Panda Market"
          />
          <p className="header-txt">판다마켓</p>
        </Link>
        <nav className="nav-menu">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            홈
          </Link>
          <Link
            to="/items"
            className={`nav-link ${
              location.pathname === "/items" ? "active" : ""
            }`}
          >
            중고마켓
          </Link>
        </nav>
        <Link to="/login" className="login-btn">
          로그인
        </Link>
      </div>
    </header>
  );
}

export default Header;
