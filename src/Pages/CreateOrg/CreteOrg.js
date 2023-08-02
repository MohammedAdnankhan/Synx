import React from "react";
import Title from "../../CustomComponent/Title";
import "./CreateOrg.css";
const CreteOrg = () => {
  return (
    <>
      <Title title="Create Organization" />
      <div className="centit">
        <div className="CreateContainer">
          <div className="ViewFieldContainer">
            <span className="secondaryFont">Organisation Name.</span>
            <div className="inputexternalContainerCreate">
              <input className="inputinterContainer" />
            </div>
          </div>
          <div className="ViewFieldContainer">
            <span className="secondaryFont">Organisation Id</span>
            <div className="inputexternalContainerCreate">
              <input className="inputinterContainer" />
            </div>
          </div>
          <div className="ViewFieldContainer">
            <span className="secondaryFont">Profile Status</span>
            <div className="inputexternalContainerCreate">
              <input className="inputinterContainer" />
            </div>
          </div>

          <div className="ViewFieldContainer">
            <span className="secondaryFont">Category</span>
            <div className="inputexternalContainerCreate">
              <input className="inputinterContainer" />
            </div>
          </div>
          <div className="ViewFieldContainer">
            <span className="secondaryFont">Registration Date</span>
            <div className="inputexternalContainerCreate">
              <input className="inputinterContainer" />
            </div>
          </div>
          <div className="ViewFieldContainer">
            <span className="secondaryFont">Type of Subcription</span>
            <div className="inputexternalContainerCreate">
              <input className="inputinterContainer" />
            </div>
          </div>
          <div className="mt1">
            <button className="btnBack">Create</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreteOrg;
