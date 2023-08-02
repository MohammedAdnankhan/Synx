import React, { useState, useRef, useEffect } from "react";
import { SpinnerLoader } from "../../Global/Loader";
import "./Liveliness.css";
import Webcam from "react-webcam";
import { REPEAT } from "../../Global/Icons";
import { useNavigate } from "react-router-dom";
import { LIVELINESSAPI } from "../../Api/LinvlinesApi";
import RecordRTC from "recordrtc";

const Liveliness = () => {
  const [loader, setLoader] = useState(false);
  const webcamRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [Tok, setTok] = useState("");
  const navigate = useNavigate();
  const [dis, setDis] = useState(false);
  const formData = useRef(new FormData());
  const [format, setFormat] = useState("video/mp4");

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const chunksRef = useRef([]);
  const handleRecord = async () => {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user",
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: videoConstraints,
    });
    const recorder = RecordRTC(stream, {
      type: "video",
      mimeType: format,
    });

    let timer = 10; // set the countdown timer to 10 seconds

    // Update the countdown timer every second
    const countdownInterval = setInterval(() => {
      timer--;
      setCountdown(timer);
      if (timer === 0) {
        clearInterval(countdownInterval);
        recorder.stopRecording(() => {
          // stop recording after 10 seconds
          const blob = recorder.getBlob();
          const url = URL.createObjectURL(blob);
          setVideoSrc(url);

          // Append the Blob object to the FormData object
          formData.current.append("selfie", blob, "my-video.webm");
          formData.current.append("userId", Tok);
        });
      }
    }, 1000);

    recorder.startRecording(); // start recording
  };

  const handleRetake = () => {
    setVideoSrc(null); // reset the video source
    setCountdown(null); // reset the countdown timer
  };

  function handleVideoApi() {
    setDis(true);

    LIVELINESSAPI(formData, Tok, "Verification Successful", navigate, setDis);
  }

  useEffect(() => {
    setCountdown(null);
    let token = sessionStorage.getItem("UID");
    if (token) {
      setTok(token);
    }
  }, [videoSrc]);

  return (
    <div className="houseContainer VH100">
      <div className="verificationCard W70H80 M2  ">
        <SpinnerLoader state={loader} />
        <div className="MTB10">
          <span className="HA">Liveliness Test </span>
        </div>
        {videoSrc ? (
          <div>
            <video
              controls
              style={{
                width: "100%",
              }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <div className="flx">
              <REPEAT doit={handleRetake} />
              <button
                className="fillBtn"
                style={{ background: dis ? "grey" : "#6b5eff" }}
                disabled={dis}
                onClick={handleVideoApi}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{
                width: "100%",
              }}
            />
            <div className="flx MT20 clu">
              <div className="Cntop">
                {countdown !== null && <h2>{`00:0${countdown}`}</h2>}
                <span className="Tex1"> Smile, Blink for better result.</span>
              </div>
              <button
                onClick={handleRecord}
                className="fillBtn"
                style={{ background: countdown !== null ? "grey" : "#6b5eff" }}
                disabled={countdown !== null}
              >
                Start Recording
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Liveliness;
