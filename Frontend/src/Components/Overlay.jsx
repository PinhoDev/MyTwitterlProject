import { useState } from "react";
import "./style.css";
import image from "../Images/image.png";

const Overlay = () => {
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
            <img src={image} alt="Toppbild" className="tweet-icon" />
            <h2>Logga ut från TwitterClone?</h2>
            <div className="button-group">
              <button
                className="logout-button"
                onClick={() => {
                  localStorage.removeItem("username");
                  window.location.href = "/login";
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
