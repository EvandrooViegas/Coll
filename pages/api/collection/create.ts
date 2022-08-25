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
    if(req.method == "POST") {
        const {collection, author} = req.body

    try {
        let res:undefined | any
        await client.create(collection)
        res = await client.fetch(`*[_type == "collection" && author.email == ${author.email}]`)
        res.status(200).json(res)
    } catch (error) {
        console.log(error)
    }
    }
}
