import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../../services/userService";
// import { useNavigate } from "react-router-dom";
import { Profile } from "../../../types/Profile";

type ProfileForm = {
  username: string;
  display_name: string;
  bio: string;
  location: string;
  url: string;
  avatarFile: File | null;
};

const ProfileEditContainer = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ProfileForm>({
    username: "",
    display_name: "",
    bio: "",
    location: "",
    url: "",
    avatarFile: null,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setForm((prev) => ({ ...prev, avatarFile: file }));
  };

  // const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((profile) => {
        console.log("profile: ", profile);
        setProfile(profile);
        setForm({
          username: profile.username ?? "",
          display_name: profile.display_name ?? "",
          bio: profile.bio ?? "",
          location: profile.location ?? "",
          url: profile.url ?? "",
          avatarFile: null,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profile) {
      return;
    }

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("display_name", form.display_name);
    formData.append("bio", form.bio);
    formData.append("location", form.location);
    formData.append("url", form.url);
    // formData.append("avatar", form.avatar);

    // console.log("formData: ", JSON.stringify(Object.fromEntries(formData)));

    updateProfile(formData)
      .then(() => {
        // navigate("/profile");
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      });
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
              placeholder="Place your username here"
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
              value={form.username}
              onChange={handleTextChange}
            />
            <label htmlFor="display_name">Display Name:</label>
            <input
              type="text"
              id="display_name"
              name="display_name"
              placeholder="Place your display name here"
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
              value={form.display_name}
              onChange={handleTextChange}
            />
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Place your bio here"
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
              value={form.bio}
              onChange={handleTextChange}
            />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Place your location here"
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
              value={form.location}
              onChange={handleTextChange}
            />
            <label htmlFor="url">Website:</label>
            <input
              type="text"
              id="url"
              name="url"
              placeholder="Place your website URL here"
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
              value={form.url}
              onChange={handleTextChange}
            />
            <label htmlFor="avatar">Avatar:</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              className="block border border-slate-300 rounded-md p-2 mb-4 w-full text-gray-950"
              onChange={handleFileChange}
            />
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
              Save Changes
            </button>
          </form>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileEditContainer;
