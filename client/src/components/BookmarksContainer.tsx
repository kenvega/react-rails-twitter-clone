import { useState, useEffect } from "react";
import { getBookmarks } from "../services/tweetsService";
import TweetsList from "./TweetsList";
import { Tweet } from "../interfaces/Tweet";

const BookmarksContainer = () => {
  useEffect(() => {
    fetchBookmarks();
  }, []);

  const [bookmarks, setBookmarks] = useState<Tweet[]>([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = () => {
    return getBookmarks()
      .then((bookmarks) => {
        console.log("bookmarks: ", bookmarks);
        setBookmarks(bookmarks);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingBookmarks(false);
      });
  };

  return (
    <div>
      <TweetsList tweets={bookmarks} loadingTweets={loadingBookmarks} error={error} fetchTweets={fetchBookmarks} />
    </div>
  );
};

export default BookmarksContainer;
