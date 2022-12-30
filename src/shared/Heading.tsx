import React from "react";

import "./Heading.scss";

type HeadingProps = {
  title: string;
};

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return <h2 className="heading">{title}</h2>;
};

export default Heading;
