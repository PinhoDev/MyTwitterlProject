export const formatTweetContent = (text) => {
  return text.split(/(\s+)/).map((segment, i) => {
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
