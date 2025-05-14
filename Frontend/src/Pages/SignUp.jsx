import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import image from "../Images/image.png";

const SignUp = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

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

    if (form.password !== form.confirmPassword) {
      return alert("Det angivna lösenordet stämmer inte överens");
    }

    // Ersätt existingUsers med faktisk API-anrop
    const existingUsers = ["test@example.com", "admin@example.com"];
    if (existingUsers.includes(form.email.toLowerCase())) {
      return alert(
        "Det finns redan ett konto registrerat med denna e-postadress"
      );
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    console.log("Skapar konto för:", form);

    navigate("/login");
  };

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
    <div>
      <form onSubmit={handleSignup}>
        <img src={image} alt="Toppbild" className="tweet-logo" />
        <h1>Skapa ett konto</h1>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "200px", margin: "40px auto", display: "block" }}
          />
        )}

        {fields.map(({ name, placeholder }) => (
          <input
            key={name}
            name={name}
            placeholder={placeholder}
            value={form[name] || ""}
            onChange={handleChange}
          />
        ))}

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

        <button type="submit">Skapa konto</button>
      </form>
    </div>
  );
};

export default SignUp;
