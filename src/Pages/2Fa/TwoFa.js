import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VERIFY2FALOGIN } from "../../Api/Getkey";
import "../2Fa/TwoFa.css";

const TwoFa = () => {
  const [code, setCode] = useState("");
  const [codeEr, setCodeEr] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  function Takingtoken() {
    let ar = location.pathname.split("/");
    let tok = ar[ar.length - 1];
    setToken(tok);
  }

  function handle2FA() {
    setCodeEr("");
    if (code.length > 4) {
      VERIFY2FALOGIN(code, token, navigate);
    } else {
      setCodeEr("Invalid Code");
    }
  }
  useEffect(() => {
    Takingtoken();
  }, []);
  return (
    <div className="TwoFaCont">
      <div className="TwoFaCard">
        <div className="Midcent">
          <span className="titlea1">Verify</span>
        </div>
        <div>
          <span className="titlea2">
            Use the app on your mobile device to generate code{" "}
          </span>
        </div>
        <div className="exInpt">
          <input
            className="inInpt"
            value={code}
            type="number"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        {<span className="ERR">{codeEr ? codeEr : ""}</span>}
        <div>
          <button className="btn BGC" onClick={handle2FA}>
            Login
          </button>
        </div>
        <div>
          <span>
            If you failed to authenticate then please contact{" "}
            <Link to={"login"}>Authentication Support</Link> to deactivate Two
            factor authentication
          </span>
        </div>
      </div>
    </div>
  );
};

export default TwoFa;
