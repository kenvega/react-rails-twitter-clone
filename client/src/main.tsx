import ReactDOM from "react-dom/client";
import Login from "./components/pages/auth/Login.tsx";
import SignUp from "./components/pages/auth/SignUp.tsx";
import { Theme } from "@radix-ui/themes";
import FeedTweetsPage from "./components/pages/feed_tweets/FeedTweetsPage.tsx";
import ProfilePage from "./components/pages/profile/ProfilePage.tsx";
import ProfileEditPage from "./components/pages/profile/ProfileEditPage.tsx";
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
import PageLayout from "./components/layout/PageLayout";
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
    element: (
      <RequireAuth>
        <PageLayout />
      </RequireAuth>
    ),
    children: [
      { path: "tweets/:tweetIdParam", element: <TweetPage /> },
      { path: "tweets", element: <FeedTweetsPage /> },
      { path: "tags", element: <HashtagsPage /> },
      { path: "tags/:hashtagIdentifier", element: <HashtagTweetsPage /> },
      { path: "table", element: <TweetsTablePage /> },
      { path: "all_tweets", element: <AllTweetsPage /> },
      { path: "all_users", element: <AllUsersPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/edit", element: <ProfileEditPage /> },
      { path: "users/:userIdParam", element: <UserPage /> },
      { path: "bookmarks", element: <BookmarksPage /> },
      { path: "channels", element: <MessagesPage /> },
    ],
    // errorElement: <ErrorPage />,
  },
  {
    path: "test_hello",
    element: <p>hello: you can put jsx directly here as well</p>,
  },
  // { path: "*", element: <ErrorPage /> }, // catch-all for everything else
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
