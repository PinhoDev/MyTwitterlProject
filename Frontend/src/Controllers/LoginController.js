import { getUsername, login } from "../Model/requestApi.js";

// Function to handle userName or email login
async function handleUsername(emailOrUsername) {
  const response = await getUsername(emailOrUsername);

  if (response.success) {
    // Store the token in local storage or a cookie
    return { success: true };
  } else {
    return { success: false, message: response.message };
  }
}

// Function to Navigate to the next page
export async function navigateToLoginPassword(identifier, navigate, setError) {
  try {
    const userName = await handleUsername(identifier);
    if (userName.success) {
      navigate("/loginpassword", {
        state: { identifier },
      });
    } else {
      setError(userName.message);
    }
  } catch (error) {
    console.error("Error in validateAndNavigate:", error);
    setError("An unexpected error occurred.");
  }
}

// Function to Navigate to Home page
export async function navigateToHomePage(
  identifier,
  password,
  navigate,
  setError
) {
  const loginResponse = await handleLogin(identifier, password);
  if (loginResponse.success) {
    navigate(`/home/${identifier}`);
  } else {
    setError(loginResponse.message);
  }
}

// Function to handle user login
export async function handleLogin(emailOrUsername, password) {
  const response = await login(emailOrUsername, password);

  if (response.success) {
    // Store the token in local storage or a cookie
    return { success: true };
  } else {
    return { success: false, message: response.message };
  }
}
