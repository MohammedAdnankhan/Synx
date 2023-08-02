import React, { useState } from "react";
import "./Confirm.css";
import { useNavigate } from "react-router-dom";
import { CONFRIM_VERIFICATION } from "../../Api/FaceVrify";

const Confirm = () => {
  let UID = sessionStorage.getItem("UID");
  const [dis, setDis] = useState(false);
  const navigate = useNavigate();
  function Confirm() {
    setDis(true);
    CONFRIM_VERIFICATION(navigate, { userId: UID }, setDis);
  }

  return (
    <div className="houseContainer ">
      <div className="verificationCard  H40W70 ">
        <div className="tl">
          <span className="TH">Terms & Coditions</span>
        </div>
        <div>
          <span>
            A Terms and Conditions agreement is where you let the public know
            the terms, rules and guidelines for using your website or mobile
            app. They include topics such as acceptable use, restricted behavior
            and limitations of liability.
          </span>
        </div>
        <div>
          <button
            className="fillBtn"
            onClick={Confirm}
            disabled={dis}
            style={{ background: dis ? "grey" : "6b5eff" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
