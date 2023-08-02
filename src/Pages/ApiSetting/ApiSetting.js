import "./ApiSetting.css";
import Modal from "@mui/material/Modal";
import { DELETEICON } from "../../Global/Icons";
import Title from "../../CustomComponent/Title";
import React, { useEffect, useRef, useState } from "react";
import DeleteModal from "../../CustomComponent/DeleteModal";
import PageContainer from "../../components/container/PageContainer";
import {
  ADD_URL,
  getToken,
  GET_URL,
  DEL_URL,
  GETADMINAMEEMAIL,
} from "../../Api/GetData";
import { REGENERATE_KEY, DELETE_KEY } from "../../Api/Getkey";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AutorenewIcon from "@mui/icons-material/Autorenew";
const ApiSetting = () => {
  const [url, setUrl] = useState("");
  const [copy, setcopy] = useState(false);
  const [delId, setDelID] = useState(false);
  const [ShowBtn, setShowBtn] = useState(false);
  const [UrlEr, setUrlEr] = useState(false);
  const [UrlData, SetUrlData] = useState([]);
  const [openDelteModal, setopenDelteModal] = React.useState(false);
  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const [viewAccess, setViewAccess] = React.useState(false);
  const [editAccess, setEditAccess] = React.useState(false);
  const [deleteAccess, setDeleteAccess] = React.useState(false);
  const [regenerateKey, setregenerateKey] = useState(false);
  const [Key, setKey] = useState("");
  const [showPas, showPasswords] = useState(true);
  const inputText = useRef(null);
  let navigate = useNavigate();
  function GetSubsAccess() {
    let arr = GiveSubs(permission, "Api Settings", "subs");
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == "View") {
          setViewAccess(true);
        }
        if (arr[i].name == "Edit") {
          setEditAccess(true);
        }
        if (arr[i].name == "Delete") {
          setDeleteAccess(true);
        }
      }
    } else {
      if (permission[0]?.route) {
        navigate(permission[0].route);
      }
    }
  }
  const handleCloseDeleteModal = () => setopenDelteModal(false);
  let token = getToken();

  const handleOpenDeleteModal = (e) => {
    setDelID(e);

    setopenDelteModal(true);
  };

  const handleCopyClick = () => {
    // Select the text
    setcopy(!copy);
    inputText.current.select();
    inputText.current.setSelectionRange(0, 99999);

    document.execCommand("copy");

    window.getSelection().removeAllRanges();
  };

  function GetAdminData() {
    GETADMINAMEEMAIL(
      "retrive/profile",

      token
    )
      .then((response) => {
        setKey(response?.data?.data?.admin?.CLIENT_SECRET);
      })
      .catch((err) => "");
  }
  function handleAddUrl() {
    if (url !== "") {
      setUrlEr(false);

      ADD_URL({ url: url }, token, GetUrl)
        .then(() => {
          setShowBtn(false);
          setUrl("");
        })
        .catch(() => {
          setUrl("");
          setShowBtn(false);
        });
    } else {
      setUrlEr(true);
    }
  }
  function GetUrl() {
    GET_URL(token, SetUrlData);
  }

  function handleDelte() {
    DEL_URL(token, { url: delId }, GetUrl);
    setopenDelteModal(false);
  }
  function handleGenerateKey() {
    setregenerateKey(true);
    REGENERATE_KEY(token, setKey, setregenerateKey);
  }
  function handleDeleteKey() {
    DELETE_KEY(token, setKey);
  }
  useEffect(() => {
    GetUrl();
    GetAdminData();
  }, []);

  useEffect(() => {
    GetSubsAccess();
  }, [permission]);
  return (
    <PageContainer title="API Settings">
      <Title title={"API Settings"} />
      {viewAccess || editAccess || deleteAccess ? (
        <div className="mainContainerApiSetting">
          <div className="contA">
            <div className="mainContainerDataRetention">
              <div className="cardDT">
                <div>
                  <span className="Hd">API key</span>
                </div>

                <div>
                  <div className="mrt10">
                    <span className="fontSize">Client Secret</span>
                  </div>
                  <div className="flexspbt start ">
                    <div className="urlInput grBg flex">
                      <VpnKeyIcon
                        style={{
                          cursor: "pointer",
                          color: "grey",
                        }}
                      />

                      <input
                        className="urlInput exdes"
                        value={Key}
                        readOnly
                        ref={inputText}
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
                    <button
                      className="BtnDT NoBrd"
                      onClick={handleCopyClick}
                      style={{ color: !copy ? "grey" : "#6b5eff" }}
                    >
                      {!copy ? (
                        <ContentCopyIcon style={{ color: "grey" }} />
                      ) : (
                        <CheckIcon style={{ color: "#6b5eff" }} />
                      )}
                      {!copy ? "Copy" : "Copied"}
                    </button>
                    <div onClick={handleDeleteKey}>
                      <DELETEICON />
                    </div>
                  </div>
                  <div className="flexspbt M20">
                    <button
                      className={regenerateKey ? "GSt flxali" : "BtnDT flxali "}
                      onClick={handleGenerateKey}
                      disabled={regenerateKey}
                    >
                      <AutorenewIcon
                        style={{ color: regenerateKey ? "grey" : "#6b5eff" }}
                      />
                      Regenerate Key
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mainContainerDataRetention">
              <div className="cardDT">
                <div>
                  <span className="Hd">Customer Support</span>
                </div>
                <div>
                  <span className="sedondaryText1">
                    Add a URL to redirect users to your organization's customer
                    support portal.
                  </span>
                </div>

                <div>
                  <div className="mrt10">
                    <span className="fontSize">Customer Support URL</span>
                  </div>
                  <div className="flexspbt start">
                    <input className="urlInput grBg" />
                    {editAccess && <button className="BtnDT">Update</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contB">
            <div className="mainContainerDataRetention">
              <div className="cardDT">
                <div>
                  <span className="Hd">Redirect URL(s)</span>
                </div>
                <div>
                  <span className="sedondaryText1">
                    A URL that your user is redirectedd to on successful
                    indentity verification.For IDV only.
                  </span>
                  <h5>
                    You can specify multiple redirect URLs in case you have
                    multiple deployament environments.
                  </h5>
                </div>
                {UrlData &&
                  UrlData.map((e, i) => (
                    <div className="flexspbt" key={i}>
                      <div className=" linkText">
                        <span className="sedondaryText1">{e}</span>
                      </div>
                      {deleteAccess && (
                        <div onClick={() => handleOpenDeleteModal(e)}>
                          <DELETEICON />
                        </div>
                      )}
                    </div>
                  ))}
                {ShowBtn && (
                  <>
                    {" "}
                    <div className="flexspbt start">
                      <input
                        onChange={(e) => setUrl(e.target.value)}
                        className="urlInput fw Gy"
                      />
                    </div>
                    {UrlEr}
                  </>
                )}
                {editAccess && (
                  <div>
                    {!ShowBtn ? (
                      <button
                        className="BtnDT"
                        onClick={() => setShowBtn(true)}
                      >
                        ADD URL
                      </button>
                    ) : (
                      <button className="BtnDT" onClick={handleAddUrl}>
                        ADD URL
                      </button>
                    )}
                  </div>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <CustomDeleteModal
        open={openDelteModal}
        handleClose={handleCloseDeleteModal}
        setOpen={setopenDelteModal}
        handleDelte={handleDelte}
      />
    </PageContainer>
  );
};

export default ApiSetting;

function CustomDeleteModal({ open, handleClose, setOpen, handleDelte }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="Xyz">
        <DeleteModal handleClose={handleClose} handleDelte={handleDelte} />
      </div>
    </Modal>
  );
}
