import "./Invoice.css";
import { getToken } from "../../Api/GetData";
import Title from "../../CustomComponent/Title";
import React, { useEffect, useState } from "react";
import { GETSUBDETAIL } from "../../Api/SubscriptionCard";
import PageContainer from "../../components/container/PageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";

const Invoice = () => {
  const [invoiceData, setInvoiceDataAr] = useState([]);
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

  useEffect(() => {
    GetSubsAccess();
  }, [permission]);
  function GetInvoice() {
    GETSUBDETAIL(setInvoiceDataAr, token);
  }

  useEffect(() => {
    GetInvoice();
  }, []);
  return (
    <PageContainer title={"Invoices"}>
      <div className="container">
        <Title title={"Invoice"} />

        <div className="g20">
          {invoiceData?.map((data, index) =>
            data.amount == 0 ? null : (
              <div className="invCont" key={index}>
                <div>
                  <img
                    className="logod"
                    src={
                      "https://mindcrewtech.com/wp-content/uploads/2022/04/200-by-100-Mindcrew-logo-e1652188233977.png"
                    }
                  />
                </div>
                <div>
                  <div className="flsp">
                    <div>
                      <p className="h3">From:</p>
                      <address>
                        Mindcrewtech.PVT.LTD New IT Park
                        <br />
                        Indore 452010
                        <br />
                        mindcrewtech@gmail.com
                      </address>
                    </div>
                    <div className="coll">
                      <p className="h3"> To:</p>

                      <address className="coll">
                        {data?.name}
                        <br />
                        {data?.email}
                      </address>
                      <p className="h3">{data?.date}</p>
                    </div>
                  </div>
                  {/* <div>date</div> */}
                </div>
                <div className="cl">
                  <div className="rwfw mt20p bb">
                    <div className="f1">
                      <span className="bld">S.No </span>
                    </div>
                    <div className="f3">
                      <span className="bld">Perks </span>
                    </div>
                    <div className="f1">
                      <span className="bld">Limit</span>
                    </div>
                    <div className="f1">
                      <span className="bld">Period </span>
                    </div>
                    <div className="f1">
                      <span className="bld">Amount </span>
                    </div>
                  </div>

                  <div className="rwfw mt5">
                    <div className="f1">
                      <span className="mdf">1</span>
                    </div>
                    <div className="f3">
                      <span>{data?.perks}</span>
                    </div>
                    <div className="f1">
                      <span className="mdf">{data?.limit}</span>
                    </div>
                    <div className="f1">
                      <span className="mdf">{data?.validity}</span>
                    </div>

                    <div className="f1">
                      <span className="mdf">{data?.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Invoice;
