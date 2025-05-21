import "../styles/Home.css";

const Trend = ({ topic, tweets }) => (
  <>
    <div className="trend-container">
      <div className="trend">
        <div className="trend-location">Trendar i Sverige</div>
        <div className="trend-topic">{topic}</div>
        {tweets && <div className="trend-tweets">{tweets} Tweets</div>}
      </div>
      <div className="trend-menu">⋯</div>
    </div>
  </>
);

export default Trend;
