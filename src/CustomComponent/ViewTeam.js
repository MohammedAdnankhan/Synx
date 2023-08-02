import React, { useEffect, useState } from "react";
import { GetUserViewData, getToken } from "../Api/GetData";
import "../css/Modal.css";
import { CROSSICON } from "../Global/Icons";
const ViewTeam = ({ setOpen, viewId }) => {
  const [viewData, setViewData] = useState({});
  let token = getToken();
  useEffect(() => {
    GetUserViewData(`team/detail/${viewId}`, setViewData, token);
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
        <div className="halfLenght">
          <div>
            <span className="viewTITLE">Email</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.email}</span>
          </div>
        </div>
      </div>
      <div className="viewRowContainer">
        <div className="halfLenght">
          <div>
            <span className="viewTITLE">Role</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.roles}</span>
          </div>
        </div>
        <div className="halfLenght">
          <div>
            <span className="viewTITLE">Organization Name</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.organizationId?.organizationName}</span>
          </div>
        </div>
      </div>
      <div className="viewRowContainer">
        <div className="halfLenght">
          <div>
            <span className="viewTITLE">Status</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.status}</span>
          </div>
        </div>
        <div className="halfLenght">
          <div>
            <span className="viewTITLE">Verified Date</span>
          </div>
          <div className="externalViewConatainer">
            <span>{viewData?.createdAt?.substr(0, 10)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeam;
