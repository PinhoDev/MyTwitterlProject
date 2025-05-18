function TweetCard({ tweet }) {
  //Formatera datum från ISO till något kort och läsbart
  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocalDateString("sv-SE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <div className="tweetCard">
      <div className="tweetHeader">
        <strong>{tweet.author.fullName}</strong> @{tweet.author.username}{" "}
        {formatDate(tweet.createdAt)}
      </div>
      <div className="tweetContent">
        <p>{tweet.content}</p>
        {/*kommentar om vi vill*/}
      </div>
    </div>
  );
}
export default TweetCard;
