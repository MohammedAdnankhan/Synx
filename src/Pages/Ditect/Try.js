import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useRef, useEffect, useState } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [color, setColor] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [capturedImage, setCapturedImage] = useState("");
  const [dontShow, setDontShow] = useState(false);

  const connect = window.drawConnectors;
  var camera = null;
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
      // console.log(results.multiFaceLandmarks.lenght);
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
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    setCapturedImage(canvas.toDataURL("image/png"));
    setDontShow(true);
  };
  return (
    <center>
      {imageUrl && <img src={imageUrl} alt="captured" />}

      <div>
        <button
          style={{
            background: color ? "#6b5eff" : "grey",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={captureImage}
        >
          Click
        </button>
      </div>
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
              width: 300,
              height: 400,
              borderRadius: "50%",
            }}
          />{" "}
          <canvas
            ref={canvasRef}
            className="output_canvas"
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 300,
              height: 400,
              borderRadius: "50%",
              border: color ? "3px solid green" : "3px solid grey",
            }}
          ></canvas>
        </div>
      )}
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 300,
            height: 400,
            borderRadius: "50%",
          }}
        />
      )}
    </center>
  );
}

export default App;

// connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
//   color: "#C0C0C070",
//   lineWidth: 1,
// });
// connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
//   color: "#FF3030",
// });
// connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
//   color: "#FF3030",
// });
// connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
//   color: "#30FF30",
// });
// connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
//   color: "#30FF30",
// });
// connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
//   color: "#E0E0E0",
// });
// console.log("its working fine");

// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FACEVERIFICATION } from "../../Api/FaceVrify";
// import { FaceMesh } from "@mediapipe/face_mesh";
// import * as Facemesh from "@mediapipe/face_mesh";
// import * as cam from "@mediapipe/camera_utils";
// import Webcam from "react-webcam";
// import { PASSPORTVERIFICATION } from "../../Api/Passport";
// import {
//   CAMERA,
//   CHECK,
//   CROSS,
//   PENDING,
//   RIGHTARROWICON,
// } from "../../Global/Icons";
// import { SpinnerLoader } from "../../Global/Loader";
// import "./Selfie.css";
// const Selfie = () => {
//   const videoRef = useRef(null);
//   const [loader, setLoader] = useState(false);
//   const navigate = useNavigate();
//   const [image, setImage] = useState(null);
//   const [selfiER, setSelfieEr] = useState("");
//   const [mediastrem, setMediaStream] = useState("");
//   const [passportImg, setPassportImg] = useState("");
//   const [cameraStatus, setcameraStatus] = useState(false);
//   const [showuploadPassport, setshowuploadPassport] = useState(false);
//   const [image1, setImage1] = useState(null);
//   const [passportEr, setpassportEr] = useState("");
//   const [selfie, setSefie] = useState("");
//   const [docStatus, setDocStatus] = useState(false);
//   const [showPassport, setShowPassport] = useState(false);
//   const bodyFormData = new FormData();
//   const passportData = new FormData();
//   // bodyFormData.append("id", image1);
//   // console.log(typeof image);
//   bodyFormData.append("id", passportImg);
//   passportData.append("image", passportImg);
//   bodyFormData.append("selfie", capturedImage);

//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [color, setColor] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [capturedImage, setCapturedImage] = useState("");
//   const [dontShow, setDontShow] = useState(false);

//   const connect = window.drawConnectors;
//   var camera = null;
//   function onResults(results) {
//     // const video = webcamRef.current.video;
//     const videoWidth = webcamRef.current.video.videoWidth;
//     const videoHeight = webcamRef.current.video.videoHeight;

//     // Set canvas width
//     canvasRef.current.width = videoWidth;
//     canvasRef.current.height = videoHeight;

//     const canvasElement = canvasRef.current;
//     const canvasCtx = canvasElement.getContext("2d");
//     canvasCtx.save();
//     canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//     canvasCtx.drawImage(
//       results.image,
//       0,
//       0,
//       canvasElement.width,
//       canvasElement.height
//     );

//     if (results.multiFaceLandmarks) {
//       // console.log(results.multiFaceLandmarks.lenght);
//       setColor(false);

//       for (const landmarks of results.multiFaceLandmarks) {
//         // connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
//         //   color: "#E0E0E0",
//         // });
//         setColor(true);
//       }
//     }
//     canvasCtx.restore();
//   }

//   useEffect(() => {
//     const faceMesh = new FaceMesh({
//       locateFile: (file) => {
//         return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
//       },
//     });

//     faceMesh.setOptions({
//       maxNumFaces: 1,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });

//     faceMesh.onResults(onResults);

