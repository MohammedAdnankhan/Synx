import React, { useState, useEffect } from "react";
import "../Login/Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ICONSUCCESSBig, LOCK, SpinnerLoader } from "../../Global/Icons";
import ForgetImg from "../../assets/images/users/Forget.png";

import { TEAMMEMBERREGISTER } from "../../Api/GetData";
const SuccesVerified = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailEr, setEmailEr] = useState("");
  const [confirmPass, setConfirmPas] = useState("");
  const [confirmPassEr, setConfirmPasEr] = useState("");
  const [passEr, setPassEr] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [paramurl, setparam] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  function handlecsplit() {
    let param = location.pathname.split("/");
    setparam(param[param.length - 1]);
  }
  async function handleLogin() {
    if (email == "") {
      setEmailEr("Invalid Email");
    } else {
      setEmailEr();
    }
    if (pass === "") {
      setPassEr("Invalid Password");
    } else {
      setPassEr("");
    }

    if (confirmPass !== pass) {
      setConfirmPasEr("Password mismatch");
    } else {
      setConfirmPasEr("");
    }
    if (email && pass) {
      setShowLoader(true);
      TEAMMEMBERREGISTER(
        `update/team/${paramurl}`,
        { name: email, password: pass },
        "REGISTER SUCCESSFULL",
        navigate
      );
      setShowLoader(false);
    }
  }

  useEffect(() => {
    handlecsplit();
  }, []);

  return (
    <div className="loginMainContainer">
      <SpinnerLoader state={showLoader} />
      <div className="roW">
        <div className="sectionA">
          {/* <div className="mtb20 CEN">
            <img
              className="logo1"
              src={
                "https://mindcrewtech.com/wp-content/uploads/2022/04/200-by-100-Mindcrew-logo-e1652188233977.png"
              }
            />
          </div> */}
          <div className="loginContainer cenitline cloit">
            <div
              style={{
                textAlign: "center",
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ICONSUCCESSBig />

              <span className="Heading">You have been added to the Team</span>
            </div>
            <button
              onClick={() => navigate("/auth/login")}
              className="widthBtn containwidth"
            >
              Login
            </button>
          </div>
        </div>
        <div className="imgContainer sectionB">
          <img
            className="loginImg"
            src={
              // "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000"
              ForgetImg
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SuccesVerified;
