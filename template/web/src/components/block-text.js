import BaseBlockContent from "@sanity/block-content-to-react";
import React from "react";
import serializers from "./serializers";

const BlockText = ({ blocks }) => <BaseBlockContent blocks={blocks} serializers={serializers} />;

export default BlockText;
