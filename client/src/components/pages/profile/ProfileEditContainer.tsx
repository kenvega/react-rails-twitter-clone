import { useState, useEffect } from "react";
import { getProfile } from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../../types/Profile";
// import Location from "../../../assets/location.svg?react";
// import UrlLink from "../../../assets/link.svg?react";
// import Calendar from "../../../assets/calendar.svg?react";

const ProfileEditContainer = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: call update profile service
    navigate("/profile");
  };

  return (
    <div>
      {profile && !loadingProfile ? (
        <div className="px-2">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={profile.username}
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
            />
            <label htmlFor="display_name">Display Name:</label>
            <input
              type="text"
              id="display_name"
              name="display_name"
              defaultValue={profile.display_name}
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
            />
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={profile.bio}
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
            />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={profile.location}
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
            />
            <label htmlFor="url">Website:</label>
            <input
              type="text"
              id="url"
              name="url"
              defaultValue={profile.url}
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
            />
            <label htmlFor="avatar">Avatar:</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
            />
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
              Save Changes
            </button>
          </form>
          {/* TODO: borrar. solo de referencia */}
          {/* <div className="mb-8 mt-8 flex justify-between items-center">
            <img
              className="w-32 h-32 rounded-full"
              src={profile.avatar_url || "/src/assets/profile.svg"}
              alt="profile avatar"
            />
          </div> */}
          {/* <div>
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
            </div>
          </div> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileEditContainer;
