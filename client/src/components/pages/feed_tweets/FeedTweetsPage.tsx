import AllTweetsContainer from "../all_tweets/AllTweetsContainer";
import Sidebar from "../../Sidebar";
import HashtagSidebar from "../../HashtagSidebar";
import ContentTitle from "../../ContentTitle";

const TweetsPage = () => {
  // TODO: add useEffect to check if user is logged in. if not logged in then redirect to login page

  return (
    <div className="py-4 min-h-screen dark:bg-gray-800">
      <div className="flex flex-row max-w-7xl mx-auto">
        <div className="basis-1/5">
          <Sidebar />
        </div>

        <div className="basis-3/5">
          <ContentTitle />
          {/* TODO: should change it to FeedContainer later */}
          <AllTweetsContainer />
        </div>

        <div className="basis-1/5">
          <HashtagSidebar />
        </div>
      </div>
    </div>
  );
};

export default TweetsPage;
