import { useState, useEffect } from "react";
import TweetsList from "../../TweetsList";
import { Tweet } from "../../../types/Tweet";
import { getHashtagTweets } from "../../../services/hashtagsService";
import { useParams } from "react-router-dom";
import BackIcon from "../../../assets/back.svg?react";
import { useNavigate } from "react-router-dom";

const HashtagTweetsContainer = () => {
  const navigate = useNavigate();

  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loadingTweets, setLoadingTweets] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { hashtagIdParam } = useParams<{ hashtagIdParam: string }>();

  const fetchHashtagTweets = ({ id }: { id: string }) => {
    return getHashtagTweets({ id })
      .then((tweets) => {
        console.log("response tweets: ", tweets);
        setTweets(tweets);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingTweets(false);
      });
  };

  // TODO: fix typescript here
  useEffect(() => {
    fetchHashtagTweets({ id: hashtagIdParam });
  }, [hashtagIdParam]);

  return (
    <div>
      <div>
        <div className="flex mb-4">
          <button onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <span className="ml-5 font-bold text-xl">Tweets from that hashtag</span>
        </div>
      </div>
      <TweetsList tweets={tweets} loadingTweets={loadingTweets} error={error} fetchTweets={fetchHashtagTweets} />
    </div>
  );
};

export default HashtagTweetsContainer;
