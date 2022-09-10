import { getLinkPreview } from 'link-preview-js';
import { useState } from 'react';
import React from 'react';
import { ICollections } from '../../../types/ICollections';
import { client } from '../../../utils/sanityClient';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createClient } from 'next-sanity';
import axios from 'axios';

// Add this in node_modules/react-dom/index.js



export default async function Handler(req:any, res:any) {

    if(req.method == "POST") {

        try {
            let { url } = req.body
            var response;
            await getLinkPreview(url).then((data:any) =>
            response = data
          );
        
            res.status(200).json({response});
        } catch (error) {
            res.status(500).json({
              error: JSON.stringify(error),
            });
        }
    }
    

    
}

