import { useEffect, useState } from "react";
import "../styles/Home.css";
import FooterUser from "../components/FooterUser.jsx";
import Header from "../components/Header.jsx";
import Tweet from "../components/Tweet.jsx";

const Home = () => {
  //tester för att se något på Home
  const [following] = useState(["@ezyang", "@elonmusk"]);
  const [tweets, setTweets] = useState([
    {
      name: "Edward Z. Yang",
      handle: "@ezyang",
      time: "2024-05-12T15:30:00Z",
      content: "new from beta: cloud.youtube.com/watch?v=3yLq...",
      comments: [],
    },
    {
      name: "Edward Z. Yang",
      handle: "@ezyang",
      time: "2024-03-20T08:00:00Z",
      content:
        "Where were you at Bitcoin 3.0? … Show Q gives you feature capabilities … but is there a better term here?",
      comments: [],
    },
    {
      name: "Elon Musk",
      handle: "@elonmusk",
      time: "2024-05-13T10:00:00Z",
      content: "Just launched a rocket 🚀",
      comments: [],
    },
  ]);

  const [newTweet, setNewTweet] = useState("");

  const currentUser = {
    name: "Ditt Namn",
    handle: "@dittkonto",
    username: "dittkonto",
  };

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/tweets/${currentUser.username}/tweets`
        );
        setTweets(res.data.userTweets || []);
      } catch (err) {
        console.error("Fel vid hämtning av tweets:", err);
      }
    };

    fetchTweets();
  }, [currentUser.username]);

  const handleTweet = async () => {
    if (newTweet.trim() === "") return;

    try {
      const res = await axios.post("http://localhost:3000/tweets", {
        username: currentUser.username,
        content: newTweet,
      });

      setTweets([res.data.savedTweet, ...tweets]);
      setNewTweet("");
    } catch (err) {
      console.log("Fel vid tweet post:", err);
    }
  };

  // Lägg till kommentar till en tweet
  const addComment = async (tweetId, comment) => {
    if (!comment.trim()) return;

    try {
      await axios.post(`http://localhost:3000/tweets/${tweetId}/comment`, {
        content: comment,
      });

      // Uppdatera kommentarlista lokalt (enkel variant)
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet._id === tweetId
            ? {
                ...tweet,
                comments: [...tweet.comments, { content: comment }],
              }
            : tweet
        )
      );
    } catch (err) {
      console.error("Fel vid kommentar:", err);
    }
  };

  // Sortera och filtrera
  const filteredAndSortedTweets = [...tweets]
    .filter(
      (tweet) =>
        following.includes(`@${tweet.author?.username}`) ||
        tweet.author?.username === currentUser.username
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //Jag bara testar för att navigera vidare och det växte från en link till att vara en del av tweeten eftersom det är namnet man trycker på. /Karolina :)
  const latestFiveFriendTweets = filteredAndSortedTweets.slice(0, 5);
  //

  return (
    <>
      <Header />
      <div className="sidebars">
        <div className="home-container">
          <div className="left-sidebar">
            <div className="left-sidebar-position">
              <div className="tweet-input">
                <textarea
                  placeholder="What’s happening?"
                  value={newTweet}
                  onChange={(e) => setNewTweet(e.target.value)}
                  maxLength={140}
                />
                <div className="char-counter">
                  {140 - newTweet.length} tecken kvar
                </div>
                <button className="tweetbutton" onClick={handleTweet}>
                  Tweet
                </button>
              </div>

              <div className="tweet-list">
                {filteredAndSortedTweets.map((tweet) => (
                  <Tweet
                    key={tweet._id}
                    _id={tweet._id}
                    name={tweet.author?.name}
                    handle={`@${tweet.author?.username}`}
                    time={tweet.createdAt}
                    content={tweet.content}
                    comments={tweet.comments}
                    onAddComment={(_, comment) =>
                      addComment(tweet._id, comment)
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <h3>5 senaste från dina vänner</h3>
              {latestFiveFriendTweets.map((tweet) => (
                <TweetCard key={tweet._id} tweet={tweet} />
              ))}
            </div>
          </div>
          <div className="right-sidebar"></div>
        </div>
      </div>
      <div className="footer-wrapper">
        <FooterUser />
      </div>
    </>
  );
};

export default Home;
