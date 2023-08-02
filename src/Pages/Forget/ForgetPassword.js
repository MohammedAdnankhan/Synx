import React, { useCallback, useState } from "react";
import "./Forget.css";
import { LETTER, SpinnerLoader } from "../../Global/Icons";
import { ForgetPasswordApi } from "../../Api/ForgetPasswordApi";
import { regex } from "../../Global/Regex";
import { useNavigate } from "react-router";
import ForgetImg from "../../assets/images/users/Forget.png";
import MLOGO from "../../assets/images/users/LOGO.png";

const ForgetPassword = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [emailEr, setEmailEr] = useState("");
  const navigate = useNavigate();
  async function handleForgetPassword() {
    let validEmail = regex(email);
    if (validEmail) {
      setShowLoader(true);
      setEmailEr("");
      await ForgetPasswordApi(email, "Check your email", navigate);
      setShowLoader(false);
    } else {
      setEmailEr("Please enter a valid email");
    }
  }

  return (
    <div className="loginMainContainer">
      {/* <SpinnerLoader state={showLoader} /> */}
      <div className="roW">
        <div className="sectionA">
          <div className="w60p">
            <div className="mtb20">
              {/* <img
                className="logo1"
                src={
                  MLOGO
                }
              /> */}
              <span className="TIL">Glorep</span>
            </div>
            <div className="loginContainer mper5">
              <div>
                <span className="Heading">Forgot Password</span>
              </div>

              <div className="mtten">
                <div className="inputContainer">
                  {/* <PersonOutlineIcon className="Iconbg" /> */}
                  <LETTER styclass={"Iconbg"} />

                  <input
                    className="internalInput"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <span className="ERR">{emailEr ? emailEr : null}</span>
            </div>
            <div>
              <button className="widthBtn" onClick={handleForgetPassword}>
                Send Code
              </button>
            </div>
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

export default ForgetPassword;
