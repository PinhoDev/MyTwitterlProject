import formatRelativeTime from "../utils/formatRelativeTime";
import { formatTweetContent } from "../utils/formatTweetContent";

function TweetCard({ tweet }) {
  return (
    <div className="tweetCard">
      <div className="tweetHeader">
        <strong>{tweet.author.fullName}</strong> @{tweet.author.username}{" "}
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
