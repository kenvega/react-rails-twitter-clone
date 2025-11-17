import { useState, useEffect } from "react";
import { getHashtags } from "../../../services/hashtagsService";
import { Hashtag } from "../../../types/Hashtags";
import { Link } from "react-router-dom";

const HashtagsContainer = () => {
  useEffect(() => {
    fetchHashtags();
  }, []);

  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [loadingHashtags, setLoadingHashtags] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHashtags = () => {
    return getHashtags()
      .then((hashtags) => {
        console.log("hashtags: ", hashtags);
        setHashtags(hashtags);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingHashtags(false);
      });
  };

  if (loadingHashtags) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div>
      {hashtags.map((hashtag) => {
        return (
          <Link key={hashtag.id} to={`/tags/${hashtag.id}`} className="mb-4 p-2 block hover:bg-gray-600">
            <p className="font-bold text-xl">#{hashtag.tag}</p>
            <p className="text-gray-500 text-lg">{hashtag.tweets_count} Tweets</p>
          </Link>
        );
      })}
    </div>
  );
};

export default HashtagsContainer;
