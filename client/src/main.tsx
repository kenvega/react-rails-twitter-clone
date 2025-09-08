// import React from 'react'
import ReactDOM from "react-dom/client";
// import TweetsList from './components/TweetsList'
import Login from "./components/Login";
import SignUp from "./components/SignUp.tsx";
import { Theme } from "@radix-ui/themes";
import TweetsPage from "./components/TweetsPage.tsx";
import ProfilePage from "./components/ProfilePage.tsx";
import BookmarksPage from "./components/BookmarksPage.tsx";
import MessagesPage from "./components/MessagesPage.tsx";
import AllTweetsPage from "./components/AllTweetsPage.tsx";
import HashtagsPage from "./components/HashtagsPage.tsx";
import AllUsersPage from "./components/AllUsersPage.tsx";
import NotificationsPage from "./components/NotificationsPage.tsx";
import TweetPage from "./components/TweetPage.tsx";
import UserPage from "./components/UserPage.tsx";
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
    path: "tweets",
    element: (
      <Theme>
        <TweetsPage />
      </Theme>
    ),
  },
  {
    path: "hashtags",
    element: (
      <Theme>
        <HashtagsPage />
      </Theme>
    ),
  },
  {
    path: "all_tweets",
    element: (
      <Theme>
        <AllTweetsPage />
      </Theme>
    ),
  },
  {
    path: "all_users",
    element: (
      <Theme>
        <AllUsersPage />
      </Theme>
    ),
  },
  {
    path: "notifications",
    element: (
      <Theme>
        <NotificationsPage />
      </Theme>
    ),
  },

  {
    path: "profile",
    element: (
      <Theme>
        <ProfilePage />
      </Theme>
    ),
  },
  {
    path: "users/:userIdParam",
    element: (
      <Theme>
        <UserPage />
      </Theme>
    ),
  },
  {
    path: "bookmarks",
    element: (
      <Theme>
        <BookmarksPage />
      </Theme>
    ),
  },
  {
    path: "channels",
    element: (
      <Theme>
        <MessagesPage />
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
