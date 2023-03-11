import AlbumsList from "@/components/albums-list";
import { AlbumsDataProvider } from "@/context/albums-data-context";
import { NextPageWithLayout } from "@/lib/types";
import Head from "next/head";

const Albums: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Albums</title>
      </Head>
      <AlbumsDataProvider>
        <AlbumsList />
      </AlbumsDataProvider>
    </>
  );
};
Albums.pageHeadingText = "Albums";
export default Albums;
