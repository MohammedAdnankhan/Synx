import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "../css/Modal.css";
import { CROSSICON, SpinnerLoader } from "../Global/Icons";
import { regex } from "../Global/Regex";
import { GETROLENAME, INVITETEAM, getToken } from "../Api/GetData";
import { useNavigate } from "react-router";
const InviteTeam = ({ setOpen, handleTableData }) => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [role, setRole] = useState("");
  const [memberRole, setMemberRole] = React.useState("");
  const [emailEr, setEmailEr] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [roleName, setroleName] = useState([]);
  const [RoleId, setRoleId] = useState("");
  const navigate = useNavigate();
  let token = getToken();
  async function handleInvite() {
    let validEmail = regex(email);

    if (!validEmail) {
      setEmailEr("Invalid Email");
    } else {
      setEmailEr();
    }
    if (memberRole === "") {
      setRole("Please select Role");
    } else {
      setRole("");
    }
    if (validEmail && memberRole) {
      setShowLoader(true);

      INVITETEAM(
        {
          email: email,
          roles: memberRole,
          id: RoleId,
        },
        "Invite sent successfully",
        token
      )
        .then(() => {
          setOpen(false);
          handleTableData();
        })
        .catch(() => {
          setOpen(false);
          setShowLoader(false);
        });
    }
  }

  const handleChange = (id, name) => {
    setMemberRole(name);
    setRoleId(id);
  };
  function GetData() {
    GETROLENAME(token, setroleName);
  }
  useEffect(() => {
    GetData();
  }, []);
  return (
    <div>
      <div className="HeaderContainer">
        <span className="Viewtitletext">Invite</span>
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
          {/* <div>
            <span className="viewTITLE">Email</span>
          </div> */}
          <div
            className="InputexternalViewConatainer"
            style={{ padding: "15px" }}
          >
            <input
              className="internalInputField"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <span className="ERR">{emailEr !== "" ? emailEr : null}</span>
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
          onClick={handleInvite}
          style={{
            width: "30%",
            background: showLoader ? "grey" : " #6b5eff",
            transition: "background-color 0.3s ease",
          }}
          disabled={showLoader}
        >
          Invite
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default InviteTeam;
