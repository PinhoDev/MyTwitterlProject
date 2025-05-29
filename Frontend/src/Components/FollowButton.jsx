import { useState, useEffect } from "react";
import axios from "axios";

function FollowButton({ profileUsername, currentUser, onToggle }) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.following) {
      const follows = currentUser.following.some((user) =>
        typeof user === "string"
          ? user === profileUsername
          : user.username === profileUsername
      );
      setIsFollowing(follows);
    }
  }, [currentUser, profileUsername]);

  async function toggleFollow() {
    try {
      await axios.post(`/api/users/${currentUser.username}/following`, {
        following: profileUsername,
      });

      setIsFollowing(!isFollowing);

      if (onToggle) {
        onToggle(); // 🔁 Hämta ny användardata utan att ladda om sidan
      }
    } catch (error) {
      console.error("Fel vid follow/unfollow:", error);
    }
  }

  return (
    <button className="follow-button" onClick={toggleFollow}>
      {isFollowing ? "Sluta följa" : "Följ"}
    </button>
  );
}

export default FollowButton;
