import TweetsList from "./TweetsList";
import SidebarButton from "./SidebarButton";

import Twitter from "../assets/twitter.svg";
import Home from "../assets/home.svg";
import Hashtag from "../assets/hashtag.svg";
import Earth from "../assets/earth.svg";
import Users from "../assets/users.svg";
import Notification from "../assets/notification.svg";
import Message from "../assets/email.svg";
import Bookmark from "../assets/bookmark-unfilled.svg";
import Profile from "../assets/profile.svg";


const MainContainer = () => {
  return (
    <div className="flex gap-4">
      <div>
        <div className="px-6 py-2 flex align-middle gap-5 mb-4 rounded-full">
          <img src={Twitter} alt="Your SVG" width={32} className="" />
        </div>
        <SidebarButton title="Home" SVGIcon={Home} active />
        <SidebarButton title="Hashtags" SVGIcon={Hashtag} />
        <SidebarButton title="All Tweets" SVGIcon={Earth} />
        <SidebarButton title="All Users" SVGIcon={Users} />
        <SidebarButton title="Notifications" SVGIcon={Notification} />
        <SidebarButton title="Messages" SVGIcon={Message} />
        <SidebarButton title="Bookmarks" SVGIcon={Bookmark} />
        <SidebarButton title="Profile" SVGIcon={Profile} />
      </div>
      <div>
        <TweetsList />
      </div>
      <div>hashtag sidebar</div>
    </div>
  );
};

export default MainContainer;
