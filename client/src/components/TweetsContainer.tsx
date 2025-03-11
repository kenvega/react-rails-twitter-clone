import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getTweets, createTweet } from "../services/tweetsService";
import { getDecodedJwt } from "../helpers/jwtHelper";

import TweetForm from "./TweetForm";
import TweetsList from "./TweetsList";

import { Tweet } from "../interfaces/Tweet";

import { ThemeContext } from "../context/ThemeProvider";

import MoonIcon from "../assets/moon.svg?react";
import SunIcon from "../assets/sun.svg?react";

const TweetsContainer = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  let username = null;

  const decodedJwt = getDecodedJwt();
  if (decodedJwt) {
    username = decodedJwt.username;
  }

  const [tweetBody, setTweetBody] = useState("");

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext is undefined");
  }

  const { darkMode, toggleDarkMode } = themeContext;

  const fetchTweets = () => {
    getTweets()
      .then((tweets) => {
        console.log("response tweets: ", tweets);
        setTweets(tweets);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handleFormSubmit = () => {
    createTweet({ tweetBody }).then(() => {
      fetchTweets();
      setTweetBody("");
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3 px-2">
        <Link to="#" className="text-2xl font-semibold">
          <div>Hello {username}</div>
        </Link>
        <button onClick={toggleDarkMode}>
          {darkMode ? <MoonIcon className="w-8 h-8 dark:stroke-gray-400" /> : <SunIcon className="w-8 h-8" />}
        </button>
      </div>

      <TweetForm tweetBody={tweetBody} setTweetBody={setTweetBody} onSubmit={handleFormSubmit} />
      <TweetsList tweets={tweets} loadingTweets={loading} error={error} />
    </div>
  );
};

export default TweetsContainer;
