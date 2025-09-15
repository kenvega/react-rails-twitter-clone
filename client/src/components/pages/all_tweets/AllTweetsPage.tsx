import AllTweetsContainer from "./AllTweetsContainer";
import Sidebar from "../../Sidebar";
import HashtagSidebar from "../../HashtagSidebar";
import ContentTitle from "../../ContentTitle";

const AllTweetsPage = () => {
  return (
    <div className="py-4 min-h-screen dark:bg-gray-800">
      <div className="flex flex-row max-w-7xl mx-auto">
        <div className="basis-1/5">
          <Sidebar />
        </div>

        <div className="basis-3/5">
          <ContentTitle title="All tweets" />
          {/* TODO: should not have the form */}
          <AllTweetsContainer />
        </div>

        <div className="basis-1/5">
          <HashtagSidebar />
        </div>
      </div>
    </div>
  );
};

export default AllTweetsPage;
