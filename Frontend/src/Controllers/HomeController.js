import { createNewTweet } from "../Model/requestApi.js";

// Function to handle creating a new tweet
export async function handleCreateTweet(
  username,
  content,
  hashtags,
  setTweets,
  setNewTweet,
  setError
) {
  try {
    const result = await createNewTweet(username, content, hashtags);

    if (result.success) {
      // Om du vill lägga till den nya tweeten direkt i listan senare:
      // setTweets(prev => [result.newTweet, ...prev]);

      setNewTweet(""); // Rensa input
      setError(""); // Rensa ev. gamla fel
    } else {
      setError(result.message || "Tweet kunde inte skapas.");
    }
  } catch (error) {
    console.error("Fel vid skapande av tweet:", error);
    setError("Något gick fel när tweeten skulle skickas.");
  }
}
