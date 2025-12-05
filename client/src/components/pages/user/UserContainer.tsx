import { useState, useEffect } from "react";
import { getUser, getUserTweets } from "../../../services/userService";
import { useParams } from "react-router-dom";
import { followUser, unfollowUser, isUserFollowing } from "../../../services/followsService";
import { getCurrentUserId } from "../../../helpers/userHelper";
import ProfileDetails from "../../ProfileDetails";
import UserActionButton from "../../UserActionButton";
import TweetsList from "../../TweetsList";
import { Profile } from "../../../types/Profile";
import ActionButton from "../../ActionButton";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  if (userIdParam && currentUserId && Number(userIdParam) === currentUserId) {
    navigate("/profile");
  }

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

  const [user, setUser] = useState<Profile | null>(null);
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

  const handleFollow = () => {
    if (!currentUserId || !user) return;
    followUser({ followerId: currentUserId, followedId: user.id })
      .then((response) => {
        setIsFollowing(true);
        setFollowId(response.id);
      })
      .catch((error) => {
        console.error("Error following user: ", error);
      });
  };

  const handleUnfollow = () => {
    if (!followId) return;
    unfollowUser({ followId })
      .then(() => {
        setIsFollowing(false);
        setFollowId(null);
      })
      .catch((error) => {
        console.error("Error unfollowing user: ", error);
      });
  };

  return (
    <div>
      {user && !loadingUser ? (
        <div className="px-2">
          <UserActionButton user={user}>
            <ActionButton
              onClick={() => {
                isFollowing ? handleUnfollow() : handleFollow();
              }}
            >
              {isFollowing ? "Unfollow User" : "Follow User"}
            </ActionButton>
          </UserActionButton>

          <div>
            <ProfileDetails profile={user} />
          </div>

          <div className="mt-4 px-2">
            <TweetsList
              tweets={userTweets}
              loadingTweets={loadingUserTweets}
              error={error}
              fetchTweets={() => fetchUserTweets(user.id)}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserContainer;
