import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./working.css";
import Twitterbird from "../assets/Twitterbird.png";
//lägg till error fel lösenoord
function LogInPassword() {
  const [formdata, setFormdata] = useState({ password: "" });
  const [error, setError] = useState();
  const [auth, setAuth] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const identifier = location.state?.identifier;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formdata.password.trim() === "") {
      setError("Du måste ange lösenord");
    } else {
      navigate(`/profile/${identifier}`);
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
          <input placeholder={identifier || "Användarnamn"} readOnly />
          <input
            type="password"
            placeholder="Lösenord"
            value={formdata.password}
            onChange={handleAuthentication}
          />
          <button className="continue-button" type="submit">
            Logga in
          </button>
        </form>
      </div>
    </>
  );
}
export default LogInPassword;
