import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";
import Twitterbird from "../assets/Twitterbird.png";
import { navigateToHomePage } from "../Controllers/LoginController.js";

function LogInPassword() {
  const [formdata, setFormdata] = useState({ password: "" });
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const emailOrUsername = location.state?.emailOrUsername;

  const handleAuthentication = (e) => {
    setFormdata({ ...formdata, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formdata.password.trim() === "") {
      setError("Du måste ange lösenord");
    } else {
      navigateToHomePage(
        emailOrUsername,
        formdata.password,
        navigate,
        setError
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="writing-fields" onSubmit={handleSubmit}>
        <img
          className="tweet-logo-login"
          src={Twitterbird || "../../public/images/placeHolder_img.png"}
          alt="Logotyp"
        />
        <h1>Ange ditt lösenord</h1>

        <div className="input-wrapper">
          <input
            className="login-input"
            placeholder={emailOrUsername || "Användarnamn"}
            readOnly
          />
          <input
            className="login-input"
            type="password"
            placeholder="Lösenord"
            value={formdata.password}
            onChange={handleAuthentication}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="authbutton" type="submit">
          Logga in
        </button>
      </form>
    </div>
  );
}

export default LogInPassword;
