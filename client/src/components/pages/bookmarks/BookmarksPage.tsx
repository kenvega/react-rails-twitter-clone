import BookmarksContainer from "./BookmarksContainer";
import PageLayout from "../../layout/PageLayout";
import ContentTitle from "../../ContentTitle";

const BookmarksPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Your Bookmarks" />
      <BookmarksContainer />
    </PageLayout>
  );
};

export default BookmarksPage;
