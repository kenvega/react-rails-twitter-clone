import AllTweetsContainer from "./AllTweetsContainer";
import PageLayout from "../../layout/PageLayout";
import ContentTitle from "../../ContentTitle";

const AllTweetsPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="All Tweets" />
      {/* TODO: should not have the form */}
      <AllTweetsContainer />
    </PageLayout>
  );
};

export default AllTweetsPage;
