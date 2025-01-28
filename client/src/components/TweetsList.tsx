import { Tweet } from "../interfaces/Tweet";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const TweetsList = ({ tweets, loading, error }: { tweets: Tweet[]; loading: boolean; error: string | null }) => {
  console.log("tweets: ", tweets); // TODO: remove log
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

  return (
    <div>
      {loading ? (
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
                  <div>
                    <Link to="/dashboard" className="flex">
                      <img src="./src/assets/heart-unfilled.svg" className="w-4 mr-2" />
                      <span>14</span>
                    </Link>
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
