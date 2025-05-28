// Function to get userinfo
export async function loadUserDetails(username, setUser, setError) {
  try {
    const response = await fetch(`/profile/${username}`);
    const data = await response.json();

    if (response.ok) {
      setUser(data.userDetails);
    } else {
      setError(data.message || "Kunde inte hämta användarinfo.");
    }
  } catch (error) {
    console.error("Error loading user details:", error);
    setError("Något gick fel när användarinfo skulle hämtas.");
  }
}

//Function to get tweets
/* export async function loadUserTweets(username, setTweets, setError) {
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
 */

//Function to get tweets
export async function loadUserTweets(username, setTweets, setError) {
  try {
    const userDetailsResult = await getUserdetails(username);
    if (!userDetailsResult.success) {
      setError(userDetailsResult.message || "Kunde inte hämta användarinfo.");
      return;
    }

    const userDetails = userDetailsResult.userDetails;

    const result = await getUserOwnTweets(username);
    if (result.success) {
      const tweetsWithAuthor = result.tweets.map((tweet) => ({
        ...tweet,
        author: {
          username: userDetails.username,
          fullName: userDetails.fullName || userDetails.username,
          profileImage: userDetails.profileImage || "/placeholder/avatar.png",
        },
      }));

      setTweets(tweetsWithAuthor);
    } else {
      setError(result.message);
    }
  } catch (error) {
    console.error("Error loading user's tweets:", error);
    setError("Något gick fel när tweets skulle hämtas.");
  }
}
