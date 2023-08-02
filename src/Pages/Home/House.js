import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./House.css";
const House = () => {
  const navigate = useNavigate();
  const location = useLocation();
  var Tok = "";
  useEffect(() => {
    const paths = location.pathname.split("/"); // Split pathname into an array of segments
    const lastPath = paths[paths.length - 1];
    Tok = lastPath;
  }, []);

  return (
    <div className="houseContainer ">
      <div className="verificationCard H60W40">
        <div className="contA">
          <div className="centerit">
            <span className="TitleHe">Glorep</span>
          </div>
          <div className="centerit">
            <span className="Textit">Identity Verification</span>
          </div>
          <div className="centerit">
            <span className="ST">
              Your going to pass Identity verification for glorep. Please click
              the button to start
            </span>
          </div>
        </div>
        <div className="centerit W100">
          <button
            className="fillBtn W60 CtB"
            onClick={() => navigate(`/verification/${Tok}`)}
          >
            Start Identity Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default House;
