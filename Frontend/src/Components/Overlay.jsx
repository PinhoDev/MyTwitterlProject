import { useState } from "react";
import "../styles/Overlay.css";

const Overlay = ({ userImage }) => {
  const [visible, setVisible] = useState(false);

  const openOverlay = () => setVisible(true);
  const closeOverlay = () => setVisible(false);

  return (
    <>
      <button onClick={openOverlay} className="dots-button" aria-label="Meny">
        &#x2026; {/* Unicode för tre vågräta prickar */}
      </button>

      {visible && (
        <div className="overlay">
          <div className="overlay-content">
            <img
              src={userImage || "/placeholder/avatar.png"}
              alt="Profilbild"
              className="footer-userimg-logout"
            />
            <h4>Logga ut från TwitterClone?</h4>
            <div className="button-group">
              <button
                className="logout-button"
                onClick={() => {
                  localStorage.removeItem("username");
                  window.location.href = "/";
                }}
              >
                Logga ut
              </button>
              <button className="cancel-button" onClick={closeOverlay}>
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Overlay;
