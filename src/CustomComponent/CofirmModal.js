import React from "react";
import "../css/ConfirmModal.css";
import FeatherIcon from "feather-icons-react";

const CofirmModal = ({ handleTableData, handleClose }) => {
  return (
    <div className="DeleteContainer">
      {/* <div>
        <FeatherIcon icon="x-circle" className="Icon" />
      </div> */}
      <div>
        <span className="cmm">
          Are you sure you want to deactivate the Two Factor Authenticaion ?
        </span>
      </div>
      <div className="Mobtn">
        {" "}
        {/* btnContainer  class commented*/}
        <button className="deleteBtn delCol" onClick={handleTableData}>
          Confirm
        </button>
        <button className="deleteBtn" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CofirmModal;
