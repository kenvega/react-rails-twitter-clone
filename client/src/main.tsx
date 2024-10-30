// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import TweetsList from './components/TweetsList'
import SignUp from "./components/SignUp.tsx";
import MainContainer from "./components/MainContainer.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ErrorPage from "./error-page";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/sign_up",
    element: <SignUp />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "dashboard",
    element: <MainContainer />,
  },
  {
    path: "home",
    element: <p>hello</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode> // for now i'm not going to use StrictMode because it is causing doble requests and my effects are not used incorrectly. refs: https://react.dev/learn/synchronizing-with-effects#fetching-data --- https://stackoverflow.com/a/72238236
  <RouterProvider router={router} />
  // </React.StrictMode>,
);
