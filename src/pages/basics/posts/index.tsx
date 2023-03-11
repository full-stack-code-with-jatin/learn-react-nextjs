import Header from "@/components/header";
import { NextPageWithLayout } from "@/lib/types";

const Posts: NextPageWithLayout = () => {
  return (
    <>
      <Header headerText="Posts" />
    </>
  );
};

Posts.pageHeadingText = "Posts";

export default Posts;
