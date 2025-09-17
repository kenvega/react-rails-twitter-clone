import ContentTitle from "../../ContentTitle";
import ProfileContainer from "./ProfileContainer";
import PageLayout from "../../layout/PageLayout";

const ProfilePage = () => {
  return (
    <PageLayout>
      <ContentTitle title="All Users" />
      <ProfileContainer />
    </PageLayout>
  );
};

export default ProfilePage;
