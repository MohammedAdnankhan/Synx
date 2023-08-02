import "./Subscription.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Title from "../../CustomComponent/Title";
import React, { useEffect, useState } from "react";
import "../OrganisationalManagement/Organisation.css";
import { TEAMDETAIL, getToken } from "../../Api/GetData";
import InviteTeam from "../../CustomComponent/InviteTeam";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SubscriberTable from "../../CustomComponent/SubscriberTable";
import PageContainer from "../../components/container/PageContainer";
import { useSelector } from "react-redux";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";
import { useNavigate } from "react-router";
import ModalWraper from "../../CustomComponent/ModalWraper";
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
const Subscription = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [teamTableData, setteamTableData] = useState([]);
  const token = getToken();
  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const [viewAccess, setViewAccess] = React.useState(false);
  const [editAccess, setEditAccess] = React.useState(false);
  const [deleteAccess, setDeleteAccess] = React.useState(false);
  const navigate = useNavigate();
  function GetSubsAccess() {
    let arr = GiveSubs(permission, "Team", "subs");
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

  function handleTableData() {
    TEAMDETAIL(setteamTableData, token);
  }
  useEffect(() => {
    handleTableData();
  }, []);

  useEffect(() => {
    GetSubsAccess();
  }, [permission]);

  return (
    <PageContainer title="Team-Management">
      {viewAccess || editAccess || deleteAccess ? (
        <>
          <div className="oppo">
            <Title title={"Team"} />
            {editAccess && (
              <button className="inviteBtn" onClick={() => setOpen(true)}>
                <PersonAddAltIcon />
                Invite
              </button>
            )}
          </div>{" "}
          <SubscriberTable
            tableDATA={teamTableData}
            handleTableData={handleTableData}
            editAccess={editAccess}
            viewAccess={viewAccess}
            deleteAccess={deleteAccess}
          />
          <ModalWraper
            open={open}
            handleClose={handleClose}
            setOpen={setOpen}
            handleTableData={handleTableData}
            Component={InviteTeam}
          />
        </>
      ) : null}
    </PageContainer>
  );
};

export default Subscription;
