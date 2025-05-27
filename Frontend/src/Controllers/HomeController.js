/*import { createNewTweet } from "../Model/requestApi.js";

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

//











































 */
import axios from "axios";

// Ladda tweets från backend
export async function loadHomeTweets(username, setTweets, setError) {
  try {
    const response = await axios.get(`http://localhost:3000/home/${username}`);
    if (response.data.result) {
      const tweetsFromServer = response.data.homeTweets.map((t) => ({
        _id: t._id, // LAGT TILL tweetens ID (krävs för kommentarer)
        name: t.author.username,
        handle: "@" + t.author.username,
        time: t.createdAt,
        content: t.content,
        comments: t.comments.map((c) => ({
          user: c.userName.username,
          content: c.content,
          time: c.createdAt,
        })),
      }));
      setTweets(tweetsFromServer);
    }
  } catch (error) {
    console.error("Kunde inte hämta tweets:", error);
    setError("Kunde inte hämta tweets.");
  }
}

// Posta ny tweet
export async function postTweet(username, content, onSuccess, onError) {
  try {
    const res = await axios.post(`http://localhost:3000/${username}/tweet`, {
      content,
      hashtags: [],
    });
    console.log("Tweet postad:", res.data);
    onSuccess();
  } catch (error) {
    console.error(
      "Kunde inte posta tweeten:",
      error.response?.data || error.message
    );
    onError("Misslyckades att posta tweeten.");
  }
}

// Posta kommentar
export async function postComment(
  username,
  tweetId,
  content,
  onSuccess,
  onError
) {
  try {
    const res = await axios.post(
      `http://localhost:3000/${username}/tweet/comment`,
      {
        tweetId,
        content,
      }
    );
    console.log("Kommentar postad:", res.data);
    onSuccess();
  } catch (error) {
    console.error(
      "Kunde inte posta kommentaren:",
      error.response?.data || error.message
    );
    onError("Misslyckades att posta kommentaren.");
  }
}

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
