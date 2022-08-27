import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={210}
    height={260}
    viewBox="0 0 210 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="30" y="30" rx="10" ry="10" width="150" height="90" />
    <rect x="30" y="192" rx="8" ry="8" width="80" height="25" />
    <rect x="30" y="136" rx="3" ry="3" width="150" height="15" />
    <rect x="30" y="155" rx="3" ry="3" width="90" height="16" />
    <rect x="118" y="185" rx="8" ry="8" width="32" height="32" />
  </ContentLoader>
);

export default Skeleton;
