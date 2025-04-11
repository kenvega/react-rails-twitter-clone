import { useState } from "react";
import { Tweet } from "../interfaces/Tweet";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAction, setLoadingAction] = useState<string>("");

  const [targetTweetId, setTargetTweetId] = useState<number | null>(null);

  const navigate = useNavigate();

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleLikeClick = ({ tweetId }: { tweetId: number }) => {
    if (loading) return;

    setLoading(true);
    setLoadingAction("like");
    setTargetTweetId(tweetId);

    likeTweet({ tweetId }).then(() => {
      fetchTweets().finally(() => {
        setTargetTweetId(null);
        setLoading(false);
        setLoadingAction("");
      });
    });
  };

  const handleDislikeClick = ({ tweetId }: { tweetId: number }) => {
    if (loading) return;

    setLoading(true);
    setLoadingAction("like");
    setTargetTweetId(tweetId);

    dislikeTweet({ tweetId }).then(() => {
      fetchTweets().finally(() => {
        setTargetTweetId(null);
        setLoading(false);
        setLoadingAction("");
      });
    });
  };

  const handleBookmarkClick = ({ tweetId }: { tweetId: number }) => {
    if (loading) return;

    setLoading(true);
    setLoadingAction("bookmark");
    setTargetTweetId(tweetId);

    bookmarkTweet({ tweetId }).then(() => {
      fetchTweets().finally(() => {
        setTargetTweetId(null);
        setLoading(false);
        setLoadingAction("");
      });
    });
  };

  const handleClearBookmarkClick = ({ tweetId }: { tweetId: number }) => {
    if (loading) return;

    setLoading(true);
    setLoadingAction("bookmark");
    setTargetTweetId(tweetId);

    clearBookmarkTweet({ tweetId }).then(() => {
      fetchTweets().finally(() => {
        setTargetTweetId(null);
        setLoading(false);
        setLoadingAction("");
      });
    });
  };

  const handleRetweetClick = ({ tweetId }: { tweetId: number }) => {
    if (loading) return;

    setLoading(true);
    setLoadingAction("retweet");
    setTargetTweetId(tweetId);

    retweetTweet({ tweetId }).then(() => {
      fetchTweets().finally(() => {
        setTargetTweetId(null);
        setLoading(false);
        setLoadingAction("");
      });
    });
  };

  const handleUnRetweetClick = ({ tweetId }: { tweetId: number }) => {
    if (loading) return;

    setLoading(true);
    setLoadingAction("retweet");
    setTargetTweetId(tweetId);

    clearRetweetTweet({ tweetId }).then(() => {
      fetchTweets().finally(() => {
        setTargetTweetId(null);
        setLoading(false);
        setLoadingAction("");
      });
    });
  };

  return (
    <div>
      {loadingTweets ? (
        <p>Loading tweets...</p>
      ) : (
        tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            loading={loading}
            loadingAction={loadingAction}
            targetTweetId={targetTweetId}
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
