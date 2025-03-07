import { useState, FormEvent } from "react";
import { requestSignUp } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // reset any possible previous error

    requestSignUp({
      user: {
        email: email,
        password: password,
        username: username,
        display_name: displayName,
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
    <div className="app flex justify-center py-12 dark:bg-gray-800 min-h-screen">
      <div>
        <h2 className="text-3xl font-bold mb-4 dark:text-slate-400">Twitter Clone made with React and Rails</h2>
        <h4 className="text-xl text-gray-700 mb-4 dark:text-gray-500">To see tweets you can sign up or log in</h4>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-3">
            <div className="w-full">
              <p className="dark:text-gray-300">Email</p>
              <input
                type="text"
                className="border rounded-md mt-2 mb-4 py-1.5 px-3 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="dark:text-gray-300">Username</p>
              <input
                type="text"
                className="border rounded-md mt-2 mb-4 py-1.5 px-3 w-full"
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="dark:text-gray-300">Display Name</p>
              <input
                type="text"
                className="border rounded-md mt-2 mb-4 py-1.5 px-3 w-full"
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <p className="dark:text-gray-300">Password</p>
              <input
                type="password"
                className="border rounded-md mt-2 py-1.5 px-3 w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="mt-2 dark:text-gray-300">Avatar</p>

              {error && <div style={{ color: "red" }}>{error}</div>}
              <button type="submit" className="btn-twitter mt-6">
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <Link className="dark:text-gray-300" to="/">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
