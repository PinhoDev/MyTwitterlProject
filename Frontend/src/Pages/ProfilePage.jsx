import { useParams, useLocation } from "react-router-dom";
import ProfileHeader from "../components/Profileheader";
import ProfileTweetSection from "../Components/ProfileTweetSection";
import FollowButton from "../Components/FollowButton";

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
  );
}

export default ProfilePage;
