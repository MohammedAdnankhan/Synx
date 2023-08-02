import React, { useEffect, useState } from "react";
import { PaymentApi } from "../../Api/Payment";
import { GETCARDDATA } from "../../Api/SubscriptionCard";
import PageContainer from "../../components/container/PageContainer";
import Title from "../../CustomComponent/Title";
import { ICONSUCCESS } from "../../Global/Icons";
import Swal from "sweetalert2";
import "./SubPlan.css";
import { useNavigate } from "react-router";
import { getToken } from "../../Api/GetData";
import { useSelector } from "react-redux";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";
const SubPlan = () => {
  const [cardData, setCardData] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const [viewAccess, setViewAccess] = React.useState(false);
  const [editAccess, setEditAccess] = React.useState(false);
  const [deleteAccess, setDeleteAccess] = React.useState(false);
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
  function handleChange(id, PlanId) {
    navigate("/subscription-payment", { state: { id: id, PI: PlanId } });
  }
  const token = getToken();

  function handleCardData() {
    GETCARDDATA(setCardData, setId, token);
  }
  useEffect(() => {
    handleCardData();
  }, []);

  return (
    <PageContainer title="Subscription-Plans">
      {viewAccess && (
        <div className="mainContainer">
          <Title title={"Subscription-Plans"} />
          <div className="cardsContainer">
            {cardData.length >= 1
              ? cardData.map((data, index) => (
                  <SubCard
                    key={index}
                    title={data?.subscriptionName}
                    price={data?.amount}
                    perks={data?.perks}
                    limit={data?.limit}
                    validity={data?.subscriptionType}
                    handleChange={handleChange}
                    id={data?._id}
                    status={data?.status}
                    PlanId={data?.priceId}
                    activeId={id}
                  />
                ))
              : null}
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default SubPlan;

export function SubCard({
  title,
  price,
  perks,
  validity,
  handleChange,
  id,
  limit,
  PlanId,
  status,
  activeId,
}) {
  return (
    <div className="cardContainer  borCol">
      <div>
        <div className="Midit">
          {" "}
          <span className="cardTitile">{title}</span>
        </div>
        <div className="Midit">
          <span className="cardPrice">${price}</span>
        </div>
      </div>

      <div className="mtb10">
        <div>
          {" "}
          <span className="font1">{"Perks"}</span>
        </div>
        <div className="stline minw">
          <ICONSUCCESS /> <span className="font2">{perks}</span>
        </div>
      </div>
      <div className="mtb10">
        <div>
          {" "}
          <span className="font1">{"Validity"}</span>
        </div>
        <div className="stline">
          <ICONSUCCESS /> <span className="font2">{validity}</span>
        </div>
      </div>
      <div className="mtb10">
        <div>
          {" "}
          <span className="font1">{"Verification Limit"}</span>
        </div>
        <div className="stline">
          <ICONSUCCESS /> <span className="font2">{limit}</span>
        </div>
      </div>
      <button
        onClick={() => handleChange(id, PlanId)}
        className={status === "true" ? "btnSub" : "GostbtnSub"}
        // disabled={status === "true" ? true : false}
        disabled={status !== "true" ? false : true}
      >
        {status === "true" ? "Active" : "Subscribe"}
        {/* getItem */}
      </button>
    </div>
  );
}
