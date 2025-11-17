import { useState, useEffect, useCallback } from "react";
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

  const { hashtagIdentifier } = useParams<{ hashtagIdentifier: string }>();

  // useCallback is used to have a stable reference for the function fetchHashtagTweets
  // if we don't use useCallback here, the function reference would change on every render
  // and that will cause an infinite loop. how?
  // because fetchHashtagTweets changes the state so it triggers a re-render
  // when that re-render occurs and no useCallback is used then another reference for the function is created
  // meaning that the dependency array in useEffect changed
  // and that causes to run the function again which again will trigger state change and then a re-render (the loop)
  const fetchHashtagTweets = useCallback(() => {
    if (!hashtagIdentifier) return Promise.resolve();

    return getHashtagTweets({ hashtagIdentifier })
      .then((tweets) => {
        console.log("hashtag tweets: ", tweets);
        setTweets(tweets);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingTweets(false);
      });
  }, [hashtagIdentifier]);

  // fetchHashtagTweets is created on every render
  // if we add it to the dependency array [fetchHashtagTweets]
  // the effect would re-run on every render because the function reference is new each time
  // that's why we use useCallback to make it a stable reference across re-renders
  // unless its dependencies change (like hashtagIdentifier)
  // With the memoized function, this effect runs:
  // - on mount
  // - again whenever hashtagIdentifier changes (because the memoized function changes)
  useEffect(() => {
    fetchHashtagTweets();
  }, [fetchHashtagTweets]);

  return (
    <div>
      <div>
        <div className="flex mb-4">
          <button onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <span className="ml-5 font-bold text-xl">Hashtag Tweets</span>
        </div>
      </div>
      <TweetsList tweets={tweets} loadingTweets={loadingTweets} error={error} fetchTweets={fetchHashtagTweets} />
    </div>
  );
};

export default HashtagTweetsContainer;
