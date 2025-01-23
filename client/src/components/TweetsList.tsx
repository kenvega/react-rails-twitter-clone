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
              <p>
                @{tweet.user.username} - {formattedDate}
              </p>
              <p>{tweet.body}</p>
              <hr></hr>
              {/* <Button variant="soft">Let's go</Button> */}
            </div>
          );
        })
      )}
    </div>
  );
};

export default TweetsList;
