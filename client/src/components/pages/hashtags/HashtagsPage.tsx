import ContentTitle from "../../ContentTitle";
import PageLayout from "../../layout/PageLayout";
import HashtagsContainer from "./HashtagsContainer";

const HashtagsPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Hashtags Page" />
      <HashtagsContainer />
    </PageLayout>
  );
};

export default HashtagsPage;
