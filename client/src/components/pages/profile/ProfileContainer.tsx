import { useState, useEffect } from "react";
import { getProfile, getUserTweets } from "../../../services/userService";
import Location from "../../../assets/location.svg?react";
import UrlLink from "../../../assets/link.svg?react";
import Calendar from "../../../assets/calendar.svg?react";
import TweetsList from "../../TweetsList";

type Profile = {
  id: number;
  email: string;
  display_name: string;
  bio: string;
  location: string;
  url: string;
  username: string;
  avatar_url: string;
  created_at: string;
};

const formatJoinDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const ProfileContainer = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  console.log("profile: ", profile);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
          <div className="mb-8 mt-8 flex justify-between">
            <img
              className="w-32 h-32 rounded-full"
              src={profile.avatar_url || "/src/assets/profile.svg"}
              alt="profile avatar"
            />
            {/* TODO: the edit profile button should be here */}
            <button>Edit Profile</button>
          </div>
          <div>
            <p className="text-xl font-bold">{profile.display_name}</p>
            <p className="text-slate-400">@{profile.username}</p>
            <p className="mb-4">{profile.bio}</p>
            <div className="flex gap-3">
              <p className="flex items-center gap-1">
                <Location className="w-4 h-4" /> <span className="text-slate-400">{profile.location}</span>
              </p>
              <p className="flex items-center gap-1">
                <UrlLink className="w-4 h-4" /> <a href={profile.url}>{profile.url}</a>
              </p>
              <p className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />{" "}
                <span className="text-slate-400">Joined on {formatJoinDate(profile.created_at)}</span>
              </p>
            </div>

            {/* TODO: profile details: following and followers count */}
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
