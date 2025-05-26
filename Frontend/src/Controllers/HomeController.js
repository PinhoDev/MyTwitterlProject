import axios from "axios";

// Ladda tweets från backend
export async function loadHomeTweets(username, setTweets, setError) {
  try {
    const response = await axios.get(`http://localhost:3000/home/${username}`);
    if (response.data.result) {
      const tweetsFromServer = response.data.homeTweets.map((t) => ({
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
