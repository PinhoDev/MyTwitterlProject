import { useEffect, useState } from "react";
import { loadAllTweets } from "../Controllers/HomeController.js";
import "../styles/Home.css";

const Trend = ({ refreshTrendTrigger }) => {
  const [trendingHashtags, setTrendingHashtags] = useState([]);

  useEffect(() => {
    loadAllTweets((tweets) => {
      const counts = {};
      tweets.forEach((tweet) => {
        tweet.hashtags?.forEach((tag) => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      });

      const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([topic, count]) => ({ topic, tweets: count }))
        .slice(0, 5);

      setTrendingHashtags(sorted);
    }, console.error);
  }, [refreshTrendTrigger]);

  return (
    <>
      {trendingHashtags.length === 0 ? (
        <p>Inga hashtags ännu</p>
      ) : (
        trendingHashtags.map((trend, i) => (
          <div key={i} className="trend-container">
            <div className="trend">
              <div className="trend-location">Trendar i Sverige</div>
              <div className="trend-topic">{trend.topic}</div>
              <div className="trend-tweets">{trend.tweets} användningar</div>
            </div>
            <div className="trend-menu">⋯</div>
          </div>
        ))
      )}
    </>
  );
};

export default Trend;
