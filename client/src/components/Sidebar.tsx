import SidebarButton from "./SidebarButton";
import Logout from "./Logout";

import Twitter from "../assets/twitter.svg";

import Home from "../assets/home.svg?react";
import Hashtag from "../assets/hashtag.svg?react";
import Earth from "../assets/earth.svg?react";
import Users from "../assets/users.svg?react";
import Notification from "../assets/notification.svg?react";
import Message from "../assets/email.svg?react";
import Bookmark from "../assets/bookmark-unfilled.svg?react";
import Profile from "../assets/profile.svg?react";

import { useNavigate } from "react-router-dom";

const TweetsContainer = () => {
  const navigate = useNavigate();

  const goTo = (route: string) => {
    navigate(route);
  };

  return (
    <div className="max-w-fit">
      <div className="px-6 py-2 flex align-middle gap-5 mb-4 rounded-full">
        <img src={Twitter} alt="Your SVG" width={32} />
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
  );
};

export default TweetsContainer;
