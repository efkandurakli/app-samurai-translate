import logo from "@images/logo.png";
import "./index.scss";

const Header = () => {
  return (
    <header className="header b-b-1 bc-alto">
      <img src={logo} alt="logo" height="100%" width="12%" />
      <p className="fs-30 color-shuttle-gray p-l-2">Translate</p>
    </header>
  );
};

export default Header;
