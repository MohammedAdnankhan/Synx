import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "./FUI.css";
import { useNavigate } from "react-router";
import { Modal } from "@mui/material";
import { getToken } from "../../Global/Token";
import ClearIcon from "@mui/icons-material/Clear";
import { AddFUI, GetSingleFUI } from "../../Global/Create";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  width: "70%",
  bgcolor: "background.paper",
  // border: "1px solid #000",
  borderRadius: "5px",

  p: 4,
};

const InviteTeam = ({ setOpen, handleTableData, Id, GetData }) => {
  const [country, setCountry] = useState("");
  const [countryEr, setCountryEr] = useState("");
  const [link, setlink] = useState("");
  const [linkEr, setlinkEr] = useState("");
  const [role, setRole] = useState("");
  const [rolememberRole, setMemberRole] = React.useState("");
  const [emailEr, setEmailEr] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [roleName, setroleName] = useState([]);
  const [RoleId, setRoleId] = useState("");
  const navigate = useNavigate();
  let token = getToken();
  async function handleUpdate() {
    let validEmail;

    if (country == "") {
      setCountryEr("Please enter a valie country");
    } else {
      setCountryEr("");
    }
    if (link === "") {
      setlinkEr("Please enter a valid URL");
    } else {
      setlinkEr("");
    }
    if (country && link) {
      setShowLoader(true);
      try {
        await AddFUI(
          token,
          {
            countryName: country,
            link: link,
          },
          GetData,
          "FIU Updated Successfully",
          `fui/update/${Id}`,
          setOpen
        );
        setShowLoader(false);
      } catch (err) {
        setShowLoader(false);
      }
    }
  }

  function getData() {
    GetSingleFUI(token, `fui/get/${Id}`)
      .then((res) => {
        setCountry(res?.countryName);
        setlink(res?.link);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="HeaderContainer Flx">
        <span className="Viewtitletext">Update</span>
        <div onClick={() => setOpen(false)}>
          <ClearIcon />
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
          <div className={countryEr ? "ERBR externalInput" : "externalInput"}>
            <input
              className="internalInput"
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              value={country}
            />
          </div>
          {/* <span className="ERR">{countryEr !== "" ? countryEr : null}</span> */}
        </div>
        <div className="halfLenghtno" style={{ width: "48%" }}>
          <div className={linkEr ? "ERBR externalInput" : "externalInput"}>
            <input
              className="internalInput"
              onChange={(e) => setlink(e.target.value)}
              placeholder="URL"
              value={link}
            />
          </div>
          {/* <span className="ERR">{linkEr !== "" ? linkEr : null}</span> */}
        </div>
      </div>
      <div
        className="viewRowContainer "
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className="btnSub MB20"
          onClick={handleUpdate}
          disabled={showLoader}
          style={{ background: showLoader ? "grey" : " #6b5eff" }}
        >
          Update
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default InviteTeam;

export function UpdateFUI({
  open,
  handleClose,
  setOpen,
  handleTableData,
  Id,
  GetData,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <InviteTeam
          setOpen={setOpen}
          handleTableData={handleTableData}
          Id={Id}
          GetData={GetData}
        />
      </Box>
    </Modal>
  );
}
