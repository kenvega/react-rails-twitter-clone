import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDecodedJwt } from "../helpers/jwtHelper";
import { getTweet } from "../services/tweetsService";
import { Tweet } from "../interfaces/Tweet";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const TweetDetail = () => {
  const navigate = useNavigate();

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

  const { tweetIdParam } = useParams();
  const tweetId = Number(tweetIdParam);

  const [tweet, setTweet] = useState<Tweet | null>(null);

  let username = null;

  const decodedJwt = getDecodedJwt();
  if (decodedJwt) {
    username = decodedJwt.username;
  }

  useEffect(() => {
    getTweet({ tweetId })
      .then((tweet) => {
        console.log("response tweet: ", tweet);
        setTweet(tweet);
      })
      .catch((error) => {
        // setError(`Error occurred: ${error}`);
        console.error(error);
      });
  }, [tweetId]);

  if (!tweet) {
    return <p>Loading tweet...</p>;
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate("/dashboard")}>Back button</button>
      </div>
      <div className="flex justify-between items-center mb-3 px-2">
        <div>
          Hello {username}, your tweet is: {tweet.body}
        </div>
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
                @{tweet.user.username} · {formatTheDate(tweet.created_at)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetDetail;
