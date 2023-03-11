import useAlbumsData from "@/hooks/use-albums-data";
import { Album, LoadingStatus } from "@/lib/types";
import { createContext, ReactElement } from "react";

type AlbumsContextProps = {
  albums: Array<Album>,
  loading: LoadingStatus
}

const contextDefault: AlbumsContextProps = {
  albums: [],
  loading: LoadingStatus.Loading,
};

export const AlbumsDataContext = createContext(contextDefault);

export const AlbumsDataProvider = ({ children }: { children: ReactElement }) => {
  const url = 'https://jsonplaceholder.typicode.com/albums';
  const { data, loading } = useAlbumsData(url);

  const value: AlbumsContextProps = {
    albums: data,
    loading: loading
  }

  return (
    <AlbumsDataContext.Provider value={value} >
      {children}
    </AlbumsDataContext.Provider>
  );
}