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

import { useNavigate } from "react-router-dom";

const MainContainer = () => {
  const navigate = useNavigate();

  const goTo = (route: string) => {
    navigate(route);
  };

  return (
    <div className="flex gap-4">
      <div>
        <div className="px-6 py-2 flex align-middle gap-5 mb-4 rounded-full">
          <img src={Twitter} alt="Your SVG" width={32} className="" />
        </div>
        <SidebarButton title="Home" SVGIcon={Home} goTo={goTo("/home")} active />
        <SidebarButton title="Hashtags" SVGIcon={Hashtag} goTo={goTo("/home")} />
        <SidebarButton title="All Tweets" SVGIcon={Earth} goTo={goTo("/home")} />
        <SidebarButton title="All Users" SVGIcon={Users} goTo={goTo("/home")} />
        <SidebarButton title="Notifications" SVGIcon={Notification} goTo={goTo("/home")} />
        <SidebarButton title="Messages" SVGIcon={Message} goTo={goTo("/home")} />
        <SidebarButton title="Bookmarks" SVGIcon={Bookmark} goTo={goTo("/home")} />
        <SidebarButton title="Profile" SVGIcon={Profile} goTo={goTo("/home")} />
      </div>
      <div>
        <TweetsList />
      </div>
      <div>hashtag sidebar</div>
    </div>
  );
};

export default MainContainer;
