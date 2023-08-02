import "./DataRetention.css";
import React, { useEffect, useState } from "react";
import Title from "../../CustomComponent/Title";
import ReqModal from "../../CustomComponent/DataRetention";
import PageContainer from "../../components/container/PageContainer";
import { useSelector } from "react-redux";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";
import { useNavigate } from "react-router";
import ModalWraper from "../../CustomComponent/ModalWraper";
const DataRetention = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const [viewAccess, setViewAccess] = React.useState(false);
  const [editAccess, setEditAccess] = React.useState(false);
  const [deleteAccess, setDeleteAccess] = React.useState(false);
  let navigate = useNavigate();
  function GetSubsAccess() {
    let arr = GiveSubs(permission, "Data retention", "subs");
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

  useEffect(() => {
    GetSubsAccess();
  }, [permission]);
  return (
    <PageContainer title="Data-Retention">
      <Title title={"Data-Retention"} />
      {viewAccess || editAccess ? (
        <div className="mainContainerDataRetention">
          <div className="cardDT">
            <div>
              <span className="Hd">Data Retention Period</span>
            </div>
            <div>
              <span className="sedondaryText">
                Personal information collected in the verification process is
                stored in the databasae until it is archieved Once the data
                retention period has expired ,all the personal information will
                removed from the database and only the verification ID and
                verification result will remain
              </span>
            </div>
            <div className="externalFieldDR widfit">
              <h5>Current Period: Store your customer's data for 30 days</h5>
            </div>
            <div>
              <span className="sedondaryText">
                To change your data retention period,feel welcome to get in
                touch with us
              </span>
            </div>
            <div>
              {editAccess && (
                <button className="BtnDT" onClick={() => setOpen(true)}>
                  Request Change
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <ModalWraper
        open={open}
        handleClose={handleClose}
        setOpen={setOpen}
        Component={ReqModal}
      />
    </PageContainer>
  );
};

export default DataRetention;
