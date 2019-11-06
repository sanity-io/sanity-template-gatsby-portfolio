import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import ProjectPreviewGrid from '../components/project-preview-grid'

export const query = graphql`
  query CategoryTemplateQuery($id: String!) {
    projects: allSanityProject(
      sort: {fields: [publishedAt], order: DESC}
      filter: {
        categories: {elemMatch: {id: {eq: $id}}}
        slug: {current: {ne: null}}
        publishedAt: {ne: null}
      }
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const ProjectTemplate = props => {
  const {data, errors, pageContext} = props

  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  const {category} = pageContext

  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {category && <SEO title={category.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <Container>
        {projectNodes && (
          <ProjectPreviewGrid title={`${category.title} projects`} nodes={projectNodes} />
        )}
      </Container>
    </Layout>
  )
}

export default ProjectTemplate
