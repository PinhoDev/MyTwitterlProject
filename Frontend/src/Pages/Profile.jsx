import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/Home.css";
import "../styles/ProfileComponents.css";
import FooterUser from "../Components/FooterUser.jsx";
import Trend from "../Components/Trend.jsx";
import Tweet from "../Components/Tweet.jsx";
import FollowButton from "../Components/FollowButton.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import SearchOverlay from "../Components/SearchOverlay.jsx";
import { loadUserDetails } from "../Controllers/ProfileController.js";
import { fetchSearchResults } from "../Controllers/HomeController.js";
import { postComment } from "../Controllers/HomeController.js"; ///Fredrica la till

const Profile = () => {
  const { user } = useParams();
  const username = user;
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const [refreshTrendTrigger, setRefreshTrendTrigger] = useState(0);
  const [currentUser, setCurrentUser] = useState({
    name: "Karo",
    handle: "@Karo",
    username: "Karo",
    following: ["gudrun"], // för att testa FollowButton-logik
  });

  // Samma sökfunktionalitet som i Home
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState({ users: [], tweets: [] });
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const localUsername = localStorage.getItem("username");
    if (localUsername) {
      setCurrentUser({
        name: localUsername,
        handle: "@" + localUsername,
        username: localUsername,
      });
    }

    loadUserDetails(user, setUserDetails, setError);
  }, [user]);

  const sortedTweets = userDetails?.tweets?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleSearchSubmit = async (query) => {
    setSearchActive(true);
    setSearchError("");
  };

  const addCommentToTweet = (index, commentText) => {
    const tweet = userDetails.tweets[index];
    const username = currentUser.username;

    if (!tweet || !username) return;
    postComment(
      username,
      tweet._id,
      commentText,
      () => {
        loadUserDetails(user, setUserDetails, setError);
      },
      console.error
    );
  };

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

  return (
    <div className="sidebars">
      <div className="home-container">
        <div className="profile-page-container">
          <div className="topBox">
            <div className="back-arrow-box">
              <Link to={`/home/${currentUser.username}`}>
                <div className="back-arrow">&#8592;</div>
              </Link>
              <div className="user-info">
                <div className="name">{userDetails?.name}</div>
                <div className="tweets">
                  {userDetails?.tweets?.length || 0} Tweets
                </div>
              </div>
            </div>
          </div>

          <div className="profile-header">
            <img
              className="cover-photo"
              src={userDetails?.imageBackground || "/placeholder/banner.jpg"}
              alt="Bakgrundsbild"
            />
            <img
              className="profile-pic"
              src={userDetails?.image || "/placeholder/avatar.png"}
              alt="Profilbild"
            />
          </div>
          <div className="wanttosee-button">
            {/* ✅ FollowButton visas här, om det inte är din egen profil */}
            {currentUser.username && user !== currentUser.username && (
              <FollowButton
                profileUsername={username}
                currentUser={currentUser}
                onToggle={() => loadUserDetails(user, setUserDetails, setError)}
              />
            )}
          </div>
          <div className="profile-container">
            <div className="name">{userDetails?.name}</div>
            <div className="handle">@{userDetails?.username}</div>
            <div className="bio">{userDetails?.about}</div>

            <div className="meta">
              {userDetails?.occupation && (
                <div>💼 {userDetails.occupation}</div>
              )}
              {userDetails?.location && <div>🏠 {userDetails.location}</div>}
              {userDetails?.website && <div>🔗 {userDetails.website}</div>}
              {userDetails?.joinDate && <div>🗓️ {userDetails.joinDate}</div>}
            </div>

            <div className="stats">
              <span>{userDetails?.following?.length || 0} följer</span>
              <span>{userDetails?.followers?.length || 0} följare</span>
            </div>
          </div>
        </div>

        <div className="left-sidebar">
          <div className="left-sidebar-position">
            {error && <p>{error}</p>}
            <div className="tweet-list">
              {sortedTweets?.map((tweet, index) => (
                <Tweet
                  key={index}
                  index={index}
                  name={userDetails.name || "Okänd"}
                  handle={"@" + userDetails.username}
                  content={tweet.content}
                  time={tweet.createdAt}
                  comments={(tweet.comments || []).map((c) => ({
                    user: c.userName?.username || "Okänd",
                    content: c.content,
                    time: c.createdAt,
                  }))}
                  userImage={userDetails.image || "/placeholder/avatar.png"}
                  onAddComment={addCommentToTweet}
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
          userImage={userDetails?.image || "/placeholder/avatar.png"}
        />
      </div>
    </div>
  );
};

export default Profile;
