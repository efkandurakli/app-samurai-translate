import React from "react";
import "./index.scss";

const Header = ({ display }) => {
  return (
    <header data-display={display} className="header b-b-1 bc-alto">
      <p className="header__logo fs-56 color-navy-blue"> AppSamurai</p>
      <p className="fs-30 color-shuttle-gray p-l-2 p-t-2">Translate</p>
    </header>
  );
};

export default Header;
