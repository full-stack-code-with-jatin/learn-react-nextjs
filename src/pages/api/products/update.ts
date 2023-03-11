// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AxiosDataFetcher, dataFetcher } from '@/lib/data-fetcher'
import { IProduct, ProductsReponse } from '@/lib/types';
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router';

type Data = {
    product: IProduct
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query;
    const { data } = JSON.parse(req.body);
    console.log(data);
    const axiosDataFetch = new AxiosDataFetcher();
    const axiosResponse = await axiosDataFetch.put<IProduct>(`https://dummyjson.com/products/${id}`,
        data);
    res.status(200).json({ product: axiosResponse.data });
}
