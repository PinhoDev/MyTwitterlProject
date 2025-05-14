import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Twitterbird from "../assets/Twitterbird.png";
import { fetchDummyUser } from "../Mocks/FetchDummyUser.jsx";
import "../styles/Auth.css";

// dummy identifiers att skriva in när man testar att logga in:
//Fredrica, Fredrica@example.com, 0700232436
//Andre, andre@example.com, 0700232425,
//Karolina, Karolina@example.com, 0700232447,

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
      const user = await fetchDummyUser(formdata.identifier); //fetchDummUser();  ska senare vara fetchUser() hämta en API istället för dummysedan
      if (!user) {
        setError("Användaren finns inte");
      } else {
        setError(null);
        navigate("/loginpassword", {
          state: { identifier: formdata.identifier },
        }); //använder useLocation för att det är overkill med useContext när det bara ska flyttas från login till loginPassword och det inte går att använda props
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <img src={Twitterbird} alt="bild" />
        <h1>Logga in på Twitter</h1>
        <input
          type="text"
          value={formdata.identifier}
          onChange={handleChange}
          placeholder="Mobil, e-postadress eller användarnamn"
        />
        {error && <p className="errorMessage">{error}</p>}
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
