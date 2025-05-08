import React, { useState } from "react";
import "../styles/Auth.css";

import image from "../Images/image.png";

const SignUp = () => {
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

  return (
    <>
      <div>
        <form>
          <img src={image} alt="Logga" className="tweet-logo" />
          <h1>Skapa ett konto</h1>
          <button type="submit">Skapa konto</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
