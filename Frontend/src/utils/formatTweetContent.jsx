export const formatTweetContent = (text) => {
  // Dela upp texten i segment (ord + mellanslag), så mellanslag behålls
  return text.split(/(\s+)/).map((segment, i) => {
    // Om segmentet är en hashtag (börjar med # och följs av bokstäver/siffror)
    if (/^#\w+$/.test(segment)) {
      return (
        <span key={i} className="hashtag">
          {segment}
        </span>
      );
    }
    return segment;
  });
};
