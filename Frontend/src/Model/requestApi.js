const BASE_URL = " http://127.0.0.1:3000/";
const ENDPOINTS = {
  GET_USERNAME: `${BASE_URL}getUserName`,
  LOGIN: `${BASE_URL}login`,
};

// Function to handle userName or email
export async function getUsername(emailOrUsername) {
  try {
    const response = await fetch(ENDPOINTS.GET_USERNAME, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrUsername }),
    });

    const dataResponse = await response.json();

    if (response.ok) {
      return { success: true, name: dataResponse.name };
    } else {
      return { success: false, message: dataResponse.message };
    }
  } catch (error) {
    console.error("Error during username check:", error);
    return {
      success: false,
      message: "An error occurred during username check",
    };
  }
}

// Function to handle user login
export async function login(emailOrUsername, password) {
  try {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrUsername, password }),
    });

    const dataResponse = await response.json();

    if (response.ok) {
      return { success: true, token: dataResponse.token };
    } else {
      return { success: false, message: dataResponse.message };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "An error occurred during login" };
  }
}
