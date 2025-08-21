import Sidebar from "./Sidebar";
import TweetContainer from "./TweetContainer";
import HashtagSidebar from "./HashtagSidebar";
import TweetReplyForm from "./TweetReplyForm";

import { useState } from "react";

import { createReplyTweet, fetchReplyTweets } from "../services/tweetsService";

const TweetPage = () => {
  const [tweetBody, setTweetBody] = useState("");

  const handleFormSubmit = () => {
    createReplyTweet({ tweetBody }).then(() => {
      fetchReplyTweets(); // tendrias que enviar el id, o quizas hacer un fetch de nuevo a todo el tweet con replies?
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

          {/* <TweetReplyForm /> */}
          {/* TweetReplies (?) */}
        </div>

        <div className="basis-1/5">
          <HashtagSidebar />
        </div>
      </div>
    </div>
  );
};

export default TweetPage;
