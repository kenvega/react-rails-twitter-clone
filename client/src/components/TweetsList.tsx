import { Tweet } from "../interfaces/Tweet";
// import { Button } from "@radix-ui/themes";

import { formatDistanceToNow } from "date-fns";

const TweetsList = ({ tweets, loading, error }: { tweets: Tweet[]; loading: boolean; error: string | null }) => {
  console.log("tweets: ", tweets);
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
            <div key={tweet.id}>
              {tweet.user.avatar_url ? (
                <img src={tweet.user.avatar_url} className="h-14 w-14 rounded-full" alt="user avatar" />
              ) : (
                <img src="./src/assets/profile.svg" className="h-14 w-14 rounded-full" />
              )}
              <p>
                @{tweet.user.username} · {formattedDate}
              </p>
              <p>{tweet.body}</p>
              <hr></hr>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TweetsList;
