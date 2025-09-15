import { useState, useEffect, useContext } from "react";
import { getTweets, createTweet } from "../../../services/tweetsService";

import TweetForm from "../../TweetForm";
import TweetsList from "../../TweetsList";

import { Tweet } from "../../../interfaces/Tweet";

import { ThemeContext } from "../../../context/ThemeProvider";

const AllTweetsContainer = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loadingTweets, setLoadingTweets] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [tweetBody, setTweetBody] = useState("");

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext is undefined");
  }

  const fetchTweets = () => {
    return getTweets()
      .then((tweets) => {
        console.log("response tweets: ", tweets);
        setTweets(tweets);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingTweets(false);
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

  // TODO: agregar un loading para cuando se esta creando el tweet supongo
  //        seria bueno que sea dentro del input al que le diste enter
  return (
    <div>
      <TweetForm tweetBody={tweetBody} setTweetBody={setTweetBody} onSubmit={handleFormSubmit} />
      <TweetsList tweets={tweets} loadingTweets={loadingTweets} error={error} fetchTweets={fetchTweets} />
    </div>
  );
};

export default AllTweetsContainer;
