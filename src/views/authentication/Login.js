import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import "../../CustomCss/Login.css";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { func } from "prop-types";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEr, setemER] = useState("");
  const [PasEr, setPasEr] = useState("");
  const navigate = useNavigate();
  const loginurl = "https://mindcrew.live:3000/executive/login";

  const handlelogin = () => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let isEmailValid = regexEmail.test(email.length < 20 ? email : null);

    if (!isEmailValid) {
      setemER("Please enter a valid email");
    } else {
      setemER("");
    }

    if (password == "") {
      // swal("Please enter  password")
      setPasEr("Please enter Passoword");
    } else {
      setPasEr("");
    }
    if (emailEr == "" && PasEr == "") {
      axios
        .post(loginurl, {
          email: email,
          password: password,
        })
        .then(async function (response) {
          if (response.data.message == "Login successfully") {
            await sessionStorage.setItem(
              "Token",
              JSON.stringify(response.data.data.loginToken)
            );
            await sessionStorage.setItem(
              "AzrToken",
              JSON.stringify(response.data.data.azureToken)
            );
            sessionStorage.setItem(
              "AzrId",
              JSON.stringify(response.data.data.azureId)
            );
            sessionStorage.setItem(
              "AvaliableStatus",
              JSON.stringify(response.data.data.availableStatus)
            );

            await navigate("/dashboard");
          }
          if (response.data.code == 401 || response.status == 404) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Invalid Email or Password",
            });
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong",
          });
        });
    }
  };

  return (
    <div className="centerdiv F-H">
      <div className="header">
        <span className="logofont blue">LBBD </span>
        <span className="logofont">VIDEO CALL</span>
      </div>
      <div className="Logincontainer">
        <div className="Mb-40">
          <span className="loginheading">Login to your account</span>
        </div>

        <div>
          <div className={`inputcontainer ${emailEr ? "Errorborder" : ""}`}>
            <FeatherIcon icon="user" className="loginicons" />

            <input
              className="inputfield"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <span className="Error">{emailEr}</span>

          <div className={`inputcontainer ${PasEr ? "Errorborder" : ""}`}>
            <FeatherIcon icon="lock" className="loginicons" />

            <input
              className="inputfield"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <span className="Error"> {PasEr}</span>

          <div className="Justspace">
            <div className="centerdiv  ">
              {" "}
              <input
                type="checkbox"
                placeholder="Password"
                className="Secfont mr5"
              />{" "}
              <span className="Secfont ml5 ">Remember Password</span>
            </div>
            <span className="Secfont pointer">forgot password?</span>
          </div>
        </div>
        <div className="Mt-20">
          <button className="loginbtn" onClick={() => handlelogin()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
