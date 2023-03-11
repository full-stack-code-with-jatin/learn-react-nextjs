import { AlbumsDataContext } from "@/context/albums-data-context";
import { Album, LoadingStatus } from "@/lib/types";
import Link from "next/link";
import { useContext } from "react";
import { NextPageWithLayout } from "@/lib/types";

const AlbumsList: NextPageWithLayout = () => {
  const { albums, loading } = useContext(AlbumsDataContext);

  if (loading === LoadingStatus.Loading) {
    return <div>Loading...</div>;
  }

  if (loading === LoadingStatus.Error) {
    return <div>Error occured while loading albums data.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {albums.map((album: Album, index) => (
          <div
            key={index}
            className="px-2 py-3 font-semibold border border-slate-200 rounded"
          >
            <Link href={`/basics/albums/${album.id}`}>{album.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

AlbumsList.pageHeadingText = "Albums";

export default AlbumsList;
