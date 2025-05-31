import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/ProfileComponents.css"; // Importera CSS-stil för knappen

function FollowButton({ profileUsername, currentUser, onToggle }) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUser?.following?.length) {
      const follows = currentUser.following.some((user) =>
        typeof user === "string"
          ? user === profileUsername
          : user.username === profileUsername
      );
      setIsFollowing(follows);
    }
  }, [currentUser, profileUsername]);

  async function toggleFollow() {
    if (!currentUser?.username || !profileUsername) {
      console.error("❌ Kan inte toggla följning – saknar användarnamn.");
      return;
    }

    try {
      console.log("🔁 Trying to follow:", profileUsername);
      console.log("🔁 From user:", currentUser.username);

      await axios.post(
        `http://localhost:3000/${currentUser.username}/following`,
        {
          following: profileUsername,
        }
      );

      setIsFollowing(!isFollowing);

      if (onToggle) {
        onToggle(); // 🔁 Hämta ny användardata utan att ladda om sidan
      }
    } catch (error) {
      console.error("Fel vid follow/unfollow:", error);
    }
  }

  return (
    <button
      className="follow-button"
      onClick={toggleFollow}
      disabled={!currentUser?.username || !profileUsername}
    >
      {isFollowing ? "Sluta följa" : "Följ"}
    </button>
  );
}

export default FollowButton;
