const BASE_URL = " http://127.0.0.1:3000/";
const ENDPOINTS = {
  GET_USERNAME: `${BASE_URL}getUserName`,
  LOGIN: `${BASE_URL}login`,
  GET_USERNAME: `${BASE_URL}login`,
  GET_USER_TWEETS: (username) => `${BASE_URL}api/users/${username}`,
  GET_FRIENDS_TWEETS: (userId) => `${BASE_URL}api/tweets/friends/${userId}`,
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

//Function to get user details
export async function getUserDetails(username) {
  try {
    const response = await fetch(`${BASE_URL}api/users/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await response.json();

    if (response.ok) {
      return { success: true, userDetails: dataResponse.userDetails };
    } else {
      return { success: false, message: dataResponse.message };
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return {
      success: false,
      message: "An error occurred while fetching user details",
    };
  }
}
//Function to get users own tweets

export async function getUserOwnTweets(username) {
  try {
    const response = await fetch(ENDPOINTS.GET_USER_TWEETS(username), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, tweets: data.tweets };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error fetching user's tweets:", error);
    return {
      success: false,
      message: "Anerror occurred while fetching user's tweets",
    };
  }
}

//Get friends tweets
export async function getFriendsTweets(userId) {
  try {
    const response = await fetch(ENDPOINTS.GET_FRIENDS_TWEETS(userId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, tweets: data.tweets };
    }
  } catch (error) {
    console.error("Error fetching friends' tweets:", error);
    return {
      success: false,
      Message: "An error occurred while fetching friends' tweets",
    };
  }
}
