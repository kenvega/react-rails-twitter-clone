import ContentTitle from "../../ContentTitle";
import ProfileContainer from "./ProfileContainer";
import PageLayout from "../../layout/PageLayout";

const ProfilePage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Your Profile" />
      <ProfileContainer />
    </PageLayout>
  );
};

export default ProfilePage;
