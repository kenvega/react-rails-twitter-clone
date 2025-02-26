// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import TweetsList from './components/TweetsList'
import SignUp from "./components/SignUp.tsx";
import { Theme } from "@radix-ui/themes";
import MainContainer from "./components/MainContainer.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider"; // Import ThemeProvider

// import ErrorPage from "./error-page";
import "./index.css";
import "@radix-ui/themes/styles.css";

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
    element: (
      <Theme>
        <MainContainer />
      </Theme>
    ),
  },
  {
    path: "home",
    element: <p>hello</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode> // for now i'm not going to use StrictMode because it is causing doble requests and my effects are not used incorrectly. refs: https://react.dev/learn/synchronizing-with-effects#fetching-data --- https://stackoverflow.com/a/72238236
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
  // </React.StrictMode>,
);
