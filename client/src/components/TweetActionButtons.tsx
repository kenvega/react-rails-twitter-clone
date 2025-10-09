import { Link } from "react-router-dom";
import { Tweet } from "../types/Tweet";
import LoadingIcon from "../assets/loading.svg?react";

type TweetActionButtonsProps = {
  tweet: Tweet;
  isActionLoading: boolean;
  activeAction: string;
  activeTweetId: number | null;
  onLike: (tweetId: number) => void;
  onDislike: (tweetId: number) => void;
  onBookmark: (tweetId: number) => void;
  onClearBookmark: (tweetId: number) => void;
  onRetweet: (tweetId: number) => void;
  onUnRetweet: (tweetId: number) => void;
  onNavigateToTweet: (tweetId: number) => void;
};

const TweetActionButtons = ({
  tweet,
  isActionLoading,
  activeAction,
  activeTweetId,
  onLike,
  onDislike,
  onBookmark,
  onClearBookmark,
  onRetweet,
  onUnRetweet,
  onNavigateToTweet,
}: TweetActionButtonsProps) => {
  return (
    <div className="flex justify-between">
      {/* Some example link – adapt to your actual usage */}
      <div>
        <Link to="/dashboard" className="flex">
          <img src="/src/assets/chart.svg" className="w-4 mr-2" />
          <span>14</span>
        </Link>
      </div>

      {/* replies to tweet button */}
      <div>
        <button className="flex cursor-pointer" onClick={() => onNavigateToTweet(tweet.id)}>
          <img src="/src/assets/chat.svg" className="w-4 mr-2" />
          <span>{tweet.reply_tweets_count}</span>
        </button>
      </div>

      {/* retweet/unretweet button */}
      <div className="flex items-center">
        <button
          disabled={isActionLoading}
          className="flex cursor-pointer"
          onClick={() => (tweet.tweet_retweeted_by_current_user ? onUnRetweet(tweet.id) : onRetweet(tweet.id))}
        >
          <img
            src={
              tweet.tweet_retweeted_by_current_user
                ? "/src/assets/retweet-filled.svg"
                : "/src/assets/retweet-unfilled.svg"
            }
            className={`w-4 mr-2 ${
              isActionLoading && activeTweetId === tweet.id && activeAction === "retweet" ? "opacity-50" : ""
            }`}
            alt="retweet icon"
          />
          <span>{tweet.retweets_count}</span>
        </button>
        {isActionLoading && activeTweetId === tweet.id && activeAction === "retweet" ? (
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
          onClick={() => (tweet.tweet_liked_by_current_user ? onDislike(tweet.id) : onLike(tweet.id))}
        >
          <img
            src={tweet.tweet_liked_by_current_user ? "/src/assets/heart-filled.svg" : "/src/assets/heart-unfilled.svg"}
            className={`w-4 mr-2 ${
              isActionLoading && activeTweetId === tweet.id && activeAction === "like" ? "opacity-50" : ""
            }`}
            alt="like icon"
          />
          <span>{tweet.likes_count}</span>
        </button>
        {isActionLoading && activeTweetId === tweet.id && activeAction === "like" ? (
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
          onClick={() => (tweet.tweet_bookmarked_by_current_user ? onClearBookmark(tweet.id) : onBookmark(tweet.id))}
        >
          <img
            src={
              tweet.tweet_bookmarked_by_current_user
                ? "/src/assets/bookmark-filled.svg"
                : "/src/assets/bookmark-unfilled.svg"
            }
            className={`w-4 mr-2 ${
              isActionLoading && activeTweetId === tweet.id && activeAction === "bookmark" ? "opacity-50" : ""
            }`}
            alt="bookmark icon"
          />
        </button>
        {isActionLoading && activeTweetId === tweet.id && activeAction === "bookmark" ? (
          <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
        ) : (
          <div className="w-3 h-3 ml-3" />
        )}
      </div>
    </div>
  );
};

export default TweetActionButtons;
