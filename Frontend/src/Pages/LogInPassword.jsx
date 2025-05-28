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
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <img className="tweet-logo-login" src={Twitterbird} alt="Logotyp" />
        <h1>Välkommen tillbaka</h1>
        <p className="login-username-info">
          Loggar in som <strong>{emailOrUsername}</strong>
        </p>
        <div className="input-wrapper">
          <input
            className="login-input"
            type="password"
            placeholder="Lösenord"
            value={formdata.password}
            onChange={handleAuthentication}
          />
        </div>
        <button className="authbutton" type="submit">
          Logga in
        </button>
      </form>
    </div>
  );
}

export default LogInPassword;
