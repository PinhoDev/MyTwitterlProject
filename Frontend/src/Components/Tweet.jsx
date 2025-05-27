import { useState } from "react";
import { formatTweetContent } from "../utils/formatTweetContent.jsx";
import { formatRelativeTime } from "../utils/formatRelativeTime.jsx";
import "../styles/Home.css";

// Tweet-komponenten tar emot props (värden) från föräldrakomponent
const Tweet = ({
  name,
  handle,
  time,
  content,
  comments,
  onAddComment,
  index,
}) => {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Funktion som anropas när användaren klickar "Comment"
  const handleComment = () => {
    // Om kommentaren inte är tom
    if (commentText.trim() !== "") {
      // Anropa funktionen som lägger till kommentaren (skickar index och text)
      onAddComment(index, commentText);
      // Töm textfältet efter kommentar lagts till
      setCommentText("");
    }
  };

  return (
    <div className="tweet">
      <div className="tweet-header">
        <strong>{name}</strong>{" "}
        <span>
          {handle} · {formatRelativeTime(time)}
        </span>
      </div>
      <div className="tweet-content">{formatTweetContent(content)}</div>
      <button
        onClick={() => setShowComments(!showComments)}
        className="comment-toggle"
      >
        💬 {comments.length}
      </button>

      {showComments && (
        <div className="tweet-comments">
          <textarea
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleComment}>Comment</button>
          {comments.map((comment, i) => (
            <div key={i} className="comment-bubble">
              💬 {comment}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