//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null
//     ) {
//       camera = new cam.Camera(webcamRef.current.video, {
//         onFrame: async () => {
//           await faceMesh.send({ image: webcamRef.current.video });
//         },
//         width: 640,
//         height: 480,
//       });
//       camera.start();
//     }
//   }, []);

//   const captureImage = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     // Draw the original image onto the canvas
//     const img = new Image();
//     img.src = canvas.toDataURL("image/png");
//     img.onload = () => {
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//       // Get the image data from the canvas
//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//       const data = imageData.data;

//       // Convert the image data to grayscale
//       for (let i = 0; i < data.length; i += 4) {
//         const grayscale =
//           data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
//         data[i] = grayscale;
//         data[i + 1] = grayscale;
//         data[i + 2] = grayscale;
//       }

//       // Put the grayscale image data back onto the canvas
//       ctx.putImageData(imageData, 0, 0);

//       // Convert the canvas to a data URL and set it
//       setCapturedImage(canvas.toDataURL("image/png"));

//       setDontShow(true);
//     };
//   };

//   const startCamera = async () => {
//     setcameraStatus(true);
//     setImage("");
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setMediaStream(stream);
//       videoRef.current.srcObject = stream;
//       videoRef.current.play();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const takeSelfie = () => {
//     setSelfieEr("");
//     setcameraStatus(false);

//     const canvas = document.createElement("canvas");
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;

//     const context = canvas.getContext("2d");
//     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     // Convert image to grayscale
//     const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;
//     for (let i = 0; i < data.length; i += 4) {
//       const gray = 0.2989 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
//       data[i] = gray;
//       data[i + 1] = gray;
//       data[i + 2] = gray;
//     }
//     context.putImageData(imageData, 0, 0);

//     const dataUrl = canvas.toDataURL();

//     // const dataUrl = canvas.toDataURL("image/png");
//     // console.log(dataUrl, "$$$");

//     setImage(dataUrl);
//     videoRef.current.srcObject.getTracks().forEach((track) => {
//       track.stop();
//     });
//     canvas.toBlob((blob) => {
//       const file = new File([blob], "image.png", { type: "image/png" });
//       setSefie(file);
//     });

//     handleBtn(true);
//   };

//   // console.log("value", image, image1);
//   const handleImageUpload1 = (event) => {
//     setImage1(URL.createObjectURL(event.target.files[0]));
//     setPassportImg(event.target.files[0]);
//     handleBtn(true);
//     setpassportEr("");
//   };
//   function handleBtn(one) {
//     if (image !== null && one) {
//       setDocStatus(true);
//     }
//     if (one && image1 !== null) {
//       setDocStatus(true);
//     }
//   }

//   function handleFaceVerification() {
//     // if (image == null) {

//     FACEVERIFICATION(
//       bodyFormData,
//       "Verification Successfull",
//       passportData,
//       navigate,
//       image,
//       setLoader
//     );
//     // .then((response) => setLoader(false))
//     // .catch((err) => setLoader(false));

//     // }
//   }
//   function handleShowupload() {
//     setshowuploadPassport(true);
//   }
//   return (
//     <div className="houseContainer VH100">
//       <div className="verificationCard W70H80 M2  ">
//         <SpinnerLoader state={loader} />
//         {!showPassport ? (
//           <>
//             <div className="MTB10">
//               <span className="HA">Take a Picture </span>
//             </div>
//             {/* <div className="VideoContainer">
//               <video
//                 ref={videoRef}
//                 className="VideoCamera"
//                 style={{
//                   display: !cameraStatus ? "none" : "flex",
//                   width: "100%",
//                   height: "480px",
//                 }}
//               ></video>

//               <div className="FLX">
//                 {image && (
//                   <img src={image} style={{ width: "100%" }} alt="Selfie" />
//                 )}
//               </div>

//             </div> */}
//             <center>
//               {imageUrl && <img src={imageUrl} alt="captured" />}

