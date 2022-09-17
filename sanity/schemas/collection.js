export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },

    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'user'},
    },

    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },

    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'reference', to: {type: 'item'}}],
    },

    {
      name: 'comment',
      title: 'Comment',
      type: 'array',
      of: [{type: 'reference', to: {type: 'comment'}}],
    },

  ],

}
