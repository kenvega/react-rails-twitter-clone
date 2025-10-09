import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTweet } from "../services/tweetsService";
import { Tweet } from "../types/Tweet";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/back.svg?react";
import { formatToTimeMMMddYYYY } from "../helpers/dateUtils";
import {
  bookmarkTweet,
  clearBookmarkTweet,
  likeTweet,
  dislikeTweet,
  retweetTweet,
  clearRetweetTweet,
} from "../services/tweetsService";

import LoadingIcon from "../assets/loading.svg?react";

type ActionType = "like" | "bookmark" | "retweet";

const TweetContainer = () => {
  const navigate = useNavigate();

  const { tweetIdParam } = useParams();
  const tweetId = Number(tweetIdParam);

  const [tweet, setTweet] = useState<Tweet | null>(null);
  console.log("tweet: ", tweet);

  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const [activeAction, setActiveAction] = useState<string>("");

  useEffect(() => {
    fetchTweet({ tweetId });
  }, [tweetId]);

  const fetchTweet = ({ tweetId }: { tweetId: number }) => {
    return getTweet({ tweetId })
      .then((tweet) => {
        console.log("response tweet: ", tweet);
        setTweet(tweet);
      })
      .catch((error) => {
        // setError(`Error occurred: ${error}`);
        console.error(error);
      });
  };

  const runAction = async ({
    tweetId,
    actionType,
    actionFn,
  }: {
    tweetId: number;
    actionType: ActionType;
    actionFn: (args: { tweetId: number }) => Promise<void>;
  }) => {
    if (isActionLoading) return;

    setIsActionLoading(true);
    setActiveAction(actionType);

    try {
      await actionFn({ tweetId });
      await fetchTweet({ tweetId });
    } finally {
      setIsActionLoading(false);
      setActiveAction("");
    }
  };

  const handleRetweetClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "retweet", actionFn: retweetTweet });

  const handleUnRetweetClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "retweet", actionFn: clearRetweetTweet });

  const handleLikeClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "like", actionFn: likeTweet });

  const handleDislikeClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "like", actionFn: dislikeTweet });

  const handleBookmarkClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "bookmark", actionFn: bookmarkTweet });

  const handleClearBookmarkClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "bookmark", actionFn: clearBookmarkTweet });

  if (!tweet) {
    return <p>Loading tweet...</p>;
  }

  const tweetBodyWithHashtagsHighlighted = tweet.body.split(" ").reduce<React.ReactNode[]>((nodes, word, index) => {
    if (index > 0) nodes.push(" ");
    if (word.startsWith("#")) {
      nodes.push(
        <Link
          key={`tweet-${tweet.id}-tag-${index}`}
          to={`/tags/${word.slice(1)}`}
          className="text-blue-400 hover:underline"
        >
          {word}
        </Link>
      );
    } else {
      nodes.push(word);
    }
    return nodes;
  }, []);

  return (
    <div>
      {/* Go back button and title */}
      <div>
        <div className="flex mb-4">
          <button onClick={() => navigate("/tweets")}>
            <BackIcon />
          </button>
          <span className="ml-5 font-bold text-xl">Tweet</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex border-b mb-6 pt-4 pl-4 pr-4 pb-7">
        {/* Avatar */}
        <div>
          {tweet.user.avatar_url ? (
            <img
              src={tweet.user.avatar_url}
              className="w-16 rounded-full aspect-square overflow-hidden"
              alt="user avatar"
            />
          ) : (
            <img src="/src/assets/profile.svg" className="w-16 rounded-full" />
          )}
        </div>

        {/* Tweet text content and tweet action buttons */}
        <div className="ml-4 grow">
          {/* Tweet content */}
          <div>
            <p className="font-bold">{tweet.user.display_name}</p>
            <p className="text-gray-500">@{tweet.user.username} </p>
            <p className="mb-3 text-3xl">{tweetBodyWithHashtagsHighlighted}</p>
            <p className="text-gray-500">{formatToTimeMMMddYYYY(tweet.created_at)}</p>
          </div>

          {/* TODO: possibly use the component TweetActionButtons */}
          {/* Tweet action buttons */}
          <div className="flex justify-evenly mt-5">
            {/* replies to tweet button */}
            <div>
              <button className="flex cursor-pointer" onClick={() => {}}>
                <img src="/src/assets/chat.svg" alt="chat icon" className="w-4 mr-2" />
                <span>14</span>
              </button>
            </div>

            {/* retweet/unretweet button */}
            <div className="flex items-center">
              <button
                disabled={isActionLoading}
                className="flex cursor-pointer"
                onClick={() => {
                  tweet.tweet_retweeted_by_current_user
                    ? handleUnRetweetClick({ tweetId: tweet.id })
                    : handleRetweetClick({ tweetId: tweet.id });
                }}
              >
                <img
                  src={
                    tweet.tweet_retweeted_by_current_user
                      ? "/src/assets/retweet-filled.svg"
                      : "/src/assets/retweet-unfilled.svg"
                  }
                  className={`w-4 mr-2 ${isActionLoading && activeAction === "retweet" ? "opacity-50" : ""}`}
                  alt="retweet icon"
                />
                <span>{tweet.retweets_count}</span>
              </button>
              {isActionLoading && activeAction === "retweet" ? (
                <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
              ) : (
                <div className="w-3 h-3 ml-3" />
              )}
            </div>

            {/* like/dislike button */}
            <div className="flex items-center">
              <button
                disabled={isActionLoading}
                className="flex cursor-pointer"
                onClick={() => {
                  tweet.tweet_liked_by_current_user
                    ? handleDislikeClick({ tweetId: tweet.id })
                    : handleLikeClick({ tweetId: tweet.id });
                }}
              >
                <img
                  src={
                    tweet.tweet_liked_by_current_user
                      ? "/src/assets/heart-filled.svg"
                      : "/src/assets/heart-unfilled.svg"
                  }
                  className={`w-4 mr-2 ${isActionLoading && activeAction === "like" ? "opacity-50" : ""}`}
                  alt="like icon"
                />
                <span>{tweet.likes_count}</span>
              </button>
              {isActionLoading && activeAction === "like" ? (
                <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
              ) : (
                <div className="w-3 h-3 ml-3" />
              )}
            </div>

            {/* bookmark/unbookmark button */}
            <div className="flex items-center">
              <button
                disabled={isActionLoading}
                className="flex cursor-pointer"
                onClick={() => {
                  tweet.tweet_bookmarked_by_current_user
                    ? handleClearBookmarkClick({ tweetId: tweet.id })
                    : handleBookmarkClick({ tweetId: tweet.id });
                }}
              >
                <img
                  src={
                    tweet.tweet_bookmarked_by_current_user
                      ? "/src/assets/bookmark-filled.svg"
                      : "/src/assets/bookmark-unfilled.svg"
                  }
                  className={`w-4 mr-2 ${isActionLoading && activeAction === "bookmark" ? "opacity-50" : ""}`}
                  alt="bookmark icon"
                />
              </button>
              {isActionLoading && activeAction === "bookmark" ? (
                <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
              ) : (
                <div className="w-3 h-3 ml-3" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetContainer;
