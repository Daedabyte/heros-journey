import React from "react";
import "./SectionBreak.css";

const SectionBreak = ({ backgroundImage }) => {
  const style = {
    backgroundImage: `url('${backgroundImage}')`,
  };

  return <div className="section-break" style={style}></div>;
};

export default SectionBreak;
