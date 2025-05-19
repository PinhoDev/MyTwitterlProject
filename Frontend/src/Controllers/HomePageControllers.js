import { getFriendsTweets } from "../Model/requestApi.js";

//Function to create and store tweet

//Function to dispplay tweets
export async function loadFriendsTweets(userId, setTweets, setError) {
  try {
    const result = await getFriendsTweets(userId);
    if (result.success) {
      setTweets(result.tweets);
    } else {
      setError(result.message);
    }
  } catch (error) {
    console.error("Error loading friends' tweets:", error);
    setError("Något gick fel när tweets skulle hämtas.");
  }
}
