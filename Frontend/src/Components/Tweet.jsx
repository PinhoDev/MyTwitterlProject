import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"; /// Behövs för att länka till profilsidan
import { formatTweetContent } from "../utils/formatTweetContent";
import { formatRelativeTime } from "../utils/formatRelativeTime";
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
  userImage, ///Karolina har lagt till för bilden i tweeten
}) => {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const commentRef = useRef(null); // <== referens till kommentarsruta

  // Stänger kommentarsrutan om man klickar utanför
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
      {/*  Fredricas ursprungliga kod utan länk till författarens profilsida 
       <div className="tweet-header">
        <strong>{name}</strong>{" "}
        <span>
          {handle} · {formatRelativeTime(time)}
        </span>
      </div>
        */}
      <div className="tweet-header">
        <div className="user-imagecontainer">
          <Link to={`/profile/${handle.replace("@", "")}`}>
            <img src={userImage} alt="Profilbild" className="user-image" />
          </Link>
          <Link
            to={`/profile/${handle.replace("@", "")}`}
            className="tweet-author-link"
          >
            <strong>{name}</strong>{" "}
            <span>
              {handle} · {formatRelativeTime(time)}
            </span>
          </Link>
        </div>

        <div className="tweet-content">{formatTweetContent(content)}</div>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="comment-toggle"
        >
          💬 {comments.length}
        </button>

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
                <strong>{comment.user}</strong>: •{" "}
                {formatRelativeTime(comment.time)}
                <br /> {comment.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tweet;
