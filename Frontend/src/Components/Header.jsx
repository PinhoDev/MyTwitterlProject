import Twitterbird from "../assets/Twitterbird.png";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <>
      {" "}
      <div className="header-container">
        <div className="header">
          <img src={Twitterbird} alt="Toppbild" className="home-logo" />
          <div className="logo-text">TwitterClone</div>
        </div>
        <div className="user-imagecontainer">
          <Link to="/profile/:id">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profilbild"
              className="user-image"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
