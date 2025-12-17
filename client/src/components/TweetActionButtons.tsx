import { Link } from "react-router-dom";
import { Tweet } from "../types/Tweet";
import { TweetActionType } from "../types/TweetActionType";
import TweetActionButton from "./TweetActionButton";

type TweetActionButtonsProps = {
  tweet: Tweet;
  isActionLoading: boolean;
  activeAction: TweetActionType;
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
      <TweetActionButton
        active={tweet.tweet_retweeted_by_current_user}
        loading={isActionLoading && activeTweetId === tweet.id && activeAction === "retweet"}
        count={tweet.retweets_count}
        activeIcon="/src/assets/retweet-filled.svg"
        inactiveIcon="/src/assets/retweet-unfilled.svg"
        alt="retweet icon"
        onClick={() => (tweet.tweet_retweeted_by_current_user ? onUnRetweet(tweet.id) : onRetweet(tweet.id))}
      />

      {/* like/dislike button */}
      <TweetActionButton
        active={tweet.tweet_liked_by_current_user}
        loading={isActionLoading && activeTweetId === tweet.id && activeAction === "like"}
        count={tweet.likes_count}
        activeIcon="/src/assets/heart-filled.svg"
        inactiveIcon="/src/assets/heart-unfilled.svg"
        alt="like icon"
        onClick={() => (tweet.tweet_liked_by_current_user ? onDislike(tweet.id) : onLike(tweet.id))}
      />

      {/* bookmark/unbookmark button */}
      <TweetActionButton
        active={tweet.tweet_bookmarked_by_current_user}
        loading={isActionLoading && activeTweetId === tweet.id && activeAction === "bookmark"}
        activeIcon="/src/assets/bookmark-filled.svg"
        inactiveIcon="/src/assets/bookmark-unfilled.svg"
        alt="bookmark icon"
        onClick={() => (tweet.tweet_bookmarked_by_current_user ? onClearBookmark(tweet.id) : onBookmark(tweet.id))}
      />
    </div>
  );
};

export default TweetActionButtons;
