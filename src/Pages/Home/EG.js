import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { RIGHTARROWICON, UPLOAD } from "../../Global/Icons";

const Eg = () => {
  const [handlePasCam, sethandlePasCam] = useState(false);
  const videoRefPs = useRef(null);
  const [capturedImagePs, setCapturedImagePs] = useState(null);
  const [showNXTBTN, setShowNXTBTN] = useState(false);
  const [passportImg, setPassportImg] = useState("");

  const handleStartCamera = () => {
    sethandlePasCam(true);
  };

  const handleShowupload = () => {
    setshowuploadPassport(true);
  };

  const handleCapturePs = () => {
    const video = videoRefPs.current;
    const imageSrc = video.getScreenshot();
    setCapturedImagePs(imageSrc);
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <div style={{ width: "100%", overflow: "hidden" }}>
          {!handlePasCam && (
            <div className="jtspar">
              <button onClick={handleStartCamera} className="fillBtn rm6">
                Start Camera
              </button>
              <button className="fillBtn rm6" onClick={handleShowupload}>
                <UPLOAD />
              </button>
            </div>
          )}

          {handlePasCam && (
            <div className="cntbtnit">
              {!capturedImagePs ? (
                <>
                  <button onClick={handleCapturePs} className="fillBtn rm6">
                    Capture
                  </button>
                  <button onClick={handleStartCamera} className="fillBtn rm6">
                    Start
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setCapturedImagePs("");
                    setPassportImg("");
                  }}
                  className="fillBtn rm6"
                >
                  Retake
                </button>
              )}
            </div>
          )}

          {handlePasCam && (
            <div className="PasImgContainer CL WD100">
              {capturedImagePs && (
                <img src={capturedImagePs} className="ImgDoc" alt="Captured" />
              )}
            </div>
          )}

          {handlePasCam && (
            <Webcam
              audio={false}
              mirrored={true}
              ref={videoRefPs}
              style={{ display: capturedImagePs ? "none" : "block" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Eg;
