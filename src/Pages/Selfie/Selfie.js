import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import { useNavigate } from "react-router-dom";
import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useState, useRef, useEffect } from "react";
import { ALL_IN_ONE_VERIFICATION } from "../../Api/FaceVrify";
import { CAMERAICON, CROSS, REVERCAMERA, UPLOAD } from "../../Global/Icons";
import "./Selfie.css";
const Selfie = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [passportImg, setPassportImg] = useState("");
  const [Camera, setCamera] = useState("");
  const [showuploadPassport, setshowuploadPassport] = useState(false);
  const [image1, setImage1] = useState(null);
  const [passportEr, setpassportEr] = useState("");
  const [selfie, setSefie] = useState("");
  const [docStatus, setDocStatus] = useState(false);
  const [showPassport, setShowPassport] = useState(false);
  const [something, setSomethinkg] = useState(false);
  const bodyFormData = new FormData();
  const passportData = new FormData();
  const Confirmdata = new FormData();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [color, setColor] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");
  const [dontShow, setDontShow] = useState(false);
  const [handlePasCam, sethandlePasCam] = useState(false);
  const [fb, setFb] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [Tok, setTok] = useState("");
  passportData.append("image", passportImg);
  bodyFormData.append("id", passportImg);
  bodyFormData.append("selfie", capturedImage);
  bodyFormData.append("userId", Tok);
  Confirmdata.append("id", passportImg);
  Confirmdata.append("selfie", capturedImage);
  var camera = null;
  const videoRefPs = useRef(null);
  const canvasRefPs = useRef(null);
  const [capturedImagePs, setCapturedImagePs] = useState(null);

  const handleCapturePs = () => {
    const video = videoRefPs.current.video;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Loop through each pixel and convert it to grayscale
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      // Convert pixel to grayscale
      const gray = red * 0.299 + green * 0.587 + blue * 0.114;

      // Set the red, green, and blue channels to the grayscale value
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    // Update the image data back to the canvas
    context.putImageData(imageData, 0, 0);

    // Convert the modified canvas to a data URL and set it as the captured image
    const imageSrc = canvas.toDataURL("image/png");

    setCapturedImagePs(imageSrc);

    // Convert the modified canvas to a blob and set it as the passport image
    canvas.toBlob((blob) => {
      setPassportImg(blob);
    }, "image/png");
  };

  const handleStartCamera = () => {
    // Initialize camera when the "Start Camera" button is clicked
    sethandlePasCam(true);
  };

  function onResults(results) {
    // const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.multiFaceLandmarks) {
      setColor(false);

      for (const landmarks of results.multiFaceLandmarks) {
        // connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
        //   color: "#E0E0E0",
        // });
        setColor(true);
      }
    }
    canvasCtx.restore();
  }

  const captureImage = () => {
    setFb(true);
    // console.log("picture click");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the original image onto the canvas
    // console.log("Draw the original image onto the canvas");
    const img = new Image();

    img.src = canvas.toDataURL("image/png");
    img.onload = async () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Convert the image data to grayscale
      for (let i = 0; i < data.length; i += 4) {
        const grayscale =
          data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = grayscale;
        data[i + 1] = grayscale;
        data[i + 2] = grayscale;
      }

      // Put the grayscale image data back onto the canvas
      ctx.putImageData(imageData, 0, 0);

      // Convert the canvas to a data URL and set it
      setSefie(canvas.toDataURL("image/png"));

      canvas.toBlob((blob) => {
        setCapturedImage(blob);
        setDontShow(true);
      }, "image/png");
    };
  };

  const handleImageUpload1 = (event) => {
    setImage1(URL.createObjectURL(event.target.files[0]));
    setPassportImg(event.target.files[0]);
    handleBtn(true);
    setDocStatus(true);

    setpassportEr("");
  };
  function handleBtn(one) {
    if (image !== null && one) {
      setDocStatus(true);
    }
    if (one && image1 !== null) {
      setDocStatus(true);
    }
  }

  function handleFaceVerification() {
    setLoader(true);
    ALL_IN_ONE_VERIFICATION(bodyFormData, navigate, selfie, setLoader);
  }
  function handleShowupload() {
    setshowuploadPassport(true);
  }

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      !fb
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
      setCamera(camera);

      let token = sessionStorage.getItem("UID");
      if (token) {
        setTok(token);
      }
    }

    return () => {
      if (fb && camera) {
        camera.stop();
        faceMesh.close(); // if the faceMesh has a close or similar function
      }
    };
  }, [something, fb]);
  const handleCameraSwitch = () => {
    if (facingMode === "user") {
      setFacingMode("environment");
    } else {
      setFacingMode("user");
    }
  };

  return (
    <div className="houseContainer VH100">
      <div className="verificationCard W70H80 M2 CNTRL ">
        {!showPassport ? (
          <>
            <div className="MTB10">
              <span className="HA">Take a Picture </span>
            </div>
            <center>
              {!dontShow && (
                <div className="App">
                  <Webcam
                    ref={webcamRef}
                    style={{
                      position: "absolute",
                      marginLeft: "auto",
                      marginRight: "auto",
                      left: 0,
                      right: 0,
                      textAlign: "center",
                      zindex: 9,

                      borderRadius: "50%",
                      transform: "scale(1.6) scaleX(-1)",

                      visibility: "hidden",
                    }}
                    height={400} // Adjusted to match the videoConstraints height
                    width={200} // Adjusted to match the videoConstraints width
                    videoConstraints={{
                      width: 1280, // Adjusted to match the desired width of the screenshot
                      height: 720, // Adjusted to match the desired height of the screenshot
                      facingMode,
                    }}
                  />{" "}
                  <div
                    style={{
                      width: 300,
                      height: 400,
                      overflow: "hidden",
                      borderRadius: "50%",
                      position: "relative",
                      border: color ? "4px solid #6b5eff" : "4px solid grey",
                    }}
                  >
                    <canvas
                      ref={canvasRef}
                      className="output_canvas "
                      style={{
                        // position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 300,
                        height: 400,
                        borderRadius: "50%",
                        transform: "scale(1.6) scaleX(-1)",
                        zIndex: "19",
                      }}
                    ></canvas>
                  </div>
                </div>
              )}
              {capturedImage && (
                <div
                  style={{
                    width: 300,
                    height: 400,
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={selfie}
                    alt="Captured"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      left: 0,
                      right: 0,
                      textAlign: "center",
                      zindex: 9,
                      width: 300,
                      height: 400,
                      borderRadius: "50%",
                      transform: "scale(1.6) scaleX(-1)",
                    }}
                  />
                </div>
              )}
            </center>
            <div className="MTB20">
              {!capturedImage ? (
                <button
                  style={{
                    background: color ? "#6b5eff" : "grey",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    font: "16px",
                  }}
                  disabled={!color}
                  onClick={() => captureImage()}
                >
                  Click
                </button>
              ) : (
                <div className="Gp10 ">
                  <button
                    className="fillBtn MTB20 rm6"
                    onClick={() => {
                      setSefie("");
                      setCapturedImage("");
                      setDontShow(false);
                      setSomethinkg(!something);
                      setFb(null);
                    }}
                  >
                    Retake
                  </button>
                  <button
                    className="fillBtn MTB20 rm6"
                    onClick={() => {
                      setShowPassport(true);
                      Camera.stop();
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>{" "}
          </>
        ) : (
          <>
            <div className="WD100">
              {/* <div></div> */}

              <div className="MID ">
                <div className="MTB10 HDRR">
                  <span className="HA">Upload Your Document </span>
                </div>

                {!showuploadPassport ? (
                  <div style={{ width: "100%" }}>
                    <div
                      style={{ width: "100%", overflow: "hidden" }}
                      className="PTL"
                    >
                      {!handlePasCam && (
                        <div className="jtspar">
                          <button
                            onClick={handleStartCamera}
                            className="fillBtn rm6"
                          >
                            <CAMERAICON />
                          </button>
                          <button
                            className="fillBtn rm6"
                            onClick={handleShowupload}
                          >
                            <UPLOAD />
                          </button>
                        </div>
                      )}

                      {handlePasCam && (
                        <div className="Shh">
                          <Webcam
                            ref={videoRefPs}
                            audio={false}
                            screenshotFormat="image/png"
                            height={620} // Adjusted to match the videoConstraints height
                            width={1280} // Adjusted to match the videoConstraints width
                            videoConstraints={{
                              width: 1280, // Adjusted to match the desired width of the screenshot
                              height: 720, // Adjusted to match the desired height of the screenshot
                              facingMode,
                            }}
                            imageSmoothing={true}
                            style={{
                              display: capturedImagePs ? "none" : "block",
                              width: "100%",
                              borderRadius: "10px",
                            }}
                            className="Rota"
                          />
                        </div>
                      )}

                      {capturedImagePs && (
                        <div className="PasImgContainer CL WD100">
                          <img
                            src={capturedImagePs}
                            className="ImgDoc"
                            alt="Captured"
                          />
                        </div>
                      )}

                      <canvas ref={canvasRefPs} style={{ display: "none" }} />

                      {handlePasCam && (
                        <div className="cntbtnit W20w">
                          {!capturedImagePs ? (
                            <div className="Flexjt NRETAK">
                              {" "}
                              <button
                                onClick={handleCameraSwitch}
                                className="reBtn rm6 PDD"
                              >
                                <REVERCAMERA />
                              </button>
                              <button
                                onClick={handleCapturePs}
                                className="fillBtn rm6"
                              >
                                Capture
                              </button>
                            </div>
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
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <input
                  type="file"
                  onChange={handleImageUpload1}
                  placeholder="Passport"
                  accept=".jpg, .jpeg, .png"
                  title="Select Passport"
                  style={{ visibility: "hidden" }}
                  id="fileInput"
                />

                {showuploadPassport ? (
                  <div className="PasImgContainer CL WD100">
                    {image1 ? (
                      <div className="ENDJUST MTB10">
                        <CROSS
                          func={() => {
                            setImage1(null);
                            setPassportImg("");
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <img src={image1} className="ImgDoc" />
                  </div>
                ) : null}
              </div>
              {<span className="ERR">{passportEr ? passportEr : ""}</span>}
            </div>

            <div className="PsCon">
              {showuploadPassport ? (
                <>
                  <div className="MTB20 mtten">
                    <label htmlFor="fileInput" className="GT">
                      Select Passport
                    </label>
                  </div>
                </>
              ) : (
                ""
              )}
              {passportImg ? (
                <>
                  {" "}
                  <div className="CEN mt gpten  ">
                    <button
                      className="fillBtn"
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Back
                    </button>
                    <button
                      className="fillBtn"
                      disabled={loader}
                      style={{ background: loader ? "grey" : "#6b5eff" }}
                      onClick={() => {
                        handleFaceVerification();
                        setLoader(true);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Selfie;
