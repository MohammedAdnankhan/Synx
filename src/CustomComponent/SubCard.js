import React from "react";

const SubCard = ({ title, number }) => {
  return (
    <div className="subCard">
      <div className="p2 cnts">
        {" "}
        <span className="largeFont ">{title}</span>
      </div>
      <div className="p1 cnte">
        <span className="largeNumber">{number}</span>
      </div>
    </div>
  );
};

export default SubCard;
