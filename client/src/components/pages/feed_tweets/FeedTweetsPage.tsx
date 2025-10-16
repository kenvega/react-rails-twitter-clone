import AllTweetsContainer from "../all_tweets/AllTweetsContainer";
import Page from "../../layout/Page";

const FeedTweetsPage = () => {
  return (
    <Page title="Home">
      {/* TODO: should change it to FeedContainer later once I create difference between feed for user and all tweets */}
      <AllTweetsContainer />
    </Page>
  );
};

export default FeedTweetsPage;
