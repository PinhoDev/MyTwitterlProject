import { useState } from "react";
import "../styles/Home.css";
import FooterUser from "../components/FooterUser.jsx";
import Trend from "../Components/Trend.jsx";
import Header from "../components/Header.jsx";
import Tweet from "../components/Tweet.jsx";

const Home = () => {
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

  const handleTweet = () => {
    if (newTweet.trim() !== "") {
      const newTweetObj = {
        ...currentUser,
        time: new Date().toISOString(),
        content: newTweet,
        comments: [],
      };
      setTweets([newTweetObj, ...tweets]);
      setNewTweet("");
    }
  };

  const addComment = (index, comment) => {
    const updatedTweets = [...tweets];
    updatedTweets[index].comments.push(comment);
    setTweets(updatedTweets);
  };

  const currentUser = {
    name: "Ditt Namn",
    handle: "@dittkonto",
  };

  const filteredAndSortedTweets = [...tweets]
    .filter(
      (tweet) =>
        following.includes(tweet.handle) || tweet.handle === currentUser.handle
    )
    .sort((a, b) => new Date(b.time) - new Date(a.time));

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
                {filteredAndSortedTweets.map((tweet, index) => (
                  <Tweet
                    key={index}
                    index={index}
                    {...tweet}
                    onAddComment={addComment}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="right-sidebar">
            <input
              type="text"
              placeholder="Search Twitter"
              className="search-input"
            />
            <div className="trends-section">
              <h2>Trends for you</h2>
              <Trend topic="Samt" tweets="2,640" />
              <Trend topic="China" tweets="527K" />
              <Trend topic="#finland" tweets="10.4K" />
              <Trend topic="#babygirl" />
              <Trend topic="Newzorf" tweets="60.4K" />
            </div>
          </div>
        </div>

        <div className="footer-wrapper">
          <FooterUser />
        </div>
      </div>
    </>
  );
};

export default Home;