//               {/* <div>
//                 <button
//                   style={{
//                     background: color ? "#6b5eff" : "grey",
//                     color: "white",
//                     border: "none",
//                     padding: "10px 20px",
//                     cursor: "pointer",
//                     borderRadius: "5px",
//                   }}
//                   onClick={captureImage}
//                 >
//                   Click
//                 </button>
//               </div> */}
//               {!dontShow && (
//                 <div className="App">
//                   <Webcam
//                     ref={webcamRef}
//                     style={{
//                       position: "absolute",
//                       marginLeft: "auto",
//                       marginRight: "auto",
//                       left: 0,
//                       right: 0,
//                       textAlign: "center",
//                       zindex: 9,
//                       width: 300,
//                       height: 400,
//                       borderRadius: "50%",
//                       visibility: "hidden",
//                     }}
//                   />{" "}
//                   <canvas
//                     ref={canvasRef}
//                     className="output_canvas"
//                     style={{
//                       // position: "absolute",
//                       marginLeft: "auto",
//                       marginRight: "auto",
//                       left: 0,
//                       right: 0,
//                       textAlign: "center",
//                       zindex: 9,
//                       width: 300,
//                       height: 400,
//                       borderRadius: "50%",
//                       border: color ? "4px solid #6b5eff" : "4px solid grey",
//                     }}
//                   ></canvas>
//                 </div>
//               )}
//               {capturedImage && (
//                 <img
//                   src={capturedImage}
//                   alt="Captured"
//                   style={{
//                     // position: "absolute",
//                     marginLeft: "auto",
//                     marginRight: "auto",
//                     left: 0,
//                     right: 0,
//                     textAlign: "center",
//                     zindex: 9,
//                     width: 300,
//                     height: 400,
//                     borderRadius: "50%",
//                   }}
//                 />
//               )}
//             </center>
//             <div className="MTB20">
//               {/* {!cameraStatus ? (
//                 <button className="fillBtn round" onClick={startCamera}>
//                   <CAMERA />
//                 </button>
//               ) : (
//                 <button onClick={takeSelfie} className="fillBtn round">
//                   <CAMERA />
//                 </button>
//               )} */}
//               {!capturedImage ? (
//                 <button
//                   style={{
//                     background: color ? "#6b5eff" : "grey",
//                     color: "white",
//                     border: "none",
//                     padding: "10px 20px",
//                     cursor: "pointer",
//                     borderRadius: "5px",
//                     font: "16px",
//                   }}
//                   disabled={!color}
//                   onClick={captureImage}
//                 >
//                   Click
//                 </button>
//               ) : (
//                 <button
//                   className="fillBtn MTB20"
//                   onClick={() => setShowPassport(true)}
//                 >
//                   {/* <UPLOAD /> */}
//                   NEXT
//                 </button>
//               )}
//             </div>
//             {<span className="ERR">{selfiER ? selfiER : ""}</span>}
//           </>
//         ) : (
//           <>
//             <div className="WD100">
//               {/* <div></div> */}

//               <div className="MID ">
//                 <div className="MTB10">
//                   <span className="HA">Upload your Document </span>
//                 </div>

//                 {!showuploadPassport ? (
//                   // htmlFor="fileInput"
//                   <>
//                     <div className="SLTBTN" onClick={handleShowupload}>
//                       Passport <RIGHTARROWICON />
//                     </div>
//                     <div className="SLTBTN" onClick={handleShowupload}>
//                       Driving Licence <RIGHTARROWICON />
//                     </div>
//                     <div className="SLTBTN" onClick={handleShowupload}>
//                       Document ID <RIGHTARROWICON />
//                     </div>
//                   </>
//                 ) : (
//                   ""
//                 )}
//                 <input
//                   type="file"
//                   onChange={handleImageUpload1}
//                   placeholder="Passport"
//                   // className="fillBtn"
//                   accept=".jpg, .jpeg, .png"
//                   title="Select Passport"
//                   style={{ visibility: "hidden" }}
//                   id="fileInput"
//                 />
//                 {showuploadPassport ? (
//                   <div className="PasImgContainer CL WD100">
//                     {image1 ? (
//                       <div className="ENDJUST MTB10">
//                         <CROSS func={() => setImage1(null)} />
//                       </div>
//                     ) : (
//                       ""
//                     )}
//                     <img
//                       src={image1}
//                       // alt="uploaded image"
//                       // style={{ height: "20rem", width: "30rem" }}
//                       className="ImgDoc"
//                     />
//                   </div>
//                 ) : null}
//               </div>
//               {<span className="ERR">{passportEr ? passportEr : ""}</span>}
//             </div>

//             {showuploadPassport ? (
//               <>
//                 {/* <div className="PasImgContainer"></div> */}
//                 <div className="MTB20">
//                   <label htmlFor="fileInput" className="GT">
//                     Select Passport
//                   </label>
//                 </div>
//               </>
//             ) : (
//               ""
//             )}
//             {passportImg ? (
//               <>
//                 {" "}
//                 <div className="CEN MTB10">
//                   <button
//                     className="fillBtn"
//                     style={{ background: docStatus ? "#6b5eff" : "grey" }}
//                     onClick={() => {
//                       handleFaceVerification();
//                       setLoader(true);
//                     }}
//                   >
//                     NEXT
//                   </button>
//                 </div>
//               </>
//             ) : (
//               ""
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Selfie;
