import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "zbwl00qp",
    dataset: "production",
    apiVersion: "2022-03-25",
    token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN,
    // token: "skzAQgJ5QPZLEjFeOtNZPIO8XOGy5twrQoYBh44Ecpg0AmL27XBInmb3YKNDE77CH4mJFV1erx4XIOnlC",
    useCdn: false
});

