export default {
    name: "follow",
    type: "document", 
    title: "Follow",

    fields: [

        {
            name: "Fallow", 
            title: "Text",
            type: "string"
        },
        {
            name: "author", 
            title: "Author",
            type: "array",
            of: [
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


    ]
}