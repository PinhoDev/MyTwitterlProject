import { getUserDetails } from "../Model/requestApi.js";
import { getUserOwnTweets } from "../Model/requestApi.js";

// Function to get userinfo
export async function loadUserDetails(username, setUser, setError) {
  try {
    const result = await getUserdetails(username);
    if (result.success) {
      setUser(result.userDetails);
    } else {
      setError(result.message);
    }
  } catch (err) {
    console.error("Fel vid hämtning av användardata:", err);
    setError("Kunde inte hämta användardata.");
  }
}

//Function to get tweets
export async function loadUserTweets(username, setTweets, setError) {
  try {
    const result = await getUserOwnTweets(username);
    if (result.success) {
      setTweets(result.tweets);
    } else {
      setError(result.message);
    }
  } catch (error) {
    console.error("Error loading user's tweets:", error);
    setError("Något gick fel när tweets skulle hämtas.");
  }
}
