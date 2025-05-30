import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Twitterbird from "../assets/Twitterbird.png";
import { navigateToLoginPassword } from "../Controllers/LoginController.js";
import "../styles/Auth.css";

function LogIn() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    emailOrUsername: "",
  });
  const [error, setError] = useState();

  const handleChange = (e) => {
    setFormdata({ ...formdata, emailOrUsername: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formdata.emailOrUsername.trim() === "") {
      setError("Fältet får inte vara tomt");
    } else {
      navigateToLoginPassword(formdata.emailOrUsername, navigate, setError);
    }
  };
  return (
    <>
      <div className="auth-container">
        <form className="writing-fields" onSubmit={handleSubmit}>
          <img className="tweet-logo-login" src={Twitterbird} alt="bild" />
          <h1>Logga in på Twitter</h1>
          <div className="input-wrapper">
            <input
              className="login-input"
              type="text"
              value={formdata.emailOrUsername}
              onChange={handleChange}
              placeholder="E-postadress eller användarnamn"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="authbutton" type="submit">
            Nästa
          </button>
          <p className="noaccount">
            Har du inget konto?{" "}
            <Link to="/signup" className="blue-link">
              Registrera dig
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
export default LogIn;
