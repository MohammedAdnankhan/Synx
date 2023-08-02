import React, { useEffect, useState } from "react";
import { GetUserViewData, getToken } from "../Api/GetData";
import "../css/Modal.css";
import { CROSSICON } from "../Global/Icons";
const ViewDetailModal = ({ setOpen, viewId }) => {
  const [viewData, setViewData] = useState({});
  let tok = getToken();
  useEffect(() => {
    GetUserViewData(`user/detail/${viewId}`, setViewData, tok);
  }, []);

  return (
    <div>
      <div className="HeaderContainer">
        <span className="Viewtitletext">User Detail</span>
        <div onClick={() => setOpen(false)}>
          <CROSSICON />
        </div>
      </div>

      <div className="viewRowContainer">
        <div className="halfLenght">
          <div>
            <span className="viewTITLE">Name</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.name}</span>
          </div>
        </div>
        {/* <div className="halfLenght">
          <div>
            <span className="viewTITLE">Category</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.category}</span>
          </div>
        </div> */}
        <div className="halfLenght">
          <div>
            <span className="viewTITLE">Verified Date</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.createdAt?.substr(0, 10)}</span>
          </div>
        </div>
      </div>
      <div className="viewRowContainer">
        <div className="halfLenght">
          <div>
            <span className="viewTITLE">Country</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.country}</span>
          </div>
        </div>
        <div className="halfLenght">
          <div>
            <span className="viewTITLE">Document Name</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.document?.[0]?.documentName}</span>
          </div>
        </div>
      </div>
      <div className="viewRowContainer">
        {/* <div className="halfLenght">
          <div>
            <span className="viewTITLE">Document Type</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.document?.[0]?.documentType}</span>
          </div>
        </div> */}
        {/* <div className="halfLenght">
          <div>
            <span className="viewTITLE">Verified Date</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.createdAt?.substr(0, 10)}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ViewDetailModal;
