import { useNavigate } from "react-router-dom";
import { logout } from "../services/loginService";

const Logout = () => {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => {
        logout({ navigate });
      }}
    >
      logout
    </a>
  );
};

export default Logout;
