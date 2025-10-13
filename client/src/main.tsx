import ReactDOM from "react-dom/client";
import Login from "./components/pages/auth/Login.tsx";
import SignUp from "./components/pages/auth/SignUp.tsx";
import { Theme } from "@radix-ui/themes";
import FeedTweetsPage from "./components/pages/feed_tweets/FeedTweetsPage.tsx";
import ProfilePage from "./components/pages/profile/ProfilePage.tsx";
import BookmarksPage from "./components/pages/bookmarks/BookmarksPage.tsx";
import MessagesPage from "./components/pages/messages/MessagesPage.tsx";
import AllTweetsPage from "./components/pages/all_tweets/AllTweetsPage.tsx";
import HashtagsPage from "./components/pages/hashtags/HashtagsPage.tsx";
import HashtagTweetsPage from "./components/pages/hashtags/HashtagTweetsPage.tsx";
import AllUsersPage from "./components/pages/all_users/AllUsersPage.tsx";
import NotificationsPage from "./components/pages/notifications/NotificationsPage.tsx";
import TweetPage from "./components/TweetPage.tsx";
import UserPage from "./components/pages/user/UserPage.tsx";
import RequireAuth from "./components/RequireAuth";
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
      <RequireAuth>
        <Theme>
          <TweetPage />
        </Theme>
      </RequireAuth>
    ),
  },
  {
    path: "tweets",
    element: (
      <RequireAuth>
        <Theme>
          <FeedTweetsPage />
        </Theme>
      </RequireAuth>
    ),
  },
  {
    path: "explore",
    element: (
      <Theme>
        <HashtagsPage />
      </Theme>
    ),
  },
  {
    path: "explore/:hashtagIdParam",
    element: (
      <Theme>
        <HashtagTweetsPage />
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
      <RequireAuth>
        <Theme>
          <ProfilePage />
        </Theme>
      </RequireAuth>
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
      <RequireAuth>
        <Theme>
          <BookmarksPage />
        </Theme>
      </RequireAuth>
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
