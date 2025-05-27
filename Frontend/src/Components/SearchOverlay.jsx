// components/SearchOverlay.jsx
import "../styles/SearchOverlay.css";

const SearchOverlay = ({ users, tweets, onClose }) => {
  return (
    <div className="search-overlay">
      <button className="close-btn" onClick={onClose}>
        Stäng
      </button>

      <h3>Användare</h3>
      {users.length === 0 ? (
        <p>Inga användare hittades.</p>
      ) : (
        users.map((user) => <div key={user._id}>{user.username}</div>)
      )}

      <h3>Tweets</h3>
      {tweets.length === 0 ? (
        <p>Inga tweets hittades.</p>
      ) : (
        tweets.map((tweet) => <div key={tweet._id}>{tweet.content}</div>)
      )}
    </div>
  );
};

export default SearchOverlay;
