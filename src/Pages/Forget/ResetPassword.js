import React, { useState } from "react";
import "./Forget.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LOCK, OTP, SpinnerLoader } from "../../Global/Icons";
import { ResetPasswordApi } from "../../Api/ForgetPasswordApi";
import { useNavigate } from "react-router";
import ForgetImg from "../../assets/images/users/Forget.png";
import MLOGO from "../../assets/images/users/LOGO.png";

const ResetPassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpEr, setOtpEr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordEr, setPasswordEr] = useState("");
  const [ConfirmpasswordEr, setConfirmPasswordEr] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();
  async function handleResetPass() {
    if (otp.length < 4) {
      setOtpEr("Enter valid OTP");
    } else {
      setOtpEr("");
    }
    if (password.length < 7) {
      setPasswordEr("Minimum 8 character require");
    } else {
      setPasswordEr("");
      if (password === confirmpassword) {
        setConfirmPasswordEr("");
      } else {
        setConfirmPasswordEr("Password mismatch");
      }
    }
    if (otp.length > 4 && password.length > 7 && password === confirmpassword) {
      setShowLoader(true);
      await ResetPasswordApi(
        otp,
        password,
        "Password updated Successfully",
        navigate
      );
      setShowLoader(false);
    }
  }
  return (
    <div className="loginMainContainer">
      <SpinnerLoader state={showLoader} />
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
            <div className="loginContainer ">
              <div>
                <span className="Heading">Reset Password</span>
              </div>

              <div className="mtten gp ">
                <div className="inputContainer optContainer">
                  <OTP />
                  <input
                    className="internalInput quantity"
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Otp"
                    type="number"
                  />
                </div>
                {!otpEr ? null : <span className="ERR">{otpEr}</span>}
                <div className="inputContainer">
                  <LOCK />
                  <input
                    className="internalInput"
                    type={showPass1 ? "password" : "text"}
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {showPass1 ? (
                    <VisibilityOffIcon
                      className="Iconbg"
                      onClick={() => {
                        setShowPass1(!showPass1);
                      }}
                    />
                  ) : (
                    <RemoveRedEyeIcon
                      className="Iconbg"
                      onClick={() => {
                        setShowPass1(!showPass1);
                      }}
                    />
                  )}
                </div>
                {!passwordEr ? null : <span className="ERR">{passwordEr}</span>}
                <div className="inputContainer">
                  <LOCK />
                  <input
                    className="internalInput"
                    type={showPass ? "password" : "text"}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    placeholder="Confirm New Password"
                  />
                  {/* <FeatherIcon icon="lock" /> */}
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
                {!ConfirmpasswordEr ? null : (
                  <span className="ERR">{ConfirmpasswordEr}</span>
                )}
              </div>
            </div>
            <div>
              <button className="widthBtn" onClick={handleResetPass}>
                Reset
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

export default ResetPassword;
