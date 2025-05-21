import { useState } from "react";
import "../styles/Home.css";
import FooterUser from "../components/FooterUser.jsx";
import Trend from "../Components/Trend.jsx";
import Header from "../Components/Header.jsx";
import Tweet from "../Components/Tweet.jsx";

const Home = () => {
  // Skapar en state-variabel som innehåller vilka användare man följer
  const [following] = useState(["@ezyang", "@elonmusk"]);

  // Skapar en lista med exempel-tweets (förifyllda) - ska utgå ifrån de man följer
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

  // Håller reda på innehållet i den nya tweeten användaren skriver
  const [newTweet, setNewTweet] = useState("");

  // Funktion för att posta en ny tweet
  const handleTweet = () => {
    // Kontrollera att tweeten inte är tom
    if (newTweet.trim() !== "") {
      const newTweetObj = {
        ...currentUser, // Kopierar namn och handle från nuvarande användare
        time: new Date().toISOString(), // Sätter nuvarande tid
        content: newTweet, // Innehållet från inputfältet
        comments: [], // Inga kommentarer till en början
      };
      // Lägger till den nya tweeten överst i listan
      setTweets([newTweetObj, ...tweets]);
      // Tömmer inputfältet
      setNewTweet("");
    }
  };

  // Funktion för att lägga till en kommentar på en tweet
  const addComment = (index, comment) => {
    const updatedTweets = [...tweets]; // Skapar en kopia av tweets
    updatedTweets[index].comments.push(comment); // Lägger till kommentaren
    setTweets(updatedTweets); // Uppdaterar state
  };

  // Information om den inloggade användaren
  const currentUser = {
    name: "Ditt Namn",
    handle: "@dittkonto",
  };

  // Filtrerar och sorterar tweets: visar endast tweets från personer man följer eller sig själv
  const filteredAndSortedTweets = [...tweets]
    .filter(
      (tweet) =>
        following.includes(tweet.handle) || tweet.handle === currentUser.handle
    )
    .sort((a, b) => new Date(b.time) - new Date(a.time)); // Sorterar från nyast till äldst

  return (
    <>
      <Header />
      <div className="sidebars">
        <div className="home-container">
          <div className="left-sidebar">
            <div className="left-sidebar-position">
              <div className="tweet-input">
                <textarea
                  placeholder="Vad vill du säga?"
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

            {/* <div>
              <h3>5 senaste från dina vänner</h3>
              {latestFiveFriendTweets.map((tweet) => (
                <TweetCard key={tweet._id} tweet={tweet} />
              ))}
            </div> */}
          </div>
          <div className="right-sidebar">
            <input
              type="text"
              placeholder="Sök efter användare eller #hashtags"
              className="search-input"
            />
            <div className="trends-section">
              <h2>Populärt för dig</h2>
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
