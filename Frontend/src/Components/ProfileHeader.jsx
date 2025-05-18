import { useEffect, useState } from "react";

function ProfileHeader({ username }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${username}`);
        const data = await response.json();
        if (data.result) {
          setUser(data.userDetails);
        } else {
          console.error("Kunde inte hämta användare");
        }
      } catch (error) {
        console.error("Fel vid hämtning:", error);
      }
    }

    fetchUser();
  }, [username]);
  if (!user) return <p>Laddar profil...</p>;

  return (
    <div className="profileHeaderContainer">
      <div className="topBox">
        <h2>{user.fullName}</h2>
        <p>{user.Tweets.length} Tweets</p>
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
