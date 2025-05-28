import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { fetchSearchResults } from "../Controllers/HomeController.js";
import ProfileHeader from "../Components/ProfileHeader.jsx";
import ProfileTweetSection from "../Components/ProfileTweetSection.jsx";
import Searchbar from "../Components/Searchbar.jsx";
import SearchOverlay from "../Components/SearchOverlay.jsx";
import Trend from "../Components/Trend.jsx";
import "../styles/Home.css";

function ProfilePage() {
  const { user } = useParams();
  const location = useLocation();
  const currentUser = user;
  const viewedUser = location.state?.viewedUser || currentUser;
  const isOwnProfile = viewedUser.username === currentUser.username;
  const [searchResults, setSearchResults] = useState({ users: [], tweets: [] });
  const [showOverlay, setShowOverlay] = useState(false);

  // if (!currentUser || !currentUser.username) {
  //   return <p>Ingen inloggad användare.</p>;
  // }

  const handleSearch = (query) => {
    fetchSearchResults(
      query,
      (data) => {
        setSearchResults({ users: data.users, tweets: data.tweets });
        setShowOverlay(true);
      },
      (errorMsg) => {
        alert(errorMsg);
      }
    );
  };

  return (
    <div className="siderbars">
      <div className="homecontainer">
        <div className="left-sidebar">
          <ProfileHeader username={user} currentUser={currentUser} />
          <ProfileTweetSection username={user} />
        </div>

        <div className="right-sidebar">
          <Searchbar onSearch={handleSearch} />
          {showOverlay && (
            <SearchOverlay
              users={searchResults.users}
              tweets={searchResults.tweets}
              onClose={() => setShowOverlay(false)}
            />
          )}
          <Trend />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
