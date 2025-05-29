import { useEffect, useState } from "react";
import "../styles/Home.css";
import FooterUser from "../Components/FooterUser.jsx";
import Trend from "../Components/Trend.jsx";
import Header from "../Components/Header.jsx";
import Tweet from "../Components/Tweet.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import SearchOverlay from "../Components/SearchOverlay.jsx";
import {
  loadHomeTweets,
  postTweet,
  postComment,
  fetchSearchResults,
} from "../Controllers/HomeController.js";
import { useParams } from "react-router-dom";

const Home = () => {
  const { user } = useParams();
  // Information om den inloggade användaren
  const [currentUser, setCurrentUser] = useState({
    // Här kan du hämta aktuell användare från en global state eller context
    name: "",
    handle: "",
    following: [],
  });

  // Skapar en lista med exempel-tweets (förifyllda) - ska utgå ifrån de man följer
  const [tweets, setTweets] = useState([]);
  // Håller reda på innehållet i den nya tweeten användaren skriver
  const [newTweet, setNewTweet] = useState("");
  //Behövs för att uppdatera tweets när en ny tweet postas eller en kommentar läggs till
  const [refreshTrendTrigger, setRefreshTrendTrigger] = useState(0);
  const [userImage, setUserImage] = useState({});

  // NYTT: State för sök        ///Karolina_5
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState({ users: [], tweets: [] });
  const [searchError, setSearchError] = useState("");

  /* useEffect(() => {
    // const username = localStorage.getItem("username"); // Hämtar användarnamn från localStorage
    // Om användarnamn finns i localStorage, sätt currentUser och hämta tweets
    const username = user;
    if (username) {
      setCurrentUser({
        name: username,
        handle: "@" + username,
      });
      loadHomeTweets(username, setTweets, console.error, setUserImage);
    }
  }, []); */
  //Testar en ny variant av useEffect för att hämta tweets och användarinformation
  useEffect(() => {
    const username = user;
    if (username) {
      loadHomeTweets(
        username,
        setTweets,
        console.error,
        setUserImage,
        setCurrentUser // 👈 viktig!
      );
    }
  }, []);
  console.log("currentUser in Home:", currentUser);
  // Extrahera hashtags från text
  const extractHashtags = (text) => {
    return (
      /// Ändrade för att matcha hashtags korrekt. En korrekt hashtag kan innehålla bokstäver, siffror och svenska tecken. Inga mellanslag eller specialtecken tillåtna i början.
      text.match(/(^|\s)(#[a-zA-ZåäöÅÄÖ0-9]+)/g)?.map((s) => s.trim()) || []
    );
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

      //Fredricas ursprungliga kod
      await postTweet(
        username,
        newTweet,
        hashtags,
        () => {
          loadHomeTweets(
            username,
            setTweets,
            console.error,
            setUserImage,
            setCurrentUser
          );
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

  // FUNGERAR NU FINAL KAROLINA SECOND TIME AROUND
  const handleSearchSubmit = async (query) => {
    setSearchActive(true);
    setSearchError("");
    await handleSearch(query, setSearchResults, setSearchError);
  };
  //FUNGERAR NU FINAL KAROLINA SECOND TIME AROUND
  const handleSearch = async (query) => {
    await fetchSearchResults(
      query,
      (data) => {
        setSearchResults({ users: data.users, tweets: data.tweets });
        setSearchError("");
      },
      (errorMsg) => {
        setSearchError(errorMsg);
        setSearchResults({ users: [], tweets: [] });
      }
    );
  };

  // Filtrerar och sorterar tweets: visar endast tweets från personer man följer eller sig själv
  const filteredAndSortedTweets = [...tweets]
    .filter((tweet) => {
      const usernameWithoutAt = tweet.handle.replace("@", "");
      return (
        tweet.handle === currentUser.handle ||
        currentUser.following?.includes(usernameWithoutAt)
      );
    })
    .sort((a, b) => new Date(b.time) - new Date(a.time)); // Sorterar från nyast till äldst

  return (
    <>
      <Header user={user} userImage={userImage} />
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
                    userImage={userImage}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="right-sidebar">
            <SearchBar onSearch={handleSearchSubmit} />
            {searchActive && (
              <SearchOverlay
                users={searchResults.users}
                tweets={searchResults.tweets}
                onClose={() => setSearchActive(false)}
              />
            )}
            <div className="trends-section">
              <h2>Populärt för dig</h2>
              <Trend refreshTrendTrigger={refreshTrendTrigger} />
            </div>
          </div>
        </div>

        <div className="footer-wrapper">
          <FooterUser
            name={currentUser.name}
            handle={currentUser.handle}
            userImage={userImage || "/placeholder/avatar.png"} //Bytte ut profileImage mot image
          />
        </div>
      </div>
    </>
  );
};

export default Home;
