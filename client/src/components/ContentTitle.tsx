import { useContext } from "react";
import { Link } from "react-router-dom";

import { getDecodedJwt } from "../helpers/jwtHelper";

import { ThemeContext } from "../context/ThemeProvider";

import MoonIcon from "../assets/moon.svg?react";
import SunIcon from "../assets/sun.svg?react";

const ContentTitle = ({ title }: { title?: string }) => {
  let username = null;

  const decodedJwt = getDecodedJwt();
  if (decodedJwt) {
    username = decodedJwt.username;
  }

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext is undefined");
  }

  const { darkMode, toggleDarkMode } = themeContext;

  return (
    <div className="flex justify-between items-center mb-3 px-2">
      {title ? (
        <div className="text-2xl font-semibold">{title}</div>
      ) : (
        <Link to="#" className="text-2xl font-semibold">
          <div>Hello {username}</div>
        </Link>
      )}
      <button onClick={toggleDarkMode}>
        {darkMode ? <MoonIcon className="w-8 h-8 dark:stroke-gray-400" /> : <SunIcon className="w-8 h-8" />}
      </button>
    </div>
  );
};

export default ContentTitle;
