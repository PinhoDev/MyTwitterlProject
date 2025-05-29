import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/Home.css";
import "../styles/ProfileComponents.css";
import FooterUser from "../components/FooterUser.jsx";
import Trend from "../Components/Trend.jsx";
import Tweet from "../Components/Tweet.jsx";
import FollowButton from "../Components/FollowButton.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import SearchOverlay from "../Components/SearchOverlay.jsx";
import { loadUserDetails } from "../Controllers/ProfileController.js";
import { handleSearch } from "../Controllers/HomeController.js";
import { postComment } from "../Controllers/HomeController.js"; ///Fredrica la till

const ProfilePage = () => {
  const { user } = useParams();
  const username = user;
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState({ users: [], tweets: [] });
  const [refreshTrendTrigger, setRefreshTrendTrigger] = useState(0);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    handle: "",
    username: "",
  });

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

  const isOwnProfile = user === currentUser.username;

  const sortedTweets = userDetails?.tweets?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  //Fredrica la till för att lägga till kommentarer
  // Funktion för att lägga till en kommentar på en tweet
  const addCommentToTweet = (index, commentText) => {
    const tweet = userDetails.tweets[index];
    const username = currentUser.username;

    if (!tweet || !username) return;

    postComment(
      username,
      tweet._id,
      commentText,
      () => {
        loadUserDetails(user, setUserDetails, setError); // Ladda om för att visa nya kommentaren
      },
      console.error
    );
  };

  const handleSearchQuery = async (query) => {
    setSearchActive(true);
    await handleSearch(
      query,
      (results) => {
        setSearchResults(results);
      },
      (errMsg) => {
        setError(errMsg);
        setSearchResults({ users: [], tweets: [] });
      }
    );
  };

  if (!userDetails) {
    return <p>Laddar profil...</p>;
  }

  return (
    <div className="sidebars">
      <div className="home-container">
        <div className="left-sidebar">
          <div className="left-sidebar-position">
            <div className="profile-page-container">
              <div className="banner-wrapper">
                <div className="profile-header">
                  <Link
                    to={`/home/${currentUser.username}`}
                    className="back-arrow"
                  >
                    ←
                  </Link>
                </div>

                <div className="tweet-count">
                  <h3 className="name">{userDetails?.name}</h3>
                  <span className="counter">
                    {userDetails?.tweets?.length || 0} Tweets
                  </span>
                </div>
              </div>
              <div className="photo-box">
                <img
                  className="cover-photo"
                  src={
                    userDetails?.imageBackground || "/placeholder/banner.jpg"
                  }
                  alt="Bakgrundsbild"
                />
                <img
                  className="profile-pic"
                  src={userDetails?.image || "/placeholder/avatar.png"}
                  alt="Profilbild"
                />
              </div>
              <div className="profile-details">
                <div className="profile-actions">
                  <h3 className="name">{userDetails?.name}</h3>
                  {!isOwnProfile && (
                    <FollowButton
                      profileUsername={username}
                      currentUser={currentUser}
                    />
                  )}
                </div>

                <div className="handle">@{userDetails?.username}</div>
                <div className="bio">{userDetails?.about}</div>

                <div className="meta">
                  {userDetails?.occupation && (
                    <div>💼 {userDetails.occupation}</div>
                  )}
                  {userDetails?.location && (
                    <div>🏠 {userDetails.location}</div>
                  )}
                  {userDetails?.website && (
                    <div>
                      <a
                        href={userDetails.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        🔗 {userDetails.website}
                      </a>
                    </div>
                  )}
                  {userDetails?.joinDate && (
                    <div>🗓️ Joined {userDetails.joinDate}</div>
                  )}
                </div>

                <div className="stats">
                  <span>
                    <strong>{userDetails?.following?.length || 0}</strong>{" "}
                    Följer
                  </span>
                  <span>
                    <strong>{userDetails?.followers?.length || 0}</strong>{" "}
                    Följare
                  </span>
                </div>
              </div>

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
        </div>

        <div className="right-sidebar">
          <SearchBar onSearch={handleSearchQuery} />
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
          userImage={userDetails?.image || "/placeholder/avatar.png"} //Bytte ut profileImage mot image
        />
      </div>
    </div>
  );
};

export default ProfilePage;
