import Sidebar from "./Sidebar";
import TweetContainer from "./TweetContainer";
import HashtagSidebar from "./HashtagSidebar";

const TweetPage = () => {
  return (
    <div className="py-4 min-h-screen dark:bg-gray-800">
      <div className="flex flex-row max-w-7xl mx-auto">
        <div className="basis-1/5">
          <Sidebar />
        </div>

        <div className="basis-3/5">
          <TweetContainer />
          {/* TweetReplies (?) */}
        </div>

        <div className="basis-1/5">
          <HashtagSidebar />
        </div>
      </div>
    </div>
  );
};

export default TweetPage;
