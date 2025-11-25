import { useState, useEffect } from "react";
import { getUser, getUserTweets } from "../../../services/userService";
import { useParams } from "react-router-dom";
import { followUser, unfollowUser, isUserFollowing } from "../../../services/followsService";
import { getCurrentUserId } from "../../../helpers/userHelper";

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

  const currentUserId = getCurrentUserId();
  const { userIdParam } = useParams<{ userIdParam: string }>();

  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followId, setFollowId] = useState<number | null>(null);

  useEffect(() => {
    if (currentUserId && userIdParam) {
      isUserFollowing({ followerId: currentUserId, followedId: Number(userIdParam) })
        .then((response) => {
          setIsFollowing(response.following);
          setFollowId(response.follow_id);
          console.log("is following response: ", response);
        })
        .catch((error) => {
          console.error("Error checking follow status: ", error);
        });
    }
  }, [currentUserId, userIdParam]);

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
            {isFollowing
              ? followId && <button onClick={() => unfollowUser({ followId: followId })}>Unfollow User</button>
              : currentUserId && (
                  <button onClick={() => followUser({ followerId: currentUserId, followedId: user.id })}>
                    Follow User
                  </button>
                )}
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
