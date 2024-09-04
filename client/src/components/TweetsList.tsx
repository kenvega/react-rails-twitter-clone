import { Tweet } from "../interfaces/Tweet";

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
          return (
            <div key={tweet.id}>
              <p>{tweet.body}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TweetsList;
