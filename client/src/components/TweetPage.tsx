import Sidebar from "./Sidebar";
import TweetContainer from "./TweetContainer";
import HashtagSidebar from "./HashtagSidebar";
import TweetReplyForm from "./TweetReplyForm";
import TweetReplies from "./TweetReplies";

import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import { Tweet } from "../interfaces/Tweet";

import { createReplyTweet, getReplyTweets } from "../services/tweetsService";

const TweetPage = () => {
  const [tweetBody, setTweetBody] = useState("");
  const [replyTweets, setReplyTweets] = useState<Tweet[]>([]);
  const [loadingReplyTweets, setLoadingReplyTweets] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { tweetIdParam } = useParams();

  const fetchReplyTweets = () => {
    return getReplyTweets({ tweetId: Number(tweetIdParam) })
      .then((replyTweets) => {
        console.log("response replyTweets: ", replyTweets);
        setReplyTweets(replyTweets);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingReplyTweets(false);
      });
  };

  useEffect(() => {
    console.log("hello from useEFfect on tweetPage");
    fetchReplyTweets();
  }, []);

  const handleFormSubmit = () => {
    createReplyTweet({ tweetId: Number(tweetIdParam), tweetBody: tweetBody }).then(() => {
      fetchReplyTweets();
      setTweetBody("");
    });
  };

  return (
    <div className="py-4 min-h-screen dark:bg-gray-800">
      <div className="flex flex-row max-w-7xl mx-auto">
        <div className="basis-1/5">
          <Sidebar />
        </div>

        <div className="basis-3/5">
          <TweetContainer />
          <TweetReplyForm tweetBody={tweetBody} setTweetBody={setTweetBody} onSubmit={handleFormSubmit} />

          <TweetReplies replyTweets={replyTweets} />
        </div>

        <div className="basis-1/5">
          <HashtagSidebar />
        </div>
      </div>
    </div>
  );
};

export default TweetPage;
