import { useState, useEffect } from "react";
import { getProfile, getUserTweets } from "../../../services/userService";
import TweetsList from "../../TweetsList";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../../types/Profile";
import ProfileDetails from "../../ProfileDetails";

const ProfileContainer = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  console.log("profile: ", profile);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [userTweets, setUserTweets] = useState([]);

  const fetchUserTweets = () => {
    if (!profile) {
      return Promise.resolve();
    }
    return getUserTweets({ userId: profile.id })
      .then((tweets) => {
        console.log("tweets from user: ", tweets);
        setUserTweets(tweets);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      });
  };

  useEffect(() => {
    getProfile()
      .then((profile) => {
        console.log("profile: ", profile);
        setProfile(profile);
        getUserTweets({ userId: profile.id })
          .then((tweets) => {
            console.log("tweets from user: ", tweets);
            setUserTweets(tweets);
          })
          .catch((error) => {
            setError(`Error occurred: ${error}`);
            console.error(error);
          });
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingProfile(false);
      });
  }, []);

  return (
    <div>
      {profile && !loadingProfile ? (
        <div className="px-2">
          {/* TODO: we could create another component that receieves a button here as children and renders that */}
          {/* for user it would be follow/unfollow and for profile would be the edit button */}
          <div className="mb-8 mt-8 flex justify-between items-center">
            <img
              className="w-32 h-32 rounded-full"
              src={profile.avatar_url || "/src/assets/profile.svg"}
              alt="profile avatar"
            />
            <div>
              <button
                onClick={() => navigate("/profile/edit")}
                className="border rounded-lg p-3 text-blue-300 hover:bg-slate-300 hover:text-blue-800 "
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div>
            <ProfileDetails profile={profile} />
          </div>

          <div className="mt-4 px-2">
            <TweetsList
              tweets={userTweets}
              loadingTweets={loadingProfile}
              error={error}
              fetchTweets={fetchUserTweets}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileContainer;
