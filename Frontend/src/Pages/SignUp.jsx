import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import Twitterbird from "../assets/Twitterbird.png";
import userData from "../Model/userData";
import { validateForm } from "../Controllers/SignUpController";
import { createNewUser } from "../Controllers/SignUpController";

const SignUp = () => {
  const navigate = useNavigate();
  // Formulärdata sparas i state
  const [newUser, setNewUser] = useState(userData);
  // Bildförhandsvisning (preview) lagras separat
  const [preview, setPreview] = useState(userData.image);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Hantera text-inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Hantera profilbild (endast för visning)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewUser((prev) => ({ ...prev, image: file })); // Sparar filen i state
      setPreview(URL.createObjectURL(file)); // Skapar en temporär URL för förhandsvisning
    }
  };

  // Hantera registrering
  const handleSignup = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm(newUser);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError("");
    setLoading(true);

    const result = await createNewUser(newUser, setError);
    if (result.success) {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }, 1000);
    } else {
      setLoading(false);
      setError(result.message || "Registrering misslyckades");
    }
  };

  // Formulärfält
  const fields = [
    { name: "username", placeholder: "Användarnamn" },
    { name: "email", placeholder: "Epost" },
    { name: "name", placeholder: "Namn" },
    { name: "about", placeholder: "Om" },
    { name: "occupation", placeholder: "Sysselsättning" },
    { name: "hometown", placeholder: "Stad" },
    { name: "website", placeholder: "Hemsida" },
  ];

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup}>
        <img src={Twitterbird} alt="Toppbild" className="tweet-logo-signin" />
        <h1>Skapa ett konto</h1>

        {/* Bilduppladdning, används bara för förhandsvisning */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              height: "250px",
              width: "250px",
              margin: "40px auto",
              display: "block",
            }}
          />
        )}

        {/* Generera formulärfält */}
        {fields.map(({ name, placeholder }) => (
          <input
            key={name}
            name={name}
            placeholder={placeholder}
            value={newUser[name] || ""}
            onChange={handleChange}
          />
        ))}

        {/* Lösenord och bekräftelse */}
        <input
          type="password"
          name="password"
          placeholder="Lösenord"
          value={newUser.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Bekräfta lösenord"
          value={newUser.confirmPassword}
          onChange={handleChange}
        />
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Registering...</div>}
        {success && <div className="success-message">Account created!</div>}

        <button className="authbutton" type="submit" disabled={loading}>
          Skapa konto
        </button>
      </form>
    </div>
  );
};

export default SignUp;
