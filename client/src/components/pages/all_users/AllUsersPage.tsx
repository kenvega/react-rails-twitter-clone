import AllUsersContainer from "./AllUsersContainer";
import ContentTitle from "../../ContentTitle";
import PageLayout from "../../layout/PageLayout";

const AllUsersPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="All Users" />
      <AllUsersContainer />
    </PageLayout>
  );
};

export default AllUsersPage;
