import AllTweetsContainer from "../all_tweets/AllTweetsContainer";
import PageLayout from "../../layout/PageLayout";
import ContentTitle from "../../ContentTitle";

const FeedTweetsPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Home" />
      {/* TODO: should change it to FeedContainer later once I create difference between feed for user and all tweets */}
      <AllTweetsContainer />
    </PageLayout>
  );
};

export default FeedTweetsPage;
