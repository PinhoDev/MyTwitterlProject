import { getUsername, login } from "../Model/requestApi.js";

// Function to handle userName or email login
async function handleUsername(emailOrUsername) {
  const response = await getUsername(emailOrUsername);

  if (response.success) {
    localStorage.setItem("username", emailOrUsername); ////only added this line to save in localstorage
    // Store the token in local storage or a cookie
    return { success: true };
  } else {
    return { success: false, message: response.message };
  }
}

// Function to Navigate to the next page
/* export async function navigateToLoginPassword(identifier, navigate, setError) {
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
 */
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
    let msg = loginResponse.message?.toLowerCase();

    if (msg?.includes("invalid") && msg?.includes("password")) {
      msg = "Felaktigt lösenord";
    } else if (msg?.includes("user not found")) {
      msg = "Användare hittades inte";
    } else {
      msg = "Fel lösenord";
    }
    setError(msg);
  }
}

// Function to handle user login
export async function handleLogin(emailOrUsername, password) {
  const response = await login(emailOrUsername, password);

  if (response.success) {
    localStorage.setItem("username", emailOrUsername); // Lade till -hjälper att spara info för navigering
    // Store the token in local storage or a cookie
    return { success: true };
  } else {
    return { success: false, message: response.message };
  }
}

///Ny istället för den med identifier som är på rad 16 - 31   mer konsekvent och adderat med localstorage
// Navigerar till lösenordssidan om användare finns
export async function navigateToLoginPassword(
  emailOrUsername,
  navigate,
  setError
) {
  try {
    const result = await handleUsername(emailOrUsername);

    if (result.success) {
      navigate("/loginpassword", {
        state: { emailOrUsername }, // skickar med till nästa sida om du behöver det där
      });
    } else {
      let msg = result.message;
      if (msg === "User not found") msg = "Användare hittades inte";
      setError(msg);
    }
  } catch (error) {
    console.error("Error in navigateToLoginPassword:", error);
    setError("Ett oväntat fel uppstod.");
  }
}
