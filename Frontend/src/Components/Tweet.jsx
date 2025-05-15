import { useState } from "react";
import { formatTweetContent } from "../utils/formatTweetContent";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import "../styles/Home.css";

const Tweet = ({
  _id,
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

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleComment = async () => {
    if (commentText.trim() === "") return;

    try {
      const response = await axios.post(
        `http://localhost:3000/tweets/${_id}/comment`,
        { content: commentText }
      );

      if (response.data.result) {
        setCommentText("");
        if (onAddComment) onAddComment(index, commentText); // valfri
      } else {
        alert("Kunde inte lägga till kommentar");
      }
    } catch (err) {
      console.error("Kommentarfel:", err);
      alert(
        "Fel vid kommentar: " + (err.response?.data?.message || err.message)
      );
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
      <div className="tweet-actions">
        <button className="comment-toggle" onClick={handleToggleComments}>
          💬 Kommentera
        </button>
      </div>

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
