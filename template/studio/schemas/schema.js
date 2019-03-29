// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import category from './category'
import person from './person'
import project from './project'
import siteSettings from './siteSettings'

// Object types
import bioPortableText from './types/bioPortableText'
import figure from './types/figure'
import projectMember from './types/projectMember'
import projectPortableText from './types/projectPortableText'
import simplePortableText from './types/simplePortableText'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'blog',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    bioPortableText,
    figure,
    projectMember,
    projectPortableText,
    simplePortableText,
    // The following are document types which will appear
    // in the studio.
    category,
    person,
    project,
    siteSettings
  ])
})
