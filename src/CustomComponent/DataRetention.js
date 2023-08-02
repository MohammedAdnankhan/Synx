import React, { useState } from "react";
import "../css/Modal.css";
import { CROSSICON, SpinnerLoader } from "../Global/Icons";
import { DATARETENTIONAPI } from "../Api/UpdateProfile";
import { getToken } from "../Api/GetData";
const DataRetention = ({ setOpen }) => {
  const [msgEr, setMsgEr] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [msg, setMsg] = useState("");
  let token = getToken();
  async function handleInvite() {
    if (!msg) {
      setMsgEr("Invalid Request");
    } else {
      setMsgEr();
    }

    if (msg) {
      setShowLoader(true);
      DATARETENTIONAPI({ message: msg }, "Requested sent suceessfully", token)
        .then(() => {
          setOpen(false);
        })
        .catch(() => {
          setOpen(false);
        });
      setShowLoader(false);
    }
  }
  return (
    <div>
      {/* <SpinnerLoader state={showLoader} /> */}

      <div className="HeaderContainer">
        <span className="Viewtitletext">Your Request </span>
        <div onClick={() => setOpen(false)}>
          <CROSSICON />
        </div>
      </div>
      <div className="mttw">
        <span className="ternaryFont">
          Your data can be stored indefinitely , removed immediately , or stored
          for any duration in between.
        </span>
      </div>
      <div className="mttw">
        <span className="ternaryFont">
          Let us know for how long you would like your user data stored:
        </span>
      </div>

      <div className="mttw">
        <textarea
          id="text-area"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows="4"
          style={{
            resize: "none",
            width: "100%",
            height: "10rem",
            borderRadius: "5px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid grey",
          }}
          cols="50"
        />
        {msgEr ? <span className="Err">{msgEr}</span> : ""}
      </div>

      <div className="mttw bglightgrey">
        <div>
          <h4>Data Retention and face Authentication</h4>
        </div>

        <div>
          <span className="ternaryFont">
            Please note : The option to verify a user's identity through face
            authentication relies on the biometric data previously collected.
            Once your data is archieved , it cannot be used for face
            authentication.
          </span>
        </div>
      </div>

      <div
        className="viewRowContainer "
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className="IniviteBtn"
          onClick={handleInvite}
          // style={{ width: "30%" }}
          style={{ background: showLoader ? "grey" : " #6b5eff" }}
        >
          Send Message
        </button>
      </div>
      {/* <div></div> */}
    </div>
  );
};

export default DataRetention;
