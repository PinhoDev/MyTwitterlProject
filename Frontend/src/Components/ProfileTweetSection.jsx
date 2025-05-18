import { useEffect, useState } from "react";
import TweetCard from "./TweetCard";

//personens tweets rangordnade efter datum - mappa som divar i lista

//innehåll - avatar - namn mail createdat
// content
//kommentarer - antalet kommentarer

function ProfileTweetSection({ username }) {
  //hämta user.profilepic user.username user.useremail  user.tweet  user.tweet.comment
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function fetchTweets() {
      try {
        const response = await fetch(`/api/tweets/${username}`);
        const data = await response.json();
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTweets(sorted.slice(0, 5));
      } catch (error) {
        console.error("Kunde inte hämta tweets:", error);
      }
    }
    fetchTweets();
  }, [username]);
  return (
    <>
      <div classname="tweetList">
        {tweets.map((tweet) => (
          <TweetCard key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </>
  );
}

export default ProfileTweetSection;
