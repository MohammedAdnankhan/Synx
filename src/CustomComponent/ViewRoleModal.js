import React, { useEffect, useState } from "react";
import { GetUserViewData, getToken } from "../Api/GetData";
import "../css/Modal.css";
import "../Pages/Role_Page/Role.css";
import { CROSSICON } from "../Global/Icons";
const ViewRoleModal = ({ setOpen, viewId }) => {
  const [viewData, setViewData] = useState([]);
  let token = getToken();
  function GetData() {
    GetUserViewData(`role/detail/${viewId}`, setViewData, token);
  }
  useEffect(() => {
    GetData();
  }, []);
  return (
    <div className="ModalViewRoleContainer">
      <div className="HeaderContainer">
        <span className="Viewtitletext">Roles Detail : {viewData?.name}</span>
        <div onClick={() => setOpen(false)}>
          <CROSSICON />
        </div>
      </div>
      <div className="Crd P20">
        <div className="inpuWiCont P20 Bdr">
          <div className="MidCenter Wid50">
            <span className="Til">Features</span>
          </div>
          <div className="MidCenter Wid50">
            <span className="Til">Actions</span>
          </div>
        </div>
      </div>
      <div className="FlxEnd Bdr P20 Bdr">
        <div className="inpuWiCont  Wid50 ">
          <div>
            <span className="Til Gr">View</span>
          </div>
          <div>
            <span className="Til Gr">Edit</span>
          </div>
          <div>
            {" "}
            <span className="Til Gr">Delete</span>
          </div>
        </div>
      </div>

      {viewData?.fields?.map((data, index) => (
        <div className="inpuWiCont P20 Bdr" key={index}>
          <div className="Srt Wid50">
            <span className="Til">{data?.tabName}</span>
          </div>
          <div className="SpB Wid50">
            {data.subs?.map((nestedData, nestedIndex) => (
              <div key={nestedIndex} className="Strt">
                {nestedData?.name == "View" ||
                nestedData?.name == "Edit" ||
                nestedData?.name == "Delete" ? (
                  <CheckBox state={true} />
                ) : (
                  <CheckBox dis={true} state={false} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewRoleModal;

export function CheckBox({ state, dis = true }) {
  return (
    <div className="ChkCont">
      {/* <label className="Label">{title}</label> */}
      <input
        type="checkbox"
        disabled={dis}
        className={dis ? "InputCheck Dis" : "InputCheck"}
        //   value={state}
        checked={state}
      />
    </div>
  );
}
