import logo from "@images/logo.png";
import "./index.scss";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} height="100%" width="12%"/>
      <p>Translate</p>
    </header>
  );
};

export default Header;
