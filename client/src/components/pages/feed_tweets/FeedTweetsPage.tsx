import AllTweetsContainer from "../all_tweets/AllTweetsContainer";
import ContentTitle from "../../ContentTitle";
import PageLayout from "../../layout/PageLayout";

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
