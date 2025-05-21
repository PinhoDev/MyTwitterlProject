import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";
import Twitterbird from "../assets/Twitterbird.png";
import { navigateToHomePage } from "../Controllers/LoginControllers.js";

//lägg till error fel lösenoord
function LogInPassword() {
  const [formdata, setFormdata] = useState({ password: "" });
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const identifier = location.state?.identifier;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formdata.password.trim() === "") {
      setError("Du måste ange lösenord");
    } else {
      navigateToHomePage(identifier, formdata.password, navigate, setError);
    }
  };

  const handleAuthentication = (e) => {
    setFormdata({ ...formdata, password: e.target.value });
  };

  return (
    <>
      <div className="auth-container">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <img className="tweet-logo-login" src={Twitterbird} alt="bild" />
          <h2>Ange ditt lösenord</h2>
          <div className="input-wrapper">
            <input
              className="login-input"
              placeholder={identifier || "Användarnamn"}
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
          <button className="authbutton" type="submit">
            Logga in
          </button>
        </form>
      </div>
    </>
  );
}

export default LogInPassword;
