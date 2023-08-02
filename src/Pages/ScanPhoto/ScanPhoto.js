import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ScanPhoto.css";
import QRCode from "qrcode.react";
import { CREATE_USER } from "../../Api/FaceVrify";
import { browserName } from "react-device-detect";

const ScanPhoto = () => {
  const url = "https://www.example.com";
  const navigate = useNavigate();
  const [dis, setDis] = useState(false);
  const [platform, setPlatform] = useState("");
  const currentUrl = window.location.href;
  const location = useLocation();

  function handleCreateUser() {
    setDis(true);
    CREATE_USER(navigate, setDis, {
      platform: platform,
      browserName: browserName,
    });
  }
  useEffect(() => {
    setPlatform(window.navigator.userAgent);
    const paths = location.pathname.split("/");
    const lastPath = paths[paths.length - 1];
    if (lastPath !== undefined) {
      sessionStorage.setItem("UToken", lastPath);
    }
  }, []);

  return (
    <div className="houseContainer ">
      <div className="verificationCard  H60W80">
        <div className="flst">
          <h2>Identify yourself</h2>
        </div>
        <div className="verCont">
          <div className="W50 BOXA">
            <div>
              <div className="MTB10">
                <span className="H1">Take a Photo</span>
              </div>
              <div>
                <span className="ST">
                  Your face has to be well lit. Avoid background lights.
                </span>
              </div>
            </div>
            <div>
              <div className="MTB10">
                <span className="H1">Scan your ID Document</span>
              </div>
              <div>
                <span className="ST">
                  Make sure that all information is within the borders of the
                  scanner.
                </span>
              </div>
            </div>
            <div className="m3p">
              <button
                className="fillBtn W80"
                style={{ background: !dis ? "#6b5eff" : "grey" }}
                disabled={dis}
                onClick={handleCreateUser}
              >
                Start Verification
              </button>
            </div>
          </div>
          <div className="W50 BOXB">
            <div className="Center">
              <QRCode value={currentUrl} size={255} />
            </div>
            <div>
              <span className="ST">
                ...or scan the QR code to continue on your smartphone. A better
                camera and the lighting conditions increase the chances of
                identification.  Please, keep this tab open.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPhoto;
