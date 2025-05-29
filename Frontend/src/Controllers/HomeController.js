import axios from "axios";

// Ladda tweets från backend !!!!!!! Den här är felaktig Karolinas Final --- HHär ska vi Ha Fredrikas loadhome tweets!s
/* export async function loadHomeTweets(
  username,
  setTweets,
  setError,
  setUserImage,
  setCurrentUser
) {
  try {
    const response = await axios.get(`http://localhost:3000/home/${username}`); ///HÄr stod förut felaktigt axios.get("http://localhost:3000/tweets/");
    if (response.data.result) {
      const tweetsFromServer = response.data.homeTweets.map((t) => ({
        //// HÄr stod felaktigt  response.data.tweets.map(...)
        _id: t._id, // LAGT TILL tweetens ID (krävs för kommentarer)
        name: t.author?.username || "Okänd",
        handle: "@" + (t.author?.username || "Okänd"),
        time: t.createdAt,
        content: t.content,
        hashtags: t.hashtags || [],
        comments: t.comments.map((c) => ({
          user: c.userName?.username || "Okänd",
          content: c.content,
          time: c.createdAt,
        })),
      }));
      setTweets(tweetsFromServer);
      setUserImage(response.data.image);
      // ⬅️ Lägg till denna rad!
      setCurrentUser({
        name: response.data.username,
        handle: "@" + response.data.username,
        following: response.data.following || [],
      });
    }
  } catch (error) {
    console.error("Kunde inte hämta tweets:", error);
    setError("Kunde inte hämta tweets.");
  }
}
 */

export async function loadHomeTweets(
  username,
  setTweets,
  setError,
  setUserImage
) {
  try {
    const res = await axios.get(`http://localhost:3000/home/${username}`);
    if (res.data.result) {
      const tweets = res.data.homeTweets.map((t) => ({
        _id: t._id,
        name: t.author?.username || "Okänd", // 🧠 används i <Tweet />
        handle: "@" + (t.author?.username || "okand"),
        time: t.createdAt,
        content: t.content,
        hashtags: t.hashtags || [],
        comments: (t.comments || []).map((c) => ({
          user: c.userName?.username || "Okänd",
          content: c.content,
          time: c.createdAt,
        })),
      }));

      setTweets(tweets);
      setUserImage(res.data.image); // 🔄 visas i header och footer
    }
  } catch (error) {
    console.error("Kunde inte hämta tweets:", error);
    setError?.("Kunde inte hämta tweets.");
  }
}
// Hämta alla tweets (för trender)
export async function loadAllTweets(setTweets, setError) {
  try {
    const res = await axios.get("http://localhost:3000/tweets");
    if (res.data.result) {
      const tweets = res.data.tweets.map((t) => ({
        _id: t._id,
        name: t.author?.username || "Okänd",
        handle: "@" + (t.author?.username || "Okänd"),
        time: t.createdAt,
        content: t.content,
        hashtags: t.hashtags || [],
        comments: t.comments.map((c) => ({
          user: c.userName?.username || "Okänd",
          content: c.content,
          time: c.createdAt,
        })),
      }));
      setTweets(tweets);
    }
  } catch (error) {
    console.error("Kunde inte hämta alla tweets:", error);
    setError?.("Fel vid hämtning av alla tweets");
  }
}

// Posta ny tweet
export async function postTweet(
  username,
  content,
  rawHashtags,
  onSuccess,
  onError
) {
  try {
    const hashtags = Array.isArray(rawHashtags)
      ? rawHashtags.filter(
          (tag) => typeof tag === "string" && tag.trim().startsWith("#")
        )
      : [];

    const payload = {
      content,
      ...(hashtags.length > 0 && { hashtags }), // ⬅️ bara skicka om de finns
    };

    console.log("Skickar till backend:", payload);

    const res = await axios.post(
      `http://localhost:3000/${username}/tweet`,
      payload
    );

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

// Hämta sökresultat för Searchbar.      Karolina har kollat att det inte krockar.
/*
export async function fetchSearchResults(query) {
  try {
    const response = await fetch(
      `http://localhost:3000/search/${encodeURIComponent(query)}` //encodeURIComponent(query) skyddar URL från att gå sönder om användaren skriver mellanslag, specialtecken, svenska bokstäver
    );
    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return {
        success: false,
        message: data.message || "Misslyckades att hämta sökresultat.",
      };
    }
  } catch (error) {
    console.error("Error during search:", error);
    return {
      success: false,
      message: "Ett fel uppstod vid sökning.",
    };
  }
}
*/
/*
// Hämtar sökresultat från servern
export async function fetchSearchResults(query, onSuccess, onError) {
  try {
    const res = await axios.get(
      `http://localhost:3000/search/${encodeURIComponent(query)}`
    );
    console.log("Sökresultat från servern:", res.data);
    onSuccess(res.data);
  } catch (error) {
    console.error("Sökfel:", error.response?.data || error.message);
    onError("Misslyckades att hämta sökresultat.");
  }
}
// Hämta sökresultat från fetchresult ovan --  ny Karolina_5
export async function handleSearch(query, setUsers, setTweets, setError) {
  const result = await fetchSearchResults(query);

  if (result.success) {
    setUsers(result.data.users);
    setTweets(result.data.tweets);
    setError("");
  } else {
    setError(result.message);
    setUsers([]);
    setTweets([]);
  }
}
*/
export async function fetchSearchResults(query, onSuccess, onError) {
  try {
    const res = await axios.get(
      `http://localhost:3000/search/${encodeURIComponent(query)}`
    );
    onSuccess(res.data);
  } catch (error) {
    onError("Misslyckades att hämta sökresultat.");
  }
}
