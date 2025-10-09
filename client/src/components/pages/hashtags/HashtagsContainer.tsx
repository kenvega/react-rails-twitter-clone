import { useState, useEffect } from "react";
import { getHashtags } from "../../../services/hashtagsService";
import { Hashtag } from "../../../types/Hashtags";

const HashtagsContainer = () => {
  useEffect(() => {
    fetchHashtags();
  }, []);

  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [loadingHashtags, setLoadingHashtags] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHashtags = () => {
    return getHashtags()
      .then((Hashtags) => {
        console.log("Hashtags: ", Hashtags);
        setHashtags(Hashtags);
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
        return <div key={hashtag.id}>{hashtag.tag}</div>;
      })}
    </div>
  );
};

export default HashtagsContainer;
