import React, { useState, useEffect } from "react";
import "../Login/Login.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ForgetImg from "../../assets/images/users/Forget.png";

import { LOCK, SpinnerLoader } from "../../Global/Icons";
import { Password } from "@mui/icons-material";
import { TEAMMEMBERREGISTER } from "../../Api/GetData";
const TeamMeberForm = () => {
  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setshowConfirmPass] = useState(true);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [emailEr, setEmailEr] = useState("");
  const [confirmPass, setConfirmPas] = useState("");
  const [confirmPassEr, setConfirmPasEr] = useState("");
  const [passEr, setPassEr] = useState("");
  const [userNameEr, setUserNameEr] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [paramurl, setparam] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  function handlecsplit() {
    let param = location.pathname.split("/");
    setparam(param[param.length - 1]);
  }
  async function handleLogin() {
    // let validEmail = regex(email);

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
    if (userName === "") {
      setUserNameEr("Invalid UserName : UserName must be unique");
    } else {
      setUserNameEr("");
    }

    if (confirmPass !== pass) {
      setConfirmPasEr("Password mismatch");
    } else {
      setConfirmPasEr("");
    }
    if (email && pass === confirmPass && userName) {
      setShowLoader(true);
      TEAMMEMBERREGISTER(
        `update/team/${paramurl}`,
        { name: email, password: pass, userName: userName },
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
    <div className="loginMainContainer ">
      <SpinnerLoader state={showLoader} />
      <div className="roW">
        <div className="sectionA">
          <div className="mtb20 W1p">
            {/* <img
              className="logo1"
              src={
                "https://mindcrewtech.com/wp-content/uploads/2022/04/200-by-100-Mindcrew-logo-e1652188233977.png"
              }
            /> */}
            <span className="TIL ">Glorep</span>
          </div>
          <div className="loginContainer W100p">
            <div>
              <span className="Heading">Add to Team</span>
            </div>
            <div>
              <span className="ternaryFont">
                Please enter detail to continue{" "}
              </span>
            </div>

            <div className="mtten">
              <div className="inputContainer flst">
                <PersonOutlineIcon className="Iconbg" />
                <input
                  className="internalInput"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <span className="ERR">{emailEr !== "" ? emailEr : null}</span>
              <div className="inputContainer flst">
                <PersonOutlineIcon className="Iconbg" />
                <input
                  className="internalInput"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="User Name"
                />
              </div>
              <span className="ERR">
                {userNameEr !== "" ? userNameEr : null}
              </span>
              <div className="inputContainer flst">
                {/* <FeatherIcon icon="lock" /> */}
                <LOCK />
                <input
                  className="internalInput"
                  type={showPass ? "password" : "text"}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Password"
                />
                {showPass ? (
                  <VisibilityOffIcon
                    className="Iconbg"
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <RemoveRedEyeIcon
                    className="Iconbg"
                    onClick={() => setShowPass(!showPass)}
                  />
                )}
              </div>
              <div>
                {" "}
                <span className="ERR">{passEr !== "" ? passEr : null}</span>
              </div>

              <div className="inputContainer flst">
                {/* <FeatherIcon icon="lock" /> */}
                <LOCK />
                <input
                  className="internalInput"
                  type={showConfirmPass ? "password" : "text"}
                  onChange={(e) => setConfirmPas(e.target.value)}
                  placeholder="Confirm Password"
                />
                {showConfirmPass ? (
                  <VisibilityOffIcon
                    className="Iconbg"
                    onClick={() => setshowConfirmPass(!showConfirmPass)}
                  />
                ) : (
                  <RemoveRedEyeIcon
                    className="Iconbg"
                    onClick={() => setshowConfirmPass(!showConfirmPass)}
                  />
                )}
              </div>
              <div>
                {" "}
                <span className="ERR">
                  {confirmPassEr !== "" ? confirmPassEr : null}
                </span>
              </div>
            </div>
          </div>
          <div className="W100p">
            <button className="widthBtn" onClick={handleLogin}>
              Submit
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

export default TeamMeberForm;
