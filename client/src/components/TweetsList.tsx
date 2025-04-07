import { useState } from "react";
import { Tweet } from "../interfaces/Tweet";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  likeTweet,
  dislikeTweet,
  bookmarkTweet,
  clearBookmarkTweet,
  retweetTweet,
  clearRetweetTweet,
} from "../services/tweetsService";
import LoadingIcon from "../assets/loading.svg?react";

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
  console.log("tweets: ", tweets); // TODO: remove log

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAction, setLoadingAction] = useState<string>("");

  const [targetTweetId, setTargetTweetId] = useState<number | null>(null);

  if (error) {
    return <div>Error</div>;
  }

  const formatTheDate = (tweetDate: string) => {
    const now = new Date();
    const tweetDateObj = new Date(tweetDate);
    const oneDayInMs = 24 * 60 * 60 * 1000;

    const isMoreThanADayAgo = now.getTime() - tweetDateObj.getTime() > oneDayInMs;

    if (isMoreThanADayAgo) {
      return tweetDateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });
    } else {
      return formatDistanceToNow(tweetDateObj, { addSuffix: true });
    }
  };

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
        tweets.map((tweet) => {
          const formattedDate = formatTheDate(tweet.created_at);

          return (
            <div key={tweet.id} className="flex border-b mb-6 pt-4 pl-4 pr-4 pb-7">
              <div>
                {tweet.user.avatar_url ? (
                  <img
                    src={tweet.user.avatar_url}
                    className="w-24 rounded-full aspect-square overflow-hidden"
                    alt="user avatar"
                  />
                ) : (
                  <img src="./src/assets/profile.svg" className="w-16 rounded-full" />
                )}
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
                  <div>
                    <Link to="/dashboard" className="flex">
                      <img src="./src/assets/chart.svg" className="w-4 mr-2" />
                      <span>14</span>
                    </Link>
                  </div>
                  <div>
                    <Link to="/dashboard" className="flex">
                      <img src="./src/assets/chat.svg" className="w-4 mr-2" />
                      <span>14</span>
                    </Link>
                  </div>

                  {/* retweet tweet button */}
                  <div className="flex items-center">
                    <button
                      disabled={loading}
                      className="flex cursor-pointer"
                      onClick={() =>
                        tweet.tweet_retweeted_by_current_user
                          ? handleUnRetweetClick({ tweetId: tweet.id })
                          : handleRetweetClick({ tweetId: tweet.id })
                      }
                    >
                      <img
                        src={
                          tweet.tweet_retweeted_by_current_user
                            ? "./src/assets/retweet-filled.svg"
                            : "./src/assets/retweet-unfilled.svg"
                        }
                        className={`w-4 mr-2 ${
                          loading && targetTweetId === tweet.id && loadingAction == "retweet" ? "opacity-50" : ""
                        }`}
                        alt="like icon"
                      />
                      <span>{tweet.retweets_count}</span>
                    </button>
                    {loading && targetTweetId === tweet.id && loadingAction == "retweet" ? (
                      <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
                    ) : (
                      <div className="w-3 h-3 ml-3" />
                    )}
                  </div>

                  {/* like/dislike tweet button */}
                  <div className="flex items-center">
                    <button
                      disabled={loading}
                      className="flex cursor-pointer"
                      onClick={() =>
                        tweet.tweet_liked_by_current_user
                          ? handleDislikeClick({ tweetId: tweet.id })
                          : handleLikeClick({ tweetId: tweet.id })
                      }
                    >
                      <img
                        src={
                          tweet.tweet_liked_by_current_user
                            ? "./src/assets/heart-filled.svg"
                            : "./src/assets/heart-unfilled.svg"
                        }
                        className={`w-4 mr-2 ${
                          loading && targetTweetId === tweet.id && loadingAction == "like" ? "opacity-50" : ""
                        }`}
                        alt="like icon"
                      />
                      <span>{tweet.likes_count}</span>
                    </button>
                    {loading && targetTweetId === tweet.id && loadingAction == "like" ? (
                      <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
                    ) : (
                      <div className="w-3 h-3 ml-3" />
                    )}
                  </div>

                  {/* bookmark/unbookmark tweet button */}
                  <div className="flex items-center">
                    <button
                      disabled={loading}
                      className="flex cursor-pointer"
                      onClick={() =>
                        tweet.tweet_bookmarked_by_current_user
                          ? handleClearBookmarkClick({ tweetId: tweet.id })
                          : handleBookmarkClick({ tweetId: tweet.id })
                      }
                    >
                      <img
                        src={
                          tweet.tweet_bookmarked_by_current_user
                            ? "./src/assets/bookmark-filled.svg"
                            : "./src/assets/bookmark-unfilled.svg"
                        }
                        className={`w-4 mr-2 ${
                          loading && targetTweetId === tweet.id && loadingAction == "bookmark" ? "opacity-50" : ""
                        }`}
                        alt="like icon"
                      />
                    </button>
                    {loading && targetTweetId === tweet.id && loadingAction == "bookmark" ? (
                      <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
                    ) : (
                      <div className="w-3 h-3 ml-3" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TweetsList;
