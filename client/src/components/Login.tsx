import { useState, FormEvent } from "react";
import { requestLogin } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // reset any possible previous error

    requestLogin({
      user: {
        email: username,
        password: password,
      },
    })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        setError(error.message || "An error occurred. Please try again.");
      });
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit}>
        <div className="flex mb-3">
          <div className="w-full">
            <p>Email</p>
            <input
              type="text"
              className="border rounded-md mt-2 mb-4 py-1.5 px-3 w-full"
              onChange={(e) => setUsername(e.target.value)}
            />
            <p>Password</p>
            <input
              type="password"
              className="border rounded-md mt-2 py-1.5 px-3 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button type="submit" className="btn-twitter mt-4">
              Log in
            </button>
          </div>
        </div>
      </form>
      <Link to="/sign_up">Sign up</Link>
    </div>
  );
};

export default Login;
