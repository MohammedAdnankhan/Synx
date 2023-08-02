import React, { useEffect, useState } from "react";
import { GETSUBCARD } from "../../Api/LoginApi";
import { useNavigate } from "react-router";
import { ICONSUCCESS } from "../../Global/Icons";
import "./Pricing.css";
const ShowCard = () => {
  let navigate = useNavigate();
  const [SubCardData, setSubCardData] = useState("");

  function getCard() {
    GETSUBCARD(setSubCardData);
  }

  function handleChange(id, Tok) {
    navigate("/register-payment", { state: { id: id, StrTok: Tok } });
  }
  useEffect(() => {
    getCard();
  }, []);

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
                Tok={null}
                Id={null}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default ShowCard;

function SubscriptionCard({ data, Tok, Id, handleChange }) {
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
          // className={data?.id !== Id ? "btnSubGost" : "btnSub"}
          className={"btnSub"}

          // disabled={data?.id !== Id ? true : false}
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
