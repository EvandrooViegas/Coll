import { client } from '../../../utils/sanityClient';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'next-sanity';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method == "POST") {
        const {id} = req.body
   
        try {
            await client
            .delete({query: `*[_type == "collection" && _id == "${id}"]`})
            .catch(console.error)
            res.status(200)
        } catch (error) {
            console.log("b-err:", error)
        }
    }
}
