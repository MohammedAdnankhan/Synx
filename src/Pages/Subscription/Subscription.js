import "./Sub.css";
import { useNavigate } from "react-router";
import { getToken } from "../../Api/GetData";
import Title from "../../CustomComponent/Title";
import React, { useEffect, useState } from "react";
import { GETSUBDETAIL } from "../../Api/SubscriptionCard";
import PageContainer from "../../components/container/PageContainer";
import { useSelector } from "react-redux";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";

const Subscription = () => {
  const [invoiceData, setInvoiceData] = useState("");
  const token = getToken();

  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const [viewAccess, setViewAccess] = React.useState(false);
  const [editAccess, setEditAccess] = React.useState(false);
  const [deleteAccess, setDeleteAccess] = React.useState(false);
  let navigate = useNavigate();

  function GetSubsAccess() {
    let arr = GiveSubs(permission, "Subscription", "subs");
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
  function GetInvoice() {
    GETSUBDETAIL(setInvoiceData, token);
  }

  useEffect(() => {
    GetInvoice();
    GetSubsAccess();
  }, []);
  return (
    <PageContainer title={"Subscription"}>
      {" "}
      {viewAccess || editAccess ? (
        <div className="mainContainer">
          <Title title={"Subscription"} />
          <div className="updateContainer">
            <div className="m20">
              <span className="Hd1">{invoiceData[0]?.planId}</span>
            </div>
            <div className="m20">
              <span className="hughText">${invoiceData[0]?.amount}</span>
            </div>
            <div className="oppos">
              <button className="ghostBtn" onClick={() => navigate("/invoice")}>
                Show details
              </button>
              {editAccess && (
                <button
                  className="billBtn"
                  onClick={() => navigate("/subscription-plans")}
                >
                  Change Subcription
                </button>
              )}
            </div>
          </div>
          <div className="updateContainer">
            <div>
              <div className="m20">
                <span className="Hd1">Billing details</span>
              </div>
              <div className="oppos">
                <div className="inputContainer">
                  <input
                    className="internalInput"
                    value={"MindcrewTech"}
                    disabled
                  />
                </div>
                <div className="btnContainer">
                  <button className="updateBtn">Update</button>
                </div>
              </div>
            </div>
            <div>
              <div className="m20">
                <span className="Hd1">Invoices</span>
              </div>
              <div className="oppos">
                <div className="inputContainer">
                  <input
                    className="internalInput"
                    value={"MindcrewTech@gmail.com"}
                    disabled
                  />
                </div>
                <div className="btnContainer">
                  <button className="updateBtn">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </PageContainer>
  );
};

export default Subscription;
