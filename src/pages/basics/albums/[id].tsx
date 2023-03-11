import { Album, IImage, NextPageWithLayout } from "@/lib/types";
import { dataFetcher } from "@/lib/data-fetcher";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";

type PageProps = {
  album: Album;
};

const AlbumPage: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const [images, setImages] = useState<Array<IImage>>([]);

  useEffect(() => {
    dataFetcher<Array<IImage>>(
      `https://jsonplaceholder.typicode.com/albums/${props.album.id}/photos`
    ).then((response) => {
      console.log(response.data);
      setImages(response.data);
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl">{props.album.title}</h1>
      <section className="mt-8 pb-16">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          {images.map((image: IImage, index) => (
            <li key={index} className="relative">
              <div
                className={clsx(
                  `focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100`,
                  `aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100`
                )}
              >
                <img
                  src={image.thumbnailUrl}
                  alt={image.title}
                  className="group-hover:opacity-75 pointer-events-none object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default AlbumPage;

export async function getStaticPaths() {
  const response = await dataFetcher<Array<Album>>(
    "https://jsonplaceholder.typicode.com/albums"
  );
  const paths = response.data.map((album: Album) => ({
    params: {
      id: album.id.toString(),
    },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(params: any) {
  const url = `https://jsonplaceholder.typicode.com/albums/${params.params.id}`;
  const response = await dataFetcher<Album>(url);
  const album = response.data;
  return {
    props: { album },
  };
}
