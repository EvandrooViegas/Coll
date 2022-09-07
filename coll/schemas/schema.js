// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import Collection from "./collection"
import Fallowed from "./Fallowed"
import Fallowing from "./Fallowing"
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',

  types: schemaTypes.concat([
    Collection,
    Fallowing,
    Fallowed

  ]),
})
