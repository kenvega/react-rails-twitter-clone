import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getValidJwt, clearJwt } from "../helpers/jwtHelper";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation(); // location is an object. location.pathname is for example "/tweets/22"
  const token = getValidJwt();

  // if token was not valid or not set then redirect to "/" so you can login
  if (!token) {
    clearJwt();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
