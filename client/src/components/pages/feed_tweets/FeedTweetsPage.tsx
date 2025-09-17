import AllTweetsContainer from "../all_tweets/AllTweetsContainer";
import ContentTitle from "../../ContentTitle";
import PageLayout from "../../layout/PageLayout";

const FeedTweetsPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Bookmarks" />
      {/* TODO: should change it to FeedContainer later */}
      <AllTweetsContainer />
    </PageLayout>
  );
};

export default FeedTweetsPage;
