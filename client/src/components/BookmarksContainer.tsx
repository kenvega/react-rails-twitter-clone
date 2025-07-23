import { useState, useEffect } from "react";
import { getBookmarks } from "../services/tweetsService";

const BookmarksContainer = () => {
  useEffect(() => {
    fetchBookmarks();
  }, []);

  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = () => {
    return getBookmarks()
      .then((bookmarks) => {
        console.log("bookmarks: ", bookmarks);
        setBookmarks(bookmarks);
      })
      .catch((error) => {
        // setError(`Error occurred: ${error}`);
        console.error(error);
      });
  };

  return <div>aqui van los bookmarks container</div>;
};

export default BookmarksContainer;
