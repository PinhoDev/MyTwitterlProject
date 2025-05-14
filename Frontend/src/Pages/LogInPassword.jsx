import { fetchDummyUserPassword } from "../Mocks/FetchDummyUserPassword";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";
import Twitterbird from "../assets/Twitterbird.png";

//Password i dummydata är nu samma som username för att det ska vara enkelt att testa
//funktion som validerar password
//
function LogInPassword() {
  const [formdata, setFormdata] = useState({ password: "" });
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const identifier = location.state?.identifier;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formdata.password.trim() === "") {
      setError("Du måste ange lösenord");
    } else {
      const result = await fetchDummyUserPassword(
        identifier,
        formdata.password
      );
      if (!result.success) {
        setError(result.message);
      } else {
        setError(null);
        navigate(`/profile/${identifier}`);
      }
    }
  };
  const handleAuthentication = (e) => {
    setFormdata({ ...formdata, password: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <img src={Twitterbird} alt="bild" />
        <h2>Ange ditt lösenord</h2>

        <input placeholder={identifier || "Användarnamn"} readOnly />
        {error && <p className="errorMessage">{error}</p>}
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
    </>
  );
}
export default LogInPassword;
