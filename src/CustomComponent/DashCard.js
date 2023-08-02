import React from "react";
import FeatherIcon from "feather-icons-react";

const DashCard = ({ title, icon, number, Icon, color, setcolor }) => {
  return (
    <div
      className={title == color ? "dashCard t1" : "dashCard"}
      onClick={() => setcolor(title)}
    >
      <div className="p1 cnt fs">{Icon}</div>
      <div className="cl rw Gp">
        <div className="p2 cnt">
          {" "}
          <span className="largefont">{title}</span>
        </div>
        <div className="p1 cnt rgt">
          <span className="largenumber">{number}</span>
        </div>
      </div>
    </div>
  );
};

export default DashCard;
