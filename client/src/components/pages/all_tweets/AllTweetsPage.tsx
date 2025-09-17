import AllTweetsContainer from "./AllTweetsContainer";
import ContentTitle from "../../ContentTitle";
import PageLayout from "../../layout/PageLayout";

const AllTweetsPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="All tweets" />
      {/* TODO: should not have the form */}
      <AllTweetsContainer />
    </PageLayout>
  );
};

export default AllTweetsPage;
