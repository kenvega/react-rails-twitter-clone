import { Link } from "react-router-dom";
import LoadingIcon from "../assets/loading.svg?react";
import { Tweet } from "../interfaces/Tweet";
import { formatDate } from "../helpers/dateUtils"; // or wherever your date formatting lives

type TweetCardProps = {
  tweet: Tweet;
  loading: boolean;
  loadingAction: string;
  targetTweetId: number | null;
  onLike: (tweetId: number) => void;
  onDislike: (tweetId: number) => void;
  onBookmark: (tweetId: number) => void;
  onClearBookmark: (tweetId: number) => void;
  onRetweet: (tweetId: number) => void;
  onUnRetweet: (tweetId: number) => void;
  onNavigateToTweet: (tweetId: number) => void;
};

function TweetCard({
  tweet,
  loading,
  loadingAction,
  targetTweetId,
  onLike,
  onDislike,
  onBookmark,
  onClearBookmark,
  onRetweet,
  onUnRetweet,
  onNavigateToTweet,
}: TweetCardProps) {
  const formattedDate = formatDate(tweet.created_at);

  return (
    <div className="flex border-b mb-6 pt-4 pl-4 pr-4 pb-7">
      <div>
        <img
          src={tweet.user.avatar_url || "./src/assets/profile.svg"}
          className={`w-16 rounded-full ${tweet.user.avatar_url ? "aspect-square overflow-hidden" : ""}`}
          alt="user avatar"
        />
      </div>

      <div className="ml-4 grow">
        <p>
          <span className="font-bold">{tweet.user.display_name}</span>{" "}
          <span className="text-gray-500">
            @{tweet.user.username} · {formattedDate}
          </span>
        </p>

        <p className="mb-4">{tweet.body}</p>

        <div className="flex justify-between">
          {/* Some example link – adapt to your actual usage */}
          <div>
            <Link to="/dashboard" className="flex">
              <img src="./src/assets/chart.svg" className="w-4 mr-2" />
              <span>14</span>
            </Link>
          </div>

          {/* replies to tweet button */}
          <div>
            <button className="flex cursor-pointer" onClick={() => onNavigateToTweet(tweet.id)}>
              <img src="./src/assets/chat.svg" className="w-4 mr-2" />
              <span>14</span>
            </button>
          </div>

          {/* retweet/unretweet button */}
          <div className="flex items-center">
            <button
              disabled={loading}
              className="flex cursor-pointer"
              onClick={() => (tweet.tweet_retweeted_by_current_user ? onUnRetweet(tweet.id) : onRetweet(tweet.id))}
            >
              <img
                src={
                  tweet.tweet_retweeted_by_current_user
                    ? "./src/assets/retweet-filled.svg"
                    : "./src/assets/retweet-unfilled.svg"
                }
                className={`w-4 mr-2 ${
                  loading && targetTweetId === tweet.id && loadingAction === "retweet" ? "opacity-50" : ""
                }`}
                alt="retweet icon"
              />
              <span>{tweet.retweets_count}</span>
            </button>
            {loading && targetTweetId === tweet.id && loadingAction === "retweet" ? (
              <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
            ) : (
              <div className="w-3 h-3 ml-3" />
            )}
          </div>

          {/* like/dislike button */}
          <div className="flex items-center">
            <button
              disabled={loading}
              className="flex cursor-pointer"
              onClick={() => (tweet.tweet_liked_by_current_user ? onDislike(tweet.id) : onLike(tweet.id))}
            >
              <img
                src={
                  tweet.tweet_liked_by_current_user
                    ? "./src/assets/heart-filled.svg"
                    : "./src/assets/heart-unfilled.svg"
                }
                className={`w-4 mr-2 ${
                  loading && targetTweetId === tweet.id && loadingAction === "like" ? "opacity-50" : ""
                }`}
                alt="like icon"
              />
              <span>{tweet.likes_count}</span>
            </button>
            {loading && targetTweetId === tweet.id && loadingAction === "like" ? (
              <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
            ) : (
              <div className="w-3 h-3 ml-3" />
            )}
          </div>

          {/* bookmark/unbookmark button */}
          <div className="flex items-center">
            <button
              disabled={loading}
              className="flex cursor-pointer"
              onClick={() =>
                tweet.tweet_bookmarked_by_current_user ? onClearBookmark(tweet.id) : onBookmark(tweet.id)
              }
            >
              <img
                src={
                  tweet.tweet_bookmarked_by_current_user
                    ? "./src/assets/bookmark-filled.svg"
                    : "./src/assets/bookmark-unfilled.svg"
                }
                className={`w-4 mr-2 ${
                  loading && targetTweetId === tweet.id && loadingAction === "bookmark" ? "opacity-50" : ""
                }`}
                alt="bookmark icon"
              />
            </button>
            {loading && targetTweetId === tweet.id && loadingAction === "bookmark" ? (
              <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
            ) : (
              <div className="w-3 h-3 ml-3" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
