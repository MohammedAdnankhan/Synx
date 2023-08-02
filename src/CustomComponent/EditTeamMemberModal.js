import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../css/Modal.css";
import { CROSSICON } from "../Global/Icons";
import {
  GETROLENAME,
  GetEditViewData,
  getToken,
  UPDATETEAMMEMBER,
} from "../Api/GetData";
import { useNavigate } from "react-router";
const EditTeamMemberModal = ({ setOpen, handleTableData, viewId }) => {
  const [role, setRole] = useState("");
  const [memberRole, setMemberRole] = React.useState("");
  const [status, setStatus] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [roleName, setroleName] = useState([]);
  const [RoleId, setRoleId] = useState("");

  let token = getToken();

  function handleStats(status) {
    setStatus(status);
  }

  const handleChange = (id, name) => {
    setMemberRole(name);
    setRoleId(id);
  };
  function GetData() {
    GETROLENAME(token, setroleName);
  }
  function handleUpdateRoles() {
    setShowLoader(true);
    UPDATETEAMMEMBER(
      `update/inner/team/${viewId}`,
      {
        status: status,
        roleId: RoleId,
        roles: memberRole,
      },
      token,
      setOpen,
      handleTableData,
      setShowLoader
    );
  }
  useEffect(() => {
    GetData();
    GetEditViewData(`team/detail/${viewId}`, token).then((res) => {
      setMemberRole(res?.roles);
      setStatus(res?.status);
      setRoleId(res?.roleId);
    });
  }, []);
  return (
    <div>
      {/* <SpinnerLoader state={showLoader} /> */}

      <div className="HeaderContainer">
        <span className="Viewtitletext">Edit Team Member</span>
        <div onClick={() => setOpen(false)}>
          <CROSSICON />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "3%",
        }}
      >
        {" "}
        <div className="halfLenghtno" style={{ width: "48%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              //   onChange={(event) => handleStats(event)}
            >
              <MenuItem
                value={"active"}
                onClick={(event) => handleStats("active")}
              >
                active
              </MenuItem>
              <MenuItem
                value={"inactive"}
                onClick={(event) => handleStats("inactive")}
              >
                inactive
              </MenuItem>
            </Select>
          </FormControl>
          {/* </div> */}
        </div>
        <div className="halfLenghtno" style={{ width: "48%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={memberRole}
              label="Role"
              // onChange={(event) => handleChange(event)}
            >
              {roleName?.map((data, index) => (
                <MenuItem
                  value={data?.name}
                  key={index}
                  onClick={(event) => handleChange(data.id, data.name)}
                >
                  {data?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* </div> */}
          <span className="ERR">{role !== "" ? role : null}</span>
        </div>
      </div>
      <div
        className="viewRowContainer "
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className="IniviteBtn"
          onClick={handleUpdateRoles}
          style={{
            width: "30%",
            background: showLoader ? "grey" : " #6b5eff",
            transition: "background-color 0.3s ease",
          }}
          disabled={showLoader}
        >
          Update
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default EditTeamMemberModal;
