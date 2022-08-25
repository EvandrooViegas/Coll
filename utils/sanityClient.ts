import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "zbwl00qp",
    dataset: "production",
    apiVersion: "2022-03-25",
    token: process.env.SANITY_AUTH_TOKEN,
    useCdn: false
});