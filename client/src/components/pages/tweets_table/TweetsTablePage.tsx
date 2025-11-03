import TweetsTableContainer from "./TweetsTableContainer";
import PageLayout from "../../layout/PageLayout";
import ContentTitle from "../../ContentTitle";

const TweetsTablePage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Tweets Table" />
      <TweetsTableContainer />
    </PageLayout>
  );
};

export default TweetsTablePage;
