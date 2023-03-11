import { dataFetcher } from "@/lib/data-fetcher";
import { Album, LoadingStatus } from "@/lib/types";
import { useEffect, useState } from "react";

const useAlbumsData = (url: string) => {
  //const url: string = "https://jsonplaceholder.typicode.com/albums";

  if (!url || url.length === 0)
    throw new Error("useAlbumsData - no url passed");

  const [data, setData] = useState<Array<Album>>([]);
  const [loading, setLoading] = useState<LoadingStatus>(LoadingStatus.Loading);

  useEffect(() => {
    setLoading(LoadingStatus.Loading);
    dataFetcher<Array<Album>>(url).then((response) => {
      setLoading(LoadingStatus.Success);
      setData(response.data);
    });
  }, [url]);

  return { data, loading };
};

export default useAlbumsData;
