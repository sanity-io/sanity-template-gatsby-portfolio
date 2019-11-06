const {isFuture} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = async ({graphql, actions, reporter}) => {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityProject(filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
            categories {
              id
              title
              slug {
                current
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []

  createProjectPages({projectEdges, createPage, reporter})
  createCategoryPages({projectEdges, createPage, reporter})
}

const createProjectPages = ({projectEdges, createPage, reporter}) => {
  projectEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/project/${slug}/`

      reporter.info(`Creating project page: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/project.js'),
        context: {id}
      })
    })
}

const createCategoryPages = ({projectEdges, createPage, reporter}) => {
  const allCategories = new Set()

  projectEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(({node: {categories}}) => {
      if (!Array.isArray(categories)) return
      categories.forEach(category => allCategories.add(category))
    })

  allCategories.forEach(category => {
    const id = category.id
    const slug = category.slug.current
    const path = `/category/${slug}`

    reporter.info(`Creating category page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/category.js'),
      context: {category, id}
    })
  })
}
