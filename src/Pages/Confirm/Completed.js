import React from "react";
import { RIGHTICON } from "../../Global/Icons";
import "./Confirm.css";
const Completed = () => {
  return (
    <div className="houseContainer ">
      <div className="verificationCard  H40W70 ">
        <RIGHTICON />
        <div className="tl">
          <span className="TH">Liveness test completed</span>
        </div>
      </div>
    </div>
  );
};

export default Completed;
