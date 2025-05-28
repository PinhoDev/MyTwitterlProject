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

const ProfilePage = () => {
  const { user } = useParams();
  const username = user;
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const [searchActive, setSearchActive] = useState(false);
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

  return (
    <>
      {/* PROFILE HEADER */}
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

              <div className="profile-header">
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

                {!isOwnProfile && (
                  <FollowButton
                    profileUsername={username}
                    currentUser={currentUser}
                  />
                )}
              </div>

              <div className="profile-container">
                <div className="name">{userDetails?.fullName}</div>
                <div className="handle">@{userDetails?.username}</div>
                <div className="bio">{userDetails?.about}</div>

                <div className="meta">
                  {userDetails?.occupation && (
                    <div>💼 {userDetails.occupation}</div>
                  )}
                  {userDetails?.location && (
                    <div>🏠 {userDetails.location}</div>
                  )}
                  {userDetails?.website && <div> 🔗{userDetails.website}</div>}
                  {userDetails?.joinDate && (
                    <div>🗓️ {userDetails.joinDate}</div>
                  )}
                </div>

                <div className="stats">
                  <span>{userDetails?.following?.length || 0} följer</span>
                  <span>{userDetails?.followers?.length || 0} följare</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBARS */}

          <div className="left-sidebar">
            <div className="left-sidebar-position">
              {error && <p>{error}</p>}
              <div className="tweet-list">
                {sortedTweets?.map((tweet, index) => (
                  <Tweet
                    key={index}
                    index={index}
                    content={tweet.content}
                    time={tweet.createdAt}
                    comments={tweet.comments}
                    handle={"@" + username}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="right-sidebar">
            <SearchBar onClick={() => setSearchActive(true)} />
            {searchActive && (
              <SearchOverlay onClose={() => setSearchActive(false)} />
            )}
            <div className="trends-section">
              <h2>Populärt för dig</h2>
              <Trend refreshTrendTrigger={refreshTrendTrigger} />
            </div>
          </div>
        </div>
        {/*

 <div className="footer-wrapper">
          <FooterUser
            name={currentUser.name}
            handle={currentUser.handle}
            userImage={userDetails?.profileImage || "/placeholder/avatar.png"}
          />
        </div>



*/}
      </div>
    </>
  );
};

export default ProfilePage;
