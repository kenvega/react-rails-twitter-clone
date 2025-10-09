import { useState } from "react";
import { Tweet } from "../types/Tweet";
import {
  likeTweet,
  dislikeTweet,
  bookmarkTweet,
  clearBookmarkTweet,
  retweetTweet,
  clearRetweetTweet,
} from "../services/tweetsService";

import { useNavigate } from "react-router-dom";
import TweetCard from "./TweetCard";

type ActionType = "like" | "bookmark" | "retweet";

const TweetsList = ({
  tweets,
  loadingTweets,
  fetchTweets,
  error,
}: {
  tweets: Tweet[];
  loadingTweets: boolean;
  fetchTweets: () => Promise<void>;
  error: string | null;
}) => {
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const [activeAction, setActiveAction] = useState<string>("");
  const [activeTweetId, setActiveTweetId] = useState<number | null>(null);

  const navigate = useNavigate();

  if (error) {
    return <div>Error: {error}</div>;
  }

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
    setActiveTweetId(tweetId);

    try {
      await actionFn({ tweetId });
      await fetchTweets();
    } finally {
      setActiveTweetId(null);
      setIsActionLoading(false);
      setActiveAction("");
    }
  };

  const handleLikeClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "like", actionFn: likeTweet });

  const handleDislikeClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "like", actionFn: dislikeTweet });

  const handleBookmarkClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "bookmark", actionFn: bookmarkTweet });

  const handleClearBookmarkClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "bookmark", actionFn: clearBookmarkTweet });

  const handleRetweetClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "retweet", actionFn: retweetTweet });

  const handleUnRetweetClick = ({ tweetId }: { tweetId: number }) =>
    runAction({ tweetId, actionType: "retweet", actionFn: clearRetweetTweet });

  return (
    <div>
      {loadingTweets ? (
        <p>Loading...</p>
      ) : (
        tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            isActionLoading={isActionLoading}
            activeAction={activeAction}
            activeTweetId={activeTweetId}
            onLike={(id) => handleLikeClick({ tweetId: id })}
            onDislike={(id) => handleDislikeClick({ tweetId: id })}
            onBookmark={(id) => handleBookmarkClick({ tweetId: id })}
            onClearBookmark={(id) => handleClearBookmarkClick({ tweetId: id })}
            onRetweet={(id) => handleRetweetClick({ tweetId: id })}
            onUnRetweet={(id) => handleUnRetweetClick({ tweetId: id })}
            onNavigateToTweet={(id) => navigate(`/tweets/${id}`)}
          />
        ))
      )}
    </div>
  );
};

export default TweetsList;
