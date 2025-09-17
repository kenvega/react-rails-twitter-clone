import BookmarksContainer from "./BookmarksContainer";
import ContentTitle from "../../ContentTitle";
import PageLayout from "../../layout/PageLayout";

const BookmarksPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Bookmarks" />
      <BookmarksContainer />
    </PageLayout>
  );
};

export default BookmarksPage;
