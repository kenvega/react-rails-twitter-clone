import ProfileEditContainer from "./ProfileEditContainer";
import PageLayout from "../../layout/PageLayout";
import ContentTitle from "../../ContentTitle";

const ProfileEditPage = () => {
  return (
    <PageLayout>
      <ContentTitle title="Edit Your Profile" />
      <ProfileEditContainer />
    </PageLayout>
  );
};

export default ProfileEditPage;
