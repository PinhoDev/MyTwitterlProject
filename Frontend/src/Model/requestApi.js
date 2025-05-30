const BASE_URL = "http://127.0.0.1:3000/";
const ENDPOINTS = {
  GET_USERNAME: `${BASE_URL}getUserName`,
  LOGIN: `${BASE_URL}login`,
  SIGNUP: `${BASE_URL}signup`,
  REGISTER: `${BASE_URL}register`,
  UPLOAD_IMAGE: (username) => `${BASE_URL}${username}/image`,
  UPLOAD_BACKGROUND: (username) => `${BASE_URL}${username}/background`,
};
/* LOGIN PAGE */

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

/* SIGNUP PAGE */

// Function to sign up a new user
export async function signUp(userData) {
  try {
    const response = await fetch(ENDPOINTS.SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const dataResponse = await response.json();

    if (response.ok) {
      return { success: true, message: dataResponse.message };
    } else {
      return { success: false, message: dataResponse.message };
    }
  } catch (error) {
    console.error("Error during sign up:", error);
    return { success: false, message: "An error occurred during sign up" };
  }
}

// Function to register a new user
export async function postNewUser(newUser) {
  try {
    const response = await fetch(ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const dataResponse = await response.json();

    if (response.ok) {
      return { success: true, message: dataResponse.message };
    } else {
      return { success: false, message: dataResponse.message };
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    return { success: false, message: "An error occurred during registration" };
  }
}

// Function to upload user image
export async function postUserImage(imageFile, username) {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(ENDPOINTS.UPLOAD_IMAGE(username), {
      method: "POST",
      body: formData,
    });

    const dataResponse = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: dataResponse.message,
        imageUrl: dataResponse.imageUrl, // Lagt till detta! Karolina final final
      };
    } else {
      return { success: false, message: dataResponse.message };
    }
  } catch (error) {
    console.error("Error during image upload:", error);
    return { success: false, message: "An error occurred during image upload" };
  }
}

// Function to upload user background image
export async function postUserBackground(imageFile, username) {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(ENDPOINTS.UPLOAD_BACKGROUND(username), {
      method: "POST",
      body: formData,
    });

    const dataResponse = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: dataResponse.message,
        imageUrl: dataResponse.imageUrl, // Lagt till detta! Karolina final final
      };
    } else {
      return { success: false, message: dataResponse.message };
    }
  } catch (error) {
    console.error("Error during background image upload:", error);
    return {
      success: false,
      message: "An error occurred during background image upload",
    };
  }
}
