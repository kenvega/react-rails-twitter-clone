import SidebarButton from "./SidebarButton";
import TweetsContainer from "./TweetsContainer";
import Logout from "./Logout";

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
  // TODO: move navigate logic to sidebarbutton because is not used here i think.. or maybe later it will
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

        <SidebarButton title="Home" SVGIcon={Home} onClick={() => goTo("/home")} active />
        <SidebarButton title="Hashtags" SVGIcon={Hashtag} onClick={() => goTo("/hashtags")} />
        <SidebarButton title="All Tweets" SVGIcon={Earth} onClick={() => goTo("/all_tweets")} />
        <SidebarButton title="All Users" SVGIcon={Users} onClick={() => goTo("/users")} />
        <SidebarButton title="Notifications" SVGIcon={Notification} onClick={() => goTo("/notifications")} />
        <SidebarButton title="Messages" SVGIcon={Message} onClick={() => goTo("/channels")} />
        <SidebarButton title="Bookmarks" SVGIcon={Bookmark} onClick={() => goTo("/bookmarks")} />
        <SidebarButton title="Profile" SVGIcon={Profile} onClick={() => goTo("/profile")} />

        <Logout />
      </div>
      <TweetsContainer />
      <div>hashtag sidebar</div>
    </div>
  );
};

export default MainContainer;
