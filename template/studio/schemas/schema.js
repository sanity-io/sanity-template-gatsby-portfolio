// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import siteSettings from './siteSettings'
import person from './person'
import category from './category'
import project from './project'

// Object types
import projectMember from './types/projectMember'
import figure from './types/figure'
import portableText from './types/portableText'
import simplePortableText from './simplePortableText'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'blog',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    simplePortableText,
    portableText,
    category,
    figure,
    person,
    project,
    projectMember,
    siteSettings

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
})
