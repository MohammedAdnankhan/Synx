import axios from "axios";
import { ERROR, SUCCESS } from "../CustomComponent/Msg";
import { baseUrl, ERMSG } from "../Global/Const";
export const Token = JSON.parse(sessionStorage.getItem("Token"));

export const ForgetPasswordApi = (email, Msg, navigate) =>
  axios({
    method: "POST",
    url: baseUrl + "forgot/password",
    headers: {
      // Authorization: `Bearer ${Token}`,
    },
    data: { email: email },
  })
    .then(function async(response) {
      navigate("/auth/reset-password");

      SUCCESS(Msg);
    })
    .catch(function (error) {
      let userNotFound = error.response.data.data[0].msg;
      userNotFound ? ERROR(userNotFound) : ERROR(ERMSG);
    });
export const ResetPasswordApi = (otp, password, Msg, navigate) =>
  axios({
    method: "POST",
    url: baseUrl + "reset/password",
    headers: {
      // Authorization: `Bearer ${Token}`,
    },
    data: { otp: otp, password: password },
  })
    .then(function async(response) {
      SUCCESS(Msg);
      navigate("/auth/login");
    })
    .catch(function (error) {
      ERROR(ERMSG);
    });
