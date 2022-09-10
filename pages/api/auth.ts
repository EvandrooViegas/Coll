import { client } from "../../utils/sanityClient"

export default async function Handler(req:any, res:any) {

    if(req.method == "POST") {

        const {user} = req.body

        try {
           
        } catch (error:any) {
            console.log(error.message)
        }
    }
    

    
}

