import React from "react";
import "../css/Modal.css";
const DeleteModal = ({ handleClose, handleDelte, handleTableData }) => {
  return (
    <div className="DeleteContainer">
      <div>
        <span className="exFont">Delete</span>
      </div>
      <div>
        <span className="boldtext">Are you sure you want to delete ?</span>
      </div>
      <div className="flip">
        {" "}
        {/* btnContainer  class commented*/}
        <button className="deleteBtn delCol" onClick={handleTableData}>
          Delete
        </button>
        <button className="deleteBtn" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
