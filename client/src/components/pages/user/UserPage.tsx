import UserContainer from "./UserContainer";
import PageLayout from "../../layout/PageLayout";
import ContentTitle from "../../ContentTitle";

const UserPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="User Page" />
      <UserContainer />
    </PageLayout>
  );
};

export default UserPage;
