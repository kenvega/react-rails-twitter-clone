import { ReactNode } from "react";

import ContentTitle from "../ContentTitle";
import PageLayout, { PageLayoutProps } from "./PageLayout";

type PageProps = {
  title?: string;
  children?: ReactNode;
} & Omit<PageLayoutProps, "children">;

const Page = ({ title, children, ...layoutProps }: PageProps) => (
  <PageLayout {...layoutProps}>
    <ContentTitle title={title} />
    {children}
  </PageLayout>
);

export default Page;
