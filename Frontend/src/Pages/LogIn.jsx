import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Twitterbird from "../assets/Twitterbird.png";
import { handleUsername } from "../Controllers/LoginControllers.js";
import { navigateToLoginPassword } from "../Controllers/LoginControllers.js";
import "./working.css";
import "../styles/Auth.css";

//To do - Lägg till if the username/mail/mobil exists proceed Man har fyllt i alla när man reggar sig
//else error -- if you dont have - register
//else - error use another identifier
function LogIn() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    identifier: "",
  });
  const [error, setError] = useState();

  const handleChange = (e) => {
    setFormdata({ ...formdata, identifier: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formdata.identifier.trim() === "") {
      setError("Fältet får inte vara tomt");
    } else {
      navigateToLoginPassword(formdata.identifier, navigate, setError);
    }
  };
  return (
    <>
      <div className="auth-container">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <img className="tweet-logo-login" src={Twitterbird} alt="bild" />
          <h1>Logga in på Twitter</h1>
          <input
            type="text"
            value={formdata.identifier}
            onChange={handleChange}
            placeholder="Mobil, e-postadress eller användarnamn"
          />
          <p>
            Har du inget konto?
            <Link to="/signup">Registrera dig.</Link>
          </p>
          <button className="authbutton" type="submit">
            Nästa
          </button>
        </form>
      </div>
    </>
  );
}
export default LogIn;
