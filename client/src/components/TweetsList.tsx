import { Tweet } from "../interfaces/Tweet";
// import { Button } from "@radix-ui/themes";

const TweetsList = ({ tweets, loading, error }: { tweets: Tweet[]; loading: boolean; error: string | null }) => {
  console.log("tweets: ", tweets);
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading tweets...</p>
      ) : (
        tweets.map((tweet) => {
          const formattedDate = new Date(tweet.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          });

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
