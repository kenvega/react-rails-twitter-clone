import { useNavigate } from "react-router-dom";
import { logout } from "../services/loginService";

const Logout = () => {
  const navigate = useNavigate();

  return (
    <a
      className="px-6 text-sky-400 font-medium cursor-pointer"
      onClick={() => {
        logout({ navigate });
      }}
    >
      Log out
    </a>
  );
};

export default Logout;
