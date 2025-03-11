import { useState } from "react";
import { Tweet } from "../interfaces/Tweet";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { likeTweet, dislikeTweet } from "../services/tweetsService";
import LoadingIcon from "../assets/loading.svg?react";

const TweetsList = ({
  tweets,
  loadingTweets,
  error,
}: {
  tweets: Tweet[];
  loadingTweets: boolean;
  error: string | null;
}) => {
  console.log("tweets: ", tweets); // TODO: remove log

  const [loading, setLoading] = useState<boolean>(false);
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
    // poner un loader al costado
    // bloquear el botón mientras que se esta esperando
    // cuando se tiene respuesta entonces cambiar el estado de ese tweet en la lista local (?)
    // mejor es hacer request de todo de nuevo creo.. fijate que es lo que se hace para cuando se crea un nuevo tweet... pero esto generaria problemas para cuando tengas infinite scroll (?)
    //
    setLoading(true);
    setTargetTweetId(tweetId);

    likeTweet({ tweetId }).then(() => {
      setTargetTweetId(null);
      setLoading(false);
      console.log("already did the thing");
    });
  };

  const handleDislikeClick = ({ tweetId }: { tweetId: number }) => {
    setLoading(true);
    setTargetTweetId(tweetId);

    dislikeTweet({ tweetId }).then(() => {
      setTargetTweetId(null);
      setLoading(false);
      console.log("already did the thing");
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
                  <div>
                    <Link to="/dashboard" className="flex">
                      <img src="./src/assets/retweet-unfilled.svg" className="w-4 mr-2" />
                      <span>14</span>
                    </Link>
                  </div>

                  {/* <div className="flex items-center">
                    {tweet.tweet_liked_by_current_user ? (
                      <button className="flex cursor-pointer" onClick={() => handleDislikeClick({ tweetId: tweet.id })}>
                        <img
                          src="./src/assets/heart-filled.svg"
                          className={`w-4 mr-2 ${loading && targetTweetId == tweet.id ? "opacity-50" : ""}`}
                        />
                        <span>{tweet.likes_count}</span>
                      </button>
                    ) : (
                      <button className="flex cursor-pointer" onClick={() => handleLikeClick({ tweetId: tweet.id })}>
                        <img
                          src="./src/assets/heart-unfilled.svg"
                          className={`w-4 mr-2 ${loading && targetTweetId == tweet.id ? "opacity-50" : ""}`}
                        />
                        <span>{tweet.likes_count}</span>
                      </button>
                    )}
                    {loading && targetTweetId == tweet.id ? (
                      <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
                    ) : (
                      <div className="w-3 h-3 ml-3"></div>
                    )}
                  </div> */}

                  <div className="flex items-center">
                    <button
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
                        className={`w-4 mr-2 ${loading && targetTweetId === tweet.id ? "opacity-50" : ""}`}
                        alt="like icon"
                      />
                      <span>{tweet.likes_count}</span>
                    </button>
                    {loading && targetTweetId === tweet.id ? (
                      <LoadingIcon className="animate-spin w-3 h-3 ml-3" />
                    ) : (
                      <div className="w-3 h-3 ml-3" />
                    )}
                  </div>

                  <div>
                    <Link to="/dashboard" className="flex">
                      <img src="./src/assets/bookmark-unfilled.svg" className="w-4 mr-2" />
                      <span>Bookmark</span>
                    </Link>
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
