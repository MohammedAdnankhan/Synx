import React from "react";
import { useNavigate } from "react-router-dom";
import { CHECK, PENDING } from "../../Global/Icons";
import "./SelectDoc.css";
const SelectDoc = () => {
  const navigate = useNavigate();
  return (
    <div className="houseContainer ">
      <div className="verificationCard">
        <div>
          <span className="HA">Select ID Document</span>
        </div>
        <div>
          <span className="ST">
            Make sure that all information is within the borders of the scanner.
          </span>
        </div>

        <div className="W100">
          <button className="SLTBTN NB">
            <span className="btnTxt">Face Verified</span>
            <CHECK />
          </button>
          <button className="SLTBTN NB">
            <span className="btnTxt">Passport Verified</span>
            <CHECK />
          </button>
          <button
            className="SLTBTN NB"
            onClick={() => navigate("/liveliness-test")}
          >
            <span className="btnTxt">Liveliness Test</span>
            <PENDING />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDoc;
