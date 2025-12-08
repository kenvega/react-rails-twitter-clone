import { useState, useEffect } from "react";
import { getProfile } from "../services/userService";
import { Profile } from "../types/Profile";

const SidebarProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
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
  }, []);

  return (
    <div className="rounded-full px-6 py-2 flex items-center gap-5 mb-4">
      {profile ? <span>User ID: {profile.id}</span> : <span>Loading...</span>}
    </div>
  );
};

export default SidebarProfile;
