import Header from "@/components/header";
import { dataFetcher } from "@/lib/data-fetcher";
import { NextPageWithLayout } from "@/lib/types";
import { useEffect } from "react";

const Posts: NextPageWithLayout = () => {
  useEffect(() => {
    async function getTodos() {
      const response = await dataFetcher('https://jsonplaceholder.typicode.com/todos');
      console.log(response.data);
    }
    getTodos();
  }, []);
  return (
    <>
      <Header headerText="Posts" />
    </>
  );
};

Posts.pageHeadingText = "Posts";

export default Posts;
