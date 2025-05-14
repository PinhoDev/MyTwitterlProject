import image from "../Images/image.png";
import "../styles/Header.css";

const Header = () => {
  return (
    <>
      {" "}
      <div className="header-container">
        <div className="header">
          <img src={image} alt="Toppbild" className="home-logo" />
          <div className="logo-text">TwitterClone</div>
        </div>
        <div className="user-imagecontainer">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profilbild"
            className="user-image"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
