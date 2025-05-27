import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadUserDetails } from "../Controllers/ProfileController.js";
import FollowButton from "../Components/FollowButton.jsx";
import ProfilePic from "../assets/manPinkShirt.png";
import "../styles/ProfileComponents.css";

function ProfileHeader({ username, currentUser }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserDetails(username, setUser, setError);
  }, [username]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Laddar profil...</p>;

  const isOwnProfile = username === currentUser.username;

  return (
    <div className="profile-page-container">
      <div className="topBox">
        <div className="back-arrow-box">
          <Link to="/home">
            <div className="back-arrow">&#8592;</div>
          </Link>
          <div className="user-info">
            <div className="name">{user.fullName}</div>
            <div className="tweets">{user.tweets?.length || 0} Tweets</div>
          </div>
        </div>
      </div>

      <div className="profile-header">
        <img
          className="cover-photo"
          src="/placeholder/banner.jpg"
          alt="Background image"
        />
        <img className="profile-pic" src={ProfilePic} alt="Profile picture" />

        {!isOwnProfile && (
          <FollowButton profileUsername={username} currentUser={currentUser} />
        )}
      </div>

      <div className="profile-container">
        <div className="name">{user.fullName}</div>
        <div className="handle">@{user.username}</div>
        <div className="bio">{user.about}</div>

        <div className="meta">
          {user.occupation && <div>💼 {user.occupation}</div>}
          {user.location && <div>🏠 {user.location}</div>}
          {user.website && (
            <div>
              🔗 <a href={user.website}>{user.website}</a>
            </div>
          )}
          {user.joinDate && <div>🗓️ {user.joinDate}</div>}
        </div>

        <div className="stats">
          <span>{user.following?.length || 0} följer</span>
          <span>{user.followers?.length || 0} följare</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
