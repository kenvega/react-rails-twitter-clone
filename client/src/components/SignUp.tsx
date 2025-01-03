import { useState, FormEvent } from "react";
import { requestLogin } from "../services/loginService";
import { useNavigate, Link } from "react-router-dom";
import FilePicker from "./FilePicker";

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const fileInputRef = useRef(null);

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

  // const handleAvatarButtonClicked = () => {
  //   fileInputRef.current.click();
  // };

  return (
    <div className="app flex justify-center py-12">
      <div>
        <h2 className="text-3xl font-bold mb-4">Twitter Clone made with React and Rails</h2>
        <h4 className="text-xl text-gray-700">To see tweets you can sign up or log in</h4>
        <form onSubmit={handleSubmit}>
          <div className="flex">
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
              <p className="mt-2">Avatar</p>
              <FilePicker />
              {/* <button
                onClick={handleAvatarButtonClicked}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Choose File
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" /> */}
              {error && <div style={{ color: "red" }}>{error}</div>}
              <button type="submit" className="btn-twitter mt-4">
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <Link to="/">Log in</Link>
      </div>
    </div>
  );
}

export default SignUp;
