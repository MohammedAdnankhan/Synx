import React, { useEffect, useState } from "react";
import "./Plan.css";
import { ICONSUCCESS } from "../../Global/Icons";
import { GETSUBCARD } from "../../Api/LoginApi";
import { useLocation, useNavigate } from "react-router";

const Plans = () => {
  let navigate = useNavigate();
  const [SubCardData, setSubCardData] = useState("");
  const location = useLocation();
  let Id = location?.state?.planId;
  let Tok = location?.state?.adminToken;

  function getCard() {
    GETSUBCARD(setSubCardData);
  }
  useEffect(() => {
    getCard();
  }, []);

  function handleChange(id, Tok) {
    navigate("/auth/payment", { state: { id: id, StrTok: Tok } });
  }
  return (
    <div className="FWH Cl">
      <div className="cardsContainer">
        {SubCardData.length >= 1
          ? SubCardData.map((data, index) => (
              <SubscriptionCard
                key={index}
                data={data}
                handleChange={handleChange}
                id={data?.id}
                Tok={Tok}
                Id={Id}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Plans;
export function SubscriptionCard({ data, Tok, Id, handleChange }) {
  return (
    <div className="cardContainer">
      <div>
        <div>
          {" "}
          <span className="cardTitile">{data?.title}</span>
        </div>
        <div>
          <span className="cardPrice">${data?.price}</span>
        </div>
      </div>

      <div className="mtb10">
        <div>
          {" "}
          <span className="font1">{"Perks"}</span>
        </div>
        <div className="stline minw">
          <ICONSUCCESS /> <span className="font2">{data?.perks}</span>
        </div>
      </div>
      <div className="mtb10">
        <div>
          {" "}
          <span className="font1">{"Validity"}</span>
        </div>
        <div className="stline">
          <ICONSUCCESS /> <span className="font2">{data?.validity}</span>
        </div>
      </div>
      <div className="mtb10">
        <div>
          {" "}
          <span className="font1">{"Verification Limit"}</span>
        </div>
        <div className="stline">
          <ICONSUCCESS /> <span className="font2">{data?.limit}</span>
        </div>
      </div>
      {Id ? (
        <button
          onClick={() => handleChange(data?.id, Tok)}
          className={data?.id !== Id ? "btnSubGost" : "btnSub"}
          // className={"btnSub"}

          disabled={data?.id !== Id ? true : false}
        >
          Subscribe
        </button>
      ) : (
        <button
          onClick={() => handleChange(data?.id, Tok)}
          className={"btnSub"}
          // className={"btnSub"}

          // disabled={data?.id !== Id ? true : false}
        >
          Subscribe
        </button>
      )}
    </div>
  );
}
