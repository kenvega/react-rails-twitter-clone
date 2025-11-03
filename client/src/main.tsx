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
import TweetsTablePage from "./components/pages/tweets_table/TweetsTablePage.tsx";
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
        <TweetPage />
      </RequireAuth>
    ),
  },
  {
    path: "tweets",
    element: (
      <RequireAuth>
        <FeedTweetsPage />
      </RequireAuth>
    ),
  },
  {
    path: "explore",
    element: (
      <RequireAuth>
        <HashtagsPage />
      </RequireAuth>
    ),
  },
  {
    path: "explore/:hashtagIdParam",
    element: (
      <RequireAuth>
        <HashtagTweetsPage />
      </RequireAuth>
    ),
  },
  {
    path: "table",
    element: (
      <RequireAuth>
        <TweetsTablePage />
      </RequireAuth>
    ),
  },
  {
    path: "all_tweets",
    element: (
      <RequireAuth>
        <AllTweetsPage />
      </RequireAuth>
    ),
  },
  {
    path: "all_users",
    element: (
      <RequireAuth>
        <AllUsersPage />
      </RequireAuth>
    ),
  },
  {
    path: "notifications",
    element: (
      <RequireAuth>
        <NotificationsPage />
      </RequireAuth>
    ),
  },

  {
    path: "profile",
    element: (
      <RequireAuth>
        <ProfilePage />
      </RequireAuth>
    ),
  },
  {
    path: "users/:userIdParam",
    element: (
      <RequireAuth>
        <UserPage />
      </RequireAuth>
    ),
  },
  {
    path: "bookmarks",
    element: (
      <RequireAuth>
        <BookmarksPage />
      </RequireAuth>
    ),
  },
  {
    path: "channels",
    element: (
      <RequireAuth>
        <MessagesPage />
      </RequireAuth>
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
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </ThemeProvider>
  // </React.StrictMode>,
);
