import ContentTitle from "../../ContentTitle";
import PageLayout from "../../layout/PageLayout";
import UserContainer from "./UserContainer";

const UserPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="User Page" />
      <UserContainer />
    </PageLayout>
  );
};

export default UserPage;
