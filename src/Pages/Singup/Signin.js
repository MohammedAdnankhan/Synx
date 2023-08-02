import React, { useState, useEffect } from "react";
import "./Signin.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link, useNavigate } from "react-router-dom";
import { regex } from "../../Global/Regex";
import { SIGNUPAPI } from "../../Api/LoginApi";
import { HIDEBALANCE, LOCK, SpinnerLoader, LETTER } from "../../Global/Icons";
import ForgetImg from "../../assets/images/users/Forget.png";
import { ERROR } from "../../CustomComponent/Msg";

const Signin = () => {
  const [showPass, setShowPass] = useState(true);
  const [showPass1, setShowPass1] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailEr, setEmailEr] = useState("");
  const [passEr, setPassEr] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [name, setName] = useState("");
  const [nameEr, setNameEr] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassEr, setConfirmPassEr] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    let validEmail = regex(email);

    if (!validEmail) {
      // setEmailEr("Invalid Email");
      ERROR("Please fill all the field");
    } else {
      // setEmailEr();
    }
    if (pass === "") {
      // setPassEr("Invalid Password");
      ERROR("Please fill all the field");
    } else {
      if (confirmPass !== pass) {
        // setPassEr("Password Mismatch");
        // setConfirmPassEr("Password Mismatch");
        ERROR("Password mismatch");
      } else {
        setConfirmPassEr("");
        setPassEr("");
      }
    }
    if (name === "") {
      // setNameEr("Invalid Name");
      ERROR("Please fill all the field");
    } else {
      setNameEr("");
    }

    if (email && pass === confirmPass && name) {
      setShowLoader(true);
      await SIGNUPAPI(name, email, pass, navigate);
      setShowLoader(false);
    }
  }

  useEffect(() => {
    let Token = JSON.parse(sessionStorage.getItem("Token"));

    if (Token !== null && Token !== undefined) {
      navigate("/dashboard", { replace: true });
    }
  }, []);
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
                  "https://mindcrewtech.com/wp-content/uploads/2022/04/200-by-100-Mindcrew-logo-e1652188233977.png"
                }
              /> */}
              <span className="TIL">Glorep</span>
            </div>
            <div className="loginContainer">
              <div>
                <span className="Heading">Sign up</span>
              </div>
              <div>
                <span className="ternaryFont">Please sign up to continue </span>
              </div>

              <form className=" colg5">
                <div className="inputContainer">
                  <PersonOutlineIcon className="Iconbg" />
                  <input
                    className="internalInput"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Organization Name"
                  />
                  {/* <div style={{ display: "hidden" }}> */}
                  <HIDEBALANCE />
                  {/* </div> */}
                </div>
                <span className="ERR">{nameEr !== "" ? nameEr : null}</span>

                <div className="inputContainer">
                  <LETTER className="Iconbg" />
                  <input
                    className="internalInput"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  {/* <div style={{ display: "hidden" }}> */}
                  <HIDEBALANCE />
                  {/* </div> */}
                </div>
                <span className="ERR">{emailEr !== "" ? emailEr : null}</span>
                <div className="inputContainer">
                  {/* <FeatherIcon icon="lock" /> */}
                  <LOCK className="Iconbg" />
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
                <span className="ERR">{passEr !== "" ? passEr : null}</span>

                <div className="inputContainer">
                  {/* <FeatherIcon icon="lock" /> */}
                  <LOCK className="Iconbg" />
                  <input
                    className="internalInput"
                    type={showPass1 ? "password" : "text"}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Confirm-Password"
                  />
                  {showPass1 ? (
                    <VisibilityOffIcon
                      className="Iconbg"
                      onClick={() => setShowPass1(!showPass1)}
                    />
                  ) : (
                    <RemoveRedEyeIcon
                      className="Iconbg"
                      onClick={() => setShowPass1(!showPass1)}
                    />
                  )}
                </div>
                <span className="ERR">
                  {confirmPassEr !== "" ? confirmPassEr : null}
                </span>
              </form>

              <div>
                <button className="widthBtn" onClick={handleLogin}>
                  Register
                </button>
              </div>
              <div className="centerit mt20">
                <Link to="/auth/login" className="textNone">
                  <span className="ternaryFont pointer">Sign In</span>
                </Link>
                {/* <Link to="/2fa/sdfds" className="textNone">
              <span className="ternaryFont pointer">Boy?</span>
            </Link> */}
              </div>
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

export default Signin;
