import { getLinkPreview } from 'link-preview-js';
import { useState } from 'react';
import React from 'react';
import { ICollections } from '../../../types/ICollections';
import { client } from '../../../utils/sanityClient';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createClient } from 'next-sanity';
import axios from 'axios';
import puppeteer from "puppeteer";
// Add this in node_modules/react-dom/index.js



export default async function Handler(req:any, res:any) {

    // const {url} = req.body
    if(req.method == "POST") {
        // try {
        //     const url = req.body.url
        //     // const previewData = await linkPreviewGenerator(url)
        //     // res.status(200).json(previewData)
        // } catch (error) {
            
        //     console.log(error)  
        // }

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

