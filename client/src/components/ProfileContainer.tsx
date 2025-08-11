import { useState, useEffect } from "react";
import { getProfile } from "../services/userService";

interface Profile {
  id: number;
  email: string;
  display_name: string;
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
    // TODO: backend for this route needed
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
      <h1 className="text-2xl font-semibold mb-3 px-2">Profile</h1>

      <p>{profile.email}</p>
    </div>
  );
};

export default ProfileContainer;
