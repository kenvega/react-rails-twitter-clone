import { useState, useEffect } from "react";
import { getTweets } from "../services/tweetsService";

interface Tweet {
  id: number;
  body: string;
}

const TweetsList = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTweets()
      .then((tweets) => {
        console.log("response tweets: ", tweets);
        setTweets(tweets);
      })
      .catch((error) => {
        setError(`Error ocurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>Error</div>
  }

  return (
    <div>
      <p className="bg-blue-500 text-white p-4">hello there. test to be deleted later.</p>

      {loading
        ? "loading"
        : tweets.map((tweet) => {
            return (
              <div key={tweet.id}>
                <p>{tweet.body}</p>
              </div>
            );
          })}
    </div>
  );
};

export default TweetsList;
