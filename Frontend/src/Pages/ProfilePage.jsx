import Arrow from "../assets/Arrow.png";
import Beach from "../assets/DalmationBeachImg.png";
import ProfilePic from "../assets/manPinkShirt.png";
import "./working.css";
//använde emojies medan jag arbetade - ska vi köra react-icons? Svaret blev ja vi kör på react icons
// antal tweets under namnet längst upp är hur många man har skrivit.
// antal tweets, followre and foollowing ska uppdateras i antal efter när de ändras   . length

// här ska jag bara fortsätta lägga in så att användarens egna inlägg ska visas i kronologisk ordning. senast längst upp
function ProfilePage() {
  const user = {
    username: "daniel_feldman",
    fullName: "Daniel Feldman",
    email: "danieleldman@mail",
    about: "Taking a short Twitter vacation",
    occupation: "Astronomer",
    location: "Stockholm",
    website: "https://danielfeldman.space",
    joinDate: "March 2021",
    following: "10.2K",
    followers: "13.8K",
  };
  return (
    <>
      <div className="profilePageContainer">
        <div className="topBox">
          <div className="arrowNameTweetsNumberBox">
            <h2>
              <img className="arrowImg" src={Arrow} alt="" /> Daniel feldman
            </h2>
            <p className="topBoxP">27.3K Tweets</p>
          </div>

          <div className="imgWrapper">
            <img className="bannerImg" src={Beach} alt="Background image" />
            <img className="avatarPic" src={ProfilePic} alt="Profile picture" />
          </div>
        </div>
        <div className="formProfilePage" action="">
          <div>
            <h2> {user.fullName}</h2>
            <p>{user.email}</p>
            <p>{user.about}</p>
            <p>💼{user.occupation}</p>
            <p>🏠{user.location}</p>
            <p>🔗{user.website}</p>
            <p>🗓️{user.joinDate}</p>
            <p>{user.following}</p>
            <p> {user.followers}</p>
          </div>
        </div>
        <div>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default ProfilePage;
