import HashtagsContainer from "./HashtagsContainer";
import PageLayout from "../../layout/PageLayout";
import ContentTitle from "../../ContentTitle";

const HashtagsPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Hashtags Page" />
      <HashtagsContainer />
    </PageLayout>
  );
};

export default HashtagsPage;
