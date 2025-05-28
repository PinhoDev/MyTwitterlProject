import { Link } from "react-router-dom";
import { formatRelativeTime } from "../utils/formatRelativeTime.jsx";
import { formatTweetContent } from "../utils/formatTweetContent.jsx";
//import "../styles/TweetCard.css";    finns ingen css   ---

function TweetCard({ tweet }) {
  return (
    <div className="tweetCard">
      <div className="tweetCard-header">
        <Link
          to={`/profile/${tweet.author.username}`}
          state={{ viewedUser: { username: tweet.author.username } }}
          className="tweetCard-author"
        >
          <img
            src={tweet.author.profileImage || "/placeholder/avatar.png"}
            alt="avatar"
            className="tweetCard-avatar"
          />
          <div>
            <strong>{tweet.author.fullName}</strong>
            <span className="tweetCard-username">@{tweet.author.username}</span>
          </div>
        </Link>
        <span className="tweetCard-time">
          {formatRelativeTime(tweet.createdAt)}
        </span>
      </div>

      <div className="tweetCard-content">
        <p>{formatTweetContent(tweet.content)}</p>
      </div>

      <div className="tweetCard-footer">
        <span>💬 {tweet.comments?.length || 0} kommentarer</span>
        <Link to={`/tweet/${tweet._id}`} className="tweetCard-viewTweet">
          Visa tweet
        </Link>
      </div>
    </div>
  );
}

export default TweetCard;
