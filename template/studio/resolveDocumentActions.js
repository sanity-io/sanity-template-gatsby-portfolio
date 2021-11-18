// resolveDocumentActions.js

// import the default document actions
import defaultResolve from "part:@sanity/base/document-actions";

import { gatsbyPreviewAction } from "./gatsbyPreviewAction";

export default function resolveDocumentActions(props) {
  return [...defaultResolve(props), gatsbyPreviewAction];
}
