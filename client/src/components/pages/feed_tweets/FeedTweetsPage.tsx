import AllTweetsContainer from "../all_tweets/AllTweetsContainer";
import ContentTitle from "../../ContentTitle";

const FeedTweetsPage = () => {
  return (
    <>
      <ContentTitle title="Home" />
      {/* TODO: should change it to FeedContainer later once I create difference between feed for user and all tweets */}
      <AllTweetsContainer />
    </>
  );
};

export default FeedTweetsPage;
