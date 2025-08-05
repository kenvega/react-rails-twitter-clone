import Sidebar from "./Sidebar";
import HashtagSidebar from "./HashtagSidebar";

const ProfilePage = () => {
  return (
    <div className="py-4 min-h-screen dark:bg-gray-800">
      <div className="flex flex-row max-w-7xl mx-auto">
        <div className="basis-1/5">
          <Sidebar />
        </div>

        <div className="basis-3/5">Here the Profile Container</div>

        <div className="basis-1/5">
          <HashtagSidebar />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
