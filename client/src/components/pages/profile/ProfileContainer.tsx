import { useState, useEffect } from "react";
import { getProfile } from "../../../services/userService";

interface Profile {
  id: number;
  email: string;
  display_name: string;
  bio: string;
  location: string;
  url: string;
  username: string;
  avatar_url: string;
}

const ProfileContainer = () => {
  useEffect(() => {
    fetchProfile();
  }, []);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = () => {
    return getProfile()
      .then((profile) => {
        console.log("profile: ", profile);
        setProfile(profile);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingProfile(false);
      });
  };

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
            <p>bio: {profile.bio}</p>
            <p>location: {profile.location}</p>
            <p>url: {profile.url}</p>
            {/* TODO: profile details: when did they joined, following and followers count */}
          </div>

          {/* TODO: tweets from your user */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileContainer;
