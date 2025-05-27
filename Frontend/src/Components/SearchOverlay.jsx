import "../styles/Search.css";
import { Link } from "react-router-dom";

const SearchOverlay = ({ users, tweets, onClose }) => {
  return (
    <div className="search-overlay">
      <button className="close-button" onClick={onClose}>
        Stäng
      </button>

      <h3>Användare</h3>
      <div className="search-users-section">
        {users.length === 0 ? (
          <p>Inga användare hittades.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} className="search-result-user">
              <Link
                to={`/profile/${user.username}`}
                state={{ currentUser: user }}
              >
                @{user.username}
              </Link>
            </div>
          ))
        )}
      </div>

      <h3>Tweets</h3>
      <div className="search-tweets-section">
        {tweets.length === 0 ? (
          <p>Inga tweets hittades.</p>
        ) : (
          tweets.map((tweet) => (
            <div key={tweet._id} className="search-result-tweet">
              {tweet.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
