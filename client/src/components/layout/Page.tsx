import { ReactNode } from "react";

import ContentTitle from "../ContentTitle";
import PageLayout from "./PageLayout";

type PageProps = {
  title?: string;
  children?: ReactNode;
};

const Page = ({ title, children, ...layoutProps }: PageProps) => (
  <PageLayout {...layoutProps}>
    <ContentTitle title={title} />
    {children}
  </PageLayout>
);

export default Page;
