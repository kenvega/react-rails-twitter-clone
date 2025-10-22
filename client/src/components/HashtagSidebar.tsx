import { useState, useEffect } from "react";
import { getHashtags } from "../services/hashtagsService";
import { Hashtag } from "../types/Hashtags";
import { Link } from "react-router-dom";

type HashtagStateProps = {
  status: "idle" | "success" | "error" | "pending";
  data: Hashtag[] | null;
  error: string | null;
};

const HashtagSidebar = () => {
  useEffect(() => {
    fetchHashtags();
  }, []);

  const [state, setState] = useState<HashtagStateProps>({
    status: "idle",
    data: null,
    error: null,
  });

  const { status, data: hashtags, error } = state;

  const fetchHashtags = () => {
    return getHashtags()
      .then((hashtags) => {
        setState({ status: "success", data: hashtags, error: null });
      })
      .catch((error) => {
        console.error(error);
        setState({
          status: "error",
          data: null,
          error,
        });
      });
  };

  return (
    <div className="px-3">
      <p className="font-bold text-xl">Hashtags</p>
      {status === "success" &&
        hashtags &&
        hashtags.map((hashtag) => {
          return (
            <Link key={hashtag.id} to={`/explore/${hashtag.id}`} className="mb-4 p-3 block hover:bg-gray-600">
              <p className="font-bold text-xl">#{hashtag.tag}</p>
              <p className="text-gray-500 text-lg">{hashtag.tweets_count} Tweets</p>
            </Link>
          );
        })}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default HashtagSidebar;
