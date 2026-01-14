import TweetContainer from "./TweetContainer";
import TweetReplyForm from "./TweetReplyForm";
import TweetReplies from "./TweetReplies";

import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import { Tweet } from "../types/Tweet";

import { createReplyTweet, getReplyTweets } from "../services/tweetsService";

const TweetPage = () => {
  const [tweetBody, setTweetBody] = useState("");
  const [replyTweets, setReplyTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { tweetIdParam } = useParams();

  const fetchReplyTweets = () => {
    setLoading(true);
    return getReplyTweets({ tweetId: Number(tweetIdParam) })
      .then((replyTweets) => {
        setReplyTweets(replyTweets);
      })
      .catch((error) => {
        console.error(error);
        setError(`Error occurred: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("hello from useEFfect on tweetPage");
    fetchReplyTweets();
    // TODO: fix the dependency array
  }, []);

  const handleFormSubmit = () => {
    setError(null);
    createReplyTweet({ tweetId: Number(tweetIdParam), tweetBody: tweetBody }).then(() => {
      fetchReplyTweets();
      setTweetBody("");
    });
  };

  return (
    <>
      <TweetContainer />
      <TweetReplyForm
        tweetBody={tweetBody}
        setTweetBody={setTweetBody}
        onSubmit={handleFormSubmit}
        loading={loading}
        error={error}
      />
      <TweetReplies replyTweets={replyTweets} loading={loading} />
    </>
  );
};

export default TweetPage;
