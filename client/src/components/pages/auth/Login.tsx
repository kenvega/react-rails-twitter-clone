import { useState, FormEvent } from "react";
import { requestLogin } from "../../../services/authService";
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
        navigate("/tweets");
      })
      .catch((error) => {
        setError(error.message || "An error occurred. Please try again.");
      });
  };

  return (
    <div className="flex min-h-screen justify-center pt-12 pb-12 dark:bg-gray-800">
      <div>
        <h2 className="text-3xl font-bold mb-4 dark:text-slate-400">Twitter Clone made with React and Rails</h2>
        <h4 className="text-xl text-gray-700 dark:text-gray-500">To see tweets you can sign up or log in</h4>
        <div className="mt-6">
          <form onSubmit={handleSubmit}>
            <div className="flex mb-3">
              <div className="w-full">
                <p className="dark:text-gray-300">Email</p>
                <input
                  type="text"
                  className="border rounded-md mt-2 mb-4 py-1.5 px-3 w-full"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="dark:text-gray-300">Password</p>
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
          <Link className="dark:text-gray-300" to="/sign_up">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
