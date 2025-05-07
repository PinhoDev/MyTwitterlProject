import React, { useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    about: "",
    occupation: "",
    hometown: "",
    website: "",
    profileImage: null,
  });
};

export default SignUp;
