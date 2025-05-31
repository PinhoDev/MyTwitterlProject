import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatTweetContent } from "../utils/formatTweetContent";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import "../styles/Home.css";

const Tweet = ({
  name,
  handle,
  time,
  content,
  comments,
  onAddComment,
  index,
  userImage,
}) => {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setShowComments(false);
      }
    }

    if (showComments) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showComments]);

  const handleComment = () => {
    if (commentText.trim() !== "") {
      onAddComment(index, commentText);
      setCommentText("");
    }
  };

  return (
    <div className="tweet">
      <div className="tweet-header">
        <div className="user-image-tweet-container">
          <Link to={`/profile/${handle.replace("@", "")}`}>
            <img
              src={userImage || "/placeholder/avatar.png"}
              alt="Profilbild"
              className="user-image-tweet"
            />
          </Link>
        </div>
        <div className="tweet-header-text">
          <Link
            to={`/profile/${handle.replace("@", "")}`}
            className="tweet-author-link"
          >
            <strong>{name}</strong>{" "}
            <span>
              {handle} · {formatRelativeTime(time)}
            </span>
          </Link>

          <div className="tweet-content">{formatTweetContent(content)}</div>
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="comment-toggle"
          >
            💬 {comments.length}
          </button>
        </div>
      </div>

      {showComments && (
        <div ref={commentRef} className="tweet-comments">
          <textarea
            placeholder="Skriv en kommentar..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleComment}>Skicka</button>

          {comments.map((comment, i) => (
            <div key={i} className="comment-bubble">
              <div className="comment-header">
                <div className="user-image-tweet-container">
                  <Link to={`/profile/${comment.handle.replace("@", "")}`}>
                    <img
                      src={comment.image || "/placeholder/avatar.png"}
                      alt="Profilbild"
                      className="user-image-tweet"
                    />
                  </Link>
                </div>
                <Link
                  to={`/profile/${comment.handle.replace("@", "")}`}
                  className="comment-author-link"
                >
                  <strong>{comment.name || "Okänd"}</strong>{" "}
                  <span>
                    {comment.handle || "@okand"} ·{" "}
                    {formatRelativeTime(comment.time)}
                  </span>
                </Link>
              </div>
              <div className="comment-content">
                {formatTweetContent(comment.content)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
