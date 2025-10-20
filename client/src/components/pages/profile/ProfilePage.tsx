import ProfileContainer from "./ProfileContainer";
import PageLayout from "../../layout/PageLayout";
import ContentTitle from "../../ContentTitle";

const ProfilePage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Your Profile" />
      <ProfileContainer />
    </PageLayout>
  );
};

export default ProfilePage;
