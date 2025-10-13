import ContentTitle from "../../ContentTitle";
import PageLayout from "../../layout/PageLayout";
import HashtagTweetsContainer from "./HashtagTweetsContainer";

const HashtagTweetsPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Hashtag Page" />
      <HashtagTweetsContainer />
    </PageLayout>
  );
};

export default HashtagTweetsPage;
