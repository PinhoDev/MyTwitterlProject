import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import Twitterbird from "../assets/Twitterbird.png";
import userData from "../Model/userData";
import { validateForm } from "../Controllers/SignUpController";
import { registerUser } from "../Controllers/SignUpController";

const SignUp = () => {
  const navigate = useNavigate();
  // Formulärdata sparas i state
  const [form, setForm] = useState(userData);
  // Bildförhandsvisning (preview) lagras separat
  const [preview, setPreview] = useState(userData.image);
  const [error, setError] = useState("");

  // Hantera text-inputs
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Hantera profilbild (endast för visning)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, profileImage: file })); // Sparar filen i state
      setPreview(URL.createObjectURL(file)); // Skapar en temporär URL för förhandsvisning
    }
  };

  // Hantera registrering
  const handleSignup = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm(form);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError("");

    const result = await registerUser(form);
    if (result.success) {
      alert("Registrering lyckades!");
      navigate("/login");
    } else {
      setError(result.message);
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
            value={form[name] || ""}
            onChange={handleChange}
          />
        ))}

        {/* Lösenord och bekräftelse */}
        <input
          type="password"
          name="password"
          placeholder="Lösenord"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Bekräfta lösenord"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {error && <div className="error-message">{error}</div>}
        <button className="authbutton" type="submit">
          Skapa konto
        </button>
      </form>
    </div>
  );
};

export default SignUp;
