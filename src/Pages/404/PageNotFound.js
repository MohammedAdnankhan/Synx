import React from "react";
import "./PageNotFound.css";
import { SAD_EMOJI } from "../../Global/Icons";
const PageNotFound = () => {
  return (
    <div className="houseContainer ">
      <div className="verificationCard NoSh H60W40">
        <SAD_EMOJI />
        <span className="ErNo">404</span>
        <span className="ErText">Page not found</span>
      </div>
    </div>
  );
};

export default PageNotFound;
