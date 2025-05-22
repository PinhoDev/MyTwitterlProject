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

// Function to sign up a new user
export async function signUp(userData) {
  try {
    const response = await fetch(`${BASE_URL}signup`, {
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

// Function to get user details
export async function getUserdetails(username) {}

// Function to get user tweets
export async function getUserOwnTweets(username) {}

//Function to create new tweet
export async function createNewTweet(username, content, hashtags = []) {
  try {
    const response = await fetch(`${BASE_URL}api/users/${username}/tweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, hashtags }),
    });

    const data = await response.json();

    if (response.ok && data === true) {
      return { success: true };
    } else {
      return { success: false, message: "Tweet kunde inte skapas." };
    }
  } catch (error) {
    console.error("Error creating tweet:", error);
    return {
      success: false,
      message: "Ett fel uppstod vid skapande av tweet.",
    };
  }
}
