import { useReducer, useEffect } from "react";
import { getProfile } from "../services/userService";
import { Profile } from "../types/Profile";
import { useNavigate } from "react-router-dom";

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

const SidebarProfile = () => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { profile, loading, error } = state;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "LOAD_START" });

    getProfile()
      .then((profile) => {
        dispatch({ type: "LOAD_SUCCESS", payload: profile });
        console.log("profile data on SidebarProfile: ", profile);
      })
      .catch((error) => {
        dispatch({ type: "LOAD_ERROR", payload: `Error occurred: ${error}` });
        // TODO: maybe throw an error and then catch it on a react component that shows an error (?)
        console.error(error);
      });
  }, []);

  if (error) {
    return <div>Error ocurred while loading the profile for sidebar</div>;
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div
      className="rounded-full pl-8 py-2 flex items-center cursor-pointer gap-5 mb-4"
      onClick={() => navigate("/profile")}
    >
      {profile ? (
        <div className="flex">
          <img
            className="w-12 h-12 rounded-full mr-3"
            src={profile.avatar_url || "/src/assets/profile.svg"}
            alt="profile avatar"
          />
          <div>
            <p className="font-bold text-lg">{profile.display_name}</p>
            <p>@{profile.username}</p>
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default SidebarProfile;
