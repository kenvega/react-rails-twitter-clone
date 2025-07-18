// import React from 'react'
import ReactDOM from "react-dom/client";
// import TweetsList from './components/TweetsList'
import Login from "./components/Login";
import SignUp from "./components/SignUp.tsx";
import { Theme } from "@radix-ui/themes";
import MainContainer from "./components/MainContainer.tsx";
import ProfileContainer from "./components/ProfileContainer.tsx";
import TweetPage from "./components/TweetPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";

// import ErrorPage from "./error-page";
import "./index.css";
import "@radix-ui/themes/styles.css";

const router = createBrowserRouter([
  // when already logged in, redirect to dashboard
  {
    path: "/",
    element: <Login />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/sign_up",
    element: <SignUp />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "tweets/:tweetIdParam",
    element: (
      <Theme>
        <TweetPage />
      </Theme>
    ),
  },
  {
    path: "home",
    element: (
      <Theme>
        <MainContainer />
      </Theme>
    ),
  },
  {
    path: "profile",
    element: (
      <Theme>
        <ProfileContainer />
      </Theme>
    ),
  },
  {
    path: "test_hello",
    element: <p>hello: you can put jsx directly here as well</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode> // for now i'm not going to use StrictMode because it is causing doble requests and my effects are not used incorrectly. refs: https://react.dev/learn/synchronizing-with-effects#fetching-data --- https://stackoverflow.com/a/72238236
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
  // </React.StrictMode>,
);
