import React from "react";
import "./Header.scss";
import logo from "../../images/instagram-logo.png";
import logoHome from "../../images/logo-home.png";
import logoDirect from "../../images/logo-direct.png";
import logoSettings from "../../images/logo-settings.png";
import logoLikes from "../../images/logo-likes.png";
import logoUser from "../../images/logo-user.png";

function Header() {
  return (
    <header className="header container-fluid">
      <div className="header__wrapper container">
        <div className="header__logo">
          <img src={logo} alt="insta-logo" />
        </div>
        <input className="header__input" type="text" placeholder="Поиск 🔎" />
        <div className="header__sections">
          <a href="#">
            <img src={logoHome} alt="home" />
          </a>
          <a href="#">
            <img src={logoDirect} alt="home" />
          </a>
          <a href="#">
            <img src={logoSettings} alt="home" />
          </a>
          <a href="#">
            <img src={logoLikes} alt="home" />
          </a>
          <a href="#">
            <img
              src="https://www.sport24.az/frontend/web/upload/users/default.png"
              alt="home"
            />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
