// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dataFetcher } from '@/lib/data-fetcher'
import { IProduct, ISpeaker, ProductsReponse, SpeakersResponse } from '@/lib/types';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    speakers: ISpeaker[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SpeakersResponse>
) {
    const response = await dataFetcher<SpeakersResponse>('https://dummyjson.com/users');
    res.status(200).json(response.data);
}
