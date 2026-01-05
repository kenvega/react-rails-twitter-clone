import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import HashtagSidebar from "../HashtagSidebar";

export type PageLayoutProps = {
  children?: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="py-4 min-h-screen dark:bg-gray-800">
    <div className="flex flex-row max-w-7xl mx-auto">
      <div className="basis-1/5">
        <Sidebar />
      </div>
      <div className="basis-3/5">{children ?? <Outlet />}</div>
      <div className="basis-1/5">
        <HashtagSidebar />
      </div>
    </div>
  </div>
);

export default PageLayout;
