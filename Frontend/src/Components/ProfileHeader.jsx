import { useEffect, useState } from "react";
import { loadUserDetails } from "../Controllers/userController";

function ProfileHeader({ username }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserDetails(username, setUser, setError);
  }, [username]);
  if (error) return <p>{error}</p>;
  if (!user) return <p>Laddar profil...</p>;

  return (
    <div className="profileHeaderContainer">
      <div className="topBox">
        <h2>{user.fullName}</h2>
        <p>{user.tweets?.length || 0} Tweets</p>
      </div>

      <div className="imgWrapper">
        <img
          className="bannerImg"
          src="/placeholder/banner.jpg"
          alt="Background"
        />
        <img className="avatarPic" src="/placeholder/avatar.jpg" alt="Avatar" />
      </div>

      <div className="formProfilePage">
        <p>﹫{user.username}</p>
        <p>{user.about}</p>
        <p>💼{user.occupation}</p>
        <p>🏠{user.location}</p>
        <p>
          🔗 <a href={user.website}>{user.website}</a>
        </p>
        <p>🗓️ Gick med: {user.joinDate}</p>
        <p>Föler: {user.following.length}</p>
        <p>Följare: {user.followers.length}</p>
      </div>
    </div>
  );
}
export default ProfileHeader;
