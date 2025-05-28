import { useEffect, useState } from "react";
import "../styles/Home.css";
import FooterUser from "../components/FooterUser.jsx";
import Trend from "../Components/Trend.jsx";
import Header from "../Components/Header.jsx";
import Tweet from "../Components/Tweet.jsx";
import {
  loadHomeTweets,
  postTweet,
  postComment,
} from "../Controllers/HomeController.js";
import { useParams } from "react-router-dom";

const Home = () => {
  const { user } = useParams();
  // Information om den inloggade användaren
  const [currentUser, setCurrentUser] = useState({
    // Här kan du hämta aktuell användare från en global state eller context
    name: "",
    handle: "",
  });

  // Skapar en lista med exempel-tweets (förifyllda) - ska utgå ifrån de man följer
  const [tweets, setTweets] = useState([]);
  // Håller reda på innehållet i den nya tweeten användaren skriver
  const [newTweet, setNewTweet] = useState("");
  //Behövs för att uppdatera tweets när en ny tweet postas eller en kommentar läggs till
  const [refreshTrendTrigger, setRefreshTrendTrigger] = useState(0);

  useEffect(() => {
    // const username = localStorage.getItem("username"); // Hämtar användarnamn från localStorage
    // Om användarnamn finns i localStorage, sätt currentUser och hämta tweets
    const username = user;
    if (username) {
      setCurrentUser({
        name: username,
        handle: "@" + username,
      });
      loadHomeTweets(username, setTweets, console.error);
    }
  }, []);

  // Extrahera hashtags från text
  const extractHashtags = (text) => {
    return text.match(/#[a-zA-ZåäöÅÄÖ0-9]+/g) || [];
  };

  // Funktion för att posta en ny tweet
  const handleTweet = async () => {
    const username = currentUser.handle.replace("@", "");
    if (!username) {
      console.error("Ingen användare är inloggad.");
      return;
    }
    // Om tweeten inte är tom, posta den
    if (newTweet.trim() !== "") {
      const hashtags = extractHashtags(newTweet);

      await postTweet(
        username,
        newTweet,
        hashtags,
        () => {
          loadHomeTweets(username, setTweets, console.error, setCurrentUser);
          setNewTweet("");
          setRefreshTrendTrigger((prev) => prev + 1); // Uppdatera trender
        },
        console.error
      );
    }
  };

  // Funktion för att lägga till en kommentar på en tweet
  const addComment = (index, commentText) => {
    const tweet = tweets[index];
    const username = currentUser.handle.replace("@", "");

    postComment(
      username,
      tweet._id, // tweetens id behövs av backend
      commentText,
      () => {
        loadHomeTweets(username, setTweets, console.error); // uppdatera tweets från server
      },
      console.error
    );
  };

  // Filtrerar och sorterar tweets: visar endast tweets från personer man följer eller sig själv
  const filteredAndSortedTweets = [...tweets]
    .filter(
      (tweet) =>
        tweet.handle === currentUser.handle ||
        tweets.some((t) => t.handle === tweet.handle)
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
              <Trend refreshTrendTrigger={refreshTrendTrigger} />
            </div>
          </div>
        </div>

        <div className="footer-wrapper">
          <FooterUser name={currentUser.name} handle={currentUser.handle} />
        </div>
      </div>
    </>
  );
};

export default Home;
