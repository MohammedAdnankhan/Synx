import React from "react";
import "../css/Layout.css";
const Title = ({ title }) => {
  return (
    <div className="HeaderCon">
      <span className="HeaderFont">{title}</span>
    </div>
  );
};

export default Title;
