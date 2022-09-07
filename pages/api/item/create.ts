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
  res: NextApiResponse
) {
    if(req.method == "POST") {
        const item = req.body.item
        const collection = req.body.collection
        const id = req.body.id
        const haveItems = req.body.haveItems  

        try {
            if(haveItems) {
                const result = await client
                .patch(id)
                .set({
                    items: [item, ...collection.items]
                })
                .commit();
                res.status(200)
            } else {
                const result = await client
                .patch(id)
                .set({
                    items: [item]
                })
                .commit();
                res.status(200).json({msg: "Item created"})
            }
        } catch (error) {
            console.log(error)
        }
    }
}
