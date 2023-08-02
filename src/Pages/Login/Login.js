import React, { useState, useEffect } from "react";
import "./Login.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Link, useNavigate } from "react-router-dom";
import { regex } from "../../Global/Regex";
import { LoginApi } from "../../Api/LoginApi";
import { HIDEBALANCE, KEYICON, LOCK, SpinnerLoader } from "../../Global/Icons";
import ForgetImg from "../../assets/images/users/Forget.png";
import { ERROR } from "../../CustomComponent/Msg";

const Login = () => {
  const [showPass, setShowPass] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailEr, setEmailEr] = useState("");
  const [passEr, setPassEr] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [teamId, setTeamId] = useState(false);
  const [check, setcheck] = useState(false);
  const [teamKey, setteamKey] = useState("");
  const handlecheck = () => {
    setTeamId(!teamId);
  };
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    let validEmail = regex(email);
    if (!validEmail && !check) {
      ERROR("Invalid Email or Password");
    } else {
    }
    if (pass === "") {
      ERROR("Invalid Email or Password");
    } else {
    }
    if (check) {
      if (pass) {
        setShowLoader(true);
        await LoginApi(email, pass, check, teamKey, navigate, setShowLoader);
      }
    } else {
      if (validEmail && pass) {
        setShowLoader(true);
        await LoginApi(email, pass, check, teamKey, navigate, setShowLoader);
      }
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
          <form className="w60p" onSubmit={handleLogin} autoComplete="off">
            <div className="mtb20">
              {/* <img
                className="logo1"
                src={
                  MLOGO
                
                }
              /> */}
              <span className="TIL">Glorep</span>
            </div>
            <div className="loginContainer">
              <div>
                <span className="Heading">Sign in</span>
              </div>
              <div>
                <span className="ternaryFont">Please sign in to continue </span>
              </div>

              <div className=" colg5">
                <div className="custom-radio">
                  <label htmlFor="radio1" className="radio-label">
                    {" "}
                    <input
                      type="radio"
                      id="radio1"
                      name="radiogroup"
                      value="option1"
                      checked={!check}
                      onChange={() => setcheck(false)}
                    />
                    Admin
                  </label>

                  <label htmlFor="radio2" className="radio-label">
                    <input
                      type="radio"
                      id="radio2"
                      name="radiogroup"
                      value="option2"
                      checked={check}
                      onChange={() => {
                        setcheck(true);
                        setPass("");
                        setEmail("");
                      }}
                    />
                    Team Member
                  </label>
                </div>
                {!check ? (
                  <div className="inputContainer">
                    <PersonOutlineIcon className="Iconbg" />
                    <input
                      className="internalInput"
                      placeholder="Email"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* <div style={{ display: "hidden" }}> */}
                    <HIDEBALANCE />
                    {/* </div> */}
                  </div>
                ) : (
                  <div className="inputContainer">
                    {" "}
                    <PersonOutlineIcon className="Iconbg" />
                    <input
                      className="internalInput"
                      placeholder="User Name"
                      autoComplete="off"
                      value={teamKey}
                      onChange={(e) => setteamKey(e.target.value)}
                    />
                    <KEYICON />
                  </div>
                )}
                <span className="ERR">{emailEr !== "" ? emailEr : null}</span>
                <div className="inputContainer">
                  {/* <FeatherIcon icon="lock" /> */}
                  <LOCK className="Iconbg" />
                  <input
                    className="internalInput"
                    placeholder="Password"
                    autoComplete="off"
                    value={pass}
                    type={showPass ? "password" : "text"}
                    onChange={(e) => setPass(e.target.value)}
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

                {/* {teamId && (
                  <div className="inputContainer">
                    <VpnKeyIcon className="Iconbg" />
                    <input
                      className="internalInput"
                      placeholder="Team Id"
                      autoComplete="off"
                      value={teamKey}
                      onChange={(e) => setteamKey(e.target.value)}
                    />
                    <KEYICON />
                  </div>
                )} */}
              </div>
            </div>
            <div>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  border: "none",
                  margin: "10px 0",
                }}
              >
                <input type="checkbox" onClick={handlecheck} />
                <span
                  style={{
                    marginLeft: "3px",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Login as Team Member
                </span>
              </div> */}
            </div>
            <div>
              <button
                className="widthBtn"
                type="submit"
                disabled={showLoader}
                style={{ background: showLoader ? "grey" : "#6b5eff" }}
              >
                Sign In
              </button>
            </div>
            <div className="mt2">
              <div className="centerit mt10">
                <Link to="/auth/forget-password" className="textNone">
                  <span className="ternaryFont pointer">Forgot password?</span>
                </Link>
                {/* <Link to="/2fa/sdfds" className="textNone">
              <span className="ternaryFont pointer">Boy?</span>
            </Link> */}
              </div>
              {/* <div className="centerit mt10">
                <Link to="/auth/sign-up" className="textNone">
                  <span className="ternaryFont pointer">Sign up</span>
                </Link>
              </div> */}
            </div>
          </form>
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

export default Login;
