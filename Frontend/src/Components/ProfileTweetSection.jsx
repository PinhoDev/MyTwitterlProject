// ProfileTweetSection.jsx
import { useEffect, useState } from "react";
import { loadUserTweets } from "../Controllers/ProfileController";
import TweetCard from "./TweetCard";
import "../styles/ProfilePage.css";

function ProfileTweetSection({ username }) {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserTweets(username, setTweets, setError);
  }, [username]);

  if (error) return <p>{error}</p>;
  if (tweets.length === 0) return <p>Inga tweets än.</p>;

  return (
    <div className="tweetList">
      {tweets.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
}

export default ProfileTweetSection;
