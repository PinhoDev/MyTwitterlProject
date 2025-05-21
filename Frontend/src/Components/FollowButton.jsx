import { useState, useEffect } from "react";
//Fråga till team --- ska det stå follow /unfollow eller på svenska??
function FollowButton({ profileUsername, currentUser }) {
  const [isFollowing, setIsFollowing] = useState(false);
  //ska vi kolla här om usern är follower eller skulle det vara i backendanrop/API-respons? Bättre i backend kanske
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
      const response = await fetch(`/api/users/${currentUsername}/following`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ following: profileUsername }),
      });
      if (response.ok) {
        setIsFollowing(!isFollowing);
      } else {
        console.error("Något gick fel med följarhanteringen");
      }
    } catch (error) {
      console.error("Fel vid follow/unfollow:", error);
    }
  }
  return (
    <button onClick={toggleFollow}>
      {isFollowing ? "Sluta följa" : "Följ"}
    </button>
  );
}
export default FollowButton;
