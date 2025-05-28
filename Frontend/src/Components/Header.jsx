import Twitterbird from "../assets/Twitterbird.png";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ user, userImage }) => {
  return (
    <>
      {" "}
      <div className="header-container">
        <div className="header">
          <img src={Twitterbird} alt="Toppbild" className="home-logo" />
          <div className="logo-text">TwitterClone</div>
        </div>
        <div className="user-imagecontainer">
          <Link to={`/profile/${user}`}>
            <img src={userImage} alt="Profilbild" className="user-image" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
