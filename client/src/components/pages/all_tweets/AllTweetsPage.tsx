import AllTweetsContainer from "./AllTweetsContainer";
import ContentTitle from "../../ContentTitle";

const AllTweetsPage = () => {
  return (
    <>
      <ContentTitle title="All Tweets" />
      {/* TODO: should not have the form */}
      <AllTweetsContainer />
    </>
  );
};

export default AllTweetsPage;
