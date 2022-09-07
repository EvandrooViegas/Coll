export default {
    name: "collection",
    type: "document", 
    title: "Collection",

    fields: [
        {
            name: "items", 
            title: "Items",
            type: "array",
            _type: "items",
            of: [
                {
                    name: "item", 
                    title: "Item",
                    _type: "item",
                    type: "object",

                    fields: [
                        {
                            name: "text", 
                            title: "Text",
                            type: "string"
                        },

                        {
                            name: "author", 
                            title: "Author",
                            type: "object",
                            fields: [
                                {
                                    name: "name",
                                    title: "Name",
                                    type: "string"
                                },

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
                                    name: "uid",
                                    title: "Uid",
                                    type: "string"
                                },

                           
                            ],
                        },
                
                        {
                            name: "content", 
                            title: "Content",
                            type: "string"
                        },

                        {
                            name: "contentType", 
                            title: "Content Type",
                            type: "string"
                        },

                        {
                            name: "description", 
                            title: "Description",
                            type: "string"
                        }
                    ]
                },
            ],

        },

        {
            name: "text", 
            title: "Text",
            type: "string"
        },
        {
            name: "author", 
            title: "Author",
            type: "object",
            fields: [
                {
                    name: "name",
                    title: "Name",
                    type: "string"
                },

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
            ],
        },

        {
            name: "hashtags", 
            title: "Hashtags",
            type: "string"
        },

        {
            name: "description", 
            title: "Description",
            type: "string"
        },

        {
            name: "image", 
            title: "Image",
            type: "string"
        },

        {
            name: "private", 
            title: "Private",
            type: "boolean"
        }
    ]
}