import { formatRelativeTime } from "../utils/formatRelativeTime";
import { formatTweetContent } from "../utils/formatTweetContent";
import { Link } from "react-router-dom";

function TweetCard({ tweet }) {
  return (
    <div className="tweetCard">
      <div className="tweetHeader">
        <strong>{tweet.author.fullName}</strong>{" "}
        <Link to={`/profile/${tweet.author.username}`}>
          @{tweet.author.username}
        </Link>
        {formatRelativeTime(tweet.createdAt)}
      </div>
      <div className="tweetContent">
        <p>{formatTweetContent(tweet.content)}</p>
        {/*kommentar om vi vill*/}
      </div>
    </div>
  );
}
export default TweetCard;
