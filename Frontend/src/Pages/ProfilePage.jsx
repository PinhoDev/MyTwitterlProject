import { useParams, useLocation } from "react-router-dom";
import ProfileHeader from "../components/Profileheader";
import ProfileTweetSection from "../Components/ProfileTweetSection";
import FollowButton from "../Components/FollowButton";
import Beach from "../assets/DalmationBeachImg.png";
import Trend from "../Components/Trend.jsx";
import ProfilePic from "../assets/manPinkShirt.png";
import { Link } from "react-router-dom";
import "../styles/ProfilePage.css";
import "../styles/Home.css";

//import "./working.css";
//använde emojies medan jag arbetade - ska vi köra react-icons? Svaret blev ja vi kör på react icons
// antal tweets under namnet längst upp är hur många man har skrivit.
// antal tweets, followre and foollowing ska uppdateras i antal efter när de ändras   . length

function ProfilePage() {
  const { username } = useParams();
  const location = useLocation();
  const currentUser = location.state?.currentUser;

  if (!currentUser || !currentUser.username) {
    return <p>Ingen inloggad användare.</p>;
  }

  const isOwnProfile = username === currentUser.username;

  return (
    <div className="profilePageContainer">
      <ProfileHeader username={username} currentUser={currentUser} />
      {!isOwnProfile && (
        <div className="followButtonWrapper">
          <FollowButton profileUsername={username} currentUser={currentUser} />
        </div>
      )}
      <ProfileTweetSection username={username} />
    </div>

    // const user = {
    //   username: "daniel_feldman",
    //   fullName: "Daniel Feldman",
    //   email: "danieleldman@mail",
    //   about: "Taking a short Twitter vacation",
    //   occupation: "Astronomer",
    //   location: "Stockholm",
    //   website: "https://danielfeldman.space",
    //   joinDate: "March 2021",
    //   following: "10.2K",
    //   followers: "13.8K",
    // };
    // return (
    //   <>
    //     <div className="sidebars">
    //       <div className="home-container">
    //         <div className="left-sidebar">
    //           <div className="profilePageContainer">
    //             <div className="topBox">
    //               <div className="arrowNameTweetsNumberBox">
    //                 <Link to="/home">
    //                   <div className="back-arrow">&#8592;</div>
    //                 </Link>
    //                 <div className="user-info">
    //                   <div className="name">{user.fullName}</div>
    //                   <div className="tweets">27.3K Tweets</div>
    //                 </div>
    //               </div>

    //               <div className="profile-header">
    //                 <img
    //                   className="cover-photo"
    //                   src={Beach}
    //                   alt="Background image"
    //                 />
    //                 <img
    //                   className="profile-pic"
    //                   src={ProfilePic}
    //                   alt="Profile picture"
    //                 />
    //                 <button class="follow-button">Follow</button>
    //               </div>
    //             </div>
    //             <div className="profile-container" action="">
    //               <div className="name">{user.fullName}</div>
    //               <div className="handle">{user.email}</div>
    //               <div className="bio">{user.about}</div>

    //               <div className="meta">
    //                 <div>💼{user.occupation}</div>
    //                 <div>🏠{user.location}</div>
    //                 <div>🔗{user.website}</div>
    //                 <div>🗓️{user.joinDate}</div>
    //               </div>

    //               <div className="stats">
    //                 <span>{user.following}</span>
    //                 <span>{user.followers}</span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="right-sidebar" data-page="a">
    //           <input
    //             type="text"
    //             placeholder="Sök efter användare eller #hashtags"
    //             className="search-input"
    //           />
    //           <div className="trends-section">
    //             <h2>Populärt för dig</h2>
    //             <Trend topic="Samt" tweets="2,640" />
    //             <Trend topic="China" tweets="527K" />
    //             <Trend topic="#finland" tweets="10.4K" />
    //             <Trend topic="#babygirl" />
    //             <Trend topic="Newzorf" tweets="60.4K" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </>
  );
}

export default ProfilePage;
