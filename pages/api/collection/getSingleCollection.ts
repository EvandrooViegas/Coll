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
        const id = req.body.id
        console.log(id)
        try {
            let response:undefined | any
            await client.fetch(`*[_id == "${id}"]`).then((res) => {
                response = res
                console.log(`collection was created, document ID is ${res._id}`);
            })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }
}
