import { setJwt, clearJwt } from "../helpers/jwtHelper";
import { NavigateFunction } from "react-router-dom";

interface LoginCredentials {
  user: {
    email: string;
    password: string;
  };
}

const requestLogin = async (credentials: LoginCredentials) => {
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  console.log("response de login: ", response);

  // TODO: should show a notification or flash message that credentials are not correct?
  // or maybe just show what the backend responds (?) or maybe just show a template message based on the error code like 401

  if (!response.ok) {
    // errors thrown have to be handled by catch() where this method is called
    throw new Error(`Login request failed with status: ${response.status}`);
  }

  const authHeader = response.headers.get("Authorization");
  if (!authHeader) {
    throw new Error("Authorization header is missing from the response.");
  }

  const jwt = authHeader.split(" ")[1];
  if (!jwt) {
    throw new Error("Authorization header is not in the expected format.");
  }

  setJwt(jwt);
};

const logout = ({ navigate }: { navigate: NavigateFunction }) => {
  clearJwt();
  navigate('/')
};

export { requestLogin, logout };
