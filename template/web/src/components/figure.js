import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../client-config'

import styles from './figure.module.css'

export default ({node}) => {
  if (!node.asset) {
    return null
  }

  const fluidProps = getFluidGatsbyImage(node.asset._ref, {maxWidth: 675}, clientConfig.sanity)

  return (
    <figure className={styles.root}>
      <Img fluid={fluidProps} alt={node.alt} />
      {node.caption && <figcaption>{node.caption}</figcaption>}
    </figure>
  )
}
