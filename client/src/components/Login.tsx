import { useState, FormEvent } from "react";
import { requestLogin } from "../services/loginService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("username: ", username);
    console.log("password: ", password);

    requestLogin({
      user: {
        email: username,
        password: password,
      },
    })
      .then(() => {
        // TODO: should redirect or something
      })
      .catch(() => {
        // TODO: should show errors like invalid credentials or something
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>username</p>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <p>password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
