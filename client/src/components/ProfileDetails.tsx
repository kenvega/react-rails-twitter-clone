import Location from "../assets/location.svg?react";
import UrlLink from "../assets/link.svg?react";
import Calendar from "../assets/calendar.svg?react";
import { Profile } from "../types/Profile";

const formatJoinDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const ProfileDetails = ({ profile }: { profile: Profile }) => {
  return (
    <>
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

      <div className="flex gap-5 mt-3">
        <p>{profile.followed_users_count} Following</p>
        <p>{profile.follower_count} Followers</p>
      </div>
    </>
  );
};

export default ProfileDetails;
