// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dataFetcher } from '@/lib/data-fetcher'
import { IProduct, ProductsReponse } from '@/lib/types';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    products: IProduct[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductsReponse>
) {
    const response = await dataFetcher<ProductsReponse>('https://jsonplaceholder.typicode.com/todos');
    res.status(200).json(response.data);
}
