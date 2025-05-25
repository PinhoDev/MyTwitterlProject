import { getUsername, registerUser } from "../Model/requestApi.js";

//Validation for the form
export function validateForm(newUser) {
  const required = {
    username: "Username",
    email: "Email",
    name: "Name",
    password: "Password",
    confirmPassword: "Confirm password",
  };
  for (const [key, label] of Object.entries(required)) {
    if (!newUser[key]?.trim()) {
      return `${label} is required`;
    }
  }
  // Check if username is all lowercase
  if (newUser.username !== newUser.username.toLowerCase()) {
    return "Username must be all lowercase";
  }
  // Check if password is the same as confirmPassword
  if (newUser.password !== newUser.confirmPassword) {
    return "The passwords do not match";
  }

  return null;
}

export async function createNewUser(newUser, setError) {
  // Check if the username already exists
  const usernameCheck = await getUsername(newUser.username);
  if (usernameCheck.success) {
    return { success: false, message: "The username is already taken" };
  }

  // Check if the email already exists
  const emailCheck = await getUsername(newUser.email);
  if (emailCheck.success) {
    return { success: false, message: "The email is already taken" };
  }

  // If neither exists, register the user
  const response = await registerUser(newUser);
  if (response.success) {
    return { success: true, message: "The user has been registered" };
  } else {
    return {
      success: false,
      message: response.message || "Registration failed",
    };
  }
}
