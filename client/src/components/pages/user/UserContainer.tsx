import { useState, useEffect } from "react";
import { getUser, getUserTweets } from "../../../services/userService";
import { useParams } from "react-router-dom";
import { followUser } from "../../../services/userService";
import { getDecodedJwt } from "../../../helpers/jwtHelper";

type User = {
  id: number;
  email: string;
  display_name: string;
  bio: string;
  location: string;
  url: string;
  username: string;
  avatar_url: string;
};

const UserContainer = () => {
  useEffect(() => {
    if (!userIdParam) return;
    const userId = Number(userIdParam);
    if (Number.isNaN(userId)) {
      setError("Invalid user id");
      setLoadingUser(false);
      return;
    }
    fetchUser(userId);
    fetchUserTweets(userId);
  }, []);

  let currentUserId: number;

  const decodedJwt = getDecodedJwt();
  if (decodedJwt) {
    currentUserId = decodedJwt.user_id;
  }

  const { userIdParam } = useParams<{ userIdParam: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const [userTweets, setUserTweets] = useState([]);
  const [loadingUserTweets, setLoadingUserTweets] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const fetchUser = (userId: number) => {
    return getUser({ userId })
      .then((user) => {
        console.log("user: ", user);
        setUser(user);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  };

  const fetchUserTweets = (userId: number) => {
    return getUserTweets({ userId })
      .then((userTweets) => {
        console.log("userTweets: ", userTweets);
        setUserTweets(userTweets);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingUserTweets(false);
      });
  };

  return (
    <div>
      {user && !loadingUser ? (
        <div className="px-2">
          <div className="mb-8 mt-8 flex justify-between">
            <img
              className="w-32 h-32 rounded-full"
              src={user.avatar_url || "/src/assets/profile.svg"}
              alt="user avatar"
            />
            <button onClick={() => followUser({ followerId: currentUserId, followedId: user.id })}>Follow User</button>
          </div>
          <div>
            <p className="text-xl font-bold">{user.display_name}</p>
            <p className="text-slate-400">@{user.username}</p>
            <p>bio: {user.bio}</p>
            <p>location: {user.location}</p>
            <p>url: {user.url}</p>
            {/* TODO: user details: when did they joined, following and followers count */}
          </div>

          {/* TODO: tweets from this user */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserContainer;
