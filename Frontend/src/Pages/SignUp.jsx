import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import Twitterbird from "../assets/Twitterbird.png";

const SignUp = () => {
  const navigate = useNavigate();

  // Formulärdata sparas i state
  const [form, setForm] = useState({
    username: "",
    email: "",
    name: "",
    about: "",
    website: "",
    occupation: "",
    hometown: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);

  // Hantera text-inputs
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Hantera profilbild (endast för visning)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Hantera registrering
  const handleSignup = async (e) => {
    e.preventDefault();

    // Kontrollera obligatoriska fält
    const required = {
      username: "Användarnamn",
      email: "Epost",
      name: "Namn",
      password: "Lösenord",
      confirmPassword: "Bekräfta lösenord",
    };

    for (const [key, label] of Object.entries(required)) {
      if (!form[key].trim()) {
        return alert(`${label} måste fyllas i`);
      }
    }

    // Kontrollera lösenord
    if (form.password !== form.confirmPassword) {
      return alert("Det angivna lösenordet stämmer inte överens");
    }

    // Skapa data att skicka till backend
    const postData = {
      username: form.username,
      email: form.email,
      name: form.name,
      password: form.password,
    };

    try {
      // Skicka POST-anrop till backend
      const response = await axios.post(
        "http://localhost:5000/register",
        postData
      );

      // Om registreringen lyckas, vidare till inloggningssidan
      if (response.data === true) {
        alert("Registrering lyckades!");
        navigate("/login");
      } else {
        alert("Registrering misslyckades.");
      }
    } catch (error) {
      // Visa felmeddelande från backend eller logga fel
      console.error("Registreringsfel:", error);
      const msg = error.response?.data?.message || "Ett oväntat fel inträffade";
      alert(`Fel: ${msg}`);
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
            style={{ width: "200px", margin: "40px auto", display: "block" }}
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

        <button className="authbutton" type="submit">
          Skapa konto
        </button>
      </form>
    </div>
  );
};

export default SignUp;
