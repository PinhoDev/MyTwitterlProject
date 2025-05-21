import { useEffect, useState } from "react";
import { loadUserTweets } from "../Controllers/ProfileController";
import TweetCard from "./TweetCard";

//personens tweets rangordnade efter datum - mappa som divar i lista

//innehåll - avatar - namn mail createdat
// content
//kommentarer - antalet kommentarer

function ProfileTweetSection({ username }) {
  //hämta user.profilepic user.username user.useremail  user.tweet  user.tweet.comment
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserTweets(username, setTweets, setError);
  }, [username]);

  if (error) return <p>{error}</p>;
  if (tweets.length === 0) return <p>Inga tweets än.</p>;

  return (
    <>
      <div className="tweetList">
        {tweets.map((tweet) => (
          <TweetCard key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </>
  );
}

export default ProfileTweetSection;
