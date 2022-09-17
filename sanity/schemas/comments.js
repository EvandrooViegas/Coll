export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'text',
        title: 'Title',
        type: 'string',
      },
    
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: {type: 'user'},
      },
     
      {
        name: 'answer',
        title: 'Answer',
        type: 'array',
        of: [{type: 'reference', to: {type: 'comment'}}],
      }
    ],
  
  }
  