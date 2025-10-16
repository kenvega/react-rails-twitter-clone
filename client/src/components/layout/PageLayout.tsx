import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import HashtagSidebar from "../HashtagSidebar";

export type PageLayoutProps = {
  children: ReactNode;
  leftSidebar?: ReactNode | null;
  rightSidebar?: ReactNode | null;
  className?: string;
};

const PageLayout = ({
  children,
  leftSidebar = <Sidebar />,
  rightSidebar = <HashtagSidebar />,
  className = "",
}: PageLayoutProps) => (
  <div className={`py-4 min-h-screen dark:bg-gray-800 ${className}`}>
    <div className="flex flex-row max-w-7xl mx-auto">
      <div className="basis-1/5">{leftSidebar}</div>
      <div className="basis-3/5">{children}</div>
      <div className="basis-1/5">{rightSidebar}</div>
    </div>
  </div>
);

export default PageLayout;
