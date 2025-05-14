import "../styles/FooterUser.css";
import Overlay from "./Overlay";

const FooterUser = () => {
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
        <div className="name">Patrik Nygren</div>
        <div className="handle">@patriknygren82</div>
      </div>
      <div className="overlay-position-info">
        <Overlay />
      </div>
    </div>
  );
};

export default FooterUser;
