import Sidebar from "./Sidebar";
import HashtagSidebar from "./HashtagSidebar";
import ProfileContainer from "./ProfileContainer";
import ContentTitle from "./ContentTitle";

const ProfilePage = () => {
  return (
    <div className="py-4 min-h-screen dark:bg-gray-800">
      <div className="flex flex-row max-w-7xl mx-auto">
        <div className="basis-1/5">
          <Sidebar />
        </div>

        <div className="basis-3/5">
          <ContentTitle title="Profile" />
          <ProfileContainer />
        </div>

        <div className="basis-1/5">
          <HashtagSidebar />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
