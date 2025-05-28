import "../styles/FooterUser.css";
import Overlay from "./Overlay";

const FooterUser = ({ name, handle }) => {
  return (
    <div className="footer-user">
      <div className="profil-pic">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Profilbild"
          className="footer-user img"
        />
      </div>
      <div className="user-info">
        <div className="name">{name}</div>
        <div className="handle">{handle}</div>
      </div>
      <div className="overlay-position-info">
        <Overlay />
      </div>
    </div>
  );
};

export default FooterUser;
