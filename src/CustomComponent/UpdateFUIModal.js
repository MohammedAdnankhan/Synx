import React, { useEffect, useState } from "react";
import "../css/Modal.css";
import "../Pages/FUI/FUI.css";
import { CROSSICON, SpinnerLoader } from "../Global/Icons";
import { regex } from "../Global/Regex";
import {
  CREATE_FUI_ADMIN,
  GETROLENAME,
  GET_FUI_DATA,
  INVITETEAM,
  getToken,
} from "../Api/GetData";
import { useNavigate } from "react-router";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const UpdateFuiModal = ({ setOpen, handleTableData, updateId }) => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [role, setRole] = useState("");
  const [memberRole, setMemberRole] = React.useState("");
  const [emailEr, setEmailEr] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [roleName, setroleName] = useState([]);
  const [RoleId, setRoleId] = useState("");

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [userIdEr, setUserIdEr] = useState("");
  const [passwordEr, setPasswordEr] = useState("");
  const [keyEr, setKeyEr] = useState("");
  const [dis, setDis] = useState(false);
  const [showPas, showPasswords] = useState(true);
  const [showPas1, showPasswords1] = useState(true);
  let token = getToken();

  function handleCreateFUI() {
    if (userId == "") {
      setUserIdEr("Please enter a valid UserId");
    } else {
      setUserIdEr("");
    }
    // if (password == "") {
    //   setPasswordEr("Please enter a valid Password");
    // } else {
    //   setPasswordEr("");
    // }
    if (key == "") {
      setKeyEr("Please enter a valid Key");
    } else {
      setKeyEr("");
    }
    if (key !== "" && userId !== "") {
      let data = {
        password: password,
        username: userId,
        apiKey: key,
      };
      setOpen(false);

      CREATE_FUI_ADMIN(
        token,
        `fui/update/${updateId?._id}`,
        data,
        "FIU Updated",
        handleTableData
      );
    }
  }

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

  function GetData() {}
  useEffect(() => {
    console.log(updateId);
    setKey(updateId?.apiKey);
    setUserId(updateId?.username);
  }, []);

  return (
    <div>
      <div className="HeaderContainer">
        <span className="Viewtitletext">FIU Update</span>
        <div onClick={() => setOpen(false)}>
          <CROSSICON />
        </div>
      </div>

      <div className="">
        <div className="Flx Rsp">
          <div className="fildContainer W50">
            <div className="MB20">
              {" "}
              <span className="Heading">User Id</span>
            </div>
            <div className="externalInput ">
              <input
                className="internalInput"
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User Id"
                value={userId ? userId : ""}
                disabled={dis}
              />
            </div>
            {userIdEr && <span className="ER">{userIdEr}</span>}
          </div>
          <div className="fildContainer W50">
            <div className="MB20">
              {" "}
              <span className="Heading">Password</span>
            </div>
            <div className="externalInput FlxInput">
              <input
                className="internalInput"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                value={password}
                disabled={dis}
                type={showPas ? "password" : "text"}
              />
              {showPas ? (
                <VisibilityOffIcon
                  style={{
                    cursor: "pointer",
                    color: "grey",
                  }}
                  onClick={() => showPasswords(false)}
                />
              ) : (
                <RemoveRedEyeIcon
                  style={{
                    cursor: "pointer",
                    color: "grey",
                  }}
                  onClick={() => showPasswords(true)}
                />
              )}
            </div>
            {passwordEr && <span className="ER">{passwordEr}</span>}
          </div>
        </div>
        <div className="fildContainer W50">
          <div className="MB20">
            {" "}
            <span className="Heading">Key</span>
          </div>
          <div className="externalInput FlxInput Pd8">
            <VpnKeyIcon className="Gry" />
            <input
              className="internalInput"
              onChange={(e) => setKey(e.target.value)}
              placeholder="Key"
              value={key ? key : ""}
              type={showPas1 ? "password" : "text"}
              disabled={dis}
            />

            {showPas1 ? (
              <VisibilityOffIcon
                style={{
                  cursor: "pointer",
                  color: "grey",
                }}
                onClick={() => showPasswords1(false)}
              />
            ) : (
              <RemoveRedEyeIcon
                style={{
                  cursor: "pointer",
                  color: "grey",
                }}
                onClick={() => showPasswords1(true)}
              />
            )}
          </div>
          {keyEr && <span className="ER">{keyEr}</span>}
        </div>
      </div>

      <div
        className="viewRowContainer "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="IniviteBtn"
          onClick={handleCreateFUI}
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

export default UpdateFuiModal;
