import { useState } from "react";
import axios from "axios";
import "../Styles/ProfileComponents.css";

function FollowButton({ myUsername, otherUsername }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = async () => {
    try {
      await axios.post(`http://localhost:3000/${myUsername}/following`, {
        following: otherUsername,
      });

      // Växla knappens tillstånd
      setIsFollowing((prev) => !prev);
    } catch (err) {
      console.error("❌ Gick inte att toggla följning:", err);
    }
  };

  return (
    <button className="follow-button" onClick={toggleFollow}>
      {isFollowing ? "Sluta följa" : "Följ"}
    </button>
  );
}

export default FollowButton;
