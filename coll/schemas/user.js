export default {
    name: "user",
    type: "document", 
    title: "User",

    fields: [
        {
            name: "followers", 
            title: "Followers",
            type: "array",
            of: [
                {
                    name: "user", 
                    title: "Item",
                    _type: "item",
                    type: "object",

                    fields: [
                        {
                            name: "email", 
                            title: "Email",
                            type: "string"
                        },
                
                
                        {
                            name: "image", 
                            title: "Image",
                            type: "string"
                        },
                
                        {
                            name: "username", 
                            title: "Username",
                            type: "string"
                        },
                
                        {
                            name: "uid", 
                            title: "Uid",
                            type: "string"
                        },
                    ]
                },
            ],

        },

        {
            name: "following", 
            title: "Following",
            type: "array",
            of: [
                {
                    name: "user", 
                    title: "Item",
                    _type: "item",
                    type: "object",

                    fields: [
                        {
                            name: "email", 
                            title: "Email",
                            type: "string"
                        },
                
                
                        {
                            name: "image", 
                            title: "Image",
                            type: "string"
                        },
                
                        {
                            name: "username", 
                            title: "Username",
                            type: "string"
                        },
                
                        {
                            name: "uid", 
                            title: "Uid",
                            type: "string"
                        },
                    ]
                },
            ],

        },

        {
            name: "email", 
            title: "Email",
            type: "string"
        },

        {
            name: "password", 
            title: "Password",
            type: "string"
        },


        {
            name: "image", 
            title: "Image",
            type: "string"
        },

        {
            name: "username", 
            title: "Username",
            type: "string"
        },

        {
            name: "uid", 
            title: "Uid",
            type: "string"
        },


    ]
}