import { ICollections } from './../../../types/ICollections';
import { client } from './../../../utils/sanityClient';
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
    if(req.method == "PUT") {
        const {id, collection} = req.body
        const filtredCollection = collection.items.filter((item:any) => item._key !== id)

        try {
                await client
                .patch(collection._id)
                .set({
                items: [...filtredCollection]
                })
                .commit();
                console.log("deleted")
                res.status(200)
        } catch (error:any) {
            console.log(error.message)
        }
    }
}
