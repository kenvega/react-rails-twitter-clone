import { useState, useEffect } from "react";
import { getProfile, getUserTweets } from "../../../services/userService";
import TweetsList from "../../TweetsList";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../../types/Profile";
import ProfileDetails from "../../ProfileDetails";
import UserActionButton from "../../UserActionButton";

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
          <UserActionButton user={profile}>
            <button
              onClick={() => navigate("/profile/edit")}
              className="border rounded-lg p-3 text-blue-300 hover:bg-slate-300 hover:text-blue-800 "
            >
              Edit Profile
            </button>
          </UserActionButton>

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
