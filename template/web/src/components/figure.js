import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";
import clientConfig from "../../client-config";

import * as styles from "./figure.module.css";

export function Figure({ node }) {
  if (!node.asset) {
    return null;
  }

  const imageData = getGatsbyImageData(node.asset, { maxWidth: 675 }, clientConfig.sanity);

  return (
    <figure className={styles.root}>
      <GatsbyImage image={imageData} alt={node.alt} />
      {node.caption && <figcaption>{node.caption}</figcaption>}
    </figure>
  );
}
