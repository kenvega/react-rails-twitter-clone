import AllUsersContainer from "./AllUsersContainer";
import PageLayout from "../../layout/PageLayout";
import ContentTitle from "../../ContentTitle";

const AllUsersPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="All Users" />
      <AllUsersContainer />
    </PageLayout>
  );
};

export default AllUsersPage;
