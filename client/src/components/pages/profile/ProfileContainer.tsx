import { useReducer, useEffect, useState } from "react";
import { getProfile, getUserTweets } from "../../../services/userService";
import TweetsList from "../../TweetsList";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../../types/Profile";
import ProfileDetails from "../../ProfileDetails";
import UserActionButton from "../../UserActionButton";
import ActionButton from "../../ActionButton";

type State = {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Profile }
  | { type: "LOAD_ERROR"; payload: string };

const initialState: State = {
  profile: null,
  loading: true,
  error: null,
};

function profileReducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };
    case "LOAD_SUCCESS":
      return { profile: action.payload, loading: false, error: null };
    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const ProfileContainer = () => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { profile, loading, error } = state;

  const [userTweets, setUserTweets] = useState([]);
  const navigate = useNavigate();

  const fetchUserTweets = () => {
    if (!profile) return Promise.resolve();
    return getUserTweets({ userId: profile.id })
      .then(setUserTweets)
      .catch((err) => console.error("Tweet error: ", err));
  };

  useEffect(() => {
    dispatch({ type: "LOAD_START" });

    getProfile()
      .then((profileData) => {
        dispatch({ type: "LOAD_SUCCESS", payload: profileData });

        return getUserTweets({ userId: profileData.id });
      })
      .then(setUserTweets)
      .catch((err) => {
        dispatch({ type: "LOAD_ERROR", payload: `Error occurred: ${err}` });
        console.error(err);
      });
  }, []);

  return (
    <div>
      {profile && !loading ? (
        <div className="px-2">
          <UserActionButton user={profile}>
            <ActionButton onClick={() => navigate("/profile/edit")}>Edit Profile</ActionButton>
          </UserActionButton>

          <ProfileDetails profile={profile} />

          <div className="mt-4 px-2">
            <TweetsList tweets={userTweets} loadingTweets={loading} error={error} fetchTweets={fetchUserTweets} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileContainer;
