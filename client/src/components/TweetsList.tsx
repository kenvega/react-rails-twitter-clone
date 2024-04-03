import { useState, useEffect } from "react";
import { API_URL } from "../constants";

const TweetsList = () => {
  const [tweets, setTweets] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadTweets() {
      try {
        const response = await fetch(API_URL)
        if (response.ok) {
          const json = await response.json()
          setTweets(json)
        } else {
          throw response
        }
      } catch(e) {
        setError('error ocurred')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadTweets()
  }, [])

  return (
    <div>
      {tweets.map((tweet) => {
        return <div key={tweet.id}>
          <p>{tweet.body}</p>
        </div>;
      })}
    </div>
  );
};

export default TweetsList;
