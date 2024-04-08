import { useState, FormEvent } from "react";
import { requestLogin } from "../services/loginService";
import { useNavigate } from 'react-router-dom';

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
        navigate('/dashboard')
      })
      .catch((error) => {
        setError(error.message || "An error occurred. Please try again.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>username</p>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <p>password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
