import React, { useState } from "react";
import "./Dl.css";
const Dl = () => {
  const [image1, setImage1] = useState(null);
  const [docStatus, setDocStatus] = useState(false);

  const handleImageUpload1 = (event) => {
    setImage1(URL.createObjectURL(event.target.files[0]));
    setDocStatus(true);
  };
  return (
    <div className="houseContainer ">
      <div className="verificationCard">
        <div>
          <span className="HA">Select Driving Licence</span>
        </div>
        <div>
          <span className="ST">
            Make sure that all information is within the borders of the scanner.
          </span>
        </div>

        <div className="MID">
          <label htmlFor="fileInput" className="GT">
            Select Driving Licence
          </label>
          <input
            type="file"
            onChange={handleImageUpload1}
            placeholder="Passport"
            accept=".jpg, .jpeg, .png"
            title="Select Passport"
            style={{ visibility: "hidden" }}
            id="fileInput"
          />
          {image1 ? (
            <img src={image1} alt="uploaded image" className="ImgDoc" />
          ) : null}
        </div>
        <div className="CEN MTB10">
          <button
            className="fillBtn"
            style={{ background: docStatus ? "#6b5eff" : "grey" }}
          >
            UPLOAD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dl;
