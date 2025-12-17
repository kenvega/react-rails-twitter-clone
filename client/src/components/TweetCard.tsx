import { useNavigate } from "react-router-dom";
// import ChartIcon from "../assets/chart.svg?react";
import { Tweet } from "../types/Tweet";
import { formatToMMMdd } from "../helpers/dateUtils";
import TweetActionButtons from "./TweetActionButtons";
import TweetBody from "./TweetBody";
import { TweetActionType } from "../types/TweetActionType";

type TweetCardProps = {
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

function TweetCard({
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
}: TweetCardProps) {
  const formattedDate = formatToMMMdd(tweet.created_at);

  const navigate = useNavigate();

  return (
    <div className="flex border-b mb-6 pt-4 pl-4 pr-4 pb-7">
      <div>
        <img
          src={tweet.user.avatar_url || "/src/assets/profile.svg"}
          className={`w-16 rounded-full ${tweet.user.avatar_url ? "aspect-square overflow-hidden" : ""}`}
          alt="user avatar"
        />
      </div>

      <div className="ml-4 grow">
        <p className="cursor-pointer" onClick={() => navigate(`/users/${tweet.user.id}`)}>
          <span className="font-bold">{tweet.user.display_name}</span>{" "}
          <span className="text-gray-500">
            @{tweet.user.username} · {formattedDate}
          </span>
        </p>

        <TweetBody tweet={tweet} />

        <TweetActionButtons
          tweet={tweet}
          isActionLoading={isActionLoading}
          activeAction={activeAction}
          activeTweetId={activeTweetId}
          onLike={onLike}
          onDislike={onDislike}
          onRetweet={onRetweet}
          onBookmark={onBookmark}
          onClearBookmark={onClearBookmark}
          onUnRetweet={onUnRetweet}
          onNavigateToTweet={onNavigateToTweet}
        />
      </div>
    </div>
  );
}

export default TweetCard;
