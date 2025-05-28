export const formatTweetContent = (text) => {
  const hashtagsRegex = /^#[a-zA-Z0-9åäöÅÄÖ]+$/;
  // Dela upp texten i segment (ord + mellanslag), så mellanslag behålls
  return text.split(/(\s+)/).map((segment, i) => {
    // Om segmentet är en hashtag (börjar med # och följs av bokstäver/siffror)
    if (hashtagsRegex.test(segment)) {
      return (
        <span
          key={i}
          className="hashtag"
          onClick={() => console.log("Klickade på", segment)}
        >
          {segment}
        </span>
      );
    }
    return segment;
  });
};
