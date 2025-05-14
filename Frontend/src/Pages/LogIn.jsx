import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Twitterbird from "../assets/Twitterbird.png";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formdata.identifier.trim() === "") {
      setError("Fältet får inte vara tomt");
    } else {
      navigate("/loginpassword", {
        state: { identifier: formdata.identifier },
      }); //använder useLocation för att det är overkill med useContext när det bara ska flyttas från login till loginPassword och det inte går att använda props
    }
  };
  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <img src={Twitterbird} alt="bild" />
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
        <button className="continue-button" type="submit">
          Nästa
        </button>
      </form>
    </>
  );
}
export default LogIn;
