import BookmarksContainer from "./BookmarksContainer";
import PageLayout from "../../layout/PageLayout";
import ContentTitle from "../../ContentTitle";

const BookmarksPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Bookmarks" />
      <BookmarksContainer />
    </PageLayout>
  );
};

export default BookmarksPage;
