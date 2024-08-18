import { useState, useEffect } from "react";
import { getTweets, createTweet } from "../services/tweetsService";

import { Link } from "react-router-dom";

import TweetForm from "./TweetForm";
import TweetsList from "./TweetsList";

import { Tweet } from "../interfaces/Tweet";

const TweetsContainer = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [tweetBody, setTweetBody] = useState("");

  const fetchTweets = () => {
    getTweets()
      .then((tweets) => {
        console.log("response tweets: ", tweets);
        setTweets(tweets);
      })
      .catch((error) => {
        setError(`Error ocurred: ${error}`);
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
      <Link to="#" className="text-2xl font-semibold">
        <div className="mb-4">Home</div>
      </Link>
      <TweetForm tweetBody={tweetBody} setTweetBody={setTweetBody} onSubmit={handleFormSubmit} />
      <TweetsList tweets={tweets} loading={loading} error={error} />
    </div>
  );
};

export default TweetsContainer;
