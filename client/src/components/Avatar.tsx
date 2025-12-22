import { useNavigate } from "react-router-dom";
import { User } from "../types/User";

type AvatarProps = {
  user: User;
};

const Avatar = ({ user }: AvatarProps) => {
  const navigate = useNavigate();
  return (
    <div className="cursor-pointer" onClick={() => navigate(`/users/${user.id}`)}>
      <img
        src={user.avatar_url || "/src/assets/profile.svg"}
        className={`w-16 rounded-full ${user.avatar_url ? "aspect-square overflow-hidden" : ""}`}
        alt="user avatar"
      />
    </div>
  );
};

export default Avatar;
