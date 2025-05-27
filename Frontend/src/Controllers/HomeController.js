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
/* 
//











































 */
export async function fetchSearchResults(query, onSuccess, onError) {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/search/${encodeURIComponent(query)}` //encodeURIComponent(query) skyddar URL från att gå sönder om användaren skriver mellanslag, specialtecken, svenska bokstäver
    );
    console.log("Sökresultat:", res.data);
    onSuccess(res.data);
  } catch (error) {
    console.error("Sökfel:", error.response?.data || error.message);
    onError("Misslyckades att hämta sökresultat.");
  }
}
