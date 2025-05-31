export const formatTweetContent = (text) => {
  // Identifierar giltiga hashtags som står efter mellanslag eller i början
  const hashtagsRegex = /(^|\s)(#[a-zA-Z0-9åäöÅÄÖ]+)\b/g;

  const parts = [];
  let lastIndex = 0;

  //Matcha alla hashtags i texten
  for (const match of text.matchAll(hashtagsRegex)) {
    const [, space, hashtag] = match;
    const start = match.index + space.length; // Startindex för hashtag utan mellanslag

    // Text före hashtag
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index + space.length));
    }

    // Klickbar hashtag
    parts.push(
      <span
        key={start}
        className="hashtag"
        onClick={() => console.log("Klickade på", hashtag)}
      >
        {hashtag}
      </span>
    );

    lastIndex = start + hashtag.length;
  }

  // Lägger till text efter sista hashtag
  if (lastIndex < text.length) {
    // Lägg till eventuell text efter sista hashtag
    parts.push(text.slice(lastIndex));
  }

  return parts;
};
