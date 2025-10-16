import AllTweetsContainer from "./AllTweetsContainer";
import Page from "../../layout/Page";

const AllTweetsPage = () => {
  return (
    <Page title="All tweets">
      {/* TODO: should not have the form */}
      <AllTweetsContainer />
    </Page>
  );
};

export default AllTweetsPage;
