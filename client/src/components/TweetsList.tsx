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
          console.log("tweet: ", tweet);
          return (
            <div key={tweet.id}>
              {/* <p>from user: {tweet.user_id}</p> */}
              <p>{tweet.body}</p>
              {/* <Button variant="soft">Let's go</Button> */}
            </div>
          );
        })
      )}
    </div>
  );
};

export default TweetsList;
